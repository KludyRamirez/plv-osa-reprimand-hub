import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import Modal from "@mui/material/Modal";
import { FaPlus } from "react-icons/fa6";
import { styled } from "@mui/system";
import axios from "axios";
import CreateCaseFormModal from "./CreateCaseFormModal";

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

const initialState = {
  students: [],
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

// const errorsInitialState = {
//   caseNo: "",
//   dateOfIncident: "",
//   dateReported: "",
// };

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const CreateCase = ({ toast, getCases }) => {
  const [values, setValues] = useState(initialState);
  const [showCreateCaseModal, setShowCreateCaseModal] = useState(false);
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
        headers: {
          Authorization: `Bearer ${auth?.userDetails?.token}`,
        },
      });
      setValues({ ...values, students: res.data });
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
    } catch (err) {
      toast.error(err?.response?.data);
    } finally {
      handleCloseModal();
      window.location.reload();
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

  // create student modal functions

  const handleOpenModal = () => {
    setShowCreateCaseModal(true);
  };
  const handleCloseModal = () => {
    setShowCreateCaseModal(false);
    setValues(initialState);
    // setErrors(errorsInitialState);
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
          className="py-3 px-3 bg-[#007bff] text-[white] text-[16px] flex gap-2 items-center rounded-[8px]"
        >
          <FaPlus />
          <div>Add Case</div>
        </div>
      </div>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showCreateCaseModal}
        onClose={handleCloseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox>
          <CreateCaseFormModal
            values={values}
            handleChange={handleChange}
            handleCreateCase={handleCreateCase}
            handleCloseModal={handleCloseModal}
          />
        </ModalBox>
      </Modal>
    </>
  );
};

export default CreateCase;
