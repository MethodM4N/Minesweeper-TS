import React from 'react';

import './MyPopup.scss';

type ChildrenProp = {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  title: string;
  children: React.ReactNode;
  onSubmit: React.FormEventHandler;
};

const MyPopup: React.FC<ChildrenProp> = ({ isOpen, onClose, name, title, onSubmit, children }) => {
  return (
    <div className={`MyPopup ${isOpen ? 'MyPopup_open' : ''}`}>
      <div className="container">
        <div className="flex">
          <h2 className="title">{title}</h2>
          <button className="close-button" type="button" onClick={onClose}>
            ×
          </button>
        </div>
        <form className="form" name={name} onSubmit={onSubmit}>
          {children}
          <button className="save-button" type="submit" aria-label="Сохранить">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyPopup;
