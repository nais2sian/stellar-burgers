import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { updateUser } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import { isAuthCheckedSelector, getUser, selectUser  } from '../../services/slices/userSlice';

export const Profile: FC = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};






// export const Profile: FC = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state: RootState) => state.user.user);
//   const navigate = useNavigate(); 
//   const [formValue, setFormValue] = useState({
//     name: user?.name || '',
//     email: user?.email || '',
//     password: ''
//   });

//   useEffect(() => {
//     if (user) {
//       setFormValue({
//         name: user.name,
//         email: user.email,
//         password: ''
//       });
//     }
//   }, [user]);

//   const isFormChanged =
//     formValue.name !== user?.name ||
//     formValue.email !== user?.email ||
//     !!formValue.password;
//     const handleSubmit = (e: SyntheticEvent) => {
//       e.preventDefault();
//       const updatedData = {
//         name: formValue.name,
//         email: formValue.email,
//         ...(formValue.password && { password: formValue.password })
//       };
    
//       const accessToken = getCookie('accessToken');
//       if (!accessToken) {
//         navigate('/login'); // Перенаправление на страницу входа, если токена нет
//         return;
//       }
    
//       dispatch(updateUser(updatedData))
//         .unwrap()
//         .then(() => {
//           console.log('Данные успешно обновлены');
//         })
//         .catch((error) => {
//           console.error('Ошибка при обновлении данных:', error);
//           if (error.message === 'You should be authorised') {
//             navigate('/login'); // Перенаправление на страницу входа при ошибке авторизации
//           } else {
//             // setErrorText('Ошибка при обновлении данных. Попробуйте снова.');
//           }
//         });
//     };
//   // const handleSubmit = (e: SyntheticEvent) => {
//   //   e.preventDefault();
//   //   dispatch(updateUser(formValue))
//   //     .unwrap()
//   //     .then(() => {
//   //       console.log('Данные успешно обновлены');
//   //     })
//   //     .catch((error) => {
//   //       console.error('Ошибка при обновлении данных:', error);
//   //     });
//   // };

//   const handleCancel = (e: SyntheticEvent) => {
//     e.preventDefault();
//     if (user) {
//       setFormValue({
//         name: user.name,
//         email: user.email,
//         password: ''
//       });
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormValue((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value
//     }));
//   };

//   return user ? (
//     <ProfileUI
//       formValue={formValue}
//       isFormChanged={isFormChanged}
//       handleCancel={handleCancel}
//       handleSubmit={handleSubmit}
//       handleInputChange={handleInputChange}
//     />
//   ) : (
//     <p>Загрузка данных...</p>
//   );
// };



// export const Profile: FC = () => {
//   const user = useSelector((state: RootState) => state.user.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [formValue, setFormValue] = useState({
//     name: user?.name || '',
//     email: user?.email || '',
//     password: ''
//   });

//   useEffect(() => {
//     setFormValue((prevState) => ({
//       ...prevState,
//       name: user?.name || '',
//       email: user?.email || ''
//     }));
//   }, [user]);

//   const isFormChanged =
//     formValue.name !== user?.name ||
//     formValue.email !== user?.email ||
//     !!formValue.password;

//     const handleSubmit = (e: SyntheticEvent) => {
//       e.preventDefault();
//       const updatedData = {
//         name: formValue.name,
//         email: formValue.email,
//         ...(formValue.password && { password: formValue.password })
//       };
    
//       console.log('Отправка данных на сервер:', updatedData);
    
//       const accessToken = getCookie('accessToken');
//       if (!accessToken) {
//         navigate('/login'); // Если нет токена, перенаправляем на страницу входа
//         return;
//       }
    
//       dispatch(updateUser(updatedData))
//         .unwrap()
//         .then(() => {
//           console.log('Данные успешно обновлены');
//         })
//         .catch((error) => {
//           console.error('Ошибка при обновлении данных:', error);
//         });
//     };
    

//   const handleCancel = (e: SyntheticEvent) => {
//     e.preventDefault();
//     setFormValue({
//       name: user?.name || '',
//       email: user?.email || '',
//       password: ''
//     });
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormValue((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value
//     }));
//   };

//   return (
//     <ProfileUI
//       formValue={formValue}
//       isFormChanged={isFormChanged}
//       handleCancel={handleCancel}
//       handleSubmit={handleSubmit}
//       handleInputChange={handleInputChange}
//     />
//   );
// };

