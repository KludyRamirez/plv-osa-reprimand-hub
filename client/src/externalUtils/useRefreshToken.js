import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/actions/AuthActions";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URI}/refresh`, {
        withCredentials: true,
      });

      if (res?.data) {
        dispatch(
          setUserDetails({
            _id: res?.data?.userDetails?._id,
            token: res?.data?.userDetails?.token,
            role: res?.data?.userDetails?.role,
            userName: res?.data?.userDetails?.userName,
          })
        );

        setTimeout(() => {
          return res.data.userDetails.token;
        }, 100);
      }
    } catch (err) {
      console.error("Failed to refresh token", err);
    }
  };

  return refresh;
};

export default useRefreshToken;
