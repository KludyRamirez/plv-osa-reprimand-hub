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
import girl from "../../../images/login/girl.png";
import {
  BsArrowRightShort,
  BsBoxArrowUpRight,
  BsCheckCircle,
  BsChevronUp,
  BsCollection,
  BsFolderX,
  BsGoogle,
  BsPen,
  BsStarFill,
  BsSticky,
  BsTrash3,
} from "react-icons/bs";
import { MdOutlineCall, MdOutlineEmail } from "react-icons/md";
import { VscComment } from "react-icons/vsc";
import EditStudent from "../../students/studentsComponents/EditStudent";
import PatchCaseStatus from "../../cases/casesComponents/PatchCaseStatus";
import RemarksCase from "../../cases/casesComponents/RemarksCase";

const ModalBox = styled("div")({
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "48%",
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

const StudentsProfileTable = ({
  cases,
  students,
  getCases,
  student,
  getStudents,
  cads,
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [caseDeleteId, setCaseDeleteId] = useState("");
  const [showDeleteCaseModal, setShowDeleteCaseModal] = useState(false);
  const [showDeleteManyCaseModal, setShowDeleteManyCaseModal] = useState(false);
  const [showEditCaseModal, setShowEditCaseModal] = useState(false);
  const [selectedCaseEdit, setSelectedCaseEdit] = useState("");
  const [selectedCases, setSelectedCases] = useState("");
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [selectedStudentEdit, setSelectedStudentEdit] = useState(null);
  const [showPatchCaseModal, setShowPatchCaseModal] = useState(false);
  const [selectedCasePatch, setSelectedCasePatch] = useState(null);
  const [showRemarksCaseModal, setShowRemarksCaseModal] = useState(false);
  const [selectedCaseRemarks, setSelectedCaseRemarks] = useState(null);

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

  // const handlePatchStatusOfCase = async (id, statusCase, caseNo) => {
  //   try {
  //     if (!auth.userDetails.token) {
  //       console.error("Authentication token not found.");
  //       return;
  //     }

  //     const caseMapping = {
  //       Pending: "Investigation",
  //       Investigation: "Evaluation",
  //       Evaluation: "Referral",
  //       Referral: "Hearing",
  //       Hearing: "Decision",
  //       Decision: "Implementation",
  //       Implementation: "Case Solved",
  //     };

  //     const caseStatus = caseMapping[statusCase];

  //     if (!caseStatus) {
  //       console.error("Invalid case status:", statusCase);
  //       return;
  //     }

  //     const res = await axios.patch(
  //       `${process.env.REACT_APP_API_URI}/case/${id}/patchCase`,
  //       {
  //         caseNo,
  //         statusOfCase: caseStatus,
  //       },
  //       {
  //         headers: {
  //           withCredentials: true,
  //           Authorization: `Bearer ${auth?.userDetails?.token}`,
  //         },
  //       }
  //     );

  //     toast.success(res.data.message);
  //     getCases();
  //   } catch (error) {
  //     console.error("Error fetching cases!", error);
  //   }
  // };

  //edit student

  const handleStudentEditClick = (student) => {
    setSelectedStudentEdit(student);
    setShowEditStudentModal(true);
  };

  const handleCloseModalEditStudent = () => {
    setShowEditStudentModal(false);
  };

  // click navigate params

  const handleClickProfile = (id) => {
    navigate(`/profile/${id}`);
    window.location.reload();
  };

  // filter cases

  const activeCases = cases?.filter((c) => c.statusOfCase !== "Case Solved");
  const caseSolvedCases = cases?.filter(
    (c) => c.statusOfCase === "Case Solved"
  );

  // patch case status

  const handleCasePatchClick = (cas) => {
    try {
      setSelectedCasePatch(cas);
      console.log(cas);
    } catch (error) {
      console.error("Error handling case Patch click:", error);
    } finally {
      setShowPatchCaseModal(true);
    }
  };

  const handleCloseModalPatch = () => {
    setShowPatchCaseModal(false);
  };

  // remarks case

  const handleCaseRemarksClick = (cas) => {
    try {
      setSelectedCaseRemarks(cas);
      console.log(cas);
    } catch (error) {
      console.error("Error handling case Remarks click:", error);
    } finally {
      setShowRemarksCaseModal(true);
    }
  };

  const handleCloseModalRemarks = () => {
    setShowRemarksCaseModal(false);
  };

  return (
    <>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showEditStudentModal}
        onClose={handleCloseModalEditStudent}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox>
          <EditStudent
            handleCloseModalEditStudent={handleCloseModalEditStudent}
            selectedStudentEdit={selectedStudentEdit}
            toast={toast}
            getStudents={getStudents}
            cads={cads}
          />
        </ModalBox>
      </Modal>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showEditCaseModal}
        onClose={handleCloseModalEdit}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox>
          <EditCase
            handleCloseModalEdit={handleCloseModalEdit}
            selectedCaseEdit={selectedCaseEdit}
            setSelectedCaseEdit={setSelectedCaseEdit}
            toast={toast}
            getCases={getCases}
            students={students}
            cads={cads}
          />
        </ModalBox>
      </Modal>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showPatchCaseModal}
        onClose={handleCloseModalPatch}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox sx={{ width: "38%" }}>
          <PatchCaseStatus
            handleCloseModalPatch={handleCloseModalPatch}
            selectedCasePatch={selectedCasePatch}
            toast={toast}
            getCases={getCases}
            students={students}
          />
        </ModalBox>
      </Modal>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showRemarksCaseModal}
        onClose={handleCloseModalRemarks}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox sx={{ width: "38%" }}>
          <RemarksCase
            handleCloseModalRemarks={handleCloseModalRemarks}
            selectedCaseRemarks={selectedCaseRemarks}
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
        <ModalBox sx={{ width: "22%" }}>
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
        <ModalBox sx={{ width: "22%" }}>
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
            <div className="w-[100%] border-[1px] h-[150px] rounded-bl-[8px] rounded-br-[8px] flex gap-4 ">
              <div className="w-[210px] h-[100%]  flex justify-end">
                {student.sex === "Male" ? (
                  <img
                    className="mt-[-60px] w-[175px] h-[175px] rounded-[50%] zIndex-2"
                    src={boy}
                  />
                ) : (
                  <img
                    className="mt-[-60px] w-[175px] h-[175px] rounded-[50%] zIndex-2"
                    src={girl}
                  />
                )}
              </div>
              <div className="w-[400px] h-[100%] px-2 py-5 flex flex-col gap-2 ">
                <span className="text-[27px] font-bold text-[#404040]">
                  {student.firstName} {student.surName}
                </span>
                <div className="w-[100%] text-[15px] text-[#606060] flex justify-between">
                  <span>
                    {student?.department?.split(" ")[0]} {student.year}-
                    {student.section}
                  </span>
                </div>
                <div className="w-[100%] text-[15px] flex justify-start gap-2 pt-2 text-[#007bff]">
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                  <BsStarFill />
                </div>
              </div>
              <div className="w-[200px] h-[100%] px-3 py-5 flex justify-end items-start">
                <div
                  onClick={() => handleStudentEditClick(student)}
                  className="cursor-pointer px-4 py-2 bg-[#007bff] flex justify-center items-center rounded-[4px] text-white gap-3"
                >
                  <div>Edit</div>
                  <BsPen className="mt-[-2px]" />
                </div>
              </div>
            </div>
          </div>

          <div className="w-[100%] h-[48px] flex justify-between items-center pt-8">
            <div className="flex justify-start gap-3 items-center">
              <div className="text-[24px] text-[#007bff] font-bold">Cases</div>
              <BsSticky className="text-[22px] text-[#007bff]" />
            </div>
            <div className="flex justify-center items-center gap-2 font-bold">
              <div className="cursor-pointer py-2 px-4 rounded-[24px] text-[16px] border-[1px] border-blue-400 flex gap-2 items-center text-[#007bff] bg-[#f7f7f7] hover:border-[1px] hover:border-blue-400">
                <div>Total</div>
                <BsSticky />
              </div>
              <div className="cursor-pointer py-2 px-4 rounded-[24px] text-[16px]  flex gap-2 items-center text-[#007bff] bg-[#f7f7f7] hover:border-[1px] hover:border-blue-400">
                <div>Active</div>
                <BsCollection />
              </div>
              <div className="cursor-pointer py-2 px-4 rounded-[24px] text-[16px]  flex gap-2 items-center text-[#007bff] bg-[#f7f7f7] hover:border-[1px] hover:border-blue-400">
                <div>Solved</div>
                <BsCheckCircle />
              </div>
            </div>
          </div>
          <div className="w-[848px] rounded-[8px] flex justify-start flex-wrap gap-8 mt-6">
            {cases.length > 0 ? (
              <>
                {cases.map((c) => (
                  <div
                    key={c}
                    className="cursor-pointer w-[408px] bg-[#f3f3f3] rounded-[8px] flex flex-col border-[1px]"
                  >
                    <div className="flex h-[33px] justify-between items-center bg-[#efefef] rounded-tr-[8px] rounded-tl-[8px] px-4">
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
                            <span className="text-[#007bff]">
                              {c.typeOfViolation}
                            </span>
                          </div>
                          <div className="text-[15px] text-[#606060] font-normal">
                            {c.offense} offense
                          </div>
                        </div>
                        <div className="w-[100%] h-[58px] text-[14px] text-[#606060] pt-2 rounded-[4px]">
                          {c.reportedViolation}.
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex justify-start gap-3">
                          <div
                            onClick={() => handleCaseEditClick(c)}
                            className="cursor-pointer rounded-[50%] w-[36px] h-[35px] border-[1px] border-[#007bff] flex justify-center items-center hover:bg-[#007bff] hover:text-white text-[#007bff]"
                          >
                            <BsPen className="text-[18px]" />
                          </div>
                          <div
                            onClick={() => handleClickDelete(c?._id)}
                            className="cursor-pointer rounded-[50%] w-[36px] h-[35px] border-[1px] border-[#007bff] flex justify-center items-center hover:bg-[#007bff] hover:text-white text-[#007bff]"
                          >
                            <BsTrash3 className="text-[18px]" />
                          </div>
                          <div
                            onClick={() => handleCasePatchClick(c)}
                            className="cursor-pointer rounded-[50%] w-[36px] h-[35px] border-[1px] border-[#007bff] flex justify-center items-center hover:bg-[#007bff] hover:text-white text-[#007bff]"
                          >
                            <BsChevronUp className="text-[18px]" />
                          </div>
                          <div
                            onClick={() => handleCaseRemarksClick(c)}
                            className="cursor-pointer rounded-[50%] w-[36px] h-[35px] border-[1px] border-[#007bff] flex justify-center items-center hover:bg-[#007bff] hover:text-white text-[#007bff]"
                          >
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
              <div className="w-[100%] h-[240px] text-[#606060] flex flex-col gap-2 justify-center items-center rounded-[8px]">
                <BsFolderX className="text-[32px]" />
                <span className="text-[16px]">No cases available</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="w-[350px] h-[232px] rounded-[8px] text-[#404040]">
            <div className="w-[100%] px-6 py-4 text-[25px] font-bold">
              Connect
            </div>
            <div className="w-[100%] flex flex-col flex-grow px-6 pb-4 gap-4">
              <div className="w-[100%] flex justify-start gap-4 items-center">
                <div className="p-2 rounded-[24px] border-[1px] border-[#007bff] text-[#007bff] hover:bg-[#007bff] hover:text-white cursor-pointer">
                  <MdOutlineEmail className="text-[24px]" />
                </div>
                <div className="">{student.email}</div>
                <BsGoogle className="text-[24px] text-[#606060]" />
              </div>
              <div className="w-[100%] flex gap-4 items-center">
                <div className="p-2 rounded-[24px] border-[1px] border-[#007bff] text-[#007bff] hover:bg-[#007bff] hover:text-white cursor-pointer">
                  <MdOutlineCall className="text-[24px]" />
                </div>
                <div className="">{student.contactNo}</div>
              </div>

              <div className="w-[100%] flex gap-2 items-center pt-4 hover:underline cursor-pointer">
                Show more info
                <BsArrowRightShort className="text-[24px]" />
              </div>
            </div>
          </div>
          <div className="w-[350px] px-6 pt-3 pb-6 flex flex-col gap-6">
            <div className="text-[25px] text-[#404040] font-bold">
              Similar Profile
            </div>
            <div className="flex flex-col gap-4">
              {students.map((s) => (
                <div className="w-[100%] flex justify-between items-center pb-4 border-b-[1px]">
                  <div className="flex items-center gap-4">
                    {s.sex === "Male" ? (
                      <img
                        src={boy}
                        alt=""
                        className="w-[44px] h-[44px] rounded-[50%] border-[1px] border-[#007bff]"
                      />
                    ) : (
                      <img
                        src={girl}
                        alt=""
                        className="w-[44px] h-[44px] rounded-[50%] border-[1px] border-[#007bff]"
                      />
                    )}

                    <div className="text-[16px] text-[#606060] ">
                      {s.firstName} {s.surName}
                    </div>
                  </div>
                  <div
                    onClick={() => handleClickProfile(s._id)}
                    className=" cursor-pointer flex justify-start items-center gap-2 hover:underline"
                  >
                    <span>Go</span>
                    <BsBoxArrowUpRight />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentsProfileTable;
