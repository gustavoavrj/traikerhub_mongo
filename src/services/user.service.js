import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";
const API_VIDEOS = "http://localhost:8080/api/video/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const insertUpload = (titulo, description, url, thumbnail, level, user) => {
  return axios.post(API_VIDEOS + "insert",{
    titulo,
    description,
    url,
    thumbnail,
    level,
    user
  },{ headers: authHeader()}).then((response) => {
    return console.log(response.data)
  });



};



const showMyvideos = (user) => {
  return axios.post(API_VIDEOS + "private", {
    user
  }, { headers: authHeader() });

};
const showVideos = (level) => {
  return axios.post(API_VIDEOS + "public", {
    level
  }, { headers: authHeader() })



};
const showVideosID = (id) => {
  return axios.post(API_VIDEOS + "show", {
    id
  }, { headers: authHeader() })



};

const deleteUpload = (title, url, user) => {
  return axios.post(API_URL + "videos/insert", {
    title,
    url,
    user,
  }, { headers: authHeader() });

};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  insertUpload,
  showMyvideos,
  showVideos,
  deleteUpload,
  showVideosID,
};
