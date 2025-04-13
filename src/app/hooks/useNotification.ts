import { useDispatch } from 'react-redux';
import { addNotification } from '../store/notificationSlice';

export const useNotification = () => {
  const dispatch = useDispatch();

  return {
    showNotification: (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
      dispatch(addNotification({ message, type }));
    },
  };
};