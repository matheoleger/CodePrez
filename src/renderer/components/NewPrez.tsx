import { useState } from 'react';
import React from 'react';
import '../../assets/css/NewPrez.css';
import { ButtonAddFile } from './ButtonAddFile';

export const NewPrez = () => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [authors, setAuthors] = useState('');

  const [markdownFile, setMarkdownFile] = useState<string>('');
  const [cssFile, setCssFile] = useState<string>('');
  const [assetsFile, setAssetsFile] = useState<string>('');
  const [envFile, setEnvFile] = useState<string>('');

  const [error, setError] = useState<boolean>(false);

  const getFileName = (filePath: string) => {
    // eslint-disable-next-line no-useless-escape
    return filePath.replace(/^.*(\\|\/|\:)/, '');
  };

  const openMarkdownFile = () => {
    window.api.openFileDialog('md', setMarkdownFile);
  };

  const openCssFile = () => {
    window.api.openFileDialog('css', setCssFile);
  };

  const openEnvFile = () => {
    window.api.openFileDialog('env', setEnvFile);
  };

  const openAssetsFile = () => {
    window.api.openFileDialog('assets', setAssetsFile);
  };

  const createCodePrez = () => {
    const arrayAuthors = authors.split(',').map((author) => {
      return author.trim();
    });

    if (!cssFile || !markdownFile || !title) {
      setError(true);
      return;
    }

    window.api.createCodePrez({
      assetsDirectoryPath: assetsFile,
      cssFilePath: cssFile,
      duration,
      envDirectoryPath: envFile,
      mdFilePath: markdownFile,
      authors: arrayAuthors,
      title,
    });
  };
  return (
    <div className="new-prez">
      <h1>Nouvelle Présentation</h1>

      <div className="principal-infos">
        <div className="info">
          <label>Titre de la présentation *</label>
          <input
            type="text"
            placeholder="Titre..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="info">
          <label>Durée (en min.)</label>
          <input
            type="number"
            placeholder="Durée..."
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div className="info">
          <label>Participants (séparer les noms avec une virgule)</label>
          <input
            type="text"
            placeholder="Participants..."
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
          />
        </div>
      </div>
      <div className="block-files">
        <ButtonAddFile
          title="Fichier Markdown (.md) *"
          action={openMarkdownFile}
          fileName={markdownFile ? getFileName(markdownFile) : ''}
        ></ButtonAddFile>
        <ButtonAddFile
          title="Fichier CSS (.css) *"
          action={openCssFile}
          fileName={cssFile ? getFileName(cssFile) : ''}
        ></ButtonAddFile>
        <ButtonAddFile
          title="Dossier Assets (images, etc.)"
          action={openAssetsFile}
          fileName={assetsFile ? getFileName(assetsFile) : ''}
        ></ButtonAddFile>
        <ButtonAddFile
          title="Dossier Env"
          action={openEnvFile}
          fileName={envFile ? getFileName(envFile) : ''}
        ></ButtonAddFile>
      </div>
      <p>* Champs requis</p>
      {error && (
        <span className="error">Merci de remplir tous les champs requis</span>
      )}
      <button className="sendingButton" onClick={createCodePrez}>
        Générer la présentation
      </button>
    </div>
  );
};
