import { faker } from '@faker-js/faker';
import * as Helper from '../support/helpers';
import * as Http from '../support/survey-list-mocks';

describe('SurveyList', () => {
  beforeEach(() => {
    Helper.setLocalStorageItem('account', {
      accessToken: faker.string.uuid(),
      name: faker.person.fullName(),
    });
  });

  it('Should present error on UnexpectedError', () => {
    Http.mockUnexpectedError();
    cy.visit('');
    cy.getByTestId('error').should(
      'contain.text',
      'something wrong happened. Try again soon',
    );
  });

  it('Should logout on AccessDeniedError', () => {
    Http.mockAccessDeniedError();
    cy.visit('');
    Helper.testUrl('login');
  });

  it('Should present correct username', () => {
    Http.mockUnexpectedError();
    cy.visit('');

    const { name } = Helper.getLocalStorageItem('account');

    cy.getByTestId('username').should('contain.text', name);
  });
});
