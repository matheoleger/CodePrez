import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SlideShow } from '../components/SlideShow';
import '../../assets/css/DualScreen.css';
import { Timer } from '../components/Timer';

export const DualScreen = () => {
  const { state } = useLocation();
  const [presentationData, setPresentationData] = useState<PresentationData>();
  useEffect(() => {
    setPresentationData(state.data.data);
  }, [state]);

  return (
    <div className="presentation-page">
      <Timer
        time={presentationData?.presentationConfig.duration}
        expiryTimestamp={undefined}
      />
      <SlideShow
        content={
          presentationData?.presentationFileContent &&
          typeof presentationData?.presentationFileContent !== 'string'
            ? presentationData?.presentationFileContent
            : []
        }
        config={presentationData?.presentationConfig}
        style={presentationData?.presentationStyle}
        slideScale={'preview'}
      ></SlideShow>
    </div>
  );
};
