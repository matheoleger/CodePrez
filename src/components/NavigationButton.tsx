import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
interface NavigationButtonProp {
  goTo: 'prez' | 'add' |'viewer';
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

  const openPresentation = () => {
    window.api.getPresentationData(navigateToPresentation);
  };

  const navigateToPresentation = (data: PresentationData) => {
    navigate('/prez', {
      state: data
    });
  }

  if (goTo === 'prez') {
    return (
      <button onClick={openPresentation} className="go-to-prez-button">
        Ouvrir une présentation
        {withIcon && (
          <span className="material-symbols-outlined">slide_library</span>
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
  } else if (goTo == "viewer") {
    return (
      <button onClick={createCodePrez} className="go-to-viewer-button">
        Lancer la présentation
        {withIcon && (
          <span className="material-symbols-outlined">play_arrow</span>
        )}
      </button>
    )
  }
  return <></>;
};
