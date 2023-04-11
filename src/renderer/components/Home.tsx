import HomeLogo from '../../assets/home_design.svg';
import { NavigationButton } from './NavigationButton';
import '../../assets/css/Home.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const [presentationData, setPresentationData] = useState<PresentationData>();

  useEffect(() => {
    window.api.listenViewerMode(setPresentationData);
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (presentationData) {
      navigate('/dualScreen', { state: presentationData });
    }
  }, [presentationData]);

  return (
    <div className="home">
      <h1>Bienvenue sur CodePrez</h1>
      <img src={HomeLogo} alt="" />
      <div className="buttons">
        <NavigationButton goTo="prez" />
        <NavigationButton goTo="add" />
      </div>
    </div>
  );
};
