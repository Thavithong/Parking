// @flow

import I18n from 'react-native-i18n'

I18n.fallbacks = true
I18n.translations = {
  en: require('./languages/english.json'),
  lo: require('./languages/lo.json'),
}

export default I18n

let languageCode = I18n.locale.substr(0, 2)

// All other translations for the app goes to the respective language file:
switch (languageCode) {
  case 'lo': // Lao
    I18n.translations.zu = require('./languages/lo.json')
    break
}
