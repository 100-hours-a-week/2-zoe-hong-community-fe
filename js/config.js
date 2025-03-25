const FE_URL = 'http://127.0.0.1:5500'; // 프론트엔드 도메인
export const BE_URL = 'http://127.0.0.1:8080'; // 백엔드 도메인

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
  USERS: `${BE_URL}/users`,
  DELETE_USER: `${BE_URL}/users/self`,
  UPDATE_PROFILE: `${BE_URL}/users/self/info`,
  UPDATE_PASSWORD: `${BE_URL}/users/self/password`,
  CHECK_EMAIL: `${BE_URL}/user/email`,
  CHECK_NICKNAME: `${BE_URL}/user/nickname`,
  POSTS: `${BE_URL}/posts`,
  POST_DETAIL: (postId) => `${BE_URL}/posts/${postId}`,
  POST_DETAIL_EDIT: (postId) => `${BE_URL}/posts/${postId}/edit`,
  LIKE_POST: (postId) => `${BE_URL}/posts/${postId}/like`,
  COMMENTS: (postId) => `${BE_URL}/posts/${postId}/comments`,
  COMMENT_DETAIL: (postId, commentId) => `${BE_URL}/posts/${postId}/comments/${commentId}`,
};
