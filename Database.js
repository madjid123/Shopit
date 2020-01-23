var sqlite = require('sqlite3').verbose()

class Database extends sqlite.Database {
    constructor(DatabaseName) {
        super(DatabaseName, (err) => {
            if (err) console.error(err.msg)
            console.log(`Connected succesfully to  ${DatabaseName} !`)
        })

    }
    InsertIntoUser(data) {
        let inserted = false
        let sqlintructions = `INSERT INTO User (firstname, lastname, email,password) VALUES (?,?,?,?);`
        this.run(sqlintructions, data, (err, row) => {
            if (err) {
                console.error(err.message)
                console.log('err')
            }
            else {
                console.log('succ')
                inserted = true
            }

        })
        return inserted
    }

}
module.exports = Database