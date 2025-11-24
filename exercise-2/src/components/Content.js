'use client';

import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const Content = () => {
  const {
    array1,
    setArray1,
    array2,
    setArray2,
    array3,
    setArray3,
    input1,
    setInput1,
    input2,
    setInput2,
    input3,
    setInput3,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (input1 === '' || input2 === '') {
      setInput3('');
      return;
    }

    const num1 = BigInt(input1);
    const num2 = BigInt(input2);

    // Multiply using addition only
    function multiplyBigInt(a, b) {
      const negative = a < 0n !== b < 0n;
      a = a < 0n ? -a : a;
      b = b < 0n ? -b : b;

      function helper(x, y) {
        if (y === 0n) return 0n;
        if (y % 2n === 0n) return helper(x + x, y / 2n);
        return x + helper(x, y - 1n);
      }

      const result = helper(a, b);
      return negative ? -result : result;
    }

    const result = multiplyBigInt(num1, num2);
    const txt = result.toString(); // convert to string

    if (txt.length > 100) {
      setInput3(txt.slice(0, 100)); // show only first 100 digits
    } else {
      setInput3(txt);
    }
  }, [input1, input2, input3, setInput3]);

  const handleAdd = () => {
    // Check if the input is number

    const num1 = parseInt(input1, 10);
    if (isNaN(num1)) return;

    const num2 = parseInt(input2, 10);
    if (isNaN(num2)) return;

    const num3 = parseInt(input3, 10);
    if (isNaN(num3)) return;

    // Find first empty position

    const emptyIndex1 = array1.findIndex(n => n === '' || n === undefined);
    if (emptyIndex1 === -1) return; // Array full

    const emptyIndex2 = array2.findIndex(n => n === '' || n === undefined);
    if (emptyIndex2 === -1) return; // Array full

    const emptyIndex3 = array3.findIndex(n => n === '' || n === undefined);
    if (emptyIndex3 === -1) return; // Array full

    // Update array

    const updated1 = [...array1];
    updated1[emptyIndex1] = num1;

    const updated2 = [...array2];
    updated2[emptyIndex2] = num2;

    const updated3 = [...array3];
    updated3[emptyIndex3] = num3;

    // Sort only the filled numbers

    const sorted1 = updated1
      .filter(x => x !== '' && x !== undefined)
      .sort((a, b) => a - b);

    const sorted2 = updated2
      .filter(x => x !== '' && x !== undefined)
      .sort((a, b) => a - b);

    const sorted3 = updated3
      .filter(x => x !== '' && x !== undefined)
      .sort((a, b) => a - b);

    // Fill back empty slots to keep length 6

    while (sorted1.length < 6) sorted1.push('');
    while (sorted2.length < 6) sorted2.push('');
    while (sorted3.length < 6) sorted3.push('');

    // Update array states

    setArray1(sorted1);
    setArray2(sorted2);
    setArray3(sorted3);

    // Clear inputs

    setInput1('');
    setInput2('');
    setInput3('');
  };

  const handleClean = () => {
    setInput1('');
    setInput2('');
    setInput3('');
    setArray1(Array(6).fill(''));
    setArray2(Array(6).fill(''));
    setArray3(Array(6).fill(''));
  };

  return (
    <div>
      <div className="w-full mx-auto p-3">
        <h1 className="text-2xl font-bold text-center">
          Array 1 - Each number is stored in this array.
        </h1>

        <div className="grid grid-cols-6 gap-0 bg-blue-600">
          {array1.map((num, idx) => (
            <div
              key={idx}
              className="p-4 border text-center w-full break-words whitespace-normal"
            >
              {num !== '' ? num : '-'}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-0">
          <input
            type="number"
            min="0"
            required
            inputMode="numeric"
            pattern="\d*"
            value={input1}
            onChange={e => {
              const value = e.target.value;

              // Only allow digits
              if (/^\d*$/.test(value)) {
                setInput1(value);
              }
            }}
            onPaste={e => {
              if (!/^\d+$/.test(e.clipboardData.getData('text'))) {
                e.preventDefault();
              }
            }}
            onKeyDown={e => {
              // Allow only digits and control keys (Backspace, Arrow keys)
              if (
                !/[0-9]/.test(e.key) &&
                e.key !== 'Backspace' &&
                e.key !== 'ArrowLeft' &&
                e.key !== 'ArrowRight' &&
                e.key !== 'Delete' &&
                e.key !== 'Tab'
              ) {
                e.preventDefault();
              }
            }}
            className="border p-3 w-full text-gray-950 text-right bg-gray-100"
            placeholder="Enter the first number from (0-9)"
          />
        </div>
        <div className="flex justify-between items-center mt-1 w-full">
          {/* Tip text on the left */}
          <div className="text-s text-slate-500">
            Tip: Enter the first number in this field. Must be a positive
            integer. Can be very large.
          </div>

          {/* Required message on the right */}
          {!input1 && (
            <p className="text-red-600 text-sm ml-4">This field is required.</p>
          )}
        </div>
      </div>

      <div className="w-full mx-auto p-3">
        <h1 className="text-2xl font-bold text-center">
          Array 2 - Each number is stored in this array.
        </h1>

        <div className="grid grid-cols-6 gap-0 bg-blue-600">
          {array2.map((num, idx) => (
            <div
              key={idx}
              className="p-4 border text-center w-full break-words whitespace-normal"
            >
              {num !== '' ? num : '-'}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-0">
          <input
            type="number"
            min="0"
            required
            value={input2}
            inputMode="numeric"
            pattern="\d*"
            onChange={e => {
              const value = e.target.value;

              // Only allow digits
              if (/^\d*$/.test(value)) {
                setInput2(value);
              }
            }}
            onPaste={e => {
              if (!/^\d+$/.test(e.clipboardData.getData('text'))) {
                e.preventDefault();
              }
            }}
            onKeyDown={e => {
              // Allow only digits and control keys (Backspace, Arrow keys)
              if (
                !/[0-9]/.test(e.key) &&
                e.key !== 'Backspace' &&
                e.key !== 'ArrowLeft' &&
                e.key !== 'ArrowRight' &&
                e.key !== 'Delete' &&
                e.key !== 'Tab'
              ) {
                e.preventDefault();
              }
            }}
            className="border p-3 w-full text-gray-950 text-right bg-gray-100"
            placeholder="Enter the second number from (0-9)"
          />
        </div>
        <div className="flex justify-between items-center mt-1 w-full">
          {/* Tip text on the left */}
          <div className="text-s text-slate-500">
            Tip: Enter the second number in this field. Must be a positive
            integer. Can be very large as well.
          </div>

          {/* Required message on the right */}
          {!input2 && (
            <p className="text-red-600 text-sm ml-4">This field is required.</p>
          )}
        </div>
      </div>

      <div className="w-full mx-auto p-3">
        <h1 className="text-2xl font-bold text-center">
          Array 3 - The result of each calculation is stored in this array.
        </h1>

        <div className="grid grid-cols-6 gap-0 bg-blue-600">
          {array3.map((num, idx) => (
            <div
              key={idx}
              className="p-4 border text-center w-full break-words whitespace-normal"
            >
              {num !== '' ? num : '-'}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-0">
          <input
            type="number"
            readOnly
            value={input3}
            onChange={e => setInput3(e.target.value)}
            className="border p-3 w-full text-gray-950 text-right bg-gray-100"
            placeholder="Result will appear here"
          />
        </div>

        <div className="flex justify-between items-center mt-1 w-full">
          {/* Tip text on the left */}
          <div className="text-s text-slate-500">
            Note: The result is displayed in this field. It can show extremely
            large numbers, but only the first 100 digits are shown.
          </div>

          <p className="text-red-600 text-sm ml-4">This is the result.</p>
        </div>
      </div>

      <div className="w-full mx-auto p-3 ">
        <h1 className="text-2xl font-bold text-center">Operations</h1>
        <div className="w-full mx-auto text-s text-center text-slate-500">
          Note: The button Clean All delete all numbers from the arrays and the
          button Add New stores the numbers in the arrays.
        </div>
        <div className="flex items-center gap-3 justify-center mt-4">
          <button
            onClick={handleClean}
            className="px-4 py-2 bg-blue-600 text-white"
          >
            Clean All
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-600 text-white"
          >
            Add New
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Content);
