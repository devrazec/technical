'use client';

import React from 'react';

const Footer = () => {
  return (
    <div className="w-full mx-auto p-6">
      <h1 className="text-2xl font-bold text-center">Limitations</h1>
      <p className="text-center">
        Computation for very large numbers (like 100 digits) may take a few
        seconds because of repeated addition. The interface only supports
        positive integer. JavaScript will automatically convert the result into
        scientific notation because it&#39;s too large for the normal integer
        format when you click in the button Add New.
      </p>
    </div>
  );
};

export default React.memo(Footer);
