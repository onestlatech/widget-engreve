# Contribuer à ce projet

> Contributing to this repository\
> see [English version below](#en)

## Langue à employer

Etant donné que, sur ce projet, la (quasi) totalité des contributeurs et utilisateurs potentiels sont francophones, nous nous sommes accordés sur la règle suivante :

- code (nom de variables, fonctions et commentaires) en anglais (par convention)
- documentation et discussions (issues et PR) en français (pour permettre compréhension et contribution aux personnes ne disposant pas d'un niveau en anglais suffisant)

## Structure

Le widget est composé de deux parties:

1. [widget.js](https://github.com/onestlatech/widget-engreve/blob/master/static/widget.js) est injecté dans le site hôte et gère le chargement de l'iframe du widget, idéalement avec un minimum de modifications de la frame parente. Ce fichier est intentionnellement non minifié, afin que sa lecture et sa compréhension demeure simple pour le mainteneurs de sites utilisant le widget.
2. L'iframe du widget, qui est compilé par webpack à partir des fichiers dans [src](https://github.com/onestlatech/widget-engreve/tree/master/src). L'iframe est livrée en un seul bundle minifié, dans le but de garder l'élément final aussi petit que possible.

## Exigences

- (NodeJS) [https://nodejs.org/en/download/]. Le projet a originellement été construit avec la version 10.16.x de Node, mais est aujourd'hui maintenue via la latest (14.x)

## Démarrer et construire le projet

```
# installer les dépendances
$ npm install

# lancer le serveur de développement (localhost:8080)
# Testez l'iframe avec http://127.0.0.1:8080/demo.html
$ npm start

# construire pour la production
$ npm run build
```

## Formatage de code

ESLint est utilisé pour formatter `src/index.js`.

Pour vérifier que votre code est valide, utilisez:

```
$ npm run lint
```
> Vous pouvez également automatiquement résoudre certaines erreurs via : `npm run lint -- --fix`

## Déploiements automatisés

Une action Github est configurée pour créer le widget et l'uploader vers Github Pages à chaque commit poussé dans la branche principale.

## Conteneur Docker de développement

Si vous ne disposez pas (ou ne souhaitez pas utiliser) d'environnement NodeJS localement, vous pouvez utiliser un simple conteneur Docker livré dans ce projet.

Suivez ces étapes:

1. Installez `docker` en suivant [les instructions pour votre plateforme](https://docs.docker.com/install/)
2. Allez dans le répertoire du projet et démarrez le conteneur en utilisant la commande `docker-compose up`. Le premier démarrage sera plus lent, car le conteneur doit être construit.
3. Voir le projet généré sur [http://127.0.0.1:8080/](http://127.0.0.1:8080)

Vous pouvez modifier les paramètres en éditant le fichier `docker-compose.yml`. Le conteneur doit être reconstruit par la suite.

## Localisation & Internationalisation

Actuellement, ce widget supporte seulement deux langues, pour le texte affiché ainsi que le format de dates:

- français (`fr`/`fr-FR`)
- anglais (`en`/`en-US`)

Pour en ajouter une nouvelle, il est nécessaire de suivre les étapes suivantes:

- `src/index.js`: les constantes `LOCALE_CODE_MAPPING` et `GLOBAL_STRIKE_URLS` (uniquement s'il existe une version linguistique appropriée du site) doivent être ajustées. Pour les codes de langue, veuillez vous référer à https://gist.github.com/wpsmith/7604842
- `webpack.common.js`: éditez le tableau `plugins` et ajoutez une nouvelle instance `HtmlWebPackPlugin` basée sur votre code de langue
- copiez le fichier `src/translations/fr.yml` dans `src/translations/<votre-code>.yml` et traduisez-le
- `static/widget.js`: éditez la fonction `getLanguage()` pour ajouter la résolution de langue par défaut pour votre langcode
- `README.md`: complétez le commentaire au-dessus de la propriété `language` avec votre nouveau langcode

Une fois le nouveau langcode intégré, le fichier `dist/index-<your-code>.html` est créé, ce qui vous permet d'utiliser la langue via des instructions dans le fichier README.md.

## Notes du développeur

- Nous utilisons [BEM] (http://getbem.com/) pour la structure de classe CSS

#

#

# <a id="en"></a> English version

#

## Language

> refer to [CONTRIBUER.md](./CONTRIBUER.md) for a French and more up-to-date version of this document

Almost all contributors and potential users of this project are French. Therefore, we follow the following rules: 

- code (name of variables, functions and comments) should be written in English (by convention)
- documentation and discussions (issues and PR) should be written in French (to allow understanding and contribution to people who do not have a sufficient level in English)

## What compose this project

The widget is made of two parts:

1. [widget.js](https://github.com/onestlatech/widget-engreve/blob/master/static/widget.js) is injected into the host site and handles loading the widget iframe, ideally with minimal changes to the parent frame. This file is intentionally unminified, so it's easy for hosts to read and understand it.
2. The main widget iframe, which is compiled by webpack from the files in [src](https://github.com/onestlatech/widget-engreve/tree/master/src). The iframe gets all babeled up and minified into a single file, with the goal of keeping the final asset as small as possible. 

## Requirements 

- (NodeJS)[https://nodejs.org/en/download/]. The project has been built on Node version 10.16.*

## Build Setup

```
# install dependencies
$ npm install

# serve with hot reload at localhost:8080. Test the iframe with http://127.0.0.1:8080/demo.html.
$ npm run dev

# build for production
$ npm run build
```

## Linting

We have basic linting configured to run on `src/index.js` as part of the Travis CI build. You can check this locally before pushing with:

```
$ npm run lint
```

## Automated Deploys

A Github action is set up to build the widget and upload it to Github Pages on every commit to the master branch.

## Development Docker container

If you don't have (or don't want to use) a NodeJS environment available locally, you can use simple Docker container shipped in the repository.

Follow these steps:

1. Install `docker` tool using [instruction for you platform](https://docs.docker.com/install/)
2. Go to the project directory and start the container using `docker-compose up` command. The first start will be slower, because the container has to be built.
3. See built project at [http://127.0.0.1:8080](http://127.0.0.1:8080)

You can modify settings by editing `docker-compose.yml` file. The container needs to be rebuilt afterwards

## Localization

Right now, the widget only support 2 languages for text content and dates localisation:

- french (`fr`/`fr-FR`)
- english (`en`/`en-US`)

Following changes are needed to add a new language:

- `src/index.js`: constants `LOCALE_CODE_MAPPING` and `GLOBAL_STRIKE_URLS` (only if there's relevant language version of https://globalclimatestrike.net/ site) need to be adjusted. For language codes, please refer to https://gist.github.com/wpsmith/7604842
- `webpack.common.js`: edit `plugins` array and add a new HtmlWebPackPlugin instance based on your language code
- copy file `src/translations/en.yml` to `src/translations/<your-code>.yml` and translate it
- `static/widget.js`: edit `getLanguage()` function to add default language resolution for your langcode
- `README.md`: add entry about your langcode to comment above `language` property

After the new language code is merged, `dist/index-<your-code>.html` file is built, which allows you to use the laguage via instructions in the README.md file.

## Dev Notes

- We use [BEM](http://getbem.com/) for CSS class structure
