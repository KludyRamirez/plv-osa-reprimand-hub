import React from 'react';
import { BsX } from 'react-icons/bs';

const DeleteManyCadModal = ({
  deleteSelectedCads,
  handleCloseModalDeleteMany,
}) => {
  const handleDeleteManyAndClose = () => {
    try {
      deleteSelectedCads();
    } catch (error) {
      console.error('Error handling delete and close:', error);
    } finally {
      handleCloseModalDeleteMany();
    }
  };
  return (
    <>
      <div className="p-8 flex flex-col gap-2 text-[#505050]">
        <div className="flex justify-center pt-2">
          <div className="w-[90px] h-[90px] bg-[#ffffff] border-[1px] border-[#ff3131] rounded-[50%] flex justify-center items-center">
            <BsX className="text-[70px] text-[#ff3131]" />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center text-[18px] text-[#C41E3A] pt-4">
          <div>
            Do you really want to <span className="font-semibold">delete</span>{' '}
            this college?
          </div>
          <div>This process cannot be reverted.</div>
        </div>
        <div className="text-white flex justify-center items-center gap-6 pt-4 pb-4">
          <div
            onClick={handleDeleteManyAndClose}
            className="flex justify-between items-center gap-2 bg-[#ff3131] text-[#ffffff] hover:bg-[white] hover:text-[#ff3131] py-2 px-7 rounded-[24px] border-[1px] border-[#ff3131] cursor-pointer"
          >
            <span className="text-[18px]">Delete</span>
          </div>
          <div
            onClick={handleCloseModalDeleteMany}
            className="flex justify-between items-center gap-2 bg-[white] text-[#ff3131] hover:bg-[#ff3131] hover:text-[white] py-2 px-7 rounded-[24px] border-[1px] border-[#ff3131] cursor-pointer"
          >
            <span className="text-[18px]">Cancel</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteManyCadModal;
