import { FC, MouseEventHandler } from 'react';
import '../assets/css/ButtonAddFile.css';
interface ButtonAddFileProps {
  title: string;
  action: MouseEventHandler;
  fileName: string;
}
export const ButtonAddFile: FC<ButtonAddFileProps> = ({
  title,
  action,
  fileName,
}) => {
  return (
    <div className="file-info">
      <div className="name">
        <p>{title}</p>
        <p className={fileName ? 'label-filename' : 'label-choose-file'}>
          {fileName ? fileName : 'Aucun fichier sélectionné'}
        </p>
      </div>
      <button onClick={action} className="add">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
        <span className="material-symbols-outlined">add</span>
      </button>
    </div>
  );
};
