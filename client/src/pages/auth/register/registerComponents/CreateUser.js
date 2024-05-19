import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import Modal from "@mui/material/Modal";
import { FaPlus } from "react-icons/fa6";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import { getActions } from "../../../../store/actions/AuthActions";
import CreateUserFormModal from "./CreateUserFormModal";

const ModalBox = styled("div")({
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "44%",
  borderRadius: "12px",
  transform: "translate(-50%, -50%)",
  background: "white",
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

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const initialState = {
  userName: "",
  firstName: "",
  surName: "",
  email: "",
  password: "",
  roles: ["Student", "Instructor", "Administrator"],
  role: "",
  contactNo: "",
};

const errorsInitialState = {
  userName: "",
  firstName: "",
  surName: "",
  email: "",
  password: "",
  contactNo: "",
};

const CreateUser = ({ register, getUsers, allowedRoles }) => {
  const [values, setValues] = useState(initialState);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [errors, setErrors] = useState(errorsInitialState);

  const auth = useSelector(authSelector);

  const { userName, firstName, surName, email, password, role, contactNo } =
    values;

  const authToken = auth?.userDetails?.token;

  const handleCreateUser = async (e) => {
    e.preventDefault();

    const userDetails = {
      userName,
      firstName,
      surName,
      email,
      password,
      role,
      contactNo,
    };

    try {
      await register(userDetails, authToken);
      setValues(initialState);
      handleCloseModal();
      getUsers();
    } catch (error) {
      console.error("Error while registering user:", error);
    }
  };

  // dynamic value getting and DYNAMIC use of error messages -kludy

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    let newErrors = { ...errors };

    let formattedValue = value;

    if (name === "firstName" || name === "surName") {
      formattedValue =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }

    setValues({ ...values, [name]: formattedValue });

    if (name === "firstName") {
      if (formattedValue.length < 3) {
        newErrors[name] = "First name must be at least 3 characters long.";
      } else if (formattedValue.length > 48) {
        newErrors[name] = "First name must be at most 48 characters long.";
      } else {
        newErrors[name] = "";
      }
    } else if (name === "surName") {
      if (formattedValue.length < 3) {
        newErrors[name] = "Surname must be at least 3 characters long.";
      } else if (formattedValue.length > 48) {
        newErrors[name] = "Surname must be at most 48 characters long.";
      } else {
        newErrors[name] = "";
      }
    } else {
      if (name === "userName") {
        if (value.length < 3) {
          newErrors[name] = "Username must be at least 3 characters long.";
        } else if (value.length > 48) {
          newErrors[name] = "Username must be at most 48 characters long.";
        } else {
          newErrors[name] = "";
        }
      } else if (name === "email") {
        if (value.length < 3) {
          newErrors[name] = "Email must be at least 3 characters long.";
        } else if (value.length > 48) {
          newErrors[name] = "Email must be at most 48 characters long.";
        } else {
          newErrors[name] = "";
        }
      } else if (name === "password") {
        if (value.length < 3) {
          newErrors[name] = "Password must be at least 3 characters long.";
        } else if (value.length > 48) {
          newErrors[name] = "Password must be at most 48 characters long.";
        } else {
          newErrors[name] = "";
        }
      } else if (name === "contactNo") {
        if (value.length < 3) {
          newErrors[name] = "Contact No. must be at least 3 characters long.";
        } else if (value.length > 48) {
          newErrors[name] = "Contact No. must be at most 48 characters long.";
        } else {
          newErrors[name] = "";
        }
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
    setValues(initialState);
    setErrors(errorsInitialState);
  };

  return (
    <>
      <div className="w-100 text-[14px] text-[#404040] pb-6 ">
        Office of Student Affairs / Users
      </div>
      <div className="w-100 text-[26px] text-[#077bff] font-bold pb-6 flex justify-between items-center">
        <div>Users List</div>
        {allowedRoles?.find((ar) => auth?.userDetails?.role?.includes(ar)) ? (
          <div
            onClick={handleOpenModal}
            className="cursor-pointer py-3 px-3 bg-gradient-to-br from-[#07bbff] to-[#007bff] text-[white] text-[16px] flex gap-2 items-center rounded-[8px]"
          >
            <FaPlus />
            <div>Add User</div>
          </div>
        ) : (
          <div className="cursor-pointer py-3 px-3 bg-gray-100 text-[white] text-[16px] flex gap-2 items-center rounded-[8px]">
            <FaPlus />
            <div>Add User</div>
          </div>
        )}
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

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(CreateUser);
