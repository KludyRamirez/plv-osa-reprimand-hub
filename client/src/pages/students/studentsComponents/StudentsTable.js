import React from "react";

const StudentsTable = ({ students }) => {
  return (
    <>
      <div
        className={`w-100 h-[380px] bg-white flex flex-col rounded-[10px] border-[1px] ${
          students && students.length > 5 ? "overflow-y-scroll" : ""
        }`}
      >
        <div className="w-100 flex items-center gap-4">
          <div className="w-[60px] h-[60px] flex justify-center items-center">
            <input type="checkbox" className="w-[18px] h-[18px]" />
          </div>
          <div className=" w-[108px] flex justify-start items-center">
            Student No.
          </div>
          <div className=" w-[108px] flex justify-start items-center">
            Surname
          </div>
          <div className=" w-[108px] flex justify-start items-center">
            First name
          </div>
          <div className=" w-[128px] flex justify-start items-center">
            Middle name
          </div>
          <div className=" w-[88px] flex justify-start items-center">Year</div>
          <div className=" w-[88px] flex justify-start items-center">
            Section
          </div>
          <div className=" w-[108px] flex justify-start items-center">
            College
          </div>
          <div className=" w-[108px] flex justify-start items-center">
            Department
          </div>
          <div className=" w-[108px] flex justify-start items-center">
            Cases
          </div>
          <div className=" w-[108px] flex justify-start items-center">Sex</div>
          <div className=" w-[108px] flex justify-start items-center">
            Status
          </div>
          <div className=" w-[108px] flex justify-start items-center">
            Actions
          </div>
        </div>

        {students?.map((student, k) => (
          <div
            className={`w-100 flex items-center gap-4 ${
              k % 2 === 0 ? "bg-[#f5f5f5]" : "bg-white"
            }`}
            key={k}
          >
            <div className="w-[60px] h-[60px] flex justify-center items-center">
              <input type="checkbox" className="w-[18px] h-[18px]" />
            </div>
            <div className="w-[108px] flex justify-start items-center">
              {student?.studentNo}
            </div>
            <div className="w-[108px] flex justify-start items-center">
              {student?.surName}
            </div>
            <div className="w-[108px] flex justify-start items-center">
              {student?.firstName}
            </div>
            <div className="w-[128px] flex justify-start items-center">
              {student?.middleName}
            </div>
            <div className="w-[88px] flex justify-start items-center">
              {student?.year}
            </div>
            <div className="w-[88px] flex justify-start items-center">
              {student?.section}
            </div>
            <div className="w-[108px] flex justify-start items-center">
              {student?.college.slice(0, 6)}
            </div>
            <div className="w-[108px] flex justify-start items-center">
              {student?.department.slice(0, 6)}
            </div>
            <div className="w-[108px] flex justify-start items-center">{c}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default StudentsTable;
