var SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({ name: 'parking.db', createFromLocation: '~parking.db' })
export default db;