import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import axios from "axios";
import {
  BsCapslock,
  BsEye,
  BsEyeFill,
  BsPen,
  BsPenFill,
  BsTrash,
  BsTrash3,
  BsTrash3Fill,
} from "react-icons/bs";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/system";
import DeleteCaseModal from "./DeleteCaseModal";
import toast from "react-hot-toast";
import DeleteManyCaseModal from "./DeleteManyCaseModal";
import { useNavigate } from "react-router-dom";
// import EditCase from "./EditCase";

const ModalBox = styled("div")({
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "25%",
  height: "392px",
  padding: "20px",
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

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const CasesTable = ({ cases, getCases, selectedCases, setSelectedCases }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [caseDeleteId, setCaseDeleteId] = useState("");
  const [showDeleteCaseModal, setShowDeleteCaseModal] = useState(false);
  const [showDeleteManyCaseModal, setShowDeleteManyCaseModal] = useState(false);
  const [showEditCaseModal, setShowEditCaseModal] = useState(false);
  const [selectedCaseEdit, setSelectedCaseEdit] = useState("");

  const auth = useSelector(authSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (cases.length > 0 && selectedCases.length === cases.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedCases, cases]);

  const toggleCaseSelection = (caseId) => {
    let updatedSelectedCases = [...selectedCases];

    if (updatedSelectedCases.includes(caseId)) {
      updatedSelectedCases = updatedSelectedCases.filter((id) => id !== caseId);
    } else {
      updatedSelectedCases = [...updatedSelectedCases, caseId];
    }

    setSelectedCases(updatedSelectedCases);
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);

    if (!selectAll) {
      setSelectedCases(cases.map((c) => c._id));
    } else {
      setSelectedCases([]);
    }
  };

  const deleteSelectedCases = async () => {
    try {
      if (!auth.userDetails || !auth.userDetails.token) {
        console.error("Authentication token not found.");
        navigate("/login");
        return;
      }

      const res = await axios.delete(
        `${process.env.REACT_APP_API_URI}/cases/deleteSelected`,
        {
          data: { cases: selectedCases },
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        }
      );
      setSelectedCases([]);
      setSelectAll(false);
      getCases();
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error deleting selected Cases:", error);
      if (error.response) {
        if (error.response.status === 403) {
          console.error("Unauthorized access. Please check your permissions.");
          navigate("/forbidden");
        } else {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error("An error occurred while deleting the selected cases.");
      }
    }
  };

  const deleteOneCase = async (id) => {
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URI}/case/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${auth?.userDetails?.token}`,
          },
        }
      );
      getCases();
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error deleting Case:", error);
    }
  };

  const handleClickDelete = (id) => {
    setCaseDeleteId(id);
    setShowDeleteCaseModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (caseDeleteId) {
        await deleteOneCase(caseDeleteId);
      }
    } catch (error) {
      console.error("Error deleting schedule:", error);
    } finally {
      setShowDeleteCaseModal(false);
      getCases();
    }
  };

  const handleCloseModal = () => {
    setShowDeleteCaseModal(false);
  };

  // delete many modal

  const handleOpenModalDeleteMany = () => {
    setShowDeleteManyCaseModal(true);
  };

  const handleCloseModalDeleteMany = () => {
    setShowDeleteManyCaseModal(false);
  };

  // edit Case functions

  const handleCaseEditClick = (Case) => {
    setSelectedCaseEdit(Case);
    setShowEditCaseModal(true);
  };

  const handleCloseModalEdit = () => {
    setShowEditCaseModal(false);
  };

  // patch statusOfCase

  const handlePatchStatusOfCase = async (id, statusCase) => {
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }

      const caseMapping = {
        Pending: "Investigation",
        Investigation: "Evaluation",
        Evaluation: "Referral",
        Referral: "Hearing",
        Hearing: "Decision",
        Decision: "Implementation",
        Implementation: "Case Solved",
      };

      const caseStatus = caseMapping[statusCase];

      if (!caseStatus) {
        console.error("Invalid case status:", statusCase);
        return;
      }

      // Make the API request with the determined case status
      await axios.patch(
        `${process.env.REACT_APP_API_URI}/case/${id}/patchCase`,
        {
          statusOfCase: caseStatus,
        },
        {
          headers: {
            withCredentials: true,
            Authorization: `Bearer ${auth?.userDetails?.token}`,
          },
        }
      );
      getCases();
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  return (
    <>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showEditCaseModal}
        onClose={handleCloseModalEdit}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox
          sx={{
            top: "50%",
            left: "50%",
            width: "48%",
            height: "fit-content",
            padding: "8px",
          }}
        >
          {/* <EditCase
            handleCloseModalEdit={handleCloseModalEdit}
            selectedCaseEdit={selectedCaseEdit}
            toast={toast}
            getCases={getCases}
          /> */}
        </ModalBox>
      </Modal>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showDeleteCaseModal}
        onClose={handleCloseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox>
          <DeleteCaseModal
            handleConfirmDelete={handleConfirmDelete}
            handleCloseModal={handleCloseModal}
          />
        </ModalBox>
      </Modal>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showDeleteManyCaseModal}
        onClose={handleCloseModalDeleteMany}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox>
          <DeleteManyCaseModal
            deleteSelectedCases={deleteSelectedCases}
            handleCloseModalDeleteMany={handleCloseModalDeleteMany}
          />
        </ModalBox>
      </Modal>
      <div
        className={`w-100 h-[380px] bg-white flex flex-col rounded-[10px] border-[1px] text-[#505050] ${
          cases && cases.length > 5 ? "overflow-y-scroll" : ""
        }`}
      >
        <div className="w-100 flex items-center gap-4 px-6">
          <div className="w-[30px] h-[60px] flex justify-start items-center">
            <input
              type="checkbox"
              className="w-[18px] h-[18px]"
              checked={selectAll}
              onChange={toggleSelectAll}
            />
          </div>
          <div className="w-[90px] whitespace-nowrap flex justify-start items-center bg-[#007bff] border-[1px] border-[#007bff] text-[white] py-1 px-3 rounded-[24px]">
            Case No.
          </div>
          <div className="w-[110px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-3 rounded-[24px]">
            Student No.
          </div>
          <div className="w-[160px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-3 rounded-[24px]">
            Name
          </div>
          <div className=" w-[118px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-3 rounded-[24px]">
            Department
          </div>
          <div className=" w-[60px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-3 rounded-[24px]">
            Year
          </div>
          <div className=" w-[80px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-3 rounded-[24px]">
            Section
          </div>

          <div className=" w-[160px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-3 rounded-[24px]">
            Reported Violation
          </div>
          <div className=" w-[118px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-3 rounded-[24px]">
            Incident Date
          </div>
          <div className=" w-[130px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-3 rounded-[24px]">
            Date Reported
          </div>
          <div className=" w-[140px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-3 rounded-[24px]">
            Case Status
          </div>
          {selectedCases.length > 1 ? (
            <>
              <div className="w-[1px] h-[20px] border-[1px]"></div>
              <div
                className="flex gap-2 justify-start items-center py-1 px-2 bg-[#ff3131] border-[1px] border-[#ff3131] text-white text-[14px] rounded-[4px] cursor-pointer"
                onClick={handleOpenModalDeleteMany}
              >
                <span>Delete</span>
                <BsTrash3Fill className="text-[14px]" />
              </div>
            </>
          ) : (
            <div className="w-[118px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-3 rounded-[24px]">
              <span>Actions</span>
            </div>
          )}
        </div>

        {cases?.map((c, k) => (
          <div
            className={`w-100 flex items-center gap-4 px-6 ${
              k % 2 === 0
                ? "bg-gradient-to-br from-gray-100 to-gray-100"
                : "bg-white"
            }`}
            key={k}
          >
            <div className="w-[30px] h-[60px] flex justify-start items-center">
              <input
                type="checkbox"
                className="w-[18px] h-[18px]"
                checked={selectedCases?.includes(c?._id)}
                onChange={() => toggleCaseSelection(c?._id)}
              />
            </div>
            <div className="w-[90px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[4px]">
              {c?.caseNo}
            </div>
            <div className="w-[110px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[4px]">
              {c?.student?.studentNo}
            </div>
            <div className="w-[160px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[4px]">
              {c?.student?.firstName} {c?.student?.surName}
            </div>
            <div className=" w-[118px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[4px]">
              {c?.student?.department?.slice(0, 6)}
            </div>
            <div className=" w-[60px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[4px]">
              {c?.student?.year}
            </div>
            <div className=" w-[80px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[4px]">
              {c?.student?.section}
            </div>
            <div className=" w-[160px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[4px]">
              {c?.reportedViolation}
            </div>
            <div className=" w-[118px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[4px]">
              {new Date(c?.dateOfIncident)?.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <div className=" w-[130px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[4px]">
              {new Date(c?.dateReported)?.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <div className=" w-[140px] font-bold whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[4px]">
              {c?.statusOfCase}
            </div>
            <div className="w-[130px] whitespace-nowrap flex justify-start items-center gap-2">
              {selectedCases.length < 2 ? (
                <>
                  <div
                    onClick={() =>
                      handlePatchStatusOfCase(c?._id, c?.statusOfCase)
                    }
                    className="p-2 bg-[white] border-[1px] border-[#007bff] rounded-[18px] cursor-pointer"
                  >
                    <BsCapslock className="text-[18px] text-[#007bff]" />
                  </div>
                  <div
                    onClick={() => handleCaseEditClick(c?._id)}
                    className="p-2 bg-[white] border-[1px] border-[#FFBF00] rounded-[18px] cursor-pointer"
                  >
                    <BsPen className="text-[18px] text-[#FFBF00]" />
                  </div>
                  <div
                    onClick={() => handleClickDelete(c?._id)}
                    className="p-2 bg-[white] border-[1px] border-[#FF3131] rounded-[18px] cursor-pointer"
                  >
                    <BsTrash3 className="text-[18px] text-[#FF3131]" />
                  </div>
                </>
              ) : (
                <>
                  <div className="p-2 bg-[#f0f0f0] rounded-[18px]">
                    <BsCapslock className="text-[18px] text-[white]" />
                  </div>
                  <div className="p-2 bg-[#f0f0f0] rounded-[18px]">
                    <BsPen className="text-[18px] text-white" />
                  </div>
                  <div className="p-2 bg-[#f0f0f0] rounded-[18px]">
                    <BsTrash className="text-[18px] text-white" />
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CasesTable;
