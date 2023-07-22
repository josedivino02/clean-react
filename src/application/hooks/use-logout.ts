import { ApiContext } from '@/application/contexts';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

type ResultType = () => void;

export const useLogout = (): ResultType => {
  const { setCurrentAccount } = useContext(ApiContext);
  const navigate = useNavigate();

  return (): void => {
    setCurrentAccount(undefined);
    navigate('/login');
  };
};
