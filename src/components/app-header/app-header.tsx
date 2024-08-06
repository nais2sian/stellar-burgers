import { FC } from 'react';
import { useSelector } from '../../services/store';
import { AppHeaderUI } from '@ui';

export const AppHeader: FC = () => {
  // const userName = useSelector(getName);
  // return <AppHeaderUI userName={userName} />;
  return <AppHeaderUI userName={"fmvjn"} />;
};
