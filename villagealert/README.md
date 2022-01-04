# Village Alert

Version de l'api avec Express.

## Fonctionnalitées

  - Envoie d'alerte
  - Gestion des photos
  - Envoie de mails
  - Gestion des utilisateurs
  - Gestion des accès selon le role des utilisateurs
  - Authentication avec passport: 
    - passport-local: http://www.passportjs.org/packages/passport-local
  - Test unitaire avec [Jest](https://jestjs.io)
  - Test des endpoints de l'api avec [Frisby](https://docs.frisbyjs.com)
  - Documentation avec Swagger à l'adresse : https://villagealert.herokuapp.com/api-docs

## Mode d'emploi

```sh
# Installation
git clone git@github.com:bastienrc/I-am-API.git
cd villagealert && yarn install

# Lancement
yarn start

# Test
yarn test
```

## Test

Les tests peuvent être fait avec l'extension:
  - [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
  - [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)

Des fixtures peuvent être déployer avec [l'extension de MongoDB pour VSCode](https://marketplace.visualstudio.com/items?itemName=mongodb.mongodb-vscode)

Tous les fichiers se trouvent dans le dossier [\_\_tests__](__tests__)
