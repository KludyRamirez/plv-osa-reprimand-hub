import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import axios from "axios";
import {
  BsEye,
  BsEyeFill,
  BsPen,
  BsPenFill,
  BsTrash3,
  BsTrash3Fill,
} from "react-icons/bs";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/system";
import DeleteStudentModal from "./DeleteStudentModal";
import toast from "react-hot-toast";
import DeleteManyStudentModal from "./DeleteManyStudentModal";
import { useNavigate } from "react-router-dom";
import EditStudent from "./EditStudent";

const ModalBox = styled("div")({
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "25%",
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

const StudentsTable = ({
  students,
  getStudents,
  selectedStudents,
  setSelectedStudents,
  cases,
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [studentDeleteId, setStudentDeleteId] = useState("");
  const [showDeleteStudentModal, setShowDeleteStudentModal] = useState(false);
  const [showDeleteManyStudentModal, setShowDeleteManyStudentModal] =
    useState(false);
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [selectedStudentEdit, setSelectedStudentEdit] = useState("");

  const auth = useSelector(authSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (students.length > 0 && selectedStudents.length === students.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedStudents, students]);

  const toggleStudentSelection = (studentId) => {
    let updatedSelectedStudents = [...selectedStudents];

    if (updatedSelectedStudents.includes(studentId)) {
      updatedSelectedStudents = updatedSelectedStudents.filter(
        (id) => id !== studentId
      );
    } else {
      updatedSelectedStudents = [...updatedSelectedStudents, studentId];
    }

    setSelectedStudents(updatedSelectedStudents);
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);

    if (!selectAll) {
      setSelectedStudents(students.map((student) => student._id));
    } else {
      setSelectedStudents([]);
    }
  };

  const deleteSelectedStudents = async () => {
    try {
      if (!auth.userDetails || !auth.userDetails.token) {
        console.error("Authentication token not found.");
        // Redirect to login page or handle unauthorized access as per your application's logic
        navigate("/login");
        return;
      }

      const res = await axios.delete(
        `${process.env.REACT_APP_API_URI}/students/deleteSelected`,
        {
          data: { students: selectedStudents },
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        }
      );
      setSelectedStudents([]);
      setSelectAll(false);
      getStudents();
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error deleting selected students:", error);
      if (error.response) {
        if (error.response.status === 403) {
          console.error("Unauthorized access. Please check your permissions.");
          navigate("/forbidden");
        } else {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error("An error occurred while deleting the selected students.");
      }
    }
  };

  const deleteOneStudent = async (id) => {
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URI}/student/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${auth?.userDetails?.token}`,
          },
        }
      );
      getStudents();
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleClickDelete = (id) => {
    setStudentDeleteId(id);
    setShowDeleteStudentModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (studentDeleteId) {
        await deleteOneStudent(studentDeleteId);
      }
    } catch (error) {
      console.error("Error deleting schedule:", error);
    } finally {
      setShowDeleteStudentModal(false);
      getStudents();
    }
  };

  const handleCloseModal = () => {
    setShowDeleteStudentModal(false);
  };

  // delete many modal

  const handleOpenModalDeleteMany = () => {
    setShowDeleteManyStudentModal(true);
  };

  const handleCloseModalDeleteMany = () => {
    setShowDeleteManyStudentModal(false);
  };

  // edit student functions

  const handleStudentEditClick = (student) => {
    setSelectedStudentEdit(student);
    setShowEditStudentModal(true);
  };

  const handleCloseModalEdit = () => {
    setShowEditStudentModal(false);
  };

  const casesData = [...cases];

  return (
    <>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showEditStudentModal}
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
          <EditStudent
            handleCloseModalEdit={handleCloseModalEdit}
            selectedStudentEdit={selectedStudentEdit}
            toast={toast}
            getStudents={getStudents}
          />
        </ModalBox>
      </Modal>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showDeleteStudentModal}
        onClose={handleCloseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox>
          <DeleteStudentModal
            handleConfirmDelete={handleConfirmDelete}
            handleCloseModal={handleCloseModal}
          />
        </ModalBox>
      </Modal>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showDeleteManyStudentModal}
        onClose={handleCloseModalDeleteMany}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox>
          <DeleteManyStudentModal
            deleteSelectedStudents={deleteSelectedStudents}
            handleCloseModalDeleteMany={handleCloseModalDeleteMany}
          />
        </ModalBox>
      </Modal>
      <div
        className={`w-100 h-[380px] bg-white flex flex-col rounded-[10px] border-[1px] text-[#505050] ${
          students && students.length > 5 ? "overflow-y-scroll" : ""
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
          <div className="w-[118px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-2 rounded-[4px]">
            Student No.
          </div>
          <div className="w-[118px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-2 rounded-[4px]">
            Surname
          </div>
          <div className="w-[118px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-2 rounded-[4px]">
            First name
          </div>
          <div className=" w-[118px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-2 rounded-[4px]">
            Year
          </div>
          <div className=" w-[118px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-2 rounded-[4px]">
            Section
          </div>
          <div className=" w-[118px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-2 rounded-[4px]">
            College
          </div>
          <div className=" w-[118px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-2 rounded-[4px]">
            Department
          </div>
          <div className=" w-[118px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-2 rounded-[4px]">
            Sex
          </div>
          <div className=" w-[118px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-2 rounded-[4px]">
            Status
          </div>
          <div className=" w-[118px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-2 rounded-[4px]">
            No. of Cases
          </div>

          {selectedStudents.length > 1 ? (
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
            <div className="w-[118px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-2 rounded-[4px]">
              <span>Actions</span>
            </div>
          )}
        </div>

        {students?.map((student, k) => {
          const casesCount = casesData.filter(
            (c) =>
              `${c?.student?.firstName} ${c?.student?.surName}` ===
              `${student?.firstName} ${student?.surName}`
          ).length;

          return (
            <div
              className={`w-100 flex items-center gap-4 px-6 ${
                k % 2 === 0 ? "bg-[#f5f5f5]" : "bg-white"
              }`}
              key={k}
            >
              <div className="w-[30px] h-[60px] flex justify-start items-center">
                <input
                  type="checkbox"
                  checked={selectedStudents?.includes(student?._id)}
                  onChange={() => toggleStudentSelection(student?._id)}
                  className="w-[18px] h-[18px]"
                />
              </div>
              <div className="w-[118px] whitespace-nowrap flex justify-start items-center py-1 px-2 rounded-[4px]">
                {student?.studentNo}
              </div>
              <div className="w-[118px] whitespace-nowrap flex justify-start items-center py-1 px-2 rounded-[4px]">
                {student?.surName}
              </div>
              <div className="w-[118px] whitespace-nowrap flex justify-start items-center py-1 px-2 rounded-[4px]">
                {student?.firstName}
              </div>
              <div className="w-[118px] whitespace-nowrap flex justify-start items-center py-1 px-2 rounded-[4px]">
                {student?.year}
              </div>
              <div className="w-[118px] whitespace-nowrap flex justify-start items-center py-1 px-2 rounded-[4px]">
                {student?.section}
              </div>
              <div className="w-[118px] whitespace-nowrap flex justify-start items-center py-1 px-2 rounded-[4px]">
                {student?.college?.slice(0, 6)}
              </div>
              <div className="w-[118px] whitespace-nowrap flex justify-start items-center py-1 px-2 rounded-[4px]">
                {student?.department?.slice(0, 6)}
              </div>
              <div className="w-[118px] whitespace-nowrap flex justify-start items-center py-1 px-2 rounded-[4px]">
                {student?.sex?.slice(0, 6)}
              </div>
              <div className="w-[118px] whitespace-nowrap flex justify-start items-center py-1 px-2 rounded-[4px]">
                {student?.statusOfStudent.slice(0, 6)}
              </div>
              <div className="w-[118px] whitespace-nowrap flex justify-start items-center py-1 px-2 rounded-[4px]">
                {casesCount}
              </div>
              <div className="w-[130px] whitespace-nowrap flex justify-start items-center gap-2">
                {selectedStudents.length < 2 ? (
                  <>
                    <div className="p-2 bg-[white] border-[1px] border-[#007bff] rounded-[18px] cursor-pointer">
                      <BsEye className="text-[18px] text-[#007bff]" />
                    </div>
                    <div
                      onClick={() => handleStudentEditClick(student)}
                      className="p-2 bg-[white] border-[1px] border-[#FFBF00] rounded-[18px] cursor-pointer"
                    >
                      <BsPen className="text-[18px] text-[#FFBF00]" />
                    </div>
                    <div
                      onClick={() => handleClickDelete(student?._id)}
                      className="p-2 bg-[white] border-[1px] border-[#FF3131] rounded-[18px] cursor-pointer"
                    >
                      <BsTrash3 className="text-[18px] text-[#FF3131]" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-2 bg-[#efefef] rounded-[18px]">
                      <BsEyeFill className="text-[18px] text-[white]" />
                    </div>
                    <div className="p-2 bg-[#efefef] rounded-[18px]">
                      <BsPenFill className="text-[18px] text-white" />
                    </div>
                    <div className="p-2 bg-[#efefef] rounded-[18px]">
                      <BsTrash3Fill className="text-[18px] text-white" />
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default StudentsTable;
