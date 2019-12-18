import './main.css'

const MS_PER_DAY = 86400000

const GLOBAL_STRIKE_URLS = {
  en: 'https://digital.globalclimatestrike.net/join/?source=digitalstrikebanner',
  es: 'https://es.globalclimatestrike.net/?source=digitalstrikebanner',
  de: 'https://de.globalclimatestrike.net/?source=digitalstrikebanner',
  cs: 'https://www.tydenproklima.cz',
  fr: 'https://fr.globalclimatestrike.net/?source=digitalstrikebanner',
  nl: 'https://globalclimatestrike.net/?source=digitalstrikebanner',
  tr: 'https://sifirgelecek.org/',
  pt: 'https://pt.globalclimatestrike.net/?source=digitalstrikebanner',
  it: 'https://digital.globalclimatestrike.net/join/?source=digitalstrikebanner',
}

const GLOBAL_STRIKE_FULL_PAGE_URLS = {
  en: 'https://globalclimatestrike.net/digital-strike-day/?source=digitalstrikebanner',
  es: 'https://es.globalclimatestrike.net/digital-strike-day/?source=digitalstrikebanner',
  de: 'https://de.globalclimatestrike.net/digital-strike-day/?source=digitalstrikebanner',
  cs: 'https://www.tydenproklima.cz',
  fr: 'https://fr.globalclimatestrike.net/digital-strike-day/?source=digitalstrikebanner',
  nl: 'https://globalclimatestrike.net/digital-strike-day/?source=digitalstrikebanner',
  tr: 'https://sifirgelecek.org',
  pt: 'https://pt.globalclimatestrike.net/digital-strike-day/?source=digitalstrikebanner',
  it: 'https://globalclimatestrike.net/digital-strike-day/?source=digitalstrikebanner',
}

const LOCALE_CODE_MAPPING = {
  en: 'en-EN',
  de: 'de-DE',
  es: 'es-ES',
  cs: 'cs-CZ',
  fr: 'fr-FR',
  nl: 'nl-NL',
  tr: 'tr-TR',
  pt: 'pt-BR',
  it: 'it-IT',
}

let joinUrls = null
let isMaximizing = false
let language = 'en'

function maximize() {
  if (isMaximizing) return
  isMaximizing = true
  postMessage('maximize')
  const stickyFooter = document.querySelector('.dcs-footer')
  stickyFooter.style.display = 'none'

  const fullPage = document.querySelector('.dcs-full-page')
  fullPage.style.display = 'flex'
}

function showCloseButtonOnFullPageWidget() {
  const fullPageWidget = document.querySelector('.dcs-full-page')
  fullPageWidget.style.background = 'rgba(78,229,139, 0.8)'

  const fullPageCloseButton = document.querySelector('.dcs-full-page__close')
  fullPageCloseButton.style.display = 'flex'

  const fullPageCloseButtonContent = document.querySelector('.dcs-close')
  fullPageCloseButtonContent.classList.add('dcs-full-page-close')

  const fullPageFooter = document.querySelector('.dcs-full-page__footer')
  fullPageFooter.style.display = 'none'
}

function handleCustomWebsiteName(websiteName) {
  const websiteNameDefault = document.querySelector('.dcs-website-name__default')
  websiteNameDefault.style.display = 'none'

  const websiteNamePrefix = document.querySelector('.dcs-website-name__prefix')
  websiteNamePrefix.style.display = 'inline-block'

  const websiteNameText = document.querySelector('.dcs-website-name')
  websiteNameText.innerHTML = decodeURI(websiteName)
}

function parseQuery(queryString) {
  var query = {}
  var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&')
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=')
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '')
  }
  return query
}

function postMessage(action, data) {
  data || (data = {})
  data.action = action
  data.DIGITAL_STRIKE = true
  window.parent.postMessage(data, '*')
}

function handleCloseButtonClick(event) {
  event.preventDefault()
  event.stopPropagation()


  postMessage('closeButtonClicked')
}

function handleJoinStrikeButtonClick(event) {
  event.preventDefault()
  event.stopPropagation()

  postMessage('buttonClicked', { linkUrl: joinUrls[language] })
}

function setGlobalClimateStrikeLinkUrl(selector) {
  const element = document.querySelector(selector)
  element.setAttribute('href', joinUrls[language])
}

function attachEvent(selector, event, callback) {
  var elements = document.querySelectorAll(selector)
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener(event, callback)
  }
}

function todayIs(date) {
  var today = new Date()
  return date.getFullYear() === today.getFullYear()
    && date.getMonth() === today.getMonth()
    && date.getDate() === today.getDate()
}

function getFormattedDate(date, language) {
  return date.toLocaleDateString(LOCALE_CODE_MAPPING[language], { day: 'numeric', month: 'long' })
}

function initializeInterface() {
  const query = parseQuery(location.search)
  const fullPageDisplayStartDate = new Date(Date.parse(query.fullPageDisplayStartDate))
  const fullPageDisplayStopDate = new Date(fullPageDisplayStartDate.getTime() + MS_PER_DAY)
  const isFullPage = query.forceFullPageWidget || todayIs(fullPageDisplayStartDate)

  joinUrls = isFullPage ? GLOBAL_STRIKE_FULL_PAGE_URLS : GLOBAL_STRIKE_URLS

  setGlobalClimateStrikeLinkUrl('.dcs-footer .dcs-button')
  setGlobalClimateStrikeLinkUrl('.dcs-footer__logo')
  setGlobalClimateStrikeLinkUrl('.dcs-full-page .dcs-button')
  setGlobalClimateStrikeLinkUrl('.dcs-full-page__logo')
  attachEvent('.dcs-close', 'click', handleCloseButtonClick)
  attachEvent('.dcs-button', 'click', handleJoinStrikeButtonClick)
  attachEvent('.dcs-footer__logo', 'click', handleJoinStrikeButtonClick)
  attachEvent('.dcs-full-page__logo', 'click', handleJoinStrikeButtonClick)

  language = query.language ? query.language : language

  if (query.showCloseButtonOnFullPageWidget) {
    showCloseButtonOnFullPageWidget()
  }

  if (query.websiteName) {
    handleCustomWebsiteName(query.websiteName)
  }

  if (isFullPage) {
    maximize()
  }

  // Set display dates on full-size widget
  var fullscreenDateString = getFormattedDate(fullPageDisplayStartDate, language)
  var nextDayDateString = getFormattedDate(fullPageDisplayStopDate, language)
  document.getElementById('dcs-strike-date').innerText = fullscreenDateString
  document.getElementById('dcs-tomorrow-date').innerText = nextDayDateString
}

document.addEventListener('DOMContentLoaded', initializeInterface)
