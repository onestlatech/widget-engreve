import './main.css'

const MS_PER_DAY = 86400000

const GLOBAL_STRIKE_URLS = {
  // en: '',
  fr: 'https://reforme-retraite.info/',
}

const GLOBAL_STRIKE_FULL_PAGE_URLS = {
  // en: '',
  fr: 'https://reforme-retraite.info/',
}

const LOCALE_CODE_MAPPING = {
  // en: 'en-EN',
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

function setGlobalStrikeLinkUrl(selector) {
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
  const isFullPage = !query.minMode || todayIs(fullPageDisplayStartDate)

  joinUrls = isFullPage ? GLOBAL_STRIKE_FULL_PAGE_URLS : GLOBAL_STRIKE_URLS

  setGlobalStrikeLinkUrl('.dcs-footer .dcs-button')
  setGlobalStrikeLinkUrl('.dcs-footer__logo')
  setGlobalStrikeLinkUrl('.dcs-full-page .dcs-button')
  setGlobalStrikeLinkUrl('.dcs-full-page__logo')
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
