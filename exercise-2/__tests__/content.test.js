import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Content from '../src/components/Content';
import { GlobalContext } from '../src/context/GlobalContext';
import '@testing-library/jest-dom';

function renderWithContext(contextValues) {
  return render(
    <GlobalContext.Provider value={contextValues}>
      <Content />
    </GlobalContext.Provider>
  );
}

describe('Content Component', () => {
  let ctx;

  beforeEach(() => {
    ctx = {
      array1: ['', '', '', '', '', ''],
      setArray1: jest.fn(),
      array2: ['', '', '', '', '', ''],
      setArray2: jest.fn(),
      array3: ['', '', '', '', '', ''],
      setArray3: jest.fn(),
      input1: '',
      setInput1: jest.fn(),
      input2: '',
      setInput2: jest.fn(),
      input3: '',
      setInput3: jest.fn(),
    };
  });

  test('renders input fields', () => {
    renderWithContext(ctx);

    expect(
      screen.getByPlaceholderText('Enter the first number from (0-9)')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter the second number from (0-9)')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Result will appear here')
    ).toBeInTheDocument();
  });

  test('updates input1 when typed into', () => {
    renderWithContext(ctx);

    const input = screen.getByPlaceholderText(
      'Enter the first number from (0-9)'
    );
    fireEvent.change(input, { target: { value: '45' } });

    expect(ctx.setInput1).toHaveBeenCalledWith('45');
  });

  test('updates input2 when typed into', () => {
    renderWithContext(ctx);

    const input = screen.getByPlaceholderText(
      'Enter the second number from (0-9)'
    );
    fireEvent.change(input, { target: { value: '9' } });

    expect(ctx.setInput2).toHaveBeenCalledWith('9');
  });

  test('Clean All button resets fields and arrays', () => {
    renderWithContext(ctx);

    const btn = screen.getByText('Clean All');
    fireEvent.click(btn);

    expect(ctx.setInput1).toHaveBeenCalledWith('');
    expect(ctx.setInput2).toHaveBeenCalledWith('');
    expect(ctx.setInput3).toHaveBeenCalledWith('');

    expect(ctx.setArray1).toHaveBeenCalledWith(['', '', '', '', '', '']);
    expect(ctx.setArray2).toHaveBeenCalledWith(['', '', '', '', '', '']);
    expect(ctx.setArray3).toHaveBeenCalledWith(['', '', '', '', '', '']);
  });

  test('Add New does nothing if inputs are invalid', () => {
    ctx.input1 = '';
    ctx.input2 = '';
    ctx.input3 = '';

    renderWithContext(ctx);

    fireEvent.click(screen.getByText('Add New'));

    expect(ctx.setArray1).not.toHaveBeenCalled();
    expect(ctx.setArray2).not.toHaveBeenCalled();
    expect(ctx.setArray3).not.toHaveBeenCalled();
  });

  test('Add New stores numbers when valid', () => {
    ctx.input1 = '3';
    ctx.input2 = '4';
    ctx.input3 = '12';

    renderWithContext(ctx);

    fireEvent.click(screen.getByText('Add New'));

    // Should sort and fill empty slots
    expect(ctx.setArray1).toHaveBeenCalledWith([3, '', '', '', '', '']);
    expect(ctx.setArray2).toHaveBeenCalledWith([4, '', '', '', '', '']);
    expect(ctx.setArray3).toHaveBeenCalledWith([12, '', '', '', '', '']);

    // Inputs cleared
    expect(ctx.setInput1).toHaveBeenCalledWith('');
    expect(ctx.setInput2).toHaveBeenCalledWith('');
    expect(ctx.setInput3).toHaveBeenCalledWith('');
  });

  test('BigInt multiplication updates input3 (100-digit limit)', () => {
    ctx.input1 = '9'.repeat(60);
    ctx.input2 = '9'.repeat(60);

    renderWithContext(ctx);

    expect(ctx.setInput3).toHaveBeenCalled(); // useEffect ran
    const lastCall = ctx.setInput3.mock.lastCall[0];

    expect(lastCall.length).toBeLessThanOrEqual(100);
  });
});
