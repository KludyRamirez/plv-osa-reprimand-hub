import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import axios from "axios";
import EditCaseFormModal from "./EditCaseFormModal";

const initialState = {
  student: "",
  reportedViolations: [
    "Stealing",
    "Bullying",
    "Subdued Hair Color",
    "Sexual Harassment",
  ],
  reportedViolation: "",
  typeOfViolations: ["Major", "Minor", "Complex"],
  typeOfViolaton: "",
  dateOfIncident: "",
  dateReported: "",
};

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const EditCase = ({
  toast,
  students,
  getCases,
  selectedCaseEdit,
  handleCloseModalEdit,
}) => {
  const [values, setValues] = useState(initialState);
  const [updatedValues, setUpdatedValues] = useState(selectedCaseEdit);

  const auth = useSelector(authSelector);

  const handleEditCase = async (e) => {
    e.preventDefault();
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }

      const res = await axios.put(
        `${process.env.REACT_APP_API_URI}/case/${selectedCaseEdit._id}`,
        updatedValues,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        }
      );
      await toast.success(res?.data?.message);
    } catch (err) {
      toast.error(err?.response?.data);
    } finally {
      setValues(initialState);
      handleCloseModalEdit();
      getCases();
    }
  };

  // dynamic value getting and DYNAMIC use of error messages -kludy

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    // let newErrors = { ...errors };

    let formattedValue = value;

    // if (name === "firstName" || name === "middleName" || name === "surName") {
    //   formattedValue =
    //     value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    // }

    setUpdatedValues({ ...updatedValues, [name]: formattedValue });

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

  //   const handleStudentChange = (e) => {
  //     e.preventDefault();
  //     setValues({ ...values, student: e.target.value });
  //     setSelectedCaseEdit(e.target.value);
  //   };

  const handleDateOfIncidentChange = (date) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.toLocaleDateString("en-US", { weekday: "long" });

    if (dayOfWeek === "Sunday") {
      toast.error(
        "Office of Student Affairs does not process cases on Sundays. Please try again on another day!"
      );
    } else {
      setUpdatedValues({
        ...updatedValues,
        dateOfIncident: date,
      });
    }
  };

  const handleDateReportedChange = (date) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.toLocaleDateString("en-US", { weekday: "long" });

    if (dayOfWeek === "Sunday") {
      toast.error("Closed on Sundays");
    } else {
      setUpdatedValues({
        ...updatedValues,
        dateReported: date,
      });
    }
  };

  // edit case modal functions

  return (
    <>
      <EditCaseFormModal
        values={values}
        updatedValues={updatedValues}
        students={students}
        handleChange={handleChange}
        handleDateOfIncidentChange={handleDateOfIncidentChange}
        handleDateReportedChange={handleDateReportedChange}
        handleEditCase={handleEditCase}
        handleCloseModalEdit={handleCloseModalEdit}
      />
    </>
  );
};

export default EditCase;
