import HomeLogo from '../assets/home_design.svg';
import { NavigationButton } from './NavigationButton';
import '../assets/css/Home.css';

export const Home = () => {
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
