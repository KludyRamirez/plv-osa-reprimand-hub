import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import axios from "axios";
import RemarksCaseFormModal from "./RemarksCaseFormModal";

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const RemarksCase = ({
  toast,
  getCases,
  selectedCaseRemarks,
  handleCloseModalRemarks,
}) => {
  const [updatedValues, setUpdatedValues] = useState(selectedCaseRemarks);

  const auth = useSelector(authSelector);

  const handleRemarksCase = async (e) => {
    e.preventDefault();
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }

      const res = await axios.put(
        `${process.env.REACT_APP_API_URI}/caseRemarks/${selectedCaseRemarks._id}`,
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
      setUpdatedValues({});
      handleCloseModalRemarks();
      getCases();
    }
  };

  // dynamic value getting and DYNAMIC use of error messages -kludy

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    let formattedValue = value;

    setUpdatedValues({
      ...updatedValues,
      [name]: formattedValue,
    });
  };

  return (
    <>
      <RemarksCaseFormModal
        updatedValues={updatedValues}
        setUpdatedValues={setUpdatedValues}
        handleChange={handleChange}
        handleRemarksCase={handleRemarksCase}
        handleCloseModalRemarks={handleCloseModalRemarks}
      />
    </>
  );
};

export default RemarksCase;
