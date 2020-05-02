/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
var sharedPreferences;
document.addEventListener("deviceready", function() {
  sharedPreferences = window.plugins.SharedPreferences.getInstance();
});

export function insert(key, value, callback) {
  let successCallback = function() {
    callback({ msg: "success", type: "insert" });
  };
  let errorCallback = function(err) {
    // eslint-disable-next-line no-console
    callback({ msg: "failed", type: "insert" });
  };
  sharedPreferences.put(key, value, successCallback, errorCallback);
}

export function get(key, callback) {
  let successCallback = function(value) {
    callback({ msg: "success", type: "get", data: value });
  };
  let errorCallback = function(err) {
    // eslint-disable-next-line no-console
    callback({ msg: "failed", type: "get" });
  };
  sharedPreferences.get(key, successCallback, errorCallback);
}

export function remove(key, callback) {
  let successCallback = function() {
    callback({ msg: "success", type: "remove" });
  };
  let errorCallback = function(err) {
    // eslint-disable-next-line no-console
    callback({ msg: "failed", type: "remove" });
  };
  sharedPreferences.del(key, successCallback, errorCallback);
}
