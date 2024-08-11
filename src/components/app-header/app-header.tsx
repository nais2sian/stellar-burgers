import { FC } from 'react';
import { useSelector } from '../../services/store';
import { AppHeaderUI } from '@ui';
import { getName } from '../../services/slices/userSlice';


export const AppHeader: FC = () => {
  const userName = useSelector(getName) ?? "Личный кабинет";
  return <AppHeaderUI userName={userName} />;
};
