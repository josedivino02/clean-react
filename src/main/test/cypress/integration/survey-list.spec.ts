import * as Helper from '../utils/helpers';
import * as Http from '../utils/http-mocks';

const path = /surveys/;

export const mockUnexpectedError = (): void => {
  Http.mockServerError(path, 'GET');
};

export const mockAccessDeniedError = (): void => {
  Http.mockForbiddenError(path, 'GET');
};

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {
      Helper.setLocalStorageItem('account', account);
    });
  });

  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError();
    cy.visit('');
    cy.getByTestId('error').should(
      'contain.text',
      'something wrong happened. Try again soon',
    );
  });

  it('Should logout on AccessDeniedError', () => {
    mockAccessDeniedError();
    cy.visit('');
    Helper.testUrl('login');
  });

  it('Should present correct username', () => {
    mockUnexpectedError();
    cy.visit('');
    const { name } = Helper.getLocalStorageItem('account');
    cy.getByTestId('username').should('contain.text', name);
  });

  it('Should logout on logout click', () => {
    mockUnexpectedError();
    cy.visit('');
    cy.getByTestId('logout').click();
    Helper.testUrl('login');
  });
});
