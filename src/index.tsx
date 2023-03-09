import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './components/Main/Main';
import './index.scss';
import Favicon from 'react-favicon';
import favicon from './assets/img/bombIco.png';
import LeaderBoard from './components/LeaderBoard/LeaderBoard';

import { store } from './Redux/Store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <>
    <Favicon url={favicon} />
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/leaders" element={<LeaderBoard />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </>,
);
