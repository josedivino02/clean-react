import * as Helper from '../utils/helpers';
import * as Http from '../utils/http-mocks';

const path = /surveys/;

export const mockUnexpectedError = (): void => {
  Http.mockServerError(path, 'GET');
};

export const mockAccessDeniedError = (): void => {
  Http.mockForbiddenError(path, 'GET');
};

export const mockSuccess = (): void => {
  Http.mockOk(path, 'GET', 'fx:survey-result');
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

  it('Should reload on button click', () => {
    mockUnexpectedError();
    cy.visit('/surveys/any_id');
    cy.getByTestId('error').should(
      'contain.text',
      'something wrong happened. Try again soon',
    );
    mockSuccess();
    cy.getByTestId('reload').click();
    cy.getByTestId('question').should('exist');
  });

  it('Should logout on AccessDeniedError', () => {
    mockAccessDeniedError();
    cy.visit('/surveys/any_id');
    Helper.testUrl('login');
  });

  it('Should present survey result', () => {
    mockUnexpectedError();
    cy.visit('/surveys/any_id');
    cy.getByTestId('question').should('have.text', 'Question');
    cy.getByTestId('day').should('have.text', '24');
    cy.getByTestId('month').should('have.text', 'jul');
    cy.getByTestId('year').should('have.text', '2023');
    cy.get('li:nth-child(1)').then(li => {
      assert.equal(li.find('[data-testid]="answer"').text(), 'any_answer');
      assert.equal(li.find('[data-testid]="image"').attr('src'), 'any_image');
      assert.equal(li.find('[data-testid]="percent"').text(), '70%');
    });
    cy.get('li:nth-child(2)').then(li => {
      assert.equal(li.find('[data-testid]="answer"').text(), 'any_answer_2');
      assert.notExists(li.find('[data-testid]="image"'));
      assert.equal(li.find('[data-testid]="percent"').text(), '30%');
    });
  });
});
