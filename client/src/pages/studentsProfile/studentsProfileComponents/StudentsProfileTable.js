import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/system';
import DeleteCaseModal from '../../cases/casesComponents/DeleteCaseModal';
import toast from 'react-hot-toast';
import DeleteManyCaseModal from '../../cases/casesComponents/DeleteCaseModal';
import { useNavigate } from 'react-router-dom';
import EditCase from '../../cases/casesComponents/EditCase';
import EditStudent from '../../students/studentsComponents/EditStudent';
import PatchCaseStatus from '../../cases/casesComponents/PatchCaseStatus';
import RemarksCase from '../../cases/casesComponents/RemarksCase';
import { Radio, RadioGroup, FormControlLabel } from '@mui/material';
import {
  BsBank,
  BsBuildings,
  BsEnvelope,
  BsEnvelopeAt,
  BsEye,
  BsEyeFill,
  BsGenderMale,
  BsKey,
  BsKeyFill,
  BsPass,
  BsPen,
  BsPencilFill,
  BsPenFill,
  BsPersonBadge,
  BsPersonVcard,
  BsTelephone,
  BsTelephoneInbound,
  BsTrash3,
  BsTrash3Fill,
} from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const ModalBox = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '48%',
  borderRadius: '12px',
  transform: 'translate(-50%, -50%)',
  background: 'white',
  border: 'none',
  outline: 'none',

  '&:focus': {
    border: 'none',
  },

  '@media (max-width: 767px)': {
    width: '100%',
    height: '100%',
    borderRadius: '0px',
    border: 'none',
  },
});

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const StudentsProfileTable = ({
  cases,
  students,
  getCases,
  student,
  getOneStudent,
  getStudents,
  cads,
  allowedRoles,
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [caseDeleteId, setCaseDeleteId] = useState('');
  const [showDeleteCaseModal, setShowDeleteCaseModal] = useState(false);
  const [showDeleteManyCaseModal, setShowDeleteManyCaseModal] = useState(false);
  const [showEditCaseModal, setShowEditCaseModal] = useState(false);
  const [selectedCaseEdit, setSelectedCaseEdit] = useState('');
  const [selectedCases, setSelectedCases] = useState('');
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [selectedStudentEdit, setSelectedStudentEdit] = useState(null);
  const [showPatchCaseModal, setShowPatchCaseModal] = useState(false);
  const [selectedCasePatch, setSelectedCasePatch] = useState(null);
  const [showRemarksCaseModal, setShowRemarksCaseModal] = useState(false);
  const [selectedCaseRemarks, setSelectedCaseRemarks] = useState(null);

  const [casesFilter, setCasesFilter] = useState('All');

  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const [randomStudents, setRandomStudents] = useState([]);

  const auth = useSelector(authSelector);
  const navigate = useNavigate();

  useEffect(() => {
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const shuffledStudents = shuffleArray(
      students.filter((s) => s._id !== student._id)
    );

    setRandomStudents(shuffledStudents.slice(0, 4));
  }, [students, student._id]);

  useEffect(() => {
    if (cases.length > 0 && selectedCases.length === cases.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedCases, cases]);

  // const toggleCaseSelection = (caseId) => {
  //   let updatedSelectedCases = [...selectedCases];

  //   if (updatedSelectedCases.includes(caseId)) {
  //     updatedSelectedCases = updatedSelectedCases.filter((id) => id !== caseId);
  //   } else {
  //     updatedSelectedCases = [...updatedSelectedCases, caseId];
  //   }

  //   setSelectedCases(updatedSelectedCases);
  // };

  // const toggleSelectAll = () => {
  //   setSelectAll(!selectAll);

  //   if (!selectAll) {
  //     setSelectedCases(cases.map((c) => c._id));
  //   } else {
  //     setSelectedCases([]);
  //   }
  // };

  const toggleShowMoreInfo = () => {
    setShowMoreInfo(!showMoreInfo);
  };

  const deleteSelectedCases = async () => {
    try {
      if (!auth.userDetails || !auth.userDetails.token) {
        console.error('Authentication token not found.');
        navigate('/');
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
      console.error('Error deleting selected Cases:', error);
      if (error.response) {
        if (error.response.status === 403) {
          console.error('Unauthorized access. Please check your permissions.');
          navigate('/forbidden');
        } else {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error('An error occurred while deleting the selected cases.');
      }
    }
  };

  const deleteOneCase = async (id) => {
    try {
      if (!auth.userDetails.token) {
        console.error('Authentication token not found.');
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
      console.error('Error deleting Case:', error);
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
      console.error('Error deleting schedule:', error);
    } finally {
      setShowDeleteCaseModal(false);
      getCases();
    }
  };

  const handleCloseModal = () => {
    setShowDeleteCaseModal(false);
  };

  // delete many modal

  // const handleOpenModalDeleteMany = () => {
  //   setShowDeleteManyCaseModal(true);
  // };

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

  // patch case status

  const handleCasePatchClick = (cas) => {
    try {
      setSelectedCasePatch(cas);
      console.log(cas);
    } catch (error) {
      console.error('Error handling case Patch click:', error);
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
      console.error('Error handling case Remarks click:', error);
    } finally {
      setShowRemarksCaseModal(true);
    }
  };

  const handleCloseModalRemarks = () => {
    setShowRemarksCaseModal(false);
  };

  // cases filter latest

  const filteredCases = cases?.filter((c) => {
    if (casesFilter === 'All') {
      return c.student?._id === student?._id;
    } else if (casesFilter === 'Case Solved') {
      return (
        c.student?._id === student?._id && c?.statusOfCase === 'Case Solved'
      );
    } else if (casesFilter !== 'Case Solved' && casesFilter !== 'All') {
      return (
        c.student?._id === student?._id && c?.statusOfCase !== 'Case Solved'
      );
    }
  });

  return (
    <>
      <Modal
        sx={{ border: 'none', outline: 'none' }}
        open={showEditStudentModal}
        onClose={handleCloseModalEditStudent}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox>
          <EditStudent
            handleCloseModalEditStudent={handleCloseModalEditStudent}
            selectedStudentEdit={selectedStudentEdit}
            setSelectedStudentEdit={setSelectedStudentEdit}
            toast={toast}
            getOneStudent={getOneStudent}
            getStudents={getStudents}
            cads={cads}
          />
        </ModalBox>
      </Modal>
      <Modal
        sx={{ border: 'none', outline: 'none' }}
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
        sx={{ border: 'none', outline: 'none' }}
        open={showPatchCaseModal}
        onClose={handleCloseModalPatch}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox sx={{ width: '38%' }}>
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
        sx={{ border: 'none', outline: 'none' }}
        open={showRemarksCaseModal}
        onClose={handleCloseModalRemarks}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox sx={{ width: '38%' }}>
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
        sx={{ border: 'none', outline: 'none' }}
        open={showDeleteCaseModal}
        onClose={handleCloseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox sx={{ width: '22%' }}>
          <DeleteCaseModal
            handleConfirmDelete={handleConfirmDelete}
            handleCloseModal={handleCloseModal}
          />
        </ModalBox>
      </Modal>
      <Modal
        sx={{ border: 'none', outline: 'none' }}
        open={showDeleteManyCaseModal}
        onClose={handleCloseModalDeleteMany}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox sx={{ width: '22%' }}>
          <DeleteManyCaseModal
            deleteSelectedCases={deleteSelectedCases}
            handleCloseModalDeleteMany={handleCloseModalDeleteMany}
          />
        </ModalBox>
      </Modal>
      <div className="w-[100%] flex flex-col items-center xl:justify-start gap-12 xl:gap-8">
        {/* <div className="xl:w-[100%] flex flex-col gap-4">
          <div className="xl:overflow-x-scroll">
            <div className="w-[850px] h-[325px] flex flex-col">
              <div className="w-[100%] h-[175px] relative">
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#505050] text-[white] text-[14px] rounded-[24px]">
                  {student.studentNo}
                </div>
              </div>
              <div className="w-[100%] border-[1px] h-[150px] rounded-bl-[8px] rounded-br-[8px] flex gap-4 ">
                <div className="w-[400px] h-[100%] px-2 py-5 flex flex-col gap-2 ">
                  <span className="text-[27px] font-bold text-[#404040]">
                    {student.firstName} {student.surName}
                  </span>
                  <div className="w-[100%] text-[15px] text-[#707070] flex justify-between">
                    <span>
                      {student?.department?.split(' ')[0]} {student.year}-
                      {student.section}
                    </span>
                  </div>
                  <div className="w-[100%] text-[15px] flex justify-start gap-2 pt-2 text-[#707070]"></div>
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
          </div>

          <div className="w-[100%] h-[48px] flex justify-between xl:justify-start pt-8 relative">
            <div className="flex justify-start gap-3 items-center">
              <div className="text-[24px] text-[#707070] font-bold sm:hidden">
                Cases
              </div>
            </div>

            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={casesFilter}
              onChange={(e) => setCasesFilter(e.target.value)}
              className="absolute top-[22px] right-[-16px]"
            >
              <div className="flex items-center gap-2">
                <FormControlLabel
                  value="All"
                  control={<Radio id="All" sx={{ display: 'none' }} />}
                  label={
                    <div
                      className={`cursor-pointer py-2 px-4 rounded-[24px] text-[16px] flex gap-2 items-center text-[#707070] ${
                        casesFilter === 'All'
                          ? 'bg-[#007bff] text-white'
                          : 'text-[#404040] bg-[#f7f7f7]'
                      } `}
                    >
                      <div>Total</div>
                    </div>
                  }
                />
                <FormControlLabel
                  value="Case Solved"
                  control={<Radio id="Case Solved" sx={{ display: 'none' }} />}
                  label={
                    <div
                      className={`cursor-pointer py-2 px-4 rounded-[24px] text-[16px] flex gap-2 items-center text-[#707070] ${
                        casesFilter === 'Case Solved'
                          ? 'bg-[#007bff] text-white'
                          : 'text-[#404040] bg-[#f7f7f7]'
                      }`}
                    >
                      <div>Solved</div>
                    </div>
                  }
                />
                <FormControlLabel
                  value="Active"
                  control={<Radio id="Active" sx={{ display: 'none' }} />}
                  label={
                    <div
                      className={`cursor-pointer py-2 px-4 rounded-[24px] text-[16px] flex gap-2 items-center ${
                        casesFilter !== 'All' && casesFilter !== 'Case Solved'
                          ? 'bg-[#007bff] text-white'
                          : 'text-[#404040] bg-[#f7f7f7]'
                      }`}
                    >
                      <div>Active</div>
                    </div>
                  }
                />
              </div>
            </RadioGroup>
          </div>
        </div> */}

        {/* <div className="flex flex-col gap-5">
          <div className="w-[350px] rounded-[8px] text-[#404040]">
            <div className="w-[100%] px-6 py-4 text-[25px] font-bold">
              Connect
            </div>
            <div className="w-[100%] flex flex-col flex-grow px-6 pb-4 gap-4">
              <div className="w-[100%] flex justify-start gap-4 items-center">
                <div className="p-2 rounded-[24px] border-[1px] border-[#007bff] text-[#707070] hover:bg-[#007bff] hover:text-white cursor-pointer">
                  <MdOutlineEmail className="text-[24px]" />
                </div>
                <div className="">{student.email}</div>
                <BsGoogle className="text-[24px] text-[#707070]" />
              </div>
              <div className="w-[100%] flex gap-4 items-center">
                <div className="p-2 rounded-[24px] border-[1px] border-[#007bff] text-[#707070] hover:bg-[#007bff] hover:text-white cursor-pointer">
                  <MdOutlineCall className="text-[24px]" />
                </div>
                <div className="">{student.contactNo}</div>
              </div>

              {showMoreInfo ? (
                <div
                  onClick={toggleShowMoreInfo}
                  className="w-[100%] flex gap-2 items-center pt-4 hover:underline cursor-pointer"
                >
                  Collapse info
                  <BsArrowUpShort className="text-[24px]" />
                </div>
              ) : (
                <div
                  onClick={toggleShowMoreInfo}
                  className="w-[100%] flex gap-2 items-center pt-4 hover:underline cursor-pointer"
                >
                  Show more info
                  <BsArrowDownShort className="text-[24px]" />
                </div>
              )}

              {showMoreInfo ? (
                <>
                  <div className="w-[100%] flex justify-start gap-4 items-center pt-2">
                    <div className="p-2 rounded-[24px] border-[1px] border-[#007bff] text-[#707070] hover:bg-[#007bff] hover:text-white cursor-pointer">
                      <BsPhoneFlip className="text-[24px]" />
                    </div>
                    <div className="">{student.guardianContactNo}</div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
          <div className="w-[350px] px-6 flex flex-col gap-6">
            <div className="text-[25px] text-[#404040] font-bold">
              Similar Profile
            </div>
            <div className="flex flex-col gap-4">
              {randomStudents.map((s) => (
                <div className="w-[100%] flex justify-between items-center pb-4 border-b-[1px]">
                  <div className="flex items-center gap-4">
                    {s.sex === 'Male' ? (
                      <img
                        alt=""
                        className="w-[44px] h-[44px] rounded-[50%] border-[1px] border-blue-500"
                      />
                    ) : (
                      <img
                        alt=""
                        className="w-[44px] h-[44px] rounded-[50%] border-[1px] border-blue-500"
                      />
                    )}

                    <div className="text-[16px] text-[#707070] ">
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
        </div> */}

        <div className="w-[100%] h-[100%] rounded-br-[12px] rounded-tl-[12px] flex xl:flex-wrap gap-1 xl:gap-8 px-8 xl:px-0">
          <div className="w-[50%] xl:w-[100%] flex flex-col gap-2 xl:border-none xl:p-0">
            <div className="text-[#707070] text-[18px]">Personal Details</div>
            <div className="w-[100%] flex justify-between items-center gap-4 mb-6">
              <div className="flex justify-center items-center text-[#707070] text-[42px] font-bold leading-tight">
                {student.firstName} {student.surName}
              </div>
            </div>
            <div className="w-[100%] flex justify-between items-center gap-4 mb-6">
              <div className="px-3 flex justify-center items-center gap-2 py-1 bg-green-600 text-[#f0f9ff] text-[14px] rounded-[4px] font-bold border-[1px] border-green-600">
                {student.statusOfStudent}
              </div>
            </div>
            <div className="w-[100%] flex items-center gap-1">
              <div className="flex justify-center items-center gap-2 py-1 text-[#707070] text-[16px] rounded-[4px] font-bold">
                <BsPass size={30} /> {student.studentNo}
              </div>
            </div>
            <div className="w-[100%] flex items-center gap-4">
              <div className="flex justify-center items-center gap-2 py-1 text-[#707070] text-[16px] rounded-[4px] font-bold">
                <BsBank size={30} /> {student.college}
              </div>
              <div className="flex justify-center items-center gap-2 py-1 text-[#707070] text-[16px] rounded-[4px] font-bold">
                <BsBuildings size={30} /> {student?.department?.slice(0, 4)}{' '}
                {student.year}-{student.section}
              </div>
            </div>
            <div className="w-[100%] flex items-center gap-4">
              <div className="flex justify-center items-center gap-2 py-1 text-[#707070] text-[16px] rounded-[4px] font-bold">
                <BsTelephone size={30} /> {student?.contactNo}
              </div>
              <div className="flex justify-center items-center gap-2 py-1 text-[#707070] text-[16px] rounded-[4px] font-bold">
                <BsTelephoneInbound size={30} /> {student?.guardianContactNo}
              </div>
            </div>
            <div className="w-[100%] flex items-center gap-1">
              <div className="flex justify-center items-center gap-2 py-1 text-[#707070] text-[16px] rounded-[4px] font-bold">
                <BsEnvelopeAt size={30} /> {student?.email}
              </div>
            </div>
            <div className="w-[100%] flex items-center gap-1">
              <div className="flex justify-center items-center gap-2 py-1 text-[#707070] text-[16px] rounded-[4px] font-bold">
                <BsGenderMale size={30} /> {student?.sex}
              </div>
            </div>
          </div>
        </div>

        <div className="w-[100%] flex xl:flex-wrap gap-2 px-8 xl:px-0">
          <div className="w-[50%] xl:w-[100%] flex flex-col gap-4">
            <div className="text-[18px] text-[#707070]">Personal</div>
            <div className="text-[32px] text-[#707070] font-bold mt-[-16px]">
              Cases
            </div>
            <div className="w-[100%] flex xl:flex-wrap justify-center items-center gap-2">
              <div className="w-[100%] xl:w-[100%] h-[240px]">
                <Swiper
                  pagination={{
                    dynamicBullets: true,
                  }}
                  spaceBetween="8"
                  breakpoints={{
                    599: {
                      slidesPerView: 1,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    1024: {
                      slidesPerView: 2,
                    },
                    1200: {
                      slidesPerView: 2,
                    },
                  }}
                  modules={[Pagination]}
                  className="mySwiper"
                >
                  {filteredCases.map((c) => (
                    <SwiperSlide
                      className="flex justify-center items-center bg-[rgb(250,255,255)] rounded-tl-[24px] rounded-tr-[24px] rounded-bl-[18px] rounded-br-[18px] border-[1px] border-blue-100"
                      key={c._id}
                    >
                      <div className="w-[100%] py-4 flex justify-between items-start p-4">
                        <div
                          className={`${
                            c.typeOfViolation === 'Major'
                              ? 'text-red-500'
                              : 'text-orange-500'
                          }  text-[16px] font-bold`}
                        >
                          {c.typeOfViolation}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="group flex justify-center items-center p-1 text-white rounded-[50%] bg-blue-500 hover:p-2 transition-hover duration-300 ease-[cubic-bezier(0.4, 0, 0.2, 1)] cursor-pointer">
                            <BsEye
                              size={16}
                              className="invisible group-hover:visible transition-group-hover duration-150 ease-[cubic-bezier(0.4, 0, 0.2, 1)]"
                            />
                          </div>
                          <div className="group flex justify-center items-center p-1 text-white rounded-[50%] bg-yellow-500 hover:p-2 transition-hover duration-300 ease-[cubic-bezier(0.4, 0, 0.2, 1)] cursor-pointer">
                            <BsPen
                              size={16}
                              className="invisible group-hover:visible transition-group-hover duration-150 ease-[cubic-bezier(0.4, 0, 0.2, 1)]"
                            />
                          </div>
                          <div className="group flex justify-center items-center p-1 text-white rounded-[50%] bg-red-500 hover:p-2 transition-hover duration-300 ease-[cubic-bezier(0.4, 0, 0.2, 1)] cursor-pointer">
                            <BsTrash3
                              size={16}
                              className="invisible group-hover:visible transition-group-hover duration-150 ease-[cubic-bezier(0.4, 0, 0.2, 1)]"
                            />
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
          {/* <div className="w-[50%] xl:w-[100%] flex flex-col gap-4">
            <div className="text-[18px] text-[#707070]">Helpful</div>
            <div className="text-[32px] text-[#707070] font-bold mt-[-16px]">
              Remarks
            </div>
            <div className="w-[100%] flex xl:flex-wrap justify-center items-center gap-2">
              <div className="w-[100%] h-[240px]">
                <Swiper
                  pagination={{
                    dynamicBullets: true,
                  }}
                  spaceBetween="8"
                  breakpoints={{
                    599: {
                      slidesPerView: 1,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    1024: {
                      slidesPerView: 2,
                    },
                    1200: {
                      slidesPerView: 2,
                    },
                  }}
                  modules={[Pagination]}
                  className="mySwiper"
                >
                  {filteredCases.map((c) => (
                    <SwiperSlide
                      className="flex justify-center items-center bg-[rgb(250,255,255)] rounded-tl-[24px] rounded-tr-[24px] rounded-bl-[18px] rounded-br-[18px] border-[1px] border-blue-100"
                      key={c._id}
                    >
                      <div className="w-[100%] py-4 flex justify-between items-start p-4">
                        <div
                          className={`${
                            c.typeOfViolation === 'Major'
                              ? 'text-red-500'
                              : 'text-orange-500'
                          }  text-[16px] font-bold`}
                        >
                          {c.typeOfViolation}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="group flex justify-center items-center p-1 text-white rounded-[50%] bg-blue-500 hover:p-2 transition-hover duration-300 ease-[cubic-bezier(0.4, 0, 0.2, 1)] cursor-pointer">
                            <BsEye
                              size={16}
                              className="invisible group-hover:visible transition-group-hover duration-150 ease-[cubic-bezier(0.4, 0, 0.2, 1)]"
                            />
                          </div>
                          <div className="group flex justify-center items-center p-1 text-white rounded-[50%] bg-yellow-500 hover:p-2 transition-hover duration-300 ease-[cubic-bezier(0.4, 0, 0.2, 1)] cursor-pointer">
                            <BsPen
                              size={16}
                              className="invisible group-hover:visible transition-group-hover duration-150 ease-[cubic-bezier(0.4, 0, 0.2, 1)]"
                            />
                          </div>
                          <div className="group flex justify-center items-center p-1 text-white rounded-[50%] bg-red-500 hover:p-2 transition-hover duration-300 ease-[cubic-bezier(0.4, 0, 0.2, 1)] cursor-pointer">
                            <BsTrash3
                              size={16}
                              className="invisible group-hover:visible transition-group-hover duration-150 ease-[cubic-bezier(0.4, 0, 0.2, 1)]"
                            />
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default StudentsProfileTable;
