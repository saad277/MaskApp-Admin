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

export const getMediaDetails = (id) => (dispatch) => {
  const token = localStorage.getItem("token");

  return httpRequest
    .get(`/media/${id}`, getConfig(token))
    .then((res) => {
      return Promise.resolve(res.data);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
