import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import Modal from "@mui/material/Modal";
import { FaPlus } from "react-icons/fa6";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import CreateUserFormModal from "./CreateUserFormModal";

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

// const selectAuth = (state) => state.auth;
// const authSelector = createSelector([selectAuth], (auth) => auth);

const initialState = {
  userName: "",
  firstName: "",
  surName: "",
  email: "",
  password: "",
  roles: ["Student", "Instructor", "Administrator"],
  role: "",
  statusOfUsers: ["Active", "Disabled"],
  statusOfUser: "",
};

const CreateUser = ({ toast, register }) => {
  const [values, setValues] = useState(initialState);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [errors, setErrors] = useState({
    userName: "",
    firstName: "",
    surName: "",
    email: "",
    password: "",
  });

  // const auth = useSelector(authSelector);

  const navigate = useNavigate();

  const handleCreateUser = async (e) => {
    const userDetails = {
      firstName,
      surName,
      password,
      userName,
      role,
    };

    register(userDetails, navigate);
    setValues({});
  };

  // dynamic value getting and DYNAMIC use of error messages -kludy

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    let newErrors = { ...errors };

    setValues({ ...values, [name]: value });

    if (name === "firstName") {
      if (value.length < 3) {
        newErrors[name] = "First name must be at least 3 characters long.";
      } else if (value.length > 48) {
        newErrors[name] = "First name must be at most 48 characters long.";
      } else {
        newErrors[name] = "";
      }
    }

    if (name === "surName") {
      if (value.length < 3) {
        newErrors[name] = "surName must be at least 3 characters long.";
      } else if (value.length > 48) {
        newErrors[name] = "surName name must be at most 48 characters long.";
      } else {
        newErrors[name] = "";
      }
    }

    if (name === "email") {
      if (value.length < 3) {
        newErrors[name] = "Email must be at least 3 characters long.";
      } else if (value.length > 48) {
        newErrors[name] = "Email must be at most 48 characters long.";
      } else {
        newErrors[name] = "";
      }
    }

    if (name === "password") {
      if (value.length < 3) {
        newErrors[name] = "Password must be at least 3 characters long.";
      } else if (value.length > 48) {
        newErrors[name] = "Password must be at most 48 characters long.";
      } else {
        newErrors[name] = "";
      }
    }

    setErrors(newErrors);
  };

  // create student modal functions

  const handleOpenModal = () => {
    setShowCreateUserModal(true);
  };
  const handleCloseModal = () => {
    setShowCreateUserModal(false);
  };

  return (
    <>
      <div className="w-100 text-[14px] text-[#404040] pb-6 ">
        Office of Student Affairs / Users
      </div>
      <div className="w-100 text-[26px] text-[#077bff] font-bold pb-6 flex justify-between items-center">
        <div>Users List</div>
        <div
          onClick={handleOpenModal}
          className="py-3 px-3 bg-[#007bff] text-[white] text-[16px] flex gap-2 items-center rounded-[8px]"
        >
          <FaPlus />
          <div>Add User</div>
        </div>
      </div>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showCreateUserModal}
        onClose={handleCloseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox>
          <CreateUserFormModal
            errors={errors}
            values={values}
            handleChange={handleChange}
            handleCreateUser={handleCreateUser}
            handleCloseModal={handleCloseModal}
          />
        </ModalBox>
      </Modal>
    </>
  );
};

export default CreateUser;
