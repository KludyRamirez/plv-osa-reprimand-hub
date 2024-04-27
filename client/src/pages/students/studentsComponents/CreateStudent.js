import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import Modal from "@mui/material/Modal";
import CreateStudentFormModal from "./CreateStudentFormModal";
import { FaPlus } from "react-icons/fa6";
import { styled } from "@mui/system";
import axios from "axios";

const ModalBox = styled("div")({
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "48%",
  padding: "8px",
  transform: "translate(-50%, -50%)",
  background: "white",
  borderRadius: "12px",
  border: "none",
  outline: "none",

  "&:focus": {
    border: "none",
  },

  "@media (max-width: 767px)": {
    width: "100%",
    height: "100%",
    borderRadius: "0px",
    border: "none",
  },
});

const coedDepartments = [
  "(BECED) Bachelor of Early Childhood Education",
  "(BSED English) Bachelor of Secondary Education Major in English",
  "(BSED Filipino) Bachelor of Secondary Education Major in Filipino",
  "(BSED Mathematics) Bachelor of Secondary Education Major in Mathematics",
  "(BSED Science) Bachelor of Secondary Education Major in Science",
  "(BSED Social Studies) Bachelor of Secondary Education Major in Social Studies",
];
const casDepartments = [
  "(BAC) Bachelor of Arts in Communication",
  "(BSP) Bachelor of Science in Psychology",
  "(BSSW) Bachelor of Science in Social Work",
];
const ceitDepartments = [
  "(BSCE) Bachelor of Science in Civil Engineering",
  "(BSEE) Bachelor of Science in Electrical Engineering",
  "(BSIT) Bachelor of Science in Information Technology",
];
const cabaDepartments = [
  "(BSA) Bachelor of Science in Accountancy",
  "(BSBA FM) Bachelor of Science in Business Administration Major in Financial Management",
  "(BSBA HRDM) Bachelor of Science in Business Administration Major in Human Resource Development Management",
  "(BSBA MM) Bachelor of Science in Business Administration Major in Marketing Management",
  "(BSPA) Bachelor of Science in Public Administration",
];

const initialState = {
  studentNo: "",
  firstName: "",
  surName: "",
  middleName: "",
  colleges: [
    "(COED) College of Education",
    "(CAS) College of Arts and Sciences",
    "(CEIT) College of Engineering and Information Technology",
    "(CABA) College of Business Administration, Public Administration and Accountancy",
  ],
  college: "",
  department: "",
  year: "",
  section: "",
  sex: "",
  contactNo: "",
  guardianContactNo: "",
  email: "",
};

const errorsInitialState = {
  studentNo: "",
  firstName: "",
  surName: "",
  middleName: "",
  email: "",
  contactNo: "",
  guardianContactNo: "",
};

// const selectAuth = (state) => state.auth;
// const authSelector = createSelector([selectAuth], (auth) => auth);

const CreateStudent = ({ toast, getStudents }) => {
  const [values, setValues] = useState(initialState);
  const [showCreateStudentModal, setShowCreateStudentModal] = useState(false);
  const [errors, setErrors] = useState(errorsInitialState);

  // const auth = useSelector(authSelector);

  const handleCreateStudent = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending request with data:", values);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URI}/student`,
        values
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

    setValues({ ...values, [name]: value });

    if (name === "studentNo") {
      if (value.length < 7) {
        newErrors[name] = "Student No. must be at least 7 characters long.";
      } else if (value.length > 7) {
        newErrors[name] = "Student No. must be at most 7 characters long.";
      } else {
        newErrors[name] = "";
      }
    }

    if (name === "firstName") {
      if (value.length < 3) {
        newErrors[name] = "First name must be at least 3 characters long.";
      } else if (value.length > 48) {
        newErrors[name] = "First name must be at most 48 characters long.";
      } else {
        newErrors[name] = "";
      }
    }

    if (name === "middleName") {
      if (value.length < 3) {
        newErrors[name] = "Middlename must be at least 3 characters long.";
      } else if (value.length > 48) {
        newErrors[name] = "Middlename must be at most 48 characters long.";
      } else {
        newErrors[name] = "";
      }
    }

    if (name === "surName") {
      if (value.length < 3) {
        newErrors[name] = "Surname must be at least 3 characters long.";
      } else if (value.length > 48) {
        newErrors[name] = "Surname must be at most 48 characters long.";
      } else {
        newErrors[name] = "";
      }
    }

    if (name === "email") {
      if (value.length < 11) {
        newErrors[name] = "Email must be at least 11 characters long.";
      } else if (value.length > 48) {
        newErrors[name] = "Email must be at most 48 characters long.";
      } else {
        newErrors[name] = "";
      }
    }

    if (name === "contactNo") {
      if (value.length < 11) {
        newErrors[name] = "Contact No. must be at least 11 characters long.";
      } else if (value.length > 48) {
        newErrors[name] = "Contact No. must be at most 48 characters long.";
      } else {
        newErrors[name] = "";
      }
    }

    if (name === "guardianContactNo") {
      if (value.length < 11) {
        newErrors[name] = "Guardian No. must be at least 11 characters long.";
      } else if (value.length > 48) {
        newErrors[name] = "Guardian No. must be at most 48 characters long.";
      } else {
        newErrors[name] = "";
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

  return (
    <>
      <div className="w-100 text-[14px] text-[#404040] pb-6 ">
        Office of Student Affairs / Students
      </div>
      <div className="w-100 text-[26px] text-[#077bff] font-bold pb-6 flex justify-between items-center">
        <div>Students List</div>
        <div
          onClick={handleOpenModal}
          className="py-3 px-3 bg-[#007bff] text-[white] text-[16px] flex gap-2 items-center rounded-[8px]"
        >
          <FaPlus />
          <div>Add Student</div>
        </div>
      </div>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showCreateStudentModal}
        onClose={handleCloseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox>
          <CreateStudentFormModal
            errors={errors}
            values={values}
            handleChange={handleChange}
            handleCreateStudent={handleCreateStudent}
            handleCloseModal={handleCloseModal}
            coedDepartments={coedDepartments}
            casDepartments={casDepartments}
            ceitDepartments={ceitDepartments}
            cabaDepartments={cabaDepartments}
          />
        </ModalBox>
      </Modal>
    </>
  );
};

export default CreateStudent;
