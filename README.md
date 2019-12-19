# EnGreve - le Widget

:fist: Affichez votre support à la grève contre la réforme des retraites de Macron et son monde.

Compatible Firefox, Chrome (desktop et mobile), Safari (desktop et mobile), Microsoft Edge, et Internet Explorer 11.

Vous pouvez customiser le comportement de ce widget via l'option `DIGITAL_STRIKE_OPTIONS` décrite ci-dessous.

En cas de problème ou question, n'hésitez pas à [soumettre une issue](https://github.com/noelmace/widget-engreve/issues).

## Comment installer ce widget

### A partir du dépôt

Pré-requis :
- [git](https://git-scm.com/book/fr/v2/D%C3%A9marrage-rapide-Installation-de-Git)
- [nodejs](https://nodejs.org/fr/)

```bash
# Clonez ce dépot
$ git clone https://github.com/noelmace/widget-engreve.git
# Lancez la commande suivante depuis le dossier racine du projet, ce qui crééra un dossier `dist`
$ npm install && npm run build
# Copiez le dossier `dist` vers l'emplacement de votre choix dans votre projet
$ cp -r ./dist ../monsite/assets/engreve
```

Vous devez ensuite :
1. Donner l'URL **complète** vers le dossier `dist` via l'option iframeDir, comme indiqué dans la section suivante `DIGITAL_STRIKE_OPTIONS` et ci-dessous
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

### CDN

**:construction: non disponible pour l'instant :construction:**

   Ajoutez simplement cette ligne de code à votre page web:

```html
<script src="https://cdn.jsdelivr.net/gh/noelmace/widget-engreve@2.0.0/static/widget.js" async></script>
```

### NPM

`npm i -d widget-engreve`

## Comment ça marche

Quand vous ajoutez [**widget.js**](https://github.com/noelmace/widget-engreve/blob/master/static/widget.js) à votre site, celui-ci montrera par défaut une bannière recouvrant l'ensemble de votre page, informant vos visiteurs que votre site rejoint le mouvement de grève contre les retraites et son monde, et les invite à rejoindre le monde.

![look par défaut](/doc/capture-defaut.png)

Ce widget est également entièrement customisable afin de vous permettre d'adapter son comportement à vos contraintes.


## Customisation

Définir un objet `DIGITAL_STRIKE_OPTIONS` **avant** d'inclure ce widget à votre site vous permet d'en customiser le comportement.

Ci après les détails de chaque mode et options. Rdv au chapitre suivant pour une documentation plus résumée.

### Non bloquant, pleine page

Si vous ne pouvez vous permettre de bloquer l'accès à votre site, il est également possible de configurer le widget afin de permettre à l'utilisateur de le fermer une fois le message affiché.

```html
<script type="text/javascript">
  var DIGITAL_STRIKE_OPTIONS = {
    showCloseButtonOnFullPageWidget: true
  };
</script>
```

![](/doc/capture-closebtn.png)

### Mode minimal

Dans le pire des cas, si l'accès à votre site est un incontournable, vous pouvez également passer en mode "minimal" en mettant l'option `minMode` à `true`.

```html
<script type="text/javascript">
  var DIGITAL_STRIKE_OPTIONS = {
    minMode: true
  };
</script>
```

Cela affichera le widget de la manière suivante hors des jours de mobilisation.

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

#### Fermeture

Dans ce mode, l'utilisateur peut fermer la banière en cliquant sur la croix. Un cookie est alors placé afin de ne pas lui afficher à nouveau avant le jour suivant.

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
  };
</script>
```

## Credits

This project is a derivative of [fightforthefuture/digital-climate-strike](https://github.com/fightforthefuture/digital-climate-strike) by Fight for the Future under the MIT License (which was itself inspired by the [Fight for the Future Red Alert widget](https://github.com/fightforthefuture/redalert-widget)).

Yet, there isn't any affiliation between this movements and the one this fork currently support.
