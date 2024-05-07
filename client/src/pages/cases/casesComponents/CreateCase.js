import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import Modal from "@mui/material/Modal";
import { FaPlus } from "react-icons/fa6";
import { styled } from "@mui/system";
import axios from "axios";
import CreateCaseFormModal from "./CreateCaseFormModal";
import moment from "moment";

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

const majorViolation = [
  "Smoking or vaping",
  "Possession of alcoholic beverages or coming to school under the influence of alcohol",
  "Tampering of posters or other school information media",
  "Refusal to submit to reasonable inspection conducted by authorized personnel",
  "Bringing outsiders or providing any means for entry in the University premises without consent of the concerned authority",
  "Ridiculing of fellow students / Rumor mongering",
  "Failure to appear before school authorities when required to report within 48 hours without valid",
  "Lewd Act / Boisterous remark/Use of profane or indecent language",
  "Public Display of Affection",
  "Unauthorized use of PLV logo or seal, or other university markers or symbols including accredited students' organization",
  "Unauthorized representation to any activity / event / opportunity in behalf of the University student organization",
];

const minorViolation = [
  "Incomplete uniform",
  "Sporting very sophisticated hair style, clothing, and accessories",
  "Unkempt / Long hair for boys",
  "Hair dyeing",
  "Sporting visible tattoos",
  "Excessive body piercing",
  "Littering",
  "Loitering",
  "Unauthorized use of classrooms and other school facilities and supplements",
  "Unauthorized entry to restricted and designated areas",
];

const initialState = {
  student: "",
  studentNo: "",
  reportedViolation: "",
  typeOfViolations: ["Major", "Minor"],
  typeOfViolation: "",
  dateOfIncident: Date,
  dateReported: Date,
};

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const CreateCase = ({ toast, getCases }) => {
  const [values, setValues] = useState(initialState);
  const [showCreateCaseModal, setShowCreateCaseModal] = useState(false);
  const [students, setStudents] = useState([]);
  //   const [errors, setErrors] = useState(errorsInitialState);

  const auth = useSelector(authSelector);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
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
      console.error("Error fetching cases:", err);
    }
  };

  const handleCreateCase = async (e) => {
    e.preventDefault();

    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
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
    const dayOfWeek = dateObj.toLocaleDateString("en-US", { weekday: "long" });

    if (dayOfWeek === "Sunday") {
      toast.error(
        "Office of Student Affairs does not process cases on Sundays. Please try again on another day!"
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
    const dayOfWeek = dateObj.toLocaleDateString("en-US", { weekday: "long" });

    if (dayOfWeek === "Sunday") {
      toast.error("Closed on Sundays");
    } else {
      setValues({
        ...values,
        dateReported: date,
      });
    }
  };

  const handleCaseOwnerChange = (e) => {
    const selectedStudentId = e.target.value;
    const selectedStudentNo =
      e.target.options[e.target.selectedIndex].getAttribute("data-studentno");

    // Update state with selected student ID and student number
    setValues({
      ...values,
      student: selectedStudentId,
      studentNo: selectedStudentNo,
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
      // setErrors(errorsInitialState);
    } catch (error) {
      console.error("An error occurred while handling modal closure:", error);
      // Handle the error gracefully, if needed
    } finally {
      getStudents();
    }
  };

  return (
    <>
      <div className="w-100 text-[14px] text-[#404040] pb-6 ">
        Office of Student Affairs / Cases
      </div>
      <div className="w-100 text-[26px] text-[#077bff] font-bold pb-6 flex justify-between items-center">
        <div>Cases List</div>
        <div
          onClick={handleOpenModal}
          className="cursor-pointer py-3 px-3 bg-gradient-to-br from-[#07bbff] to-[#007bff] text-[white] text-[16px] flex gap-2 items-center rounded-[8px]"
        >
          <FaPlus />
          <div>Add Case</div>
        </div>
      </div>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showCreateCaseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox>
          <CreateCaseFormModal
            students={students}
            values={values}
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
