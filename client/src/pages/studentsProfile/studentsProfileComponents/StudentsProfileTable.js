import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import axios from "axios";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/system";
import DeleteCaseModal from "../../cases/casesComponents/DeleteCaseModal";
import toast from "react-hot-toast";
import DeleteManyCaseModal from "../../cases/casesComponents/DeleteCaseModal";
import { useNavigate } from "react-router-dom";
import EditCase from "../../cases/casesComponents/EditCase";
import sea from "../../../images/login/sea.jpg";
import boy from "../../../images/login/boynobg.svg";
import {
  BsArrowRightShort,
  BsChevronUp,
  BsFolder2Open,
  BsFolderX,
  BsPen,
  BsSticky,
  BsTrash3,
} from "react-icons/bs";
import {
  MdOutlineCall,
  MdOutlineEmail,
  MdOutlineNetworkWifi2Bar,
} from "react-icons/md";
import { VscComment } from "react-icons/vsc";

const ModalBox = styled("div")({
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "22%",
  height: "fit-content",
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

const StudentsProfileTable = ({ cases, students, getCases, student }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [caseDeleteId, setCaseDeleteId] = useState("");
  const [showDeleteCaseModal, setShowDeleteCaseModal] = useState(false);
  const [showDeleteManyCaseModal, setShowDeleteManyCaseModal] = useState(false);
  const [showEditCaseModal, setShowEditCaseModal] = useState(false);
  const [selectedCaseEdit, setSelectedCaseEdit] = useState("");
  const [selectedCases, setSelectedCases] = useState("");

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

  const handleCaseEditClick = (c) => {
    setSelectedCaseEdit(c);
    setShowEditCaseModal(true);
  };

  const handleCloseModalEdit = () => {
    setShowEditCaseModal(false);
  };

  // patch statusOfCase

  const handlePatchStatusOfCase = async (id, statusCase, caseNo) => {
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

      const res = await axios.patch(
        `${process.env.REACT_APP_API_URI}/case/${id}/patchCase`,
        {
          caseNo,
          statusOfCase: caseStatus,
        },
        {
          headers: {
            withCredentials: true,
            Authorization: `Bearer ${auth?.userDetails?.token}`,
          },
        }
      );

      toast.success(res.data.message);
      getCases();
    } catch (error) {
      console.error("Error fetching cases!", error);
    }
  };

  const activeCases = cases?.filter((c) => c.statusOfCase !== "Case Solved");
  const caseSolvedCases = cases?.filter(
    (c) => c.statusOfCase === "Case Solved"
  );

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
          <EditCase
            handleCloseModalEdit={handleCloseModalEdit}
            selectedCaseEdit={selectedCaseEdit}
            setSelectedCaseEdit={setSelectedCaseEdit}
            toast={toast}
            getCases={getCases}
            students={students}
          />
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
      <div className="w-[100%] flex justify-center gap-4">
        <div className="flex flex-col gap-4">
          <div className="w-[850px] h-[325px] flex flex-col">
            <div className="w-[100%] h-[175px] relative">
              <img
                className="w-[100%] h-[100%] object-cover rounded-tl-[8px] rounded-tr-[8px]"
                src={sea}
                alt=""
              />
              <div className="absolute top-4 left-4 px-2 py-1 bg-[#FFFFFFBB] text-[#303030] text-[14px] font-bold">
                {student.studentNo}
              </div>
            </div>
            <div className="w-[100%] border-[1px] h-[150px] rounded-bl-[8px] rounded-br-[8px] flex gap-4">
              <div className="w-[210px] h-[100%]  flex justify-end">
                <img
                  className="mt-[-60px] w-[175px] h-[175px] rounded-[50%] zIndex-2"
                  src={boy}
                ></img>
              </div>
              <div className="w-[400px] h-[100%] px-2 py-5 flex flex-col gap-2">
                <span className="text-[27px] font-bold text-[#404040]">
                  {student.firstName} {student.surName}
                </span>
                <div className="w-[100%] text-[15px] text-[#606060] flex justify-between">
                  <span>CEIT BSIT 4-2</span>
                </div>
              </div>
              <div className="w-[200px] h-[100%] px-3 py-5 flex justify-end items-start">
                <div className="px-4 py-2 bg-[#007bff] flex justify-center items-center rounded-[4px] text-white gap-3">
                  <div>Edit</div>
                  <BsPen className="mt-[-2px]" />
                </div>
              </div>
            </div>
            <div className=""></div>
          </div>
          <div className="w-[850px] flex justify-center gap-8  items-center">
            <div className="w-[148px] text-white h-[150px] flex flex-col justify-center items-center gap-2 rounded-[8px]">
              <div className="text-[32px] font-bold text-blue-900">
                {cases.length}
              </div>
              <div className="text-[16px] py-2 px-3 bg-blue-900">
                <div className="">Total Cases</div>
              </div>
            </div>
            <div className="w-[1px] h-[30px] bg-gray-200"></div>
            <div className="w-[148px] h-[150px] flex flex-col justify-center items-center gap-2 text-white">
              <div className="text-[32px] text-[red] font-bold">
                {activeCases.length}
              </div>
              <div className="text-[16px] py-2 px-3 bg-red-900">
                <div className="">Active Cases</div>
              </div>
            </div>
            <div className="w-[1px] h-[30px] bg-gray-200"></div>
            <div className="w-[148px] h-[150px] flex flex-col justify-center items-center gap-2 text-[white]">
              <div className="text-[32px] text-[green] font-bold">
                {caseSolvedCases.length}
              </div>
              <div className="text-[16px] py-2 px-3 bg-green-900">
                <div className="">Solved Cases</div>
              </div>
            </div>
            <div className="w-[1px] h-[30px] bg-gray-200"></div>
            <div className="w-[148px] h-[150px] flex flex-col justify-center items-center gap-2 text-[white]">
              <div className="text-[32px] text-blue-900 font-bold">
                {caseSolvedCases.length}
              </div>
              <div className="text-[16px] py-2 px-3 bg-blue-900">
                <div className="">Counseling</div>
              </div>
            </div>
          </div>
          <div className="w-[100%] h-[48px] flex justify-start items-center pt-2 gap-2">
            <div className="cursor-pointer py-1 px-4 rounded-[24px] text-[16px] border-[1px] border-[#606060] flex gap-2 items-center text-[#606060]">
              <div>Total</div>
              <BsSticky />
            </div>
            <div className="cursor-pointer py-1 px-4 rounded-[24px] text-[16px]  flex gap-2 items-center text-[#606060]">
              <div>Active</div>
              <BsSticky />
            </div>
            <div className="cursor-pointer rounded-[24px] text-[16px]  flex gap-2 items-center text-[#606060]">
              <div>Solved</div>
              <BsSticky />
            </div>
          </div>
          <div className="w-[848px] rounded-[8px] flex justify-start flex-wrap gap-8 pt-2">
            {cases.length > 0 ? (
              <>
                {cases.map((c) => (
                  <div
                    key={c}
                    className="cursor-pointer w-[408px] bg-blue-100 rounded-[8px] flex flex-col"
                  >
                    <div className="flex h-[33px] justify-between items-center bg-blue-200 rounded-tr-[8px] rounded-tl-[8px] px-4">
                      <div className="flex justify-center items-center text-[14px] text-[#606060]">
                        ID {c.caseNo}
                      </div>
                      <div className="flex justify-center items-center text-[14px] text-[#606060]">
                        14 Days Ago
                      </div>
                    </div>
                    <div className="flex flex-col gap-6 p-4">
                      <div className="flex flex-col items-start gap-4">
                        <div className="w-[100%] flex justify-between items-center">
                          <div className="text-[20px] font-bold">
                            <span className="text-[red]">
                              {c.typeOfViolation}{" "}
                            </span>
                            <span className="text-[16px] text-[#404040] font-normal">
                              offense
                            </span>
                          </div>
                          <div className="text-[16px] text-[#404040] font-normal">
                            {c.offense}
                          </div>
                        </div>
                        <div className="w-[100%] h-[58px] text-[14px] text-[#606060] p-2 bg-white">
                          {c.reportedViolation}.
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex justify-start gap-3">
                          <div className="cursor-pointer rounded-[50%] w-[36px] h-[35px] border-[1px] border-[#007bff] flex justify-center items-center hover:bg-[#007bff] hover:text-white text-[#007bff]">
                            <BsPen className="text-[18px]" />
                          </div>
                          <div className="cursor-pointer rounded-[50%] w-[36px] h-[35px] border-[1px] border-[#007bff] flex justify-center items-center hover:bg-[#007bff] hover:text-white text-[#007bff]">
                            <BsTrash3 className="text-[18px]" />
                          </div>
                          <div className="cursor-pointer rounded-[50%] w-[36px] h-[35px] border-[1px] border-[#007bff] flex justify-center items-center hover:bg-[#007bff] hover:text-white text-[#007bff]">
                            <BsChevronUp className="text-[18px]" />
                          </div>
                          <div className="cursor-pointer rounded-[50%] w-[36px] h-[35px] border-[1px] border-[#007bff] flex justify-center items-center hover:bg-[#007bff] hover:text-white text-[#007bff]">
                            <VscComment className="text-[20px]" />
                          </div>
                        </div>

                        <div className="rounded-[24px] px-3 py-1 border-[1px] border-[#007bff] text-[#007bff] flex justify-center items-center hover:bg-[#007bff] hover:text-white text-[#007bff]">
                          {c.statusOfCase}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="w-[100%] h-[240px] text-[#606060] flex flex-col gap-2 justify-center items-center border-[1px] rounded-[8px]">
                <BsFolderX className="text-[32px]" />
                <span className="text-[16px]">No cases available</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="w-[350px] h-[232px] rounded-[8px] text-[#404040]">
            <div className="w-[100%] px-6 pt-4 pb-4 text-[25px] font-bold">
              Connect
            </div>
            <div className="w-[100%] flex flex-col flex-grow px-6 pb-4 gap-4">
              <div className="w-[100%] flex justify-start gap-4 items-center">
                <div className="p-1  rounded-[4px] border-[1px] border-[#007bff] text-[#007bff]">
                  <MdOutlineEmail className="text-[24px]" />
                </div>
                <div className="underline">{student.email}</div>
                <BsArrowRightShort />
              </div>
              <div className="w-[100%] flex gap-4 items-center">
                <div className="p-1  rounded-[4px] border-[1px] border-[#007bff] text-[#007bff]">
                  <MdOutlineCall className="text-[24px]" />
                </div>
                <div className="underline">{student.contactNo}</div>
                <BsArrowRightShort />
              </div>

              <div className="w-[100%] flex gap-4 items-center">
                <div className="p-1 rounded-[4px] border-[1px] border-[#007bff] text-[#007bff]">
                  <MdOutlineNetworkWifi2Bar className="text-[24px]" />
                </div>
                <div className="underline">{student.guardianContactNo}</div>
                <BsArrowRightShort />
              </div>
            </div>
          </div>
          <div className="w-[350px] h-[350px] border-[1px] rounded-[8px]"></div>
        </div>
      </div>
    </>
  );
};

export default StudentsProfileTable;
