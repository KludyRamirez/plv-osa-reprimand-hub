import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BsEye,
  BsEyeFill,
  BsFolder2Open,
  BsPen,
  BsPenFill,
  BsTrash3,
  BsTrash3Fill,
} from "react-icons/bs";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/system";
import DeleteUserModal from "./DeleteUserModal";
import toast from "react-hot-toast";
import DeleteManyUserModal from "./DeleteManyUserModal";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useNavigate } from "react-router-dom";
import EditUser from "./EditUser";

const ModalBox = styled("div")({
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "48%",
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

const UsersTable = ({ users, getUsers, selectedUsers, setSelectedUsers }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [userDeleteId, setUserDeleteId] = useState("");
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [showDeleteManyUserModal, setShowDeleteManyUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [selectedUserEdit, setSelectedUserEdit] = useState("");

  const auth = useSelector(authSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (users?.length > 0 && selectedUsers?.length === users?.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedUsers, users]);

  const toggleUserSelection = (userId) => {
    let updatedSelectedUsers = [...selectedUsers];

    if (updatedSelectedUsers.includes(userId)) {
      updatedSelectedUsers = updatedSelectedUsers.filter((id) => id !== userId);
    } else {
      updatedSelectedUsers = [...updatedSelectedUsers, userId];
    }

    setSelectedUsers(updatedSelectedUsers);
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);

    if (!selectAll) {
      setSelectedUsers(users.map((user) => user._id));
    } else {
      setSelectedUsers([]);
    }
  };

  const deleteSelectedUsers = async () => {
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URI}/users/deleteSelected`,
        {
          data: { users: selectedUsers },
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        }
      );
      setSelectedUsers([]);
      setSelectAll(false);
      getUsers();
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error deleting selected users:", error);
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

  const deleteOneUser = async (id) => {
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URI}/user/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${auth?.userDetails?.token}`,
          },
        }
      );
      getUsers();
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleClickDelete = (id) => {
    setUserDeleteId(id);
    setShowDeleteUserModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (userDeleteId) {
        await deleteOneUser(userDeleteId);
      }
    } catch (error) {
      console.error("Error deleting schedule:", error);
    } finally {
      setShowDeleteUserModal(false);
      getUsers();
    }
  };

  const handleCloseModal = () => {
    setShowDeleteUserModal(false);
  };

  // delete many modal

  const handleOpenModalDeleteMany = () => {
    setShowDeleteManyUserModal(true);
  };

  const handleCloseModalDeleteMany = () => {
    setShowDeleteManyUserModal(false);
  };

  // edit user functions

  const handleUserEditClick = (user) => {
    setSelectedUserEdit(user);
    setShowEditUserModal(true);
  };

  const handleCloseModalEdit = () => {
    setShowEditUserModal(false);
  };

  return (
    <>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showEditUserModal}
        onClose={handleCloseModalEdit}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox>
          <EditUser
            handleCloseModalEdit={handleCloseModalEdit}
            selectedUserEdit={selectedUserEdit}
            toast={toast}
            getUsers={getUsers}
          />
        </ModalBox>
      </Modal>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showDeleteUserModal}
        onClose={handleCloseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox>
          <DeleteUserModal
            handleConfirmDelete={handleConfirmDelete}
            handleCloseModal={handleCloseModal}
          />
        </ModalBox>
      </Modal>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showDeleteManyUserModal}
        onClose={handleCloseModalDeleteMany}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox>
          <DeleteManyUserModal
            deleteSelectedusers={deleteSelectedUsers}
            handleCloseModalDeleteMany={handleCloseModalDeleteMany}
          />
        </ModalBox>
      </Modal>
      <div
        className={`w-100 h-[380px] bg-white flex flex-col rounded-[10px] border-[1px] text-[#505050] ${
          users && users?.length > 5 ? "overflow-y-scroll" : ""
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
          <div className="w-[100px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-3 rounded-[24px]">
            UID
          </div>
          <div className="w-[140px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-3 rounded-[24px]">
            Username
          </div>
          <div className="w-[140px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-3 rounded-[24px]">
            Surname
          </div>
          <div className="w-[140px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-3 rounded-[24px]">
            First name
          </div>
          <div className="w-[260px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-3 rounded-[24px]">
            Email
          </div>
          <div className=" w-[140px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-3 rounded-[24px]">
            Role
          </div>
          <div className=" w-[140px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-3 rounded-[24px]">
            Contact No.
          </div>
          <div className=" w-[140px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-3 rounded-[24px]">
            Status
          </div>
          {selectedUsers.length > 1 ? (
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
            <div className="w-[140px] whitespace-nowrap whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-3 rounded-[24px]">
              <span>Actions</span>
            </div>
          )}
        </div>

        {users.length ? (
          <>
            {users?.map((user, k) => (
              <div
                className={`w-100 flex items-center gap-4 px-6 ${
                  k % 2 === 0 ? "bg-[#f5f5f5]" : "bg-white"
                }`}
                key={k}
              >
                <div className="w-[30px] h-[60px] flex justify-start items-center">
                  <input
                    type="checkbox"
                    checked={selectedUsers?.includes(user?._id)}
                    onChange={() => toggleUserSelection(user?._id)}
                    className="w-[18px] h-[18px]"
                  />
                </div>
                <div className="w-[100px] whitespace-nowrap flex justify-between items-center py-1 px-3 rounded-[4px]">
                  {user?.uid}
                </div>
                <div className="w-[140px] whitespace-nowrap flex justify-between items-center py-1 px-3 rounded-[4px]">
                  {user?.userName}
                </div>
                <div className="w-[140px] whitespace-nowrap flex justify-between items-center py-1 px-3 rounded-[4px]">
                  {user?.surName}
                </div>
                <div className="w-[140px] whitespace-nowrap flex justify-between items-center py-1 px-3 rounded-[4px]">
                  {user?.firstName}
                </div>
                <div className="w-[260px] whitespace-nowrap flex justify-between items-center py-1 px-3 rounded-[4px]">
                  {user?.email}
                </div>
                <div className="w-[140px] whitespace-nowrap flex justify-between items-center py-1 px-3 rounded-[4px]">
                  {user?.role}
                </div>
                <div className="w-[140px] whitespace-nowrap flex justify-between items-center py-1 px-3 rounded-[4px]">
                  {user?.contactNo}
                </div>
                <div className="w-[140px] whitespace-nowrap flex justify-between items-center py-1 px-3 rounded-[4px]">
                  {user?.statusOfUser}
                </div>
                <div className="w-[140px] whitespace-nowrap flex justify-between items-center py-1 px-3 rounded-[4px] gap-2">
                  {selectedUsers?.length < 2 ? (
                    <>
                      <div className="p-2 bg-[white] border-[1px] border-[#007bff] rounded-[18px] cursor-pointer">
                        <BsEye className="text-[18px] text-[#007bff]" />
                      </div>
                      <div
                        onClick={() => handleUserEditClick(user)}
                        className="p-2 bg-[white] border-[1px] border-[#FFBF00] rounded-[18px] cursor-pointer"
                      >
                        <BsPen className="text-[18px] text-[#FFBF00]" />
                      </div>
                      <div
                        onClick={() => handleClickDelete(user?._id)}
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
            ))}
          </>
        ) : (
          <div className="w-100 h-[306px] flex flex-col justify-center items-center gap-2 text-[#707070] border-t-[1px] border-t-[#f0f0f0]">
            <BsFolder2Open className="text-[42px]" />
            <div className="text-[16px]">No users available</div>
          </div>
        )}
      </div>
    </>
  );
};

export default UsersTable;
