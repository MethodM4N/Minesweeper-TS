import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DifficultyPopup from './Popups/DifficultyPopup';

import './Navbar.scss';
import UserPopup from './Popups/UserPopup';

const Navbar: React.FC = () => {
  const [difficultyPopupOpen, setDifficultyPopupOpen] = useState(false);
  const [userPopupOpen, setUserPopupOpen] = useState(false);

  const openDiffPopup = () => setDifficultyPopupOpen(true);
  const closeDiffPopup = () => setDifficultyPopupOpen(false);
  const openUserPopup = () => setUserPopupOpen(true);
  const closeUserPopup = () => setUserPopupOpen(false);

  return (
    <section className="Navbar">
      <button className="Navbar__button" onClick={openDiffPopup}>
        Сложность
      </button>
      |
      <button className="Navbar__button" onClick={openUserPopup}>
        Игрок
      </button>
      |<Link to="/leaders">Рейтинг</Link>
      <DifficultyPopup isOpen={difficultyPopupOpen} onClose={closeDiffPopup} />
      <UserPopup isOpen={userPopupOpen} onClose={closeUserPopup} />
    </section>
  );
};

export default Navbar;
