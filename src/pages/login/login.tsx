import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/slices/userSlice'; 

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState(''); // Локальное состояние для сообщения об ошибке
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setErrorText(''); // Очистка сообщения об ошибке перед попыткой входа
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        // navigate('/');
      })
      .catch((error) => {
        // Установка сообщения об ошибке при неудачной авторизации
        setErrorText('Неверный email или пароль. Пожалуйста, попробуйте снова.');
        console.error('Ошибка при входе:', error);
      });
  };

  return (
    <LoginUI
      email={email}
      setEmail={setEmail}
      errorText={errorText} // Передаем сообщение об ошибке в компонент
      handleSubmit={handleSubmit}
      password={password}
      setPassword={setPassword}
    />
  );
};
