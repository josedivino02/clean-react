import { Calendar } from '@/application/components';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('Calendar Component', () => {
  let date: Date

  beforeEach(() => {
    date = new Date('2023-07-16T00:00:00')
  })

  it('Should render with correct values', () => {
    render(<Calendar date={date} />)

    expect(screen.getByTestId('day')).toHaveTextContent('16')
    expect(screen.getByTestId('month')).toHaveTextContent('jul')
    expect(screen.getByTestId('year')).toHaveTextContent('2023')
  })
})
