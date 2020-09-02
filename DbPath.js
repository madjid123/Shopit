const os = require('os')
const OsType = os.type()
var DbPath;
if (OsType == 'Linux' || OsType == 'Darwin') {
  DbPath = __dirname + '/DataBase/ShopIt.db'
} else if (OsType == 'Windows_NT') {
  DbPath = __dirname + '\\DataBase\\ShopIt.db'
}
module.exports = DbPath
