import { Outlet, useNavigate } from 'react-router-dom';
import '../assets/css/SideBar.css';
import CodePrezLogo from '../assets/logo.svg';
import { NavigationButton } from './NavigationButton';
export const SideBar = () => {
  const navigate = useNavigate();

  const home = () => {
    navigate('/');
  };
  return (
    <div className="page">
      <div className="sidebar">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
        <div className="logo" onClick={home}>
          <img src={CodePrezLogo} alt="" width="50" />
          <p>CodePrez</p>
        </div>
        <NavigationButton goTo="add" withIcon />
        <NavigationButton goTo="prez" withIcon />
        <div className="divider" />
      </div>
      <Outlet></Outlet>
    </div>
  );
};
