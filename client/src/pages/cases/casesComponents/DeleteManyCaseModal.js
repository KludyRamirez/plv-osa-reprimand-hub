import React from "react";
import { BsTrash3, BsX } from "react-icons/bs";

const DeleteManyCaseModal = ({
  deleteSelectedCases,
  handleCloseModalDeleteMany,
}) => {
  const handleDeleteManyAndClose = () => {
    try {
      deleteSelectedCases();
    } catch (error) {
      console.error("Error handling delete and close:", error);
    } finally {
      handleCloseModalDeleteMany();
    }
  };
  return (
    <>
      <div className="p-8 flex flex-col gap-2 text-[#505050]">
        <div className="flex justify-center">
          <div className=" w-[90px] h-[90px] border-[1px] border-[white] bg-transparent rounded-[50%] flex justify-center items-center">
            <BsX className="text-[70px] text-[white]" />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center text-[18px] text-[#C41E3A] pt-6">
          <div>
            Do you really want to{" "}
            <span className="text-[#ff3131] font-semibold">delete </span>
            these users?
          </div>
          <div>
            This process cannot be{" "}
            <span className="text-[#ff3131] font-semibold">undone</span>.
          </div>
        </div>
        <div className="text-white flex justify-center items-center gap-8 pt-4 pb-2">
          <div
            onClick={handleDeleteManyAndClose}
            className="flex justify-between items-center gap-2 border-[1px] border-[#ff3131] text-[#ff3131] hover:bg-[#ff3131] hover:text-[white] py-3 px-7 rounded-[24px] cursor-pointer"
          >
            <span className="text-[16px]">Delete</span>
          </div>
          <div
            onClick={handleCloseModalDeleteMany}
            className="flex justify-between items-center gap-2 border-[1px] border-[#007bff] text-[#007bff] hover:bg-[#007bff] hover:text-[white] py-3 px-6 rounded-[24px] cursor-pointer"
          >
            <span className="text-[16px]">Cancel</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteManyCaseModal;
