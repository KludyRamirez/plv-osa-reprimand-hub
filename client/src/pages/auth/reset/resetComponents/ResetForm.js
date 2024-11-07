import React from 'react';

const ResetForm = ({
  password,
  confirmPassword,
  status,
  handleSubmitPassword,
  FormTitle,
  handleGetPassword,
  handleGetConfirmPassword,
  passwordError,
  confirmPasswordError,
  countdown,
}) => {
  return (
    <div className="w-[500px] flex flex-col gap-4 z-20">
      <div className="flex items-center justify-start relative">
        <FormTitle
          sx={{
            backgroundImage:
              'radial-gradient(100% 100% at 100% 0, #006bff 0, #006bff 100%)',
            fontSize: '36px',
            lineHeight: 'normal',
          }}
        >
          Confirm password
        </FormTitle>
      </div>

      <div className="mt-4 flex justify-start items-center gap-2 text-blue-900">
        <span>Password</span>
      </div>
      <input
        type="password"
        value={password}
        onChange={(e) => handleGetPassword(e)}
        placeholder="Enter password"
        className={` py-3 px-6 border-[1px] hover:border-[#006bff] rounded-[48px] w-[100%] bg-white ${
          passwordError === '' ? '' : 'border-[red]'
        } focus:outline-none focus:border-[#006bff]`}
      />
      {passwordError && <p className="text-red-500">{passwordError}</p>}
      <div className="mt-4 flex justify-start items-center gap-2 text-blue-900">
        <span>Confirm Password</span>
      </div>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => handleGetConfirmPassword(e)}
        placeholder="Confirm password"
        className={` py-3 px-6 border-[1px] hover:border-[#006bff] rounded-[48px] w-[100%] bg-white ${
          confirmPasswordError === '' ? '' : 'border-[red]'
        } focus:outline-none focus:border-[#006bff]`}
      />
      {confirmPasswordError && (
        <p className="text-red-500">{confirmPasswordError}</p>
      )}
      {password !== '' &&
      confirmPassword !== '' &&
      passwordError === '' &&
      confirmPasswordError === '' &&
      password === confirmPassword ? (
        <button
          className="mt-3 p-3 border-[1px] border-[#006bff] rounded-[48px] w-[100%] bg-[#006bff] text-white"
          onClick={handleSubmitPassword}
        >
          Submit
        </button>
      ) : (
        <button className="mt-3 p-3 border-[1px] border-blue-400 rounded-[48px] w-[100%] bg-blue-400 text-white">
          Submit
        </button>
      )}

      <div className="mt-4">
        {status === 'success' && (
          <div className="flex flex-col gap-4">
            <div className="bg-blue-200 py-4 px-6 w-[100%] text-blue-900 h-[80px] flex justify-center items-center rounded-[4px]">
              <span className="">
                Password changed successfully. You can now close this window or
                wait for automatic redirection.
              </span>
            </div>
            <div className="text-white rounded-[4px] mt-8 flex items-center justify-end border-[1px] h-[77px] px-4 bg-blue-900 relative">
              <span className="mr-2">
                Redirecting you to login page in {countdown} seconds.
              </span>
              <div className="absolute bottom-[20px] left-[40px] w-[120px] h-[120px] rounded-[50%] bg-white flex justify-center items-center">
                <div className="text-[36px] text-white flex justify-center items-center w-[100px] h-[100px] bg-[#006bff] rounded-[50%]">
                  {countdown}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetForm;
