import React from "react";
import { BsPersonCheck, BsTrash2Fill, BsX } from "react-icons/bs";

const DeleteManyStudentModal = ({
  deleteSelectedStudents,
  handleCloseModalDeleteMany,
}) => {
  const handleDeleteManyAndClose = () => {
    try {
      deleteSelectedStudents();
    } catch (error) {
      console.error("Error handling delete and close:", error);
    } finally {
      handleCloseModalDeleteMany();
    }
  };
  return (
    <>
      <div className="flex flex-col gap-4 text-[#505050]">
        <div className="flex justify-between items-center text-[24px]">
          <span>
            Do you want to{" "}
            <span className="text-[red] text-semibold">delete</span> this
            students?
          </span>
          <BsX onClick={handleCloseModalDeleteMany} className="text-[36px]" />
        </div>
        <div className="text-white flex justify-between items-center ">
          <div
            onClick={handleDeleteManyAndClose}
            className="flex justify-between items-center gap-2 bg-[#ff3131] py-2 px-3 rounded-[6px]"
          >
            <BsTrash2Fill className="text-[20px]" />
            <span className="text-[16px]">Delete</span>
          </div>
          <div
            onClick={handleCloseModalDeleteMany}
            className="flex justify-between items-center gap-2 bg-[#007bff] py-2 px-3 rounded-[6px]"
          >
            <BsPersonCheck className="text-[20px]" />
            <span className="text-[16px]">Retain</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteManyStudentModal;
