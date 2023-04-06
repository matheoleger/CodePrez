import { useState, useEffect } from 'react';
//TODO: display slides !

export const Presentation = () => {
  const [presentationData, setPresentationData] = useState<PresentationData>();

  useEffect(() => {
    console.log("Je vais dans le useEffect combien de fois ?");
    window.api.getPresentationData(setPresentationData);
  },[])

  return (
    <div>
      <h1>{ presentationData?.presentationConfig.title }</h1>
    </div>
  );
};
