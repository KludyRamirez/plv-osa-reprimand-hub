import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useRefreshToken from './useRefreshToken';
import Loading from './Loading';

import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useRefreshToken();
  const auth = useSelector(authSelector);

  const verifyRefreshToken = async () => {
    try {
      await refresh();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    !auth?.userDetails?.token ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return <>{isLoading ? <Loading /> : <Outlet />}</>;
};

export default PersistLogin;
