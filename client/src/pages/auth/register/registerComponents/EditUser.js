import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import axios from "axios";
import EditUserFormModal from "./EditUserFormModal";

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

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const EditUser = ({
  toast,
  getUsers,
  selectedUserEdit,
  handleCloseModalEdit,
}) => {
  const [values, setValues] = useState(initialState);
  const [updatedValues, setUpdatedValues] = useState(selectedUserEdit);
  const [errors, setErrors] = useState(errorsInitialState);

  const auth = useSelector(authSelector);

  const handleEditUser = async (e) => {
    e.preventDefault();

    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }

      const res = await axios.put(
        `${process.env.REACT_APP_API_URI}/user/${selectedUserEdit._id}`,
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
      getUsers();
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

    setUpdatedValues({ ...updatedValues, [name]: formattedValue });

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

  return (
    <>
      <EditUserFormModal
        errors={errors}
        values={values}
        updatedValues={updatedValues}
        handleChange={handleChange}
        handleCloseModalEdit={handleCloseModalEdit}
        handleEditUser={handleEditUser}
      />
    </>
  );
};

export default EditUser;
