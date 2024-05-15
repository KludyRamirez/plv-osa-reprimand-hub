import React from "react";
import { BsFilter, BsX } from "react-icons/bs";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { FaPlus } from "react-icons/fa6";

const PatchCaseStatusFormModal = ({
  handleChange,
  handleAppealChange,
  handlePatchCase,
  handleCloseModalPatch,
  updatedValues,
  statusOfCases,
}) => {
  return (
    <>
      <form onSubmit={(e) => handlePatchCase(e)}>
        <div className="p-10">
          <div className="text-[28px] text-[#077bff] font-semibold flex justify-between">
            Edit Status?
            <BsX
              onClick={handleCloseModalPatch}
              className="text-[36px] cursor-pointer"
            />
          </div>

          <div className="text-[#606060] pt-8 flex flex-col gap-6">
            <div className="flex justify-start items-center gap-2 ">
              <span>Case Status</span>
              <BsFilter className="text-[22px]" />
            </div>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={updatedValues?.statusOfCase}
              onChange={handleChange}
            >
              <div className="w-100 flex justify-start gap-x-1 gap-y-3 flex-wrap pl-3">
                {statusOfCases.map((s) => (
                  <FormControlLabel
                    name="statusOfCase"
                    value={s}
                    control={<Radio id={s} sx={{ display: "none" }} />}
                    label={
                      <div
                        className={`px-4 py-2 border-[1px] rounded-[24px] ${
                          updatedValues.statusOfCase === s
                            ? "border-[#007bff] bg-[#007bff] text-white"
                            : ""
                        }`}
                      >
                        {s}
                      </div>
                    }
                  />
                ))}
              </div>
            </RadioGroup>
          </div>
          {updatedValues?.statusOfCase === "Appeal" ? (
            <div className="w-100 border-[1px] mt-8 rounded-[8px] p-4 flex flex-col gap-4 text-[#606060]">
              <div>Do you want to appeal your case?</div>

              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="appeal"
                value={updatedValues?.appeal}
                onChange={handleAppealChange}
                className="pl-2"
              >
                <div className="flex justify-start gap-2">
                  <FormControlLabel
                    value={true}
                    control={<Radio id="yes" />}
                    label={
                      <div className={`px-4 py-2 rounded-[4px] `}>
                        Yes, I want to appeal
                      </div>
                    }
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio id="no" />}
                    label={
                      <div className={`px-4 py-2 rounded-[4px] `}>
                        No, I do not
                      </div>
                    }
                  />
                </div>
              </RadioGroup>
            </div>
          ) : null}

          <div className="w-100 pt-8 flex justify-end items-center">
            {updatedValues?.statusOfCase !== "" ? (
              <button
                type="submit"
                className="py-3 px-3 bg-[#007bff] text-[white] text-[16px] flex gap-2 items-center rounded-[8px]"
              >
                <FaPlus />
                <div>Edit Status</div>
              </button>
            ) : (
              <button
                disabled
                type="submit"
                className="py-3 px-3 bg-blue-300 text-[white] text-[16px] flex gap-2 items-center rounded-[8px]"
              >
                <FaPlus />
                <div>Edit Status</div>
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default PatchCaseStatusFormModal;
