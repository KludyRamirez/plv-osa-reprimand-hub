import React from "react";

const StudentsTable = () => {
  return (
    <>
      <div className="w-100 h-[390px] bg-white flex flex-col rounded-[10px] border-[1px]">
        <div className="w-100 h-[60px] flex items-center gap-4">
          <div className="w-[60px] h-[100%] flex justify-center items-center">
            <input type="checkbox" className="w-[18px] h-[18px]" />
          </div>
          <div className="pl-2 pr-12 h-[100%] flex justify-center items-center">
            Student No.
          </div>
          <div className="pr-12 h-[100%] flex justify-center items-center">
            Surname
          </div>
          <div className="pr-12 h-[100%] flex justify-center items-center">
            First name
          </div>
          <div className="pr-12 h-[100%] flex justify-center items-center">
            Middle name
          </div>
          <div className="pr-12 h-[100%] flex justify-center items-center">
            Year
          </div>
          <div className="pr-12 h-[100%] flex justify-center items-center">
            Section
          </div>
          <div className="pr-12 h-[100%] flex justify-center items-center">
            College
          </div>
          <div className="pr-12 h-[100%] flex justify-center items-center">
            Department
          </div>
          <div className="pr-12 h-[100%] flex justify-center items-center">
            Cases
          </div>
          <div className="pr-12 h-[100%] flex justify-center items-center">
            Status
          </div>
          <div className="pr-12 h-[100%] flex justify-center items-center">
            Actions
          </div>
        </div>
        <div className="w-100 h-[60px] bg-[#f5f5f5]"></div>
      </div>
    </>
  );
};

export default StudentsTable;
