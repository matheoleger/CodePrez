import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
interface NavigationButtonProp {
  goTo: 'prez' | 'add';
  withIcon?: boolean;
}

export const NavigationButton: FC<NavigationButtonProp> = ({
  goTo,
  withIcon,
}) => {
  const navigate = useNavigate();
  const createCodePrez = () => {
    navigate('/add');
  };

  const launchPresentation = () => {
    navigate('/prez');
  };
  if (goTo === 'prez') {
    return (
      <button onClick={launchPresentation} className="go-to-prez-button">
        Ouvrir une présentation
        {withIcon && (
          <span className="material-symbols-outlined">play_arrow</span>
        )}
      </button>
    );
  } else if (goTo === 'add') {
    return (
      <button onClick={createCodePrez} className="go-to-add-button">
        Nouvelle présentation
        {withIcon && (
          <span className="material-symbols-outlined">add_circle</span>
        )}
      </button>
    );
  }
  return <></>;
};
