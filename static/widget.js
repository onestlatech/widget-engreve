/* eslint-disable */
(function() {
  'use strict';
  var DOM_ID = 'DIGITAL_STRIKE';
  var CLOSED_COOKIE = '_DIGITAL_STRIKE_WIDGET_CLOSED_';
  var NOW = new Date().getTime();
  var MS_PER_DAY = 86400000;

  // user-configurable options
  var options = window.DIGITAL_STRIKE_OPTIONS || {};
  // FIXME: default iframeDir
  var iframeDir = options.iframeDir !== undefined ? options.iframeDir : 'https://onestla.tech/widget-engreve/';
  var websiteName = options.websiteName || null;
  var footerDisplayStartDate = options.footerDisplayStartDate || new Date(1990, 10, 10);
  const nextTuesday = new Date();
  nextTuesday.setDate(nextTuesday.getDate() + ((7-nextTuesday.getDay())%7+2) % 7);
  var fullPageDisplayStartDate = options.fullPageDisplayStartDate || nextTuesday;
  var minMode = !!options.minMode;
  var cookieExpirationDays = parseFloat(options.cookieExpirationDays || 1);
  var alwaysShowWidget = !!(options.alwaysShowWidget || window.location.hash.indexOf('ALWAYS_SHOW_DIGITAL_STRIKE') !== -1);
  var disableGoogleAnalytics = !!options.disableGoogleAnalytics;
  var showCloseButtonOnFullPageWidget = !!options.showCloseButtonOnFullPageWidget;
  var popup = options.popup;
  var customStrikeEnURL = options.customStrikeEnURL;
  var customStrikeFrURL = options.customStrikeFrURL;
  var language = getLanguage();

  function getIframeSrc() {
    var src = iframeDir;
    src += language === 'fr' ? '/index.html?' : '/index-' + language + '.html?';

    var urlParams = [
      ['hostname', window.location.host],
      ['fullPageDisplayStartDate', fullPageDisplayStartDate.toISOString()],
      ['language', language]
    ];

    minMode && urlParams.push(['minMode', 'true']);
    showCloseButtonOnFullPageWidget && urlParams.push(['showCloseButtonOnFullPageWidget', 'true']);
    disableGoogleAnalytics && urlParams.push(['googleAnalytics', 'false']);
    websiteName && urlParams.push(['websiteName', encodeURI(websiteName)]);
    popup && urlParams.push(['popup', 'true']);
    customStrikeEnURL && urlParams.push(['customStrikeEnURL', customStrikeEnURL]);
    customStrikeFrURL && urlParams.push(['customStrikeFrURL', customStrikeFrURL]);

    var params = urlParams.map(function(el) {
      return el.join('=');
    });

    return src + params.join('&');
  }

  function createIframe() {
    var wrapper = document.createElement('div');
    wrapper.id = DOM_ID;
    var iframe = document.createElement('iframe');
    iframe.src = getIframeSrc();
    iframe.frameBorder = 0;
    iframe.allowTransparency = true;
    wrapper.appendChild(iframe);
    document.body.appendChild(wrapper);
    iframe.contentWindow.focus();
    return wrapper;
  }

  function getLanguage() {
    // Overriden value
    if (options.language) {
      return options.language;
    }

    var languages = [
      'fr',
      'en',
    ];

    for (var i=0,l=languages.length;i<l;i++) {
      var language = languages[i];
      var languageRegexp = new RegExp('^'+language, 'i');

      if (navigator && languageRegexp.test(navigator.language)) {
        return language;
      }
    }

    // Default
    return 'fr';
  }

  function maximize() {
    document.getElementById(DOM_ID).style.width = '100%';
    document.getElementById(DOM_ID).style.height = '100%';
  }

  function closeWindow() {
    document.getElementById(DOM_ID).remove();
    window.removeEventListener('message', receiveMessage);
    setCookie(CLOSED_COOKIE, 'true', cookieExpirationDays);
  }

  function navigateToLink(linkUrl) {
    if (!popup) {
      document.location = linkUrl;
    } else {
      var win = window.open(linkUrl, '_blank');
      win.focus();
    }
  }

  function injectCSS(id, css) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.id = id;
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    }
    else {
      style.appendChild(document.createTextNode(css));
    }
    document.head.appendChild(style);
  }

  function setCookie(name, value, expirationDays) {
    var d = new Date();
    d.setTime(d.getTime()+(expirationDays * MS_PER_DAY));

    var expires = 'expires='+d.toGMTString();
    document.cookie = name + '=' + value + '; ' + expires + '; path=/';
  }

  function getCookie(cookieName) {
    var name = cookieName + '=';
    var ca = document.cookie.split(';');
    var c;

    for(var i = 0; i < ca.length; i++) {
      c = ca[i].trim();
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }

    return '';
  }

  function receiveMessage(event) {
    if (!event.data.DIGITAL_STRIKE) return;

    switch (event.data.action) {
      case 'maximize':
        return maximize();
      case 'closeButtonClicked':
        return closeWindow();
      case 'buttonClicked':
        if (event.data.linkUrl.lastIndexOf('http', 0) !== 0) return;
        return navigateToLink(event.data.linkUrl);
    }
  }

  /**
   * There are a few circumstances when the iFrame should not be shown:
   * 1. When the CLOSED_COOKIE has been set on that device
   * 2. We haven't reached either display start date
   * 3. We're past the date to display the full screen widget.
   * 4. We haven't set alwaysShowWidget to be true in the config.
   */
  function iFrameShouldNotBeShown() {
    if (alwaysShowWidget) return false;

    return (footerDisplayStartDate.getTime() > NOW && fullPageDisplayStartDate.getTime() > NOW)
      || new Date(fullPageDisplayStartDate.getTime() + MS_PER_DAY) < NOW
      || !!getCookie(CLOSED_COOKIE);
  }

  function initializeInterface() {
    if (iFrameShouldNotBeShown()) {
      return;
    }

    createIframe();

    var iFrameHeight = getIframeHeight();

    injectCSS('DIGITAL_STRIKE_CSS',
      '#' + DOM_ID + ' { position: fixed; right: 0; left: 0; bottom: 0px; width: 100%; height: ' + iFrameHeight + '; z-index: 20000; -webkit-overflow-scrolling: touch; overflow: hidden; } ' +
      '#' + DOM_ID + ' iframe { width: 100%; height: 100%; }'
    );

    // listen for messages from iframe
    window.addEventListener('message', receiveMessage);

    document.removeEventListener('DOMContentLoaded', initializeInterface);
  }

  function getIframeHeight() {

    var isProbablyMobile = window.innerWidth < 600;

    if (isProbablyMobile) {
      return '200px';
    } else {
      return '145px';
    }
  }

  // Wait for DOM content to load.
  switch(document.readyState) {
    case 'complete':
    case 'loaded':
    case 'interactive':
      initializeInterface();
      break;
    default:
      document.addEventListener('DOMContentLoaded', initializeInterface);
  }
})();
