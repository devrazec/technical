import {
  intValidation,
  multiplyBigInt,
  sortNumbers,
  addToArrays,
  updateArrays,
  cleanAll,
} from '../src/utils/tests';

describe('intValidation', () => {
  test('valid numbers return true', () => {
    expect(intValidation('10')).toBe(true);
    expect(intValidation('0')).toBe(true);
  });

  test('invalid numbers return false', () => {
    expect(intValidation('abc')).toBe(false);
    expect(intValidation('')).toBe(false);
  });
});

describe('multiplyBigInt', () => {
  test('multiplies two numbers correctly', () => {
    expect(multiplyBigInt('2', '3')).toBe('6');
    expect(multiplyBigInt('0', '123')).toBe('0');
    expect(multiplyBigInt('123', '0')).toBe('0');
    expect(multiplyBigInt('-4', '5')).toBe('-20');
    expect(multiplyBigInt('4', '-5')).toBe('-20');
    expect(multiplyBigInt('-4', '-5')).toBe('20');
  });

  test('returns empty string when missing or invalid input', () => {
    expect(multiplyBigInt('', '10')).toBe('');
    expect(multiplyBigInt('10', '')).toBe('');
    expect(multiplyBigInt('', '')).toBe('');
  });

  test('trims result to 100 characters if too long', () => {
    const a = '9'.repeat(80);
    const b = '9'.repeat(80);
    const result = multiplyBigInt(a, b);
    expect(result.length).toBe(100);
  });
});

describe('sortNumbers', () => {
  test('sorts and pads array', () => {
    const arr = [3, '', 1, '', '', ''];
    const sorted = sortNumbers(arr);
    expect(sorted).toEqual([1, 3, '', '', '', '']);
  });
});

describe('addToArrays', () => {
  test('adds values in first empty slot', () => {
    const a1 = ['', '', '', '', '', ''];
    const a2 = ['', '', '', '', '', ''];
    const a3 = ['', '', '', '', '', ''];

    const result = addToArrays(a1, a2, a3, '5', '3', '15');

    expect(result.array1[0]).toBe(5);
    expect(result.array2[0]).toBe(3);
    expect(result.array3[0]).toBe(15);
  });

  test('does not add if invalid number', () => {
    const a1 = ['', '', '', '', '', ''];
    const a2 = ['', '', '', '', '', ''];
    const a3 = ['', '', '', '', '', ''];

    const result = addToArrays(a1, a2, a3, 'abc', '2', '3');
    expect(result.array1).toEqual(a1);
  });

  test('does not add when arrays are full', () => {
    const full = [1, 2, 3, 4, 5, 6];

    const result = addToArrays(full, full, full, '7', '8', '9');
    expect(result.array1).toEqual(full);
  });
});

describe('updateArrays', () => {
  test('updateArrays delegates to addToArrays', () => {
    const a1 = ['', '', '', '', '', ''];
    const a2 = ['', '', '', '', '', ''];
    const a3 = ['', '', '', '', '', ''];

    const result = updateArrays(a1, a2, a3, '1', '2', '3');

    expect(result.array1[0]).toBe(1);
    expect(result.array2[0]).toBe(2);
    expect(result.array3[0]).toBe(3);
  });
});

describe('cleanAll', () => {
  test('resets all arrays and inputs', () => {
    const cleaned = cleanAll();

    expect(cleaned.array1).toEqual(['', '', '', '', '', '']);
    expect(cleaned.array2).toEqual(['', '', '', '', '', '']);
    expect(cleaned.array3).toEqual(['', '', '', '', '', '']);

    expect(cleaned.input1).toBe('');
    expect(cleaned.input2).toBe('');
    expect(cleaned.input3).toBe('');
  });
});
