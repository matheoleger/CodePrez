import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import '../assets/css/SideBar.css';
import CodePrezLogo from '../assets/logo.svg';
import { NavigationButton } from './NavigationButton';
import { Slide } from './Slide';
import { useState, useEffect } from 'react';
export const SideBar = () => {
  const [presentationData, setPresentationData] = useState<PresentationData>();
  
  const navigate = useNavigate();
  const {state} = useLocation();

  useEffect(() => {
    setPresentationData(state);
  },[])

  const home = () => {
    navigate('/');
  };
  return (
    <div className="page">
      <div className="sidebar">
        <div className="logo" onClick={home}>
          <img src={CodePrezLogo} alt="" width="50" />
          <p>CodePrez</p>
        </div>
        <NavigationButton goTo="add" withIcon />
        <NavigationButton goTo="prez" withIcon />
        <div className="divider" />
        {Array.isArray(presentationData?.presentationFileContent) &&
            presentationData?.presentationFileContent.map((slide, index) => (
                <Slide key={index} slideScale="sidebar">
                    {slide}
                </Slide>
            ))}
        <style>
            {presentationData?.presentationStyle}
        </style>
      </div>
      <Outlet></Outlet>
    </div>
  );
};
