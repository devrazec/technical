export function intValidation(value) {
  return !isNaN(parseInt(value, 10));
}

export function multiplyBigInt(a, b) {
  if (!a || !b) return '';

  const num1 = BigInt(a);
  const num2 = BigInt(b);

  function multiplyBigInt(x, y) {
    const negative = x < 0n !== y < 0n;
    x = x < 0n ? -x : x;
    y = y < 0n ? -y : y;

    function helper(p, q) {
      if (q === 0n) return 0n;
      if (q % 2n === 0n) return helper(p + p, q / 2n);
      return p + helper(p, q - 1n);
    }

    const result = helper(x, y);
    return negative ? -result : result;
  }

  const result = multiplyBigInt(num1, num2);
  const txt = result.toString();
  return txt.length > 100 ? txt.slice(0, 100) : txt;
}

export function sortNumbers(arr) {
  const filled = arr
    .filter(x => x !== '' && x !== undefined)
    .sort((a, b) => a - b);
  while (filled.length < 6) filled.push('');
  return filled;
}

export function addToArrays(array1, array2, array3, input1, input2, input3) {
  if (
    !intValidation(input1) ||
    !intValidation(input2) ||
    !intValidation(input3)
  ) {
    return { array1, array2, array3 };
  }

  const n1 = parseInt(input1, 10);
  const n2 = parseInt(input2, 10);
  const n3 = parseInt(input3, 10);

  const idx1 = array1.findIndex(n => n === '' || n === undefined);
  const idx2 = array2.findIndex(n => n === '' || n === undefined);
  const idx3 = array3.findIndex(n => n === '' || n === undefined);

  if (idx1 === -1 || idx2 === -1 || idx3 === -1) {
    return { array1, array2, array3 };
  }

  array1[idx1] = n1;
  array2[idx2] = n2;
  array3[idx3] = n3;

  return {
    array1: sortNumbers(array1),
    array2: sortNumbers(array2),
    array3: sortNumbers(array3),
  };
}

export function updateArrays(a1, a2, a3, n1, n2, n3) {
  return addToArrays(a1, a2, a3, n1, n2, n3);
}

export function cleanAll() {
  return {
    array1: Array(6).fill(''),
    array2: Array(6).fill(''),
    array3: Array(6).fill(''),
    input1: '',
    input2: '',
    input3: '',
  };
}
