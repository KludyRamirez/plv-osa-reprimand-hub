import React from "react";

function Loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-white">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loading;
