import { ApiContext } from '@/application/contexts';
import { AccessDeniedError } from '@/domain/errors';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

type CallBackType = (error: Error) => void;
type ResultType = CallBackType;

export const useErrorHandler = (callback: CallBackType): ResultType => {
  const { setCurrentAccount } = useContext(ApiContext);
  const navigate = useNavigate();

  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      setCurrentAccount(undefined);
      navigate('/login');
    } else {
      callback(error);
    }
  };
};
