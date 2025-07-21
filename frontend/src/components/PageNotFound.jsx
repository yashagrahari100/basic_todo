import React from 'react';

function PageNotFound() {
  return (
    <>
      <div className="flex flex-col h-screen items-center justify-center space-y-2">
        <span className="text-4xl font-bold text-black">404</span>

        <div className="text-xl font-semibold text-red-700">
          Page Not Found
        </div>
      </div>
    </>
  );
}

export default PageNotFound;
