import { httpRequest, postConfig, getError, getConfig } from "../../utils/requestUtils";

export const getMediaListing = () => (dispatch) => {
  const token = localStorage.getItem("token");

  return httpRequest
    .get("/media/all-listing", getConfig(token))
    .then((res) => {
      return Promise.resolve(res.data);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
