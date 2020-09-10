const os = require('os')
const OsType = os.type()
var DbPath;
switch (OsType) {
  case 'Windows_NT':
    DbPath = __dirname + '\\DataBase\\ShopIt.db'
    break
  default:
    DbPath = __dirname + '/DataBase/ShopIt.db'
}

module.exports = DbPath
