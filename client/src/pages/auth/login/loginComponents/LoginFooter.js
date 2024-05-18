import React from "react";
import {
  BsFacebook,
  BsGithub,
  BsGlobe2,
  BsGoogle,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
} from "react-icons/bs";

import { FaRegCopyright } from "react-icons/fa6";

const LoginFooter = () => {
  return (
    <div>
      <div className="w-[100%] flex flex-col fixed bottom-0 items-center zIndex-2">
        <div className="py-6 px-8 w-[96%] flex justify-between items-center bg-[#007bff] rounded-tl-[18px] rounded-tr-[18px]">
          <div className="flex flex-col gap-3">
            <div className="flex justify-start items-center text-[16px] text-white gap-2">
              <span>Pamantasan ng Lungsod ng Valenzuela</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-end items-center gap-2">
              <div className="text-[16px] text-white">
                Kludy Ramirez, Kevin Fuerzas
              </div>
              <FaRegCopyright className="text-[18px] text-white" />
            </div>
          </div>
        </div>
        <div className="w-[96%] py-6 px-8 border-[1px] flex justify-between items-center bg-white">
          <div className="flex flex-col gap-3">
            <div className="flex justify-start items-center text-[16px] text-[#007bff] gap-2">
              <FaRegCopyright />
              <span>Copyright 2024 Office of Student Affairs</span>
            </div>

            <div className="flex justify-start items-center gap-4 ">
              <BsFacebook className="text-[24px] text-[#007bff]" />
              <BsTwitter className="text-[24px] text-[#007bff]" />
              <BsGoogle className="text-[24px] text-[#007bff]" />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-end items-center gap-2">
              <div className="text-[16px] text-[#007bff]">
                Know more about us
              </div>
              <BsGlobe2 className="text-[18px] text-[#007bff]" />
            </div>
            <div className="flex justify-end items-center gap-4 ">
              <BsLinkedin className="text-[24px] text-[#007bff]" />
              <BsGithub className="text-[24px] text-[#007bff]" />
              <BsInstagram className="text-[24px] text-[#007bff]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginFooter;
