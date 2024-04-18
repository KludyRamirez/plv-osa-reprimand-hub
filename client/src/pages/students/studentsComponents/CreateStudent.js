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
  lastName: "",
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

// const selectAuth = (state) => state.auth;
// const authSelector = createSelector([selectAuth], (auth) => auth);

const CreateStudent = () => {
  const [values, setValues] = useState(initialState);
  const [showCreateStudentModal, setShowCreateStudentModal] = useState(false);
  const [errors, setErrors] = useState({
    studentNo: "",
  });

  // const auth = useSelector(authSelector);

  const handleCreateStudent = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending request with data:", values); // Debugging
      const res = await axios.post(
        `${process.env.REACT_APP_API_URI}/student`,
        values
      );
      console.log("Successfully added new student!", res.data.firstName);
    } catch (error) {
      const errorMessage = error.response ? error.response.data : "Error.";
      console.error("API Error:", errorMessage); // Enhanced logging
    } finally {
      handleCloseModal();
    }
  };

  // dynamic value getting and DYNAMIC use of error messages -kludy

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    // Check conditions for the student number input
    if (name === "studentNo" && value.length < 5) {
      setErrors({
        ...errors,
        [name]: "Student No. must be at least 5 characters long.",
      });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // create student modal functions

  const handleOpenModal = () => {
    setShowCreateStudentModal(true);
  };
  const handleCloseModal = () => {
    setShowCreateStudentModal(false);
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
