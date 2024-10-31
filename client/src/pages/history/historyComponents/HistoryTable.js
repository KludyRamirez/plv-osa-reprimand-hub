import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { BsFolderX, BsEscape, BsChevronUp, BsCapslock } from 'react-icons/bs';
import TimeExtractor from '../../../externalUtils/TimeExtractor';

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
      <div className="w-full overflow-x-auto">
        <div className="w-full h-[444px] flex flex-col rounded-[10px] border-[1px] text-[#505050] overflow-y-scroll">
          <div className="w-[fit-content] flex items-center gap-4 px-6">
            <div className="w-[30px] h-[60px] flex justify-start items-center">
              <input
                type="checkbox"
                className="w-[18px] h-[18px]"
                checked={selectAll}
                onChange={toggleSelectAll}
              />
            </div>
            <div className="w-[80px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-3 rounded-[24px]">
              UID
            </div>
            <div className="w-[200px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-3 rounded-[24px]">
              Username
            </div>
            <div className="w-[170px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-3 rounded-[24px]">
              Type
            </div>
            <div className="w-[380px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-3 rounded-[24px]">
              Message
            </div>
            <div className="w-[120px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-3 rounded-[24px]">
              Activity
            </div>
            <div className="w-[180px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-3 rounded-[24px]">
              <span>Date</span>
            </div>
            <div className="w-[150px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-3 rounded-[24px]">
              <span>Time</span>
            </div>

            {selectedHistory?.length > 1 ? (
              <>
                <div className="flex justify-start items-center gap-2">
                  <div
                    className="flex gap-1 justify-start items-center py-1 px-2 bg-[green] border-[1px] border-[green] text-white text-[14px] rounded-[4px] cursor-pointer"
                    // onClick={exportPDF}
                  >
                    <span>Export</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-[111px] whitespace-nowrap flex justify-start items-center border-[1px] py-1 px-3 rounded-[24px]">
                <span>Actions</span>
              </div>
            )}
          </div>

          {history.length > 0 ? (
            <>
              {history?.map((h, k) => (
                <div
                  className={`w-[fit-content]
              flex items-center gap-4 px-6 ${
                k % 2 === 0 ? 'bg-gray-100' : 'bg-white'
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
                  <div className="w-[80px] whitespace-nowrap flex justify-center items-center py-1 px-3 rounded-[4px] text-[#606060]">
                    {h?.userId?.uid}
                  </div>
                  <div className="w-[200px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[4px]">
                    {h?.userId?.userName}
                  </div>
                  <div className="w-[170px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[4px]">
                    {h?.typeOfNotif}
                  </div>
                  <div className="w-[380px] flex justify-start items-center py-1 px-3 rounded-[4px]">
                    {h?.message}..
                  </div>
                  <div className="w-[120px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[4px]">
                    <span>{h?.actionOfNotif}</span>
                  </div>
                  <div className="w-[180px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[4px]">
                    {new Date(h?.createdAt)?.toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                  <div className="w-[150px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[4px]">
                    <TimeExtractor date={h?.createdAt} />
                  </div>
                  <div className="w-[111px] whitespace-nowrap flex justify-start items-center">
                    {selectedHistory.length < 2 ? (
                      allowedRoles?.find((ar) =>
                        auth?.userDetails?.role?.includes(ar)
                      ) ? (
                        <>
                          <div
                            // onClick={() => handleCasePatchClick(c)}
                            className="relative container w-[36px] h-[36px] flex justify-center items-center bg-white border-[1px] border-[#007bff] rounded-[18px] cursor-pointer"
                          >
                            <BsCapslock className="text-[18px] text-[#007bff] transform rotate-[180deg] mt-[2px]" />
                            <div className="absolute bg-gradient-to-br from-[#007bff] via-[#079bff] to-[#007bff] py-2 px-4 top-[-62px] left-[-16px] rounded-[32px] text-[#606060] additional-content z-40">
                              <span className="text-[16px] text-white">
                                Download PDF
                              </span>
                            </div>
                            <div className="absolute top-[-38px] left-[7px] w-[20px] h-[20px] bg-gradient-to-br from-[#007bff] via-[#079bff] to-[#079bff] transform rotate-[45deg] additional-content z-10"></div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-[36px] h-[36px] flex justify-center items-center bg-gray-200 rounded-[18px]">
                            <BsCapslock className="text-[18px] text-white transform rotate-[180deg] mt-[2px]" />
                          </div>
                        </>
                      )
                    ) : (
                      <>
                        <div className="w-[36px] h-[36px] flex justify-center items-center bg-gray-200 rounded-[18px]">
                          <BsCapslock className="text-[18px] text-white transform rotate-[180deg] mt-[2px]" />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="w-100 h-[444px] flex flex-col justify-center items-center gap-2 text-[#808080] border-t-[1px] border-t-[#f0f0f0]">
              <BsFolderX className="text-[42px]" />
              <div className="text-[16px]">No history available</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HistoryTable;
