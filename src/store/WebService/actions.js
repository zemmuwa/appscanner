/* eslint-disable no-unused-vars */
import qs from "qs";
import axios from "axios";
import { Loading } from "quasar";
export function post(
  context,
  {
    url,
    data = {},
    headers = {
      "Content-Type": "application/x-www-form-urlencoded"
      // "Content-Type": "application/json"
    },
    formData = null
  }
) {
  return new Promise((resolve, reject) => {
    let param;
    if (formData) {
      param = formData;
    } else {
      param = qs.stringify(data);
    }

    Loading.show({
      spinnerColor: "primary"
    });
    axios
      .post(url, param, {
        headers: headers
      })
      .then(function(response) {
        Loading.hide();
        resolve(response.data);
      })
      .catch(function(error) {
        Loading.hide();
        resolve(error);
      });
  });
}
