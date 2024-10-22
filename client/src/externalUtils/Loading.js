import React from 'react';

const Loading = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white gap-8">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span className="text-[18px] font-semibold text-[#007bff]">
        Server is loading. Please wait...
      </span>
    </div>
  );
};

export default Loading;
