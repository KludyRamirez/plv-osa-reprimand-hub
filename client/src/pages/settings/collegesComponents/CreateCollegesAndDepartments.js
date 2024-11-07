import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import Modal from '@mui/material/Modal';
import { FaPlus } from 'react-icons/fa6';
import { styled } from '@mui/system';
import axios from 'axios';
import CreateCollegesAndDepartmentsFormModal from './CreateCollegesAndDepartmentsFormModal';

const ModalBox = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '32%',
  borderRadius: '12px',
  transform: 'translate(-50%, -50%)',
  background: 'white',
  border: 'none',
  outline: 'none',

  '&:focus': {
    border: 'none',
  },

  '@media (max-width: 767px)': {
    width: '100%',
    height: '100%',
    borderRadius: '0px',
    border: 'none',
  },
});

const initialState = {
  college: '',
  department: '',
};

const errorsInitialState = {
  college: '',
  department: '',
};

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const CreateCollegesAndDepartments = ({ allowedRoles, toast, getCads }) => {
  const [values, setValues] = useState(initialState);
  const [showCreateCadsModal, setShowCreateCadsModal] = useState(false);
  const [errors, setErrors] = useState(errorsInitialState);

  const auth = useSelector(authSelector);

  const handleCreateCad = async (e) => {
    e.preventDefault();

    try {
      if (!auth.userDetails || !auth.userDetails.token) {
        console.error('Authentication token not found.');
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URI}/cad`,
        values,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        }
      );

      const responseData = response.data;
      if (responseData && responseData.message) {
        toast.success(responseData.message);
      } else {
        console.error('Unexpected response format:', response);
        toast.error('An unexpected error occurred.');
      }
    } catch (error) {
      console.error('Error creating CAD:', error);
      toast.error('An error occurred while creating CAD.');
    } finally {
      setValues(initialState);
      handleCloseModal();
      getCads();
    }
  };

  // dynamic value getting and DYNAMIC use of error messages -kludy

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    let newErrors = { ...errors };

    let formattedValue = value;

    setValues({ ...values, [name]: formattedValue });

    if (name === 'college') {
      if (value.length < 3) {
        newErrors[name] = 'College must be at least 3 characters long.';
      } else if (value.length > 48) {
        newErrors[name] = 'college must be at most 48 characters long.';
      } else {
        newErrors[name] = '';
      }
    } else if (name === 'department') {
      if (value.length < 3) {
        newErrors[name] = 'Department must be at least 3 characters long.';
      } else if (value.length > 100) {
        newErrors[name] = 'Department must be at most 100 characters long.';
      } else {
        newErrors[name] = '';
      }
    }
    setErrors(newErrors);
  };

  // create student modal functions

  const handleOpenModal = () => {
    setShowCreateCadsModal(true);
  };
  const handleCloseModal = () => {
    setShowCreateCadsModal(false);
    setValues(initialState);
    setErrors(errorsInitialState);
  };

  return (
    <>
      <div className="w-100 text-[14px] text-[#404040] pb-6 ">
        Office of Student Affairs / Colleges
      </div>
      <div className="w-100 text-[26px] text-[#006bff] font-bold pb-6 flex justify-between items-center">
        <div>College List</div>
        {allowedRoles?.find((ar) => auth?.userDetails?.role?.includes(ar)) ? (
          <div
            onClick={handleOpenModal}
            className="cursor-pointer py-3 px-4 bg-gradient-to-br from-[#006bff] via-[#079bff] to-[#006bff] text-[white] text-[16px] flex gap-2 items-center rounded-[32px]"
          >
            <FaPlus />
            <div>Add College</div>
          </div>
        ) : (
          <div className="cursor-pointer py-3 px-3 bg-gray-100 text-[white] text-[16px] flex gap-2 items-center rounded-[8px]">
            <FaPlus />
            <div>Add College</div>
          </div>
        )}
      </div>
      <Modal
        sx={{ border: 'none', outline: 'none' }}
        open={showCreateCadsModal}
        onClose={handleCloseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox>
          <CreateCollegesAndDepartmentsFormModal
            errors={errors}
            values={values}
            handleChange={handleChange}
            handleCreateCad={handleCreateCad}
            handleCloseModal={handleCloseModal}
          />
        </ModalBox>
      </Modal>
    </>
  );
};

export default CreateCollegesAndDepartments;
