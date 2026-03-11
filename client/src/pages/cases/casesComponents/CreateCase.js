import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import Modal from '@mui/material/Modal';
import { FaPlus } from 'react-icons/fa6';
import { styled } from '@mui/system';
import axios from 'axios';
import CreateCaseFormModal from './CreateCaseFormModal';
import { majorViolation, minorViolation } from '../../statistics/statisticsUtils/constants';

const ModalBox = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '48%',
  transform: 'translate(-50%, -50%)',
  background: 'white',
  outline: 'none',

  '@media (max-width: 767px)': {
    width: '100%',
    height: '100%',
    borderRadius: '0px',
    border: 'none',
  },
});

const initialState = {
  student: '',
  studentNo: '',
  studentName: '',
  year: '',
  reportedViolation: [...majorViolation].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))[0],
  typeOfViolations: ['Major', 'Minor'],
  typeOfViolation: 'Major',
  dateOfIncident: Date,
  dateReported: Date,
  dismissalDate: Date,
  appeal: false,
  remarks: '',
};

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const CreateCase = ({ toast, getCases, allowedRoles }) => {
  const [values, setValues] = useState(initialState);
  const [showCreateCaseModal, setShowCreateCaseModal] = useState(false);
  const [students, setStudents] = useState([]);

  const auth = useSelector(authSelector);

  useEffect(() => {
    getStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStudents = async () => {
    try {
      if (!auth.userDetails.token) {
        console.error('Authentication token not found.');
        return;
      }
      const res = await axios.get(`${process.env.REACT_APP_API_URI}/student`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth?.userDetails?.token}`,
        },
      });
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching cases:', err);
    }
  };

  const handleCreateCase = async (e) => {
    e.preventDefault();

    try {
      if (!auth.userDetails.token) {
        console.error('Authentication token not found.');
        return;
      }

      const res = await axios.post(
        `${process.env.REACT_APP_API_URI}/case`,
        values,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        }
      );
      await toast.success(res?.data?.message);
      setValues(initialState);
    } catch (err) {
      toast.error(err?.response?.data);
    } finally {
      handleCloseModal();
      getCases();
    }
  };

  // dynamic value getting and DYNAMIC use of error messages -kludy

  const handleChange = (e) => {
    const { name, value } = e.target;
    // let newErrors = { ...errors };

    let formattedValue = value;

    // if (name === "firstName" || name === "middleName" || name === "surName") {
    //   formattedValue =
    //     value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    // }

    if (name === 'typeOfViolation') {
      const violations = formattedValue === 'Minor' ? minorViolation : majorViolation;
      const sorted = [...violations].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
      setValues({ ...values, typeOfViolation: formattedValue, reportedViolation: sorted[0] });
      return;
    }
    setValues({ ...values, [name]: formattedValue });

    // if (name === "caseNo") {
    //   if (value.length < 3) {
    //     newErrors[name] = "First name must be at least 3 characters long.";
    //   } else if (value.length > 48) {
    //     newErrors[name] = "First name must be at most 48 characters long.";
    //   } else {
    //     newErrors[name] = "";
    //   }
    // }
    // setErrors(newErrors);
  };

  const handleDateOfIncidentChange = (date) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'long' });

    if (dayOfWeek === 'Sunday') {
      toast.error(
        'Office of Student Affairs does not process cases on Sundays. Please try again on another day!'
      );
    } else {
      setValues({
        ...values,
        dateOfIncident: date,
      });
    }
  };

  const handleDateReportedChange = (date) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'long' });

    if (dayOfWeek === 'Sunday') {
      toast.error('Closed on Sundays');
    } else {
      setValues({
        ...values,
        dateReported: date,
      });
    }
  };

  const handleCaseOwnerChange = (e) => {
    const selectedName = e.target.value;
    const selectedStudentId =
      e.target.options[e.target.selectedIndex].getAttribute('data-student');
    const selectedYear =
      e.target.options[e.target.selectedIndex].getAttribute('data-year');

    setValues({
      ...values,
      studentName: selectedName,
      student: selectedStudentId,
      year: selectedYear,
    });
  };

  // create student modal functions

  const handleOpenModal = () => {
    setShowCreateCaseModal(true);
  };

  const handleCloseModal = async () => {
    try {
      setShowCreateCaseModal(false);
      setValues(initialState);
    } catch (error) {
      console.error('An error occurred while handling modal closure:', error);
    } finally {
      getStudents();
    }
  };

  console.log(auth.userDetails.role);

  return (
    <>
      <div className="w-100 text-[14px] text-[#404040] pb-6">
        Office of Student Affairs / Cases
      </div>
      <div className="w-100 text-[26px] text-[#006bff] font-bold pb-6 flex justify-between items-center">
        <div>Cases List</div>

        {allowedRoles?.find((ar) => auth?.userDetails?.role?.includes(ar)) ? (
          <div
            onClick={handleOpenModal}
            className="cursor-pointer py-3 px-4 bg-gradient-to-br from-[#006bff] via-[#079bff] to-[#006bff] text-[white] text-[16px] flex gap-2 items-center rounded-[32px]"
          >
            <FaPlus />
            <div>Add Case</div>
          </div>
        ) : (
          <div className="cursor-pointer py-3 px-3 bg-gray-100 text-[white] text-[16px] flex gap-2 items-center rounded-[8px]">
            <FaPlus />
            <div>Add Case</div>
          </div>
        )}
      </div>
      <Modal
        sx={{ border: 'none', outline: 'none' }}
        open={showCreateCaseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox>
          <CreateCaseFormModal
            students={students}
            values={values}
            setValues={setValues}
            handleChange={handleChange}
            handleDateOfIncidentChange={handleDateOfIncidentChange}
            handleDateReportedChange={handleDateReportedChange}
            handleCreateCase={handleCreateCase}
            handleCloseModal={handleCloseModal}
            majorViolation={majorViolation}
            minorViolation={minorViolation}
            handleCaseOwnerChange={handleCaseOwnerChange}
          />
        </ModalBox>
      </Modal>
    </>
  );
};

export default CreateCase;
