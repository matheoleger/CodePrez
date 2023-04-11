import { useState, useEffect } from 'react';
import '../../assets/css/Presentation.css';
import { useLocation } from 'react-router-dom';
import { NavigationButton } from './NavigationButton';
import { SlideShow } from './SlideShow';

export const Presentation = () => {
  const [presentationData, setPresentationData] = useState<PresentationData>();

  const { state } = useLocation();

  useEffect(() => {
    setPresentationData(state);
  }, [state]);

  return (
    <div className="presentation-page">
      <div className="presentation-header">
        <h1 className="presentation-title">
          {presentationData?.presentationConfig.title}
        </h1>
        <NavigationButton goTo="viewer" withIcon />
      </div>
      <SlideShow
        config={presentationData?.presentationConfig}
        content={
          presentationData?.presentationFileContent.length &&
          typeof presentationData?.presentationFileContent !== 'string'
            ? presentationData?.presentationFileContent
            : []
        }
        style={presentationData?.presentationStyle}
        slideScale="preview"
      />
    </div>
  );
};
