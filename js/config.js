const FE_URL = ""; // 프론트엔드 도메인
const BE_URL = ""; // 백엔드 도메인

export const ROUTES = {
  LOGIN: `${FE_URL}/pages/login.html`,
  JOIN: `${FE_URL}/pages/join.html`,
  POST: (postId) => `${FE_URL}/pages/posts/post.html?id=${postId}`,
  POST_LIST: `${FE_URL}/pages/posts/list.html`,
  POST_CREATE: `${FE_URL}/pages/posts/create.html`,
  POST_EDIT: (postId) => `${FE_URL}/pages/posts/edit.html?id=${postId}`,
  USER_PROFILE: `${FE_URL}/pages/users/profile.html`,
  USER_PASSWORD: `${FE_URL}/pages/users/password.html`,
};

export const ENDPOINT = {
  LOGIN: `${BE_URL}/auth/login`,
  LOGOUT: `${BE_URL}/auth/logout`,
  JOIN: `${BE_URL}/users`,
  CHECK_EMAIL: (email) => `${BE_URL}/users/check-email?email=${email}`,
  CHECK_NICKNAME: (nickname) => `${BE_URL}/users/check-nickname?nickname=${nickname}`,
  DELETE_USER: `${BE_URL}/users/self`,
  GET_USER_INFO: `${BE_URL}/users/self/info`,
  UPDATE_USER_INFO: `${BE_URL}/users/self/info`,
  UPDATE_PASSWORD: `${BE_URL}/users/self/password`,
  GET_POST_LIST: `${BE_URL}/posts`,
  CREATE_POST: `${BE_URL}/posts`,
  GET_POST_DETAIL: (postId) => `${BE_URL}/posts/${postId}`,
  UPDATE_POST: (postId) => `${BE_URL}/posts/${postId}`,
  LIKE_POST: (postId) => `${BE_URL}/posts/${postId}/like`,
  CREATE_COMMENT: (postId) => `${BE_URL}/posts/${postId}/comments`,
  UPDATE_COMMENT: (postId, commentId) => `${BE_URL}/posts/${postId}/comments/${commentId}`,
  DELETE_COMMENT: (postId, commentId) => `${BE_URL}/posts/${postId}/comments/${commentId}`,
};