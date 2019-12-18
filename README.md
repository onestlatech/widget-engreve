# EnGreve - le Widget

:fist: Affichez votre support à la grève contre la réforme des retraites de Macron et son monde.

> :uk: This project is a derivative of [fightforthefuture/digital-climate-strike](https://github.com/fightforthefuture/digital-climate-strike) by Fight for the Future under the MIT License (which was itself inspired by the [Fight for the Future Red Alert widget](https://github.com/fightforthefuture/redalert-widget)).
> Yet, there isn't any affiliation between this movements and the one this fork currently support.

## Comment installer ce widget

### Option 1: **:construction: non disponible pour l'instant :construction:**

   Ajoutez simplement cette ligne de code à votre page web:

```html
<script src="https://cdn.jsdelivr.net/gh/noelmace/widget-engreve@2.0.0/static/widget.js" async></script>
```

### Option 2 (auto-hébergement):

  1. Clonez ce dépot :
  
    `git clone https://github.com/noelmace/widget-engreve.git`.
  
  2. Lancez la commande suivante depuis le dossier racine du projet, ce qui crééra un dossier `dist`:
  
    `npm install && npm run build`.

  3. Copiez les fichiers `index.html` et `widget.js` depuis le dossier `dist` vers le dossier de votre site.

  4. Configurez l'option `iframeHost` comme indiqué dans la section suivante `DIGITAL_STRIKE_OPTIONS`.

  5. Intégrez le widget à l'endroit de votre choix dans votre site via le code suivant:
  
    `<script src="widget.js" async></script>`

Vous pouvez customiser le comportement de ce widget via l'option `DIGITAL_STRIKE_OPTIONS` [décrite ci-dessous](#customization-options).

En cas de problème ou question, n'hésitez pas à [soumettre une issue](https://github.com/noelmace/widget-engreve/issues).

## Comment ça marche

> :warning: Pour l'instant, les seules démos disponiblent sont celles de digitalclimatestriker, le projet depuis lequel celui-ci a été créé. Le message affiché sur votre site ne sera bien entendu pas le même.

Quand vous ajoutez [**widget.js**](https://github.com/noelmace/widget-engreve/blob/master/static/widget.js) à votre site, celui-ci montrera une bannière ([demo](https://assets.digitalclimatestrike.net/demo.html)) informant vos visiteurs que votre site soutiens le monvement de grève contre les retraites et son monde, et les invite à rejoindre le monde.

<!-- ![A screenshot of the Digital Climate Strike footer widget]() -->

Puis, le jour de mobilisation (:warning: à configurer) cette bannière s'étendra pour recouvrir l'ensemble de la page ([demo :warning: de digitalclimatestriker](https://assets.digitalclimatestrike.net/demo.html?fullPage)), bloquant l'accès à votre site.

<!-- ![A screenshot of the Digital Climate Strike full page widget]() -->

Si vous ne pouvez vous permettre de bloquer l'accès à votre site, il est également possible de configurer le widget afin de permettre à l'utilisateur de le fermer une fois le message affiché ([demo :warning: de digitalclimatestriker](https://assets.digitalclimatestrike.net/demo.html?fullPage&showCloseButton)).

<!-- ![A screenshot of the Digital Climate Strike full page widget with close button]() -->

<!--
You can demo the widget in different languages by adding a 'language' parameter to the URL. ([Example](https://assets.digitalclimatestrike.net/demo.html?fullPage&language=de)) 

The widget is designed to appear once per user, per device, per day, but can be configured to display at a different interval. If you'd like to force it to show up on your page for testing, reload the page with `#ALWAYS_SHOW_DIGITAL_STRIKE` at the end of the URL.
-->

> Please take a look at [**widget.js**](https://github.com/noelmace/widget-engreve/blob/master/static/widget.js) if you want to see exactly what you're embedding on your page.

The widget is compatible with Firefox, Chrome (desktop and mobile), Safari (desktop and mobile), Microsoft Edge, and Internet Explorer 11.

## Customisation

Définir un objet `DIGITAL_STRIKE_OPTIONS` avant d'inclure ce widget à votre site vous permet d'en customiser le comportement.

**🚧 traduction & adaptation en cours 🚧**

```html
<script type="text/javascript">
  var DIGITAL_STRIKE_OPTIONS = {
    /**
     * Specify view cookie expiration. After initial view, widget will not be
     * displayed to a user again until after this cookie expires. Defaults to 
     * one day.
     */
    cookieExpirationDays: 1, // @type {number}
    

    /**
     * Always show the widget, even when someone has closed the widget and set the cookie on their device. 
     * Useful for testing. Defaults to false.
     */
    alwaysShowWidget: false, // @type {boolean}

    /**
     * Automatically makes the widget full page. Defaults to false.
     */
    forceFullPageWidget: false, // @type {boolean}
    
    /**
    * For the full page widget, shows a close button "x" and hides the message about the site being 
    * available tomorrow. Defaults to false.
    */
    showCloseButtonOnFullPageWidget: false, // @type {boolean}
    
    /**
     * The date when the sticky footer widget should start showing on your web site.
     * Note: the month is one integer less than the number of the month. E.g. 8 is September, not August.
     * Defaults to new Date(2019, 7, 1) (August 1st, 2019).
     */
    footerDisplayStartDate: new Date(), //@ type {Date object}
    
    /**
     * The date when the full page widget should showing on your web site for 24 hours. 
     * Note: the month is one integer less than the number of the month. E.g. 8 is September, not August.
     * Defaults to new Date(2019, 8, 20) (September 20th, 2019)
     */
    fullPageDisplayStartDate: new Date(2019, 8, 20), //@ type {Date object}
  };
</script>
```
