import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import axios from "axios";
import EditStudentFormModal from "./EditStudentFormModal";

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

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const EditStudent = ({
  toast,
  getStudents,
  selectedStudentEdit,
  handleCloseModalEdit,
}) => {
  const [values, setValues] = useState(initialState);
  const [updatedValues, setUpdatedValues] = useState(selectedStudentEdit);
  const [errors, setErrors] = useState(errorsInitialState);

  const auth = useSelector(authSelector);

  const handleEditStudent = async (e) => {
    e.preventDefault();

    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }

      const res = await axios.put(
        `${process.env.REACT_APP_API_URI}/student/${selectedStudentEdit._id}`,
        updatedValues,
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
      handleCloseModalEdit();
      getStudents();
    }
  };

  // dynamic value getting and DYNAMIC use of error messages -kludy

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    let newErrors = { ...errors };

    let formattedValue = value;

    if (name === "firstName" || name === "middleName" || name === "surName") {
      formattedValue =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }

    setUpdatedValues({ ...updatedValues, [name]: formattedValue });

    if (name === "firstName") {
      if (value.length < 3) {
        newErrors[name] = "First name must be at least 3 characters long.";
      } else if (value.length > 48) {
        newErrors[name] = "First name must be at most 48 characters long.";
      } else {
        newErrors[name] = "";
      }
    } else if (name === "middleName") {
      if (value.length < 3) {
        newErrors[name] = "Middlename must be at least 3 characters long.";
      } else if (value.length > 48) {
        newErrors[name] = "Middlename must be at most 48 characters long.";
      } else {
        newErrors[name] = "";
      }
    } else if (name === "surName") {
      if (value.length < 3) {
        newErrors[name] = "Surname must be at least 3 characters long.";
      } else if (value.length > 48) {
        newErrors[name] = "Surname must be at most 48 characters long.";
      } else {
        newErrors[name] = "";
      }
    } else {
      if (name === "studentNo") {
        if (value.length < 7) {
          newErrors[name] = "Student No. must be at least 7 characters long.";
        } else if (value.length > 7) {
          newErrors[name] = "Student No. must be at most 7 characters long.";
        } else {
          newErrors[name] = "";
        }
      } else if (name === "email") {
        if (value.length < 11) {
          newErrors[name] = "Email must be at least 11 characters long.";
        } else if (value.length > 48) {
          newErrors[name] = "Email must be at most 48 characters long.";
        } else {
          newErrors[name] = "";
        }
      } else if (name === "contactNo") {
        if (value.length < 11) {
          newErrors[name] = "Contact No. must be at least 11 characters long.";
        } else if (value.length > 48) {
          newErrors[name] = "Contact No. must be at most 48 characters long.";
        } else {
          newErrors[name] = "";
        }
      } else if (name === "guardianContactNo") {
        if (value.length < 11) {
          newErrors[name] = "Guardian No. must be at least 11 characters long.";
        } else if (value.length > 48) {
          newErrors[name] = "Guardian No. must be at most 48 characters long.";
        } else {
          newErrors[name] = "";
        }
      }
    }
    setErrors(newErrors);
  };

  return (
    <>
      <EditStudentFormModal
        errors={errors}
        values={values}
        updatedValues={updatedValues}
        handleChange={handleChange}
        handleCloseModalEdit={handleCloseModalEdit}
        handleEditStudent={handleEditStudent}
        coedDepartments={coedDepartments}
        casDepartments={casDepartments}
        ceitDepartments={ceitDepartments}
        cabaDepartments={cabaDepartments}
      />
    </>
  );
};

export default EditStudent;
