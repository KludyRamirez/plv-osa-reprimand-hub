import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import Modal from '@mui/material/Modal';
import CreateStudentFormModal from './CreateStudentFormModal';
import { FaPlus } from 'react-icons/fa6';
import { styled } from '@mui/system';
import axios from 'axios';

const ModalBox = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '48%',
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
  studentNo: '',
  firstName: '',
  surName: '',
  middleName: '',
  college: '',
  department: '',
  year: Number,
  section: '',
  sex: '',
  contactNo: '',
  guardianContactNo: '',
  email: '',
};

const errorsInitialState = {
  studentNo: '',
  firstName: '',
  surName: '',
  middleName: '',
  email: '',
  contactNo: '',
  guardianContactNo: '',
};

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const CreateStudent = ({ toast, getStudents, cads, allowedRoles }) => {
  const [values, setValues] = useState(initialState);
  const [showCreateStudentModal, setShowCreateStudentModal] = useState(false);
  const [errors, setErrors] = useState(errorsInitialState);

  const auth = useSelector(authSelector);

  const handleCreateStudent = async (e) => {
    e.preventDefault();

    try {
      if (!auth.userDetails.token) {
        console.error('Authentication token not found.');
        return;
      }

      const res = await axios.post(
        `${process.env.REACT_APP_API_URI}/student`,
        values,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        }
      );
      toast.success(res?.data?.message);
    } catch (err) {
      toast.error(err?.response?.data);
    } finally {
      setValues(initialState);
      handleCloseModal();
      getStudents();
    }
  };

  // dynamic value getting and DYNAMIC use of error messages -kludy

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    let newErrors = { ...errors };

    let formattedValue = value;

    if (name === 'firstName' || name === 'middleName' || name === 'surName') {
      formattedValue =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }

    setValues({ ...values, [name]: formattedValue });

    if (name === 'firstName') {
      if (value.length < 3) {
        newErrors[name] = 'First name must be at least 3 characters long.';
      } else if (value.length > 48) {
        newErrors[name] = 'First name must be at most 48 characters long.';
      } else {
        newErrors[name] = '';
      }
    } else if (name === 'middleName') {
      if (value.length < 3) {
        newErrors[name] = 'Middlename must be at least 3 characters long.';
      } else if (value.length > 48) {
        newErrors[name] = 'Middlename must be at most 48 characters long.';
      } else {
        newErrors[name] = '';
      }
    } else if (name === 'surName') {
      if (value.length < 3) {
        newErrors[name] = 'Surname must be at least 3 characters long.';
      } else if (value.length > 48) {
        newErrors[name] = 'Surname must be at most 48 characters long.';
      } else {
        newErrors[name] = '';
      }
    } else {
      if (name === 'studentNo') {
        if (value.length < 7) {
          newErrors[name] = 'Student No. must be at least 7 characters long.';
        } else if (value.length > 7) {
          newErrors[name] = 'Student No. must be at most 7 characters long.';
        } else {
          newErrors[name] = '';
        }
      } else if (name === 'email') {
        if (value.length < 11) {
          newErrors[name] = 'Email must be at least 11 characters long.';
        } else if (value.length > 48) {
          newErrors[name] = 'Email must be at most 48 characters long.';
        } else {
          newErrors[name] = '';
        }
      } else if (name === 'contactNo') {
        if (value.length < 11) {
          newErrors[name] = 'Contact No. must be at least 11 characters long.';
        } else if (value.length > 48) {
          newErrors[name] = 'Contact No. must be at most 48 characters long.';
        } else {
          newErrors[name] = '';
        }
      } else if (name === 'guardianContactNo') {
        if (value.length < 11) {
          newErrors[name] = 'Guardian No. must be at least 11 characters long.';
        } else if (value.length > 48) {
          newErrors[name] = 'Guardian No. must be at most 48 characters long.';
        } else {
          newErrors[name] = '';
        }
      }
    }
    setErrors(newErrors);
  };

  // create student modal functions

  const handleOpenModal = () => {
    setShowCreateStudentModal(true);
  };
  const handleCloseModal = () => {
    setShowCreateStudentModal(false);
    setValues(initialState);
    setErrors(errorsInitialState);
  };

  const uniqueColleges = [...new Set(cads.map((c) => c.college))];

  return (
    <>
      <div className="w-100 text-[14px] text-[#404040] pb-6 ">
        Office of Student Affairs / Students
      </div>
      <div className="w-100 text-[26px] text-[#077bff] font-bold pb-6 flex justify-between items-center">
        <div>Students List</div>
        {allowedRoles?.find((ar) => auth?.userDetails?.role?.includes(ar)) ? (
          <div
            onClick={handleOpenModal}
            className="cursor-pointer py-3 px-4 bg-gradient-to-br from-[#007bff] via-[#079bff] to-[#007bff] text-[white] text-[16px] flex gap-2 items-center rounded-[32px]"
          >
            <FaPlus />
            <div>Add Student</div>
          </div>
        ) : (
          <div className="cursor-pointer py-3 px-4 bg-gray-100 text-[white] text-[16px] flex gap-2 items-center rounded-[32px]">
            <FaPlus />
            <div>Add Student</div>
          </div>
        )}
      </div>
      <Modal
        sx={{ border: 'none', outline: 'none' }}
        open={showCreateStudentModal}
        onClose={handleCloseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox>
          <CreateStudentFormModal
            cads={cads}
            uniqueColleges={uniqueColleges}
            errors={errors}
            values={values}
            handleChange={handleChange}
            handleCreateStudent={handleCreateStudent}
            handleCloseModal={handleCloseModal}
          />
        </ModalBox>
      </Modal>
    </>
  );
};

export default CreateStudent;
