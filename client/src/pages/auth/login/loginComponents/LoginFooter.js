import React from "react";
import { BsFacebook, BsGithub, BsLinkedin } from "react-icons/bs";

import { FaRegCopyright } from "react-icons/fa6";
import osaLogo from "../../../../images/osalogo.jpg";

const LoginFooter = () => {
  return (
    <div>
      <div className="w-[100%] flex flex-col fixed bottom-0 items-center zIndex-2">
        <div className=" w-[96%] h-[100px] px-8 py-6 flex justify-between items-start bg-[#007bff] rounded-tl-[24px] rounded-tr-[24px]">
          <div className="flex flex-col gap-3">
            <div className="flex justify-start items-start text-[16px] text-white gap-4">
              <img
                src={osaLogo}
                alt=""
                className="w-[50px] h-[50px] rounded-[50%]"
              />
              <div className="flex flex-col items-start gap-[3px] mt-[2px]">
                <div className="text-[16px] text-white font-semibold ">
                  Office of Student Affairs
                </div>
                <div className="text-[14px]">PLV</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <div className="flex justify-end items-center gap-2">
                <div className="text-[16px] text-[white]">
                  <div className="flex justify-end items-center gap-4 ">
                    <a href="https://facebook.com" target="_blank">
                      <BsFacebook className="text-[24px] text-white cursor-pointer" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/kludyramirez/"
                      target="_blank"
                    >
                      <BsLinkedin className="text-[24px] text-white cursor-pointer" />
                    </a>
                    <a href="https://github.com/KludyRamirez" target="_blank">
                      <BsGithub className="text-[24px] text-white cursor-pointer" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="w-[96%] py-4 px-8 border-l-[1px] border-r-[1px] border-b-[1px] flex justify-between items-center bg-white relative">
          <div className="flex flex-col gap-3">
            <div className="flex justify-start items-center text-[16px] text-[#007bff] gap-2">
              <FaRegCopyright />
              <span>
                Copyright 2024 Kludy Ramirez, Kevin Clyde Fuerzas - All Rights
                Reserved.
              </span>
            </div>
          </div>
         
          <div className="absolute top-[-4px] left-[950px] w-[60px] h-[60px] transform rotate-[45deg] bg-white zIndex-3"></div>
          <div className="absolute top-[-12px] left-[980px] w-[60px] h-[60px] transform rotate-[45deg] bg-white zIndex-3"></div>
          <div className="absolute top-[-18px] left-[1030px] w-[60px] h-[60px] transform rotate-[45deg] bg-white zIndex-3"></div>
        </div> */}
      </div>
    </div>
  );
};

export default LoginFooter;
