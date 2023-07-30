import * as Helper from '../utils/helpers';
import * as Http from '../utils/http-mocks';

const path = /surveys/;

export const mockUnexpectedError = (): void => {
  Http.mockServerError(path, 'GET');
};

describe('SurveyResult', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {
      Helper.setLocalStorageItem('account', account);
    });
  });

  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError();
    cy.visit('/surveys/any_id');
    cy.getByTestId('error').should(
      'contain.text',
      'something wrong happened. Try again soon',
    );
  });
});
