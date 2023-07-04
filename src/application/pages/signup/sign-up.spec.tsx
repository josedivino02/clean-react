import { SignUp } from '@/application/pages';
import { Helper } from '@/application/test';
import { render, type RenderResult } from '@testing-library/react';
import React from 'react';

describe('SignUp Components', () => {
  let sut: RenderResult
  let validationError: string

  beforeAll(() => {
    validationError = 'Campo obrigatório'
  })

  beforeEach(() => {
    sut = render(
      <SignUp />
    )
  })

  it('Should start with initial state', () => {
    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)

    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})
