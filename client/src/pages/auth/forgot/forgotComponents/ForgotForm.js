import React from "react";
import { BsEnvelope, BsEnvelopeAt, BsEnvelopeOpen } from "react-icons/bs";

const ForgotForm = ({
  status,
  handleGetEmail,
  handleSubmitEmail,
  FormTitle,
  emailError,
  email,
  countdown,
}) => {
  return (
    <div className="w-[500px] flex flex-col gap-4">
      <div className="flex items-center justify-start border-[1px] py-4 px-4 bg-blue-900 relative rounded-[4px]">
        <FormTitle
          sx={{
            backgroundImage:
              "radial-gradient(100% 100% at 100% 0, white 0, white 100%)",
            fontSize: "36px",
            lineHeight: "normal",
          }}
        >
          Verify your email
        </FormTitle>

        <div className="absolute top-[20px] right-[40px] w-[120px] h-[120px] rounded-[50%] bg-white flex justify-center items-center">
          <div className="text-[36px] text-blue-900 flex justify-center items-center w-[100px] h-[100px] border-[2px] border-blue-900 rounded-[50%]">
            <BsEnvelopeAt className="text-blue-900 text-[36px]" />
          </div>
        </div>
      </div>

      <div className="mt-8 px-6 flex justify-start items-center gap-2 text-blue-900">
        <span>Email</span>
      </div>
      <input
        type="email"
        value={email}
        onChange={(e) => handleGetEmail(e)}
        placeholder="e.g. example@domain.com"
        className={` py-3 px-6 border-[1px] hover:border-[#007bff] rounded-[48px] w-[100%] bg-white ${
          emailError === "" ? "" : "border-[red]"
        } focus:outline-none focus:border-[#007bff]`}
      />
      {emailError && <p className="text-red-500 ml-6">{emailError}</p>}
      <button
        className="mt-3 p-3 border-[1px] border-[#007bff] rounded-[48px] w-[100%] bg-[#007bff] text-white"
        onClick={handleSubmitEmail}
      >
        Submit
      </button>
      <div className="mt-4">
        {status === "success" && (
          <div className="flex flex-col gap-4">
            <div className="bg-blue-200 py-4 px-6 w-[100%] text-blue-900 h-[80px] flex justify-center items-center rounded-[4px]">
              <span className="">
                Request was successful. Please check your email.
              </span>
            </div>
            <div className="text-white rounded-[4px] mt-8 flex items-center justify-end border-[1px] h-[77px] px-4 bg-blue-900 relative">
              <span className="">
                Redirecting you to login page in {countdown} seconds
              </span>
              <div className="absolute bottom-[20px] left-[40px] w-[120px] h-[120px] rounded-[50%] bg-white flex justify-center items-center">
                <div className="text-[36px] text-blue-900 flex justify-center items-center w-[100px] h-[100px] border-[2px] border-blue-900 rounded-[50%]">
                  {countdown}
                </div>
              </div>
            </div>
          </div>
        )}
        {status === "error" && (
          <div className="bg-red-100 py-4 px-6 w-[100%] text-[#ff3131] h-[80px] flex justify-start items-center rounded-[4px]">
            <span className="">
              The email you entered does not exist on our database. Please try
              again.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotForm;
