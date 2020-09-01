# Le Widget En Grève

:fist: Mettez votre site en grève !

> Créé en soutien au mouvement de grève contre la réforme des retraites de Macron et son monde, et l'appel [on**est**la.tech](https://onestla.tech). Applicable pour d'autres mouvements sociaux.

Compatible Firefox, Chrome (desktop et mobile), Safari (desktop et mobile), Microsoft Edge, et Internet Explorer 11.

Vous pouvez customiser le comportement de ce widget via l'option [`DIGITAL_STRIKE_OPTIONS`](#Customisation).

En cas de problème ou question, n'hésitez pas à [soumettre une issue](https://github.com/onestlatech/widget-engreve/issues).

## Comment installer ce widget

Ajoutez simplement cette ligne de code à votre page web:

```html
<script src="https://onestla.tech/widget-engreve/widget.js" async></script>
```

## Mobilisation au jour le jour

Vous ne pouvez mettre votre site en grève illimitée, mais souhaitez soutenir le mouvement les jours de mobilisation nationale ? Ajoutez simplement le code suivant :

```html
<script>
  var DIGITAL_STRIKE_OPTIONS = {
    // définir le jour de mobilisation
    // attention: les mois commencent à zéro (=janvier)
    fullPageDisplayStartDate: new Date(2020, 0, 9),
    // afficher un simple footer en dehors du jour de mobilisation
    minMode: true,
    // permettre d'accéder au site le jour de mobilisation (optionnel)
    showCloseButtonOnFullPageWidget: true
  };
</script>
<script
  src="https://onestla.tech/widget-engreve/widget.js"
  async
></script>
```

Allez voir la [documentation du mode "minimal"](#mode-minimal) pour plus de détails.

## Comment ça marche

Quand vous ajoutez [**widget.js**](https://github.com/onestlatech/widget-engreve/blob/master/static/widget.js) à votre site, celui-ci montrera par défaut une bannière recouvrant l'ensemble de votre page ([demo](https://onestla.tech/widget-engreve/demo.html)), informant vos visiteurs que votre site rejoint le mouvement de grève, et les invite à en faire de même.

![look par défaut](/doc/capture-defaut.png)

Ce widget est également entièrement customisable afin de vous permettre d'adapter son comportement à vos contraintes.

## Customisation

Définir un objet `DIGITAL_STRIKE_OPTIONS` **avant** d'inclure ce widget à votre site vous permet d'en customiser le comportement.

Ci après les détails de chaque mode et options. Rdv au chapitre suivant pour une documentation plus résumée.

### permettre l'accès à votre site

Si vous ne pouvez vous permettre de bloquer l'accès à votre site, il est également possible de configurer le widget afin de permettre à l'utilisateur de le fermer une fois le message affiché ([demo](https://onestla.tech/widget-engreve/demo.html?showCloseButton=true)).

```html
<script type="text/javascript">
  var DIGITAL_STRIKE_OPTIONS = {
    showCloseButtonOnFullPageWidget: true
  };
</script>
```

![](/doc/capture-closebtn.png)

> Dans ce cas, il pourra être préférable d'ouvrir la page d'information dans un nouvel onglet au click. Pour ce faire, utilisez l'option `popup: true`.

### Mode minimal

Dans le pire des cas, si l'accès à votre site est un incontournable, vous pouvez également passer en mode "minimal" en mettant l'option `minMode` à `true`.

```html
<script type="text/javascript">
  var DIGITAL_STRIKE_OPTIONS = {
    minMode: true
  };
</script>
```

Cela affichera le widget en mode "footer" hors des jours de mobilisation ([demo](https://onestla.tech/widget-engreve/demo.html?minMode=true)).

![](/doc/capture-minmode.png)

#### Jours de mobilisation

En mode minimal, l'affichage en pleine page se fait automatiquement les jours de mobilisation (tous les mardis par défaut).

Pour définir vous même ces jours, vous pouvez passer la date de votre choix à l'option `fullPageDisplayStartDate`.

Par exemple, pour le 17 décembre :

```html
<script type="text/javascript">
  var DIGITAL_STRIKE_OPTIONS = {
    fullPageDisplayStartDate: new Date(2020, 11, 17)
  };
</script>
```

Voir le [constructeur Date](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Date) pour toutes les possibilités.

**:warning: Le widget ne s'affichera plus une fois la date "fullPageDisplayStartDate" dépassée ! Pensez donc à définir le jour suivant de mobilisation nationale dés le lendemain !**


#### Fermeture

En mode minimal, l'utilisateur peut fermer la banière en cliquant sur la croix. Un cookie est alors placé afin de ne pas lui afficher à nouveau avant le jour suivant.

Vous pouvez supprimer ce comportement afin de toujours afficher le widget :
```html
<script type="text/javascript">
  var DIGITAL_STRIKE_OPTIONS = {
    alwaysShowWidget: true
  };
</script>
```

Vous pouvez également modifier cette durée si cela vous chante:

```html
<script type="text/javascript">
  var DIGITAL_STRIKE_OPTIONS = {
    cookieExpirationDays: 1, // @type {number}
  };
</script>
```

## Documentation complète

```html
<script type="text/javascript">
  var DIGITAL_STRIKE_OPTIONS = {
    /**
     * Langue dans laquelle vous souhaitez afficher la bannière.
     * Valeurs disponibles : fr, en
     */
    language: 'fr',

    /**
     * URL complète où est hébergé le contenu du widget à afficher (dossier dist)
     */
    iframeDir: 'https://www.votreserveur.com/assets/engreve',
    /**
     * Nom de votre site web à afficher à la place de "Ce site".
     */
    websiteName: 'Demo',

    /**
     * Expiration du cookie. Après un premier affichage en mode minimal, le widget
     * ne s'affichera qu'après expiration de ce cookie.
     * 1 jour par défaut
     */
    cookieExpirationDays: 1, // @type {number}

    /**
     * Ignorer le cookie, et toujours afficher le widget. 
     * false par défaut
     */
    alwaysShowWidget: false, // @type {boolean}

    /**
     * Afficher le widget en mode footer en dehors des dates prévues (voir fullPageDisplayStartDate)
     * false par défault: affichage en mode "full page" tous les jours
     */
    minMode: true, // @type {boolean}

     /**
     * Ouvrir la page d'information dans un nouvel onglet au click sur le bouton
     * false par défault: l'utilisateur sera directement redirigé vers la page d'information
     * après avoir clické sur le bouton
     */
    popup: true, // @type {boolean}

    /**
    * En mode pleine page, afficher un bouton "x".
    * false par défaut
    */
    showCloseButtonOnFullPageWidget: false, // @type {boolean}

    /**
     * Date à partir de laquelle doit s'afficher le widget en mode footer
     * ⚠️ Janvier = 0, Décembre = 11 (mois - 1)
     */
    footerDisplayStartDate: new Date(), //@ type {Date object}

    /**
     * En mode min, date à laquelle le footer doit s'afficher en pleine page, pour 24 heures. 
     */
    fullPageDisplayStartDate: new Date(2019, 8, 20), //@ type {Date object}

    /**
     * re-définir l'URL à ouvrir au click sur le bouton en fonction de la langue utilisée
     * "https://onestla.tech/" par défaut
     */
    customStrikeFrURL: "https://yourwebsite/en-greve",
    customStrikeEnURL: "https://yourwebsite/call-to-strike"
  };
</script>
```

## Auto-hébergement

Pré-requis :
- [git](https://git-scm.com/book/fr/v2/D%C3%A9marrage-rapide-Installation-de-Git)
- [nodejs](https://nodejs.org/fr/)

```bash
# Clonez ce dépot
$ git clone https://github.com/onestlatech/widget-engreve.git
# Lancez la commande suivante depuis le dossier racine du projet, ce qui crééra un dossier `dist`
$ npm install && npm run build
# Copiez le dossier `dist` vers l'emplacement de votre choix dans votre projet
$ cp -r ./dist ../monsite/assets/engreve
```

Vous devez ensuite :
1. Donner l'URL **complète** vers le dossier `dist` via l'option `iframeDir`, comme indiqué dans la section suivante `DIGITAL_STRIKE_OPTIONS` et ci-dessous
1. (optionnel) donner le nom de site à afficher, via l'option `websiteName`
1. Intégrez `widget.js` à votre page

```html
<script>
  var DIGITAL_STRIKE_OPTIONS = {
    iframeDir: 'http://www.votresite.com/assets/engreve',
    websiteName: 'Wof Show'
  }
</script>
<script src="assets/engreve/widget.js" async></script>
```

### NPM

Ce projet est également disponible via le package npm [widget-engreve](https://www.npmjs.com/package/widget-engreve) :

`npm i -d widget-engreve`

## Customisation avancée et contributions

Le fichier [`widget.js`](/static/widget.js) créé une iframe, et envoie les options de customisation à celle-ci.

Cette iframe charge le contenu du widget à partir:
- de notre hébergement sur Github Page (par défaut)
- ou de l'URL que vous aurez spécifié via l'option `iframeDir`

En choisissant de builder ce widget et de l'héberger par vous même, vous pouvez donc totalement customiser : 
- [le texte affiché](/src/translations/fr.yml)
- [l'url](https://github.com/onestlatech/widget-engreve/blob/master/src/index.js#L12) vers laquelle l'utilisateur est redirigé en cliquant sur le bouton en mode pleine page
- [l'url](https://github.com/onestlatech/widget-engreve/blob/master/src/index.js#L7) vers laquelle l'utilisateur est redirigé en cliquant sur le bouton en mode minimal/footer
- et tout ce qui vous plaira...

N'hésitez surtout pas à forker ce projet et ouvrir une Pull Request si vous pensez avoir apporté une modification qui pourrait être utile à tous. Plus de détails sont disponibles dans [CONTRIBUTING.md](/CONTRIBUTING.md).

## Credits

This project is a derivative of [fightforthefuture/digital-climate-strike](https://github.com/fightforthefuture/digital-climate-strike) by Fight for the Future under the MIT License (which was itself inspired by the [Fight for the Future Red Alert widget](https://github.com/fightforthefuture/redalert-widget)).

Yet, there isn't any affiliation between this movements and the one this fork currently support.
