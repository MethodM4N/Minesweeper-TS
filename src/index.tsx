import ReactDOM from 'react-dom/client';
import App from "./components/App/App";
import "./index.scss";
import Favicon from 'react-favicon';
import favicon from './assets/img/bombIco.png';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <>
    <Favicon url={favicon} />
    <App />
  </>
);