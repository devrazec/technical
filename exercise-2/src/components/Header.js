'use client';

import React from 'react';

const Header = () => {
  return (
    <div className="w-full mx-auto p-6">
      <h1 className="text-2xl font-bold text-center">
        Guidelines for Multiplication Interface
      </h1>
      <p className="text-center">
        This tool allows you to multiply large integers without using the
        standard multiplication operator (*). Instead, it simulates
        multiplication using addition only, storing and ordering each number in
        arrays.
      </p>
      <div className="w-full mx-auto text-s text-center text-slate-500">
        Note: The inputs must only contain digits [0-9]. Decimal points,
        negative numbers, or other symbols are not allowed.
      </div>
    </div>
  );
};

export default React.memo(Header);
