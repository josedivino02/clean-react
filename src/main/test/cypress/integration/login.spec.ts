import { faker } from '@faker-js/faker';
import * as FormHelper from '../support/form-helper';
import * as Http from '../support/login-mocks';

const populateFields = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email());
  cy.getByTestId('password').focus().type(faker.string.alphanumeric(5));
};

const simulateValidSubmit = (): void => {
  populateFields();
  cy.getByTestId('submit').click();
};

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login');
  });

  it('Should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readonly');
    FormHelper.testInputStatus('email', 'Campo obrigatório');
    cy.getByTestId('password').should('have.attr', 'readonly');
    FormHelper.testInputStatus('password', 'Campo obrigatório');
    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.word.words());
    FormHelper.testInputStatus('email', 'O campo email é inválido');
    cy.getByTestId('password').focus().type(faker.string.alphanumeric(3));
    FormHelper.testInputStatus('password', 'O campo password é inválido');
    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email());
    FormHelper.testInputStatus('email');
    cy.getByTestId('password').focus().type(faker.internet.password());
    FormHelper.testInputStatus('password');
    cy.getByTestId('submit').should('not.have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present InvalidCredentialsError on 401', () => {
    Http.mockInvalidCredentialsError();
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('password').focus().type(faker.string.alphanumeric(5));
    cy.getByTestId('submit').click();
    FormHelper.testMainError('Invalid credentials');
    FormHelper.testUrl('login');
  });

  it('Should present UnexpectedError on default error cases', () => {
    Http.mockUnexpectedError();
    simulateValidSubmit();
    FormHelper.testMainError('something wrong happened. Try again soon');
    FormHelper.testUrl('login');
  });

  it('Should present save accessToken if valid credentials are provided', () => {
    Http.mockOk();
    simulateValidSubmit();
    cy.getByTestId('main-error').should('not.exist');
    cy.getByTestId('spinner').should('not.exist');
    FormHelper.testUrl('');
    FormHelper.testLocalStorageItem('accessToken');
  });

  it('Should present UnexpectedError if invalid data is returned', () => {
    Http.mockInvalidData();
    simulateValidSubmit();
    FormHelper.testMainError('something wrong happened. Try again soon');
    FormHelper.testUrl('login');
  });

  it('Should prevent multiple submits', () => {
    Http.mockOk();
    populateFields();
    cy.getByTestId('submit').dblclick();
    FormHelper.testHttpCallsCount(1);
  });

  it('Should not call submit if form is invalid', () => {
    Http.mockOk();
    cy.getByTestId('email')
      .focus()
      .type(faker.internet.email())
      .type('{enter}');
    FormHelper.testHttpCallsCount(0);
  });
});
