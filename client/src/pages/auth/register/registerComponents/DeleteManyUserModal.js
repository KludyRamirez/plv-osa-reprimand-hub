import React from 'react';
import { BsTrash3, BsX } from 'react-icons/bs';

const DeleteManyUserModal = ({
  deleteSelectedUsers,
  handleCloseModalDeleteMany,
}) => {
  const handleDeleteManyAndClose = () => {
    try {
      deleteSelectedUsers();
    } catch (error) {
      console.error('Error handling delete and close:', error);
    } finally {
      handleCloseModalDeleteMany();
    }
  };
  return (
    <>
      <div className="p-8 flex flex-col gap-2 text-[#505050]">
        <div className="flex justify-center">
          <div className=" w-[100px] h-[100px] border-[2px] bg-[#ff3131] border-[#ff3131] rounded-[50%] flex justify-center items-center">
            <BsX className="text-[60px] text-[white] " />
          </div>
        </div>
        <div className="flex justify-center text-[24px] pt-2"></div>

        <div className="flex flex-col justify-center items-center text-[18px] text-[#606060] pt-2">
          <div>
            Do you really want to <span className="text-[red]">delete </span>
            this user?
          </div>
          <div>
            This process cannot be <span className="text-[red]">undone</span>.
          </div>
        </div>
        <div className="text-white flex justify-center items-center gap-8 pt-4">
          <div
            onClick={handleDeleteManyAndClose}
            className="flex justify-between items-center gap-2 border-[1px] border-[#ff3131] text-[#ff3131] hover:bg-[#ff3131] hover:text-[white] py-3 px-4 rounded-[24px] cursor-pointer"
          >
            <BsTrash3 className="text-[18px] " />
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

export default DeleteManyUserModal;
