'use client';

import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

const GlobalProvider = props => {
  const [array1, setArray1] = useState(Array(6).fill(''));
  const [array2, setArray2] = useState(Array(6).fill(''));
  const [array3, setArray3] = useState(Array(6).fill(''));

  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');

  return (
    <GlobalContext.Provider
      value={{
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
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default React.memo(GlobalProvider);
