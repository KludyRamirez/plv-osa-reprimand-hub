import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import axios from 'axios';
import EditStudentFormModal from './EditStudentFormModal';

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

const EditStudent = ({
  toast,
  getOneStudent,
  getStudents,
  selectedStudentEdit,
  handleCloseModalEdit,
  handleCloseModalEditStudent,
  cads,
}) => {
  const [values, setValues] = useState(initialState);
  const [updatedValues, setUpdatedValues] = useState(selectedStudentEdit);
  const [errors, setErrors] = useState(errorsInitialState);

  const auth = useSelector(authSelector);
  const location = useLocation();

  const handleEditStudent = async (e) => {
    e.preventDefault();

    try {
      if (!auth?.userDetails?.token) {
        console.error('Authentication token not found.');
        return;
      }

      const res = await axios.put(
        `${process.env.REACT_APP_API_URI}/student/${selectedStudentEdit?._id}`,
        updatedValues,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${auth?.userDetails?.token}`,
          },
        }
      );
      toast.success(res?.data?.message);
    } catch (err) {
      toast.error(err?.response?.data);
    } finally {
      setValues(initialState);
      handleCloseModalEdit
        ? handleCloseModalEdit()
        : handleCloseModalEditStudent();

      if (location.pathname.includes('/profile')) {
        await getOneStudent();
      } else if (location.pathname === '/students') {
        await getStudents();
      }
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

    setUpdatedValues({ ...updatedValues, [name]: formattedValue });

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

  const uniqueColleges = [...new Set(cads?.map((c) => c?.college))];

  return (
    <>
      <EditStudentFormModal
        errors={errors}
        values={values}
        updatedValues={updatedValues}
        handleChange={handleChange}
        handleCloseModalEdit={handleCloseModalEdit}
        handleCloseModalEditStudent={handleCloseModalEditStudent}
        handleEditStudent={handleEditStudent}
        cads={cads}
        uniqueColleges={uniqueColleges}
      />
    </>
  );
};

export default EditStudent;
