import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { registerUser } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState(''); // Состояние для хранения сообщения об ошибке
  const navigate = useNavigate(); 
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault(); // Остановка стандартной маршрутизации
    setErrorText(''); // Очистка сообщения об ошибке перед попыткой регистрации
  
    dispatch(registerUser({ name: userName, email, password }))
      .unwrap()
      .then(() => {
        console.log("Регистрация прошла успешно");
        navigate('/'); // Перенаправление после успешной регистрации
      })
      .catch((error) => {
        if (error.message === "User already exists") {
          setErrorText("Пользователь с таким именем или электронной почтой уже существует.");
        } else {
          setErrorText("Ошибка при регистрации. Попробуйте снова.");
        }
      });
  };

  return (
    <RegisterUI
      errorText={errorText}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
