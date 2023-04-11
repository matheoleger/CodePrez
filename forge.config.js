module.exports = {
  packagerConfig: {
    icon: "./src/assets/favicon",
    fileAssociations: [
      {
        "ext": "codeprez",
        "name": "Fichier CodePrez",
        "perMachine": true
      }
    ],
    name: "CodePrez",
    executableName: "CodePrez"
    // extendInfo: "./src/assets/Info.plist",
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        setupIcon: './src/assets/favicon.ico',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: './src/assets/favicon.png',
        },
      },
    },
    {
      name: '@electron-forge/maker-flatpak',
      config: {
        options: {
          icon: './src/assets/favicon.png',
        },
      }
    }
  ],
};
