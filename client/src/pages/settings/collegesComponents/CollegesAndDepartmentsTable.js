import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import axios from "axios";
import { BsFolder2Open, BsTrash3, BsTrash3Fill } from "react-icons/bs";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/system";
import DeleteCadModal from "./DeleteCadModal";
import toast from "react-hot-toast";
import DeleteManyCadModal from "./DeleteManyCadModal";
import { useNavigate } from "react-router-dom";

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

const CollegesAndDepartmentsTable = ({
  cads,
  getCads,
  selectedCads,
  setSelectedCads,
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [cadDeleteId, setCadDeleteId] = useState("");
  const [showDeleteCadModal, setShowDeleteCadModal] = useState(false);
  const [showDeleteManyCadModal, setShowDeleteManyCadModal] = useState(false);

  const auth = useSelector(authSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (cads.length > 0 && selectedCads.length === cads.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedCads, cads]);

  const toggleCadsSelection = (cadId) => {
    let updatedSelectedCads = [...selectedCads];

    if (updatedSelectedCads.includes(cadId)) {
      updatedSelectedCads = updatedSelectedCads.filter((id) => id !== cadId);
    } else {
      updatedSelectedCads = [...updatedSelectedCads, cadId];
    }

    setSelectedCads(updatedSelectedCads);
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);

    if (!selectAll) {
      setSelectedCads(cads.map((c) => c._id));
    } else {
      setSelectedCads([]);
    }
  };

  const deleteSelectedCads = async () => {
    try {
      if (!auth.userDetails || !auth.userDetails.token) {
        toast.error("Authentication token not found.");
        navigate("/");
        return;
      }

      const res = await axios.delete(
        `${process.env.REACT_APP_API_URI}/cads/deleteSelected`,
        {
          data: { cads: selectedCads },
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${auth?.userDetails?.token}`,
          },
        }
      );
      setSelectedCads([]);
      setSelectAll(false);
      getCads();
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error deleting selected Cads:", error);
      if (error.response) {
        if (error.response.status === 403) {
          console.error("Unauthorized access. Please check your permissions.");
          navigate("/forbidden");
        } else {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error("An error occurred while deleting the selected Cads.");
      }
    }
  };

  const deleteOneCad = async (id) => {
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URI}/cad/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${auth?.userDetails?.token}`,
          },
        }
      );
      getCads();
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error deleting college:", error);
    }
  };

  const handleClickDelete = (id) => {
    setCadDeleteId(id);
    setShowDeleteCadModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (cadDeleteId) {
        await deleteOneCad(cadDeleteId);
      }
    } catch (error) {
      console.error("Error deleting schedule:", error);
    } finally {
      setShowDeleteCadModal(false);
      getCads();
    }
  };

  const handleCloseModal = () => {
    setShowDeleteCadModal(false);
  };

  // delete many modal

  const handleOpenModalDeleteMany = () => {
    setShowDeleteManyCadModal(true);
  };

  const handleCloseModalDeleteMany = () => {
    setShowDeleteManyCadModal(false);
  };

  return (
    <>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showDeleteCadModal}
        onClose={handleCloseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox sx={{ width: "22%" }}>
          <DeleteCadModal
            handleConfirmDelete={handleConfirmDelete}
            handleCloseModal={handleCloseModal}
          />
        </ModalBox>
      </Modal>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showDeleteManyCadModal}
        onClose={handleCloseModalDeleteMany}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox sx={{ width: "22%" }}>
          <DeleteManyCadModal
            deleteSelectedCads={deleteSelectedCads}
            handleCloseModalDeleteMany={handleCloseModalDeleteMany}
          />
        </ModalBox>
      </Modal>
      <div
        className={`flex-grow bg-white flex flex-col rounded-[10px] border-[1px] text-[#505050] h-[289px] ${
          cads && cads.length > 4 ? "overflow-y-scroll" : ""
        }`}
      >
        <div className="phone:w-[fit-content] flex items-center gap-4 px-6">
          <div className="w-[30px] h-[60px] flex justify-start items-center">
            <input
              type="checkbox"
              className="w-[18px] h-[18px]"
              checked={selectAll}
              onChange={toggleSelectAll}
            />
          </div>
          <div className="w-[60px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-3 rounded-[24px]">
            ID
          </div>
          <div className="w-[86px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-3 rounded-[24px]">
            College
          </div>
          <div className="w-[574px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-3 rounded-[24px]">
            Department
          </div>

          {selectedCads.length > 1 ? (
            <>
              <div className="w-[1px] h-[20px] border-[1px]"></div>
              <div
                className="flex gap-2 justify-start items-center py-1 px-3 bg-[#ff3131] border-[1px] border-[#ff3131] text-white text-[16px] rounded-[4px] cursor-pointer"
                onClick={handleOpenModalDeleteMany}
              >
                <span>Delete</span>
              </div>
            </>
          ) : (
            <div className="w-[100px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-3 rounded-[24px]">
              <span>Actions</span>
            </div>
          )}
        </div>

        {cads.length > 0 ? (
          <>
            {cads?.map((cad, k) => {
              return (
                <div
                  className={`w-[100%] flex items-center gap-4 px-6 ${
                    k % 2 === 0
                      ? "bg-gradient-to-br from-gray-100 to-gray-100"
                      : "bg-white"
                  }`}
                  key={k}
                >
                  <div className="w-[30px] h-[60px] flex justify-start items-center">
                    <input
                      type="checkbox"
                      checked={selectedCads?.includes(cad?._id)}
                      onChange={() => toggleCadsSelection(cad?._id)}
                      className="w-[18px] h-[18px]"
                    />
                  </div>
                  <div className="w-[60px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[4px]">
                    {cad?.uid}
                  </div>
                  <div className="w-[86px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[4px]">
                    {cad?.college}
                  </div>
                  <div className="w-[574px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[4px]">
                    {cad?.department}
                  </div>

                  {selectedCads.length < 2 ? (
                    <>
                      <div
                        onClick={() => handleClickDelete(cad?._id)}
                        className="p-2 bg-[white] border-[1px] border-[#FF3131] rounded-[18px] cursor-pointer"
                      >
                        <BsTrash3 className="text-[18px] text-[#FF3131]" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-2 bg-[#efefef] rounded-[18px]">
                        <BsTrash3Fill className="text-[18px] text-white" />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </>
        ) : (
          <div className="w-100 flex-grow flex flex-col justify-center items-center gap-2 text-[#787878] border-t-[1px] border-t-[#f0f0f0]">
            <BsFolder2Open className="text-[42px]" />
            <div className="text-[16px]">No colleges available</div>
          </div>
        )}
      </div>
    </>
  );
};

export default CollegesAndDepartmentsTable;
