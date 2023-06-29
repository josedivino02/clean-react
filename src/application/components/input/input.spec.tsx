import Context from '@/application/contexts/form/form-context';
import { render, type RenderResult } from '@testing-library/react';
import React from 'react';
import Input from './input';

describe('Input Component', () => {
  let sut: RenderResult

  beforeEach(() => {
    sut = render(
      <Context.Provider value={{ state: {} }}>
        <Input name='field' />
      </Context.Provider >
    )
  })

  it('should begin with readOnly', () => {
    const input = sut.getByTestId('field') as HTMLInputElement

    expect(input.readOnly).toBe(true)
  })
})
