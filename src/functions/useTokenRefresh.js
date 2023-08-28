import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshLogin } from './refreshLogin';

const useTokenRefresh = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (!user.token && token) {
      refreshLogin(dispatch);
    }
  }, [user.token, dispatch]);
};

export default useTokenRefresh;