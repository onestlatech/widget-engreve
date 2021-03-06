import './main.css'

const MS_PER_DAY = 86400000

const GLOBAL_STRIKE_URLS = {
  en: 'https://onestla.tech/',
  fr: 'https://onestla.tech/',
}

const GLOBAL_STRIKE_FULL_PAGE_URLS = {
  en: 'https://onestla.tech/',
  fr: 'https://onestla.tech/',
}

const LOCALE_CODE_MAPPING = {
  en: 'en-US',
  fr: 'fr-FR',
}

let joinUrls = null
let isMaximizing = false
let language = 'fr'

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
  fullPageWidget.style.background = 'rgba(204,51,0, 0.9)'

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

const handleJoinStrikeButtonClick = (stayInWindow) => (event) => {
  event.preventDefault()
  event.stopPropagation()

  if (stayInWindow) {
    postMessage('buttonClicked', { linkUrl: joinUrls[language] })
  } else {
    const newWindow = window.open(joinUrls[language], '_blank');
    newWindow.focus();
  }
}

function setGlobalStrikeLinkUrl(selector, stayInWindow) {
  const element = document.querySelector(selector)
  element.setAttribute('href', joinUrls[language])
  if (!stayInWindow && element.nodeName === 'a') {
    element.setAttribute('target', '_blank')
    element.setAttribute('rel', 'noopener noreferrer')
  }
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
  const isFullPage = !query.minMode || todayIs(fullPageDisplayStartDate)
  const stayInWindow = query.popup !== 'true'
  const customStrikeURLs = {}
  if (query.customStrikeEnURL) {
    customStrikeURLs.en = query.customStrikeEnURL
  }
  if (query.customStrikeFrURL) {
    customStrikeURLs.fr = query.customStrikeFrURL
  }

  joinUrls = {...(isFullPage ? GLOBAL_STRIKE_FULL_PAGE_URLS : GLOBAL_STRIKE_URLS), ...customStrikeURLs}

  setGlobalStrikeLinkUrl('.dcs-footer .dcs-button', stayInWindow)
  setGlobalStrikeLinkUrl('.dcs-footer__logo', stayInWindow)
  setGlobalStrikeLinkUrl('.dcs-full-page .dcs-button', stayInWindow)
  setGlobalStrikeLinkUrl('.dcs-full-page__logo', stayInWindow)
  attachEvent('.dcs-close', 'click', handleCloseButtonClick)
  attachEvent('.dcs-button', 'click', handleJoinStrikeButtonClick(stayInWindow))
  attachEvent('.dcs-footer__logo', 'click', handleJoinStrikeButtonClick(stayInWindow))
  attachEvent('.dcs-full-page__logo', 'click', handleJoinStrikeButtonClick(stayInWindow))

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

  if (!query.minMode) {
    const fullPageFooter = document.querySelector('.dcs-full-page__footer')
    fullPageFooter.style.display = 'none'
  }

  // Set display dates on full-size widget
  var fullscreenDateString = getFormattedDate(fullPageDisplayStartDate, language)
  var nextDayDateString = getFormattedDate(fullPageDisplayStopDate, language)
  document.getElementById('dcs-strike-date').innerText = fullscreenDateString
  document.getElementById('dcs-tomorrow-date').innerText = nextDayDateString
}

document.addEventListener('DOMContentLoaded', initializeInterface)
