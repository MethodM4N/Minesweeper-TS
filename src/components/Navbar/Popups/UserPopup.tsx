import React, { FormEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { clearScreenDown } from 'readline';
import { getLocalStorageName } from '../../../utils/getLocalStorageName';
import MyPopup from '../../UI/MyPopup';

import './UserPopup.scss';

type ChildrenProp = {
  isOpen: boolean;
  onClose: () => void;
};

type FormValues = {
  userName: string;
};

const UserPopup: React.FC<ChildrenProp> = ({ isOpen, onClose }) => {
  const [userName, setUserName] = useState('Unknown');

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  function onSubmit() {
    const { userName } = getValues();
    const upperName = userName.charAt(0).toUpperCase() + userName.slice(1);
    const json = JSON.stringify(upperName);
    localStorage.setItem('userName', json);
    setUserName(upperName);
    reset();
    onClose();
  }

  useEffect(() => reset(), [onClose]);

  useEffect(() => {
    setUserName(getLocalStorageName());
  }, []);

  return (
    <MyPopup
      title="Игрок"
      name="user"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}>
      <section className="UserPopup">
        <div className="UserPopup__top-container">
          <h2>
            <span>{userName}</span> добро пожаловать
          </h2>
        </div>
        <div className="UserPopup__bottom-container">
          <p>Изменить имя</p>
          <input
            type="text"
            {...register('userName', {
              required: 'Введите имя',
              minLength: { value: 2, message: 'Минимум 2 символа' },
              maxLength: { value: 10, message: 'Максимум 14 символов' },
              pattern: {
                value: /^[A-Za-zА-Яа-я-Ёё]+$/,
                message: 'Допустимы только буквы',
              },
            })}></input>
          <br></br>
          <label className={`${errors ? 'UserPopup__error_visible' : ''}`}>
            {errors?.userName?.message}
          </label>
        </div>
      </section>
    </MyPopup>
  );
};

export default UserPopup;
