import Context from '@/application/contexts/form/form-context';
import { faker } from '@faker-js/faker';
import { fireEvent, render, type RenderResult } from '@testing-library/react';
import React from 'react';
import Input from './input';

describe('Input Component', () => {
  let sut: RenderResult
  let input: HTMLInputElement
  let fieldName: string

  beforeAll(() => {
    fieldName = faker.database.column()
  })

  beforeEach(() => {
    sut = render(
      <Context.Provider value={{ state: {} }}>
        <Input name={fieldName} />
      </Context.Provider >
    )
    input = sut.getByTestId(fieldName) as HTMLInputElement
  })

  it('should begin with readOnly', () => {
    expect(input.readOnly).toBe(true)
  })

  it('should remove readOnly on focus', () => {
    fireEvent.focus(input)

    expect(input.readOnly).toBe(false)
  })

  it('should focus input on label click', () => {
    const label = sut.getByTestId(`${fieldName}-label`)
    fireEvent.click(label)

    expect(document.activeElement).toBe(input)
  })
})
