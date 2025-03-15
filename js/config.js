export const ROUTES = {
  LOGIN: "/pages/login.html",
  JOIN: "/pages/join.html",
  POST: (postId) => `/pages/posts/post.html?id=${postId}`,
  POST_LIST: "/pages/posts/list.html",
  POST_CREATE: "/pages/posts/create.html",
  POST_EDIT: (postId) => `/pages/posts/edit.html?id=${postId}`,
  USER_PROFILE: "/pages/users/profile.html",
  USER_PASSWORD: "/pages/users/password.html",
};