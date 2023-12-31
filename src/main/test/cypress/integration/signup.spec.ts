import { faker } from '@faker-js/faker';
import * as FormHelper from '../utils/form-helpers';
import * as Helper from '../utils/helpers';
import * as Http from '../utils/http-mocks';

const path = /signup/;
const populateFields = (): void => {
  cy.getByTestId('name').focus().type(faker.person.fullName());
  cy.getByTestId('email').focus().type(faker.internet.email());
  const password = faker.internet.password();

  cy.getByTestId('password').focus().type(password);
  cy.getByTestId('passwordConfirmation').focus().type(password);
};

const simulateValidSubmit = (): void => {
  populateFields();
  cy.getByTestId('submit').click();
};

export const mockEmailInUseError = (): void => {
  Http.mockForbiddenError(path, 'POST');
};

export const mockUnexpectedError = (): void => {
  Http.mockServerError(path, 'POST');
};

export const mockSuccess = (): void => {
  Http.mockOk(path, 'POST', 'fx:account');
};

describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('signup');
  });

  it('Should load with correct initial state', () => {
    cy.getByTestId('name').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('name', 'Campo obrigatório');
    cy.getByTestId('email').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('email', 'Campo obrigatório');
    cy.getByTestId('password').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('password', 'Campo obrigatório');
    cy.getByTestId('passwordConfirmation').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('passwordConfirmation', 'Campo obrigatório');
    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('name').focus().type(faker.string.alphanumeric(3));
    FormHelper.testInputStatus('name', 'O campo name é inválido');
    cy.getByTestId('email').focus().type(faker.word.words());
    FormHelper.testInputStatus('email', 'O campo email é inválido');
    cy.getByTestId('password').focus().type(faker.string.alphanumeric(3));
    FormHelper.testInputStatus('password', 'O campo password é inválido');
    cy.getByTestId('passwordConfirmation')
      .focus()
      .type(faker.string.alphanumeric(4));
    FormHelper.testInputStatus(
      'passwordConfirmation',
      'O campo passwordConfirmation é inválido',
    );
    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('name').focus().type(faker.person.fullName());
    FormHelper.testInputStatus('name');
    cy.getByTestId('email').focus().type(faker.internet.email());
    FormHelper.testInputStatus('email');

    const password = faker.internet.password();

    cy.getByTestId('password').focus().type(password);
    FormHelper.testInputStatus('password');
    cy.getByTestId('passwordConfirmation').focus().type(password);
    FormHelper.testInputStatus('passwordConfirmation');
    cy.getByTestId('submit').should('not.have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present EmailInUseError on 403', () => {
    mockEmailInUseError();
    simulateValidSubmit();
    FormHelper.testMainError('Email is already in use');
    Helper.testUrl('signup');
  });

  it('Should present UnexpectedError on default error cases', () => {
    mockUnexpectedError();
    simulateValidSubmit();
    FormHelper.testMainError('something wrong happened. Try again soon');
    Helper.testUrl('signup');
  });

  it('Should present save account if valid credentials are provided', () => {
    mockSuccess();
    simulateValidSubmit();
    cy.getByTestId('main-error').should('not.exist');
    cy.getByTestId('spinner').should('not.exist');
    Helper.testUrl('');
    Helper.testLocalStorageItem('account');
  });

  it('Should prevent multiple submits', () => {
    mockSuccess();
    populateFields();
    cy.getByTestId('submit').dblclick();
    Helper.testHttpCallsCount(1);
  });

  it('Should not call submit if form is invalid', () => {
    mockSuccess();
    cy.getByTestId('email')
      .focus()
      .type(faker.internet.email())
      .type('{enter}');
    Helper.testHttpCallsCount(0);
  });
});
