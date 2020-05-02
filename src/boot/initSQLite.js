/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
var db;
document.addEventListener("deviceready", function() {
  db = window.sqlitePlugin.openDatabase({
    name: "AppScanner.db",
    location: "default"
  });
  db.transaction(function(tx) {
    //tx.executeSql("DROP TABLE IF EXISTS DetailBookingData");
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS DetailBookingData (DetailBookingID integer, JadwalID integer, NomorBooking varchar(255),IsScanned tinyint,JsonData text)"
    );
  });
});
export function insertDetailBookingData(param) {
  db.executeSql(
    "INSERT INTO DetailBookingData (DetailBookingID, JadwalID,NomorBooking,IsScanned,JsonData) VALUES (?,?,?,?,?)",
    param,
    function(tx, res) {
      console.log("insertId: " + res.insertId);
      console.log("rowsAffected: " + res.rowsAffected);
    }
  );
}

export function getDetailBookingData() {
  let data = [];
  db.transaction(function(tx) {
    tx.executeSql("select * FROM DetailBookingData;", [], function(tx, res) {
      for (let index = 0; index < res.rows.length; index++) {
        data.push(res.rows.item(index));
      }
    });
  });
  return data;
}

export function getDetailBookingDataByNomorBooking(nomorBooking, jadwalID) {
  let data = [];
  db.transaction(function(tx) {
    tx.executeSql(
      "select * FROM DetailBookingData WHERE NomorBooking = ? AND JadwalID = ?;",
      [nomorBooking, jadwalID],
      function(tx, res) {
        for (let index = 0; index < res.rows.length; index++) {
          data.push(res.rows.item(index));
        }
      }
    );
  });
  return data;
}

export async function scanDetailBookingData(
  nomorBookin,
  jadwalID,
  callback = null
) {
  db.executeSql(
    "UPDATE DetailBookingData SET IsScanned = ? WHERE NomorBooking = ? AND JadwalID = ?",
    [1, nomorBookin, jadwalID],
    function(tx, res) {
      let data = [];
      // tx.executeSql(
      //   "select * FROM DetailBookingData WHERE NomorBooking = ? AND JadwalID = ?;",
      //   [nomorBookin, jadwalID],
      //   function(tx, res) {
      //     for (let index = 0; index < res.rows.length; index++) {
      //       data.push(res.rows.item(index));
      //     }
      //     console.log([nomorBookin, jadwalID]);
      //     if (callback != null) {
      //       callback.success(data);
      //     }
      //   },
      //   function(tx, error) {
      //     console.log(error);
      //   }
      // );
      if (callback != null) {
        callback.success(true);
      }
    },
    function(tx, error) {
      if (callback != null) {
        callback.success(false);
      }
    }
  );
}

export function clearDetailBookingData() {
  db.transaction(function(tx) {
    tx.executeSql("DROP TABLE IF EXISTS DetailBookingData");
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS DetailBookingData (DetailBookingID integer, JadwalID integer, NomorBooking varchar(255),IsScanned tinyint,JsonData text)"
    );
  });
}
