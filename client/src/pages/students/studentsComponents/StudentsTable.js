import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsEyeFill, BsPenFill, BsTrash2Fill } from "react-icons/bs";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/system";
import DeleteStudentModal from "./DeleteStudentModal";
import toast from "react-hot-toast";
import DeleteManyStudentModal from "./DeleteManyStudentModal";

const ModalBox = styled("div")({
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "30%",
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

const StudentsTable = ({
  students,
  getStudents,
  selectedStudents,
  setSelectedStudents,
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [studentDeleteId, setStudentDeleteId] = useState("");
  const [showDeleteStudentModal, setShowDeleteStudentModal] = useState(false);
  const [showDeleteManyStudentModal, setShowDeleteManyStudentModal] =
    useState(false);

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
      await axios.delete(
        `${process.env.REACT_APP_API_URI}/students/deleteSelected`,
        {
          data: { students: selectedStudents },
        }
      );
      setSelectedStudents([]);
      setSelectAll(false);
      getStudents();
      toast.success("Selected students have been deleted.");
    } catch (error) {
      console.error("Error deleting selected students:", error);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while deleting the selected students.");
      }
    }
  };

  const deleteOneStudent = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URI}/student/${id}`);
      getStudents();
      toast.success("Student has been deleted.");
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

  return (
    <>
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
        <div className="w-100 flex items-center gap-4">
          <div className="w-[60px] h-[60px] flex justify-center items-center">
            <input
              type="checkbox"
              className="w-[18px] h-[18px]"
              checked={selectAll}
              onChange={toggleSelectAll}
            />
          </div>
          <div className="w-[100px] flex justify-start items-center">
            Student No.
          </div>
          <div className="w-[100px] flex justify-start items-center">
            Surname
          </div>
          <div className="w-[100px] flex justify-start items-center">
            First name
          </div>
          <div className="w-[120px] flex justify-start items-center">
            Middle name
          </div>
          <div className=" w-[80px] flex justify-start items-center">Year</div>
          <div className=" w-[100px] flex justify-start items-center">
            Section
          </div>
          <div className=" w-[100px] flex justify-start items-center">
            College
          </div>
          <div className=" w-[120px] flex justify-start items-center">
            Department
          </div>
          <div className=" w-[80px] flex justify-start items-center">Sex</div>
          <div className=" w-[100px] flex justify-start items-center">
            Status
          </div>
          <div className=" w-[120px] flex justify-start items-center">
            No. of Cases
          </div>
          <div className=" w-[174px] flex justify-between items-center gap-4">
            <span>Actions</span>
            {selectedStudents.length > 1 ? (
              <>
                <div className="w-[1px] h-[20px] border-[1px]"></div>
                <div
                  className="flex gap-2 items-center p-2 bg-[#ff3131] text-white text-[14px] rounded-[6px]"
                  onClick={handleOpenModalDeleteMany}
                >
                  <BsTrash2Fill />
                  <span>Delete</span>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>

        {students?.map((student, k) => (
          <div
            className={`w-100 flex items-center gap-4 ${
              k % 2 === 0 ? "bg-[#f5f5f5]" : "bg-white"
            }`}
            key={k}
          >
            <div className="w-[60px] h-[60px] flex justify-center items-center">
              <input
                type="checkbox"
                checked={selectedStudents?.includes(student?._id)}
                onChange={() => toggleStudentSelection(student?._id)}
                className="w-[18px] h-[18px]"
              />
            </div>
            <div className="w-[100px] flex justify-start items-center">
              {student?.studentNo}
            </div>
            <div className="w-[100px] flex justify-start items-center">
              {student?.surName}
            </div>
            <div className="w-[100px] flex justify-start items-center">
              {student?.firstName}
            </div>
            <div className="w-[120px] flex justify-start items-center">
              {student?.middleName}
            </div>
            <div className="w-[80px] flex justify-start items-center">
              {student?.year}
            </div>
            <div className="w-[100px] flex justify-start items-center">
              {student?.section}
            </div>
            <div className="w-[100px] flex justify-start items-center">
              {student?.college?.slice(0, 6)}
            </div>
            <div className="w-[120px] flex justify-start items-center">
              {student?.department?.slice(0, 6)}
            </div>
            <div className="w-[80px] flex justify-start items-center">
              {student?.sex?.slice(0, 6)}
            </div>
            <div className="w-[100px] flex justify-start items-center">
              {student?.statusOfStudent.slice(0, 6)}
            </div>
            <div className="w-[120px] flex justify-start items-center">
              {student?.department?.slice(0, 6)}
            </div>
            <div className="w-[100px] flex justify-start items-center gap-2">
              {selectedStudents.length < 2 ? (
                <>
                  <div className="p-2 bg-[#007bff] rounded-[18px]">
                    <BsEyeFill className="text-[18px] text-[white]" />
                  </div>
                  <div className="p-2 bg-[#FFBF00] rounded-[18px]">
                    <BsPenFill className="text-[18px] text-white" />
                  </div>
                  <div
                    onClick={() => handleClickDelete(student?._id)}
                    className="p-2 bg-[#ff3131] rounded-[18px]"
                  >
                    <BsTrash2Fill className="text-[18px] text-white" />
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
                    <BsTrash2Fill className="text-[18px] text-white" />
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

export default StudentsTable;
