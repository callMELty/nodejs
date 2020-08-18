const db = require('./model');

module.exports = {
    getItems(newDate) {
        return new Promise( (resolve, reject) => {
            db.query("SELECT * from dangernum where TIME = ?",newDate, function(err, rs) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rs);
                }
            });
        } )
    },

    addItem(newData) {
        return new Promise( (resolve, reject) => {
            db.query("INSERT INTO dangernum(NAME,COUNT,TIME,X,Y,DES) VALUES(?,?,?,?,?,?)", newData, function(err, rs) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rs);
                }
            });
        } )
    },
    maxtimeItem() {
        return new Promise( (resolve, reject) => {
            db.query("select * from dangernum where id = (select max(id) from dangernum)", function(err, rs) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rs);
                }
            });
        } )
    },
    alltimeItem(){
        return new Promise( (resolve, reject) => {
            db.query("SELECT DISTINCT time from dangernum ORDER BY time DESC", function(err, rs) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rs);
                }
            });
        } )
    }
}