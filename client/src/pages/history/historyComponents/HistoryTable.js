import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { BsFolderX, BsEscape } from "react-icons/bs";
import TimeExtractor from "../../../externalUtils/TimeExtractor";

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const HistoryTable = ({
  history,
  selectedHistory,
  setSelectedHistory,
  allowedRoles,
}) => {
  const [selectAll, setSelectAll] = useState(false);

  const auth = useSelector(authSelector);

  useEffect(() => {
    if (history.length > 0 && selectedHistory.length === history.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedHistory, history]);

  const toggleHistorySelection = (hId) => {
    let updatedSelectedHistory = [...selectedHistory];

    if (updatedSelectedHistory.includes(hId)) {
      updatedSelectedHistory = updatedSelectedHistory.filter(
        (id) => id !== hId
      );
    } else {
      updatedSelectedHistory = [...updatedSelectedHistory, hId];
    }

    setSelectedHistory(updatedSelectedHistory);
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);

    if (!selectAll) {
      setSelectedHistory(history.map((h) => h?._id));
    } else {
      setSelectedHistory([]);
    }
  };

  return (
    <>
      <div className="flex justify-start gap-8">
        <div
          className={`w-[100%] h-[366px] bg-white flex flex-col text-[#505050] phone:overflow-x-scroll ${
            history && history.length > 5 ? "overflow-y-scroll" : ""
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
            <div className="w-[60px] whitespace-nowrap flex justify-start items-center border-[1px] border-blue-200 py-1 px-3 rounded-[24px]">
              UID
            </div>
            <div className="w-[150px] whitespace-nowrap flex justify-start items-center border-[1px] border-blue-200 py-1 px-3 rounded-[24px]">
              Username
            </div>
            <div className="w-[180px] whitespace-nowrap flex justify-start items-center border-[1px] border-blue-200 py-1 px-3 rounded-[24px]">
              Type
            </div>
            <div className="w-[340px] whitespace-nowrap flex justify-start items-center border-[1px] border-blue-200 py-1 px-3 rounded-[24px]">
              Message
            </div>
            <div className="w-[120px] whitespace-nowrap flex justify-start items-center border-[1px] border-blue-200 py-1 px-3 rounded-[24px]">
              Activity
            </div>
            <div className="w-[150px] whitespace-nowrap flex justify-start items-center border-[1px] border-blue-200 py-1 px-3 rounded-[24px]">
              <span>Date</span>
            </div>
            <div className="w-[150px] whitespace-nowrap flex justify-start items-center border-[1px] border-blue-200 py-1 px-3 rounded-[24px]">
              <span>Time</span>
            </div>

            {selectedHistory?.length > 1 ? (
              <>
                <div className="w-[1px] h-[20px] border-[1px]"></div>
                <div className="flex gap-2 justify-start items-center py-1 px-2 bg-[#007bff] border-[1px] border-[#007bff] text-white text-[14px] rounded-[4px] cursor-pointer">
                  <span>Export</span>
                  <BsEscape className="text-[14px]" />
                </div>
              </>
            ) : (
              <div className="w-[100px] whitespace-nowrap flex justify-start items-center border-[1px] border-blue-200 py-1 px-3 rounded-[24px]">
                <span>Actions</span>
              </div>
            )}
          </div>

          {history.length > 0 ? (
            <>
              {history?.map((h, k) => (
                <div
                  className={`phone:w-[fit-content]
              flex items-center gap-4 px-6 ${
                k % 2 === 0
                  ? "bg-gradient-to-br from-white to-[#f5fbff] border-[1px] border-blue-100 rounded-[8px]"
                  : "bg-[#fefefe]"
              }`}
                  key={k}
                >
                  <div className="w-[30px] h-[60px] flex justify-start items-center">
                    <input
                      type="checkbox"
                      className="w-[18px] h-[18px]"
                      checked={selectedHistory?.includes(h?._id)}
                      onChange={() => toggleHistorySelection(h?._id)}
                    />
                  </div>
                  <div className="w-[60px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[4px] text-[#606060]">
                    {h?.userId?.uid}
                  </div>
                  <div className="w-[150px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[4px]">
                    {h?.userId?.userName}
                  </div>
                  <div className="w-[180px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[4px]">
                    {h?.typeOfNotif}
                  </div>
                  <div className="w-[340px] flex justify-start items-center py-1 px-3 rounded-[4px]">
                    {h?.message}..
                  </div>
                  <div className="w-[120px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[4px] text-[green]">
                    <span>{h?.actionOfNotif}</span>
                  </div>
                  <div className="w-[150px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[4px]">
                    {new Date(h?.createdAt)?.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <div className="w-[150px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[4px] text-[#007bff]">
                    <TimeExtractor date={h?.createdAt} />
                  </div>
                  {selectedHistory.length < 2 ? (
                    allowedRoles?.find((ar) =>
                      auth?.userDetails?.role?.includes(ar)
                    ) ? (
                      <>
                        <div className="flex gap-2 justify-start items-center py-1 px-2 bg-[#007bff] border-[1px] border-[#007bff] text-white text-[14px] rounded-[4px] cursor-pointer">
                          <span>Export</span>
                          <BsEscape className="text-[14px]" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex gap-2 justify-start items-center py-1 px-2 bg-gray-100 border-[1px] border-gray-100 text-white text-[14px] rounded-[4px] cursor-pointer">
                          <span>Export</span>
                          <BsEscape className="text-[14px]" />
                        </div>
                      </>
                    )
                  ) : (
                    <>
                      <div className="flex gap-2 justify-start items-center py-1 px-2 bg-gray-100 border-[1px] border-gray-100 text-white text-[14px] rounded-[4px] cursor-pointer">
                        <span>Export</span>
                        <BsEscape className="text-[14px]" />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </>
          ) : (
            <div className="w-100 h-[323px] flex flex-col justify-center items-center gap-2 text-[#909090] border-t-[1px] border-t-[#f0f0f0]">
              <BsFolderX className="text-[42px]" />
              <div className="text-[16px]">No history available</div>
            </div>
          )}
        </div>
        {/* <div className="flex flex-col gap-4">
          <div className="p-2 w-[236px] h-[179px] bg-white border-[1px] border-[#007bff] rounded-[4px] flex flex-col items-center gap-5 relative overflow-hidden">
            <div className="mt-[-46px] w-[100%] h-[100%] flex justify-center items-end">
              <div className=" text-[48px] text-[#007bff] font-bold">
                {todayHistory?.length}
              </div>
            </div>
            <div className="text-[16px] text-[#007bff]">Activities Today</div>
            <svg
              className="absolute top-0 left-0"
              viewBox="0 0 500 500"
              preserveAspectRatio="xMinYMin meet"
            >
              <path
                d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
                style={{ stroke: "none", fill: "rgba(219, 234, 254, 1)" }}
              ></path>
            </svg>
          </div>
          <div className="p-2 w-[236px] h-[179px] bg-white border-[1px] border-[green] rounded-[4px] flex flex-col items-center gap-5 relative overflow-hidden">
            <div className="pl-1 w-[100%] h-[100%] flex justify-center items-end"></div>
            <div className="text-[16px] text-[green]"></div>
            <svg
              className="absolute top-0 left-0"
              viewBox="0 0 500 500"
              preserveAspectRatio="xMinYMin meet"
            >
              <path
                d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
                style={{ stroke: "none", fill: "rgba(254, 249, 195, 1)" }}
              ></path>
            </svg>
          </div>
          <div className="p-2 w-[236px] h-[179px] bg-white border-[1px] border-[#FFA500] rounded-[4px] flex flex-col items-center gap-5 relative overflow-hidden">
            <div className="pl-1 w-[100%] h-[100%] flex justify-center items-end"></div>
            <div className="text-[16px] text-[#FFA500]"></div>
            <svg
              className="absolute top-0 left-0"
              viewBox="0 0 500 500"
              preserveAspectRatio="xMinYMin meet"
            >
              <path
                d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
                style={{ stroke: "none", fill: "rgba(255, 237, 213, 1)" }}
              ></path>
            </svg>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default HistoryTable;
