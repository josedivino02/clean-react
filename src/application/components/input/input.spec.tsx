import Context from '@/application/contexts/form/form-context';
import { render } from '@testing-library/react';
import React from 'react';
import Input from './input';

describe('Input Component', () => {
  it('should begin with readOnly', () => {
    const { getByTestId } = render(
      <Context.Provider value={{ state: {} }}>
        <Input name='field' />
      </Context.Provider >
    )

    const input = getByTestId('field') as HTMLInputElement

    expect(input.readOnly).toBe(true)
  })
})
