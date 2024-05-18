import React from "react";

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
    <div className="w-[500px] flex flex-col gap-4 zIndex-2">
      <div className="flex items-center justify-start relative">
        <FormTitle
          sx={{
            backgroundImage:
              "radial-gradient(100% 100% at 100% 0, #007bff 0, #007bff 100%)",
            fontSize: "36px",
            lineHeight: "normal",
          }}
        >
          Verify your email
        </FormTitle>
      </div>

      <div className="mt-4 flex justify-start items-center gap-2 text-blue-900">
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
      {emailError && <p className="text-red-500">{emailError}</p>}
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
              <span className="mr-2">
                Redirecting you to login page in {countdown} seconds.
              </span>
              <div className="absolute bottom-[20px] left-[40px] w-[120px] h-[120px] rounded-[50%] bg-white flex justify-center items-center">
                <div className="text-[36px] text-white flex justify-center items-center w-[100px] h-[100px] bg-[#007bff] rounded-[50%]">
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
