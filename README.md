# CodePrez
Le but de ce projet est de mettre en place une application permettant de faire une présentation à diapositives du type Powerpoint ou Keynote, mais dont le contenu est défini dans un fichier Markdown et un fichier CSS, et proposant des fonctionnalités utiles aux développeurs.

# Utiliser le projet

### `yarn start`

`yarn start` permet de lancer le projet en lançant le front sur le [localhost:3000](http://localhost:3000/). Une fois React lancé, le script devrait transpilé le typescript puis lancer le projet **Electron**.

> :bulb: À noter qu'il se peut que Electron ne se lance pas lors du démarrage, pour ce faire, il faut taper `rl` dans le prompt afin de relancer la transpilation du TS et relancer Electron (sans kill le processus).

### `yarn run make`

En faisant `yarn run make` vous allez lancer la création de l'installeur en fonction de votre OS.

> :warning: À noter qu'il faut faire `npx tsc` (ou `yarn run typescript:compiled`), avant de faire la commande, pour bien transpiler le TS.

> :bulb: Il existe aussi les commandes pour lancer make sur la plateforme de votre choix. (voir `package.json`)

### `yarn run package`

On peut créer le packaging (sans installeur) avec cette commande.

# Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

Electron documentation : [Electron Docs](https://www.electronjs.org/fr/docs/latest/)
