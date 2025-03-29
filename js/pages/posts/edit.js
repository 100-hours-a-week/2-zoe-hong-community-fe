import { ROUTES, ENDPOINT } from '/js/config.js';
import { getRequest, putRequest } from '/js/utils/api.js';
import { showErrorMessage, clearErrorMessage } from '/js/utils/util.js';
import { validatePost } from '/js/utils/postUtil.js';

document.addEventListener('DOMContentLoaded', async () => {
  const postId = getPostIdFromUrl();
  if (!postId) return;

  const post = await loadPostEdit(postId);
  if (!post) {
    window.location.href = ROUTES.POST(postId);
    return;
  }

  if (!isUserPostAuthor(post)) {
    alert('게시글을 수정할 권한이 없습니다.');
    window.location.href = ROUTES.POST(postId);
    return;
  }

  renderPostForm(post);
  handleImageInput();
  setupEditFormSubmission(postId, post);
});

function getPostIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get('id'));
  if (!id) {
    console.error('유효하지 않은 게시글 ID입니다.');
    return null;
  }
  return id;
}

async function loadPostEdit(postId) {
  try {
    const response = await getRequest(ENDPOINT.POST_DETAIL(postId, true));
    if (!response.success) throw new Error(response.message);
    console.log(response.post);
    return response.post;
  } catch (err) {
    console.error("게시글 수정 조회 중 오류:", err);
    return null;
  }
}

function isUserPostAuthor(post) {
  const token = localStorage.getItem('token');
  const payload = JSON.parse(atob(token.split('.')[1]));
  const currentUserId = payload.id;
  return post.user.id === Number(currentUserId);
}

function renderPostForm(post) {
  const title = document.getElementById('title');
  const content = document.getElementById('content');
  const editPost = document.getElementById('edit-post');

  if (editPost) editPost.dataset.postId = post.id;
  if (title) title.value = post.title;
  if (content) content.value = post.content;
}

let newImageFile = null;

function handleImageInput() {
  const imageFile = document.getElementById('image');
  if (imageFile) {
    imageFile.addEventListener('change', (event) => {
      if (event.target.files && event.target.files[0]) {
        newImageFile = event.target.files[0];
      }
    });
  }
}

function setupEditFormSubmission(postId, post) {
  const editPostForm = document.getElementById('edit-post');
  const title = document.getElementById('title');
  const content = document.getElementById('content');

  if (!editPostForm) {
    console.error('수정 폼을 찾을 수 없습니다.');
    return;
  }

  editPostForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const validation = validatePost(title.value, content.value);
    if (!validation.valid) {
      showErrorMessage('edit-post', validation.message);
      return;
    }
    clearErrorMessage('edit-post');

    const postForm = new FormData();
    postForm.append('title', title.value.trim());
    postForm.append('content', content.value.trim());
    if (newImageFile) {
      postForm.append('image', newImageFile);
    }

    try {
      const response = await putRequest(ENDPOINT.POST_DETAIL_EDIT(postId), postForm, true);
      if (!response.success) throw new Error(response.message);
      window.location.href = ROUTES.POST(postId);
    } catch (err) {
      console.error("게시글 수정 중 오류:", err);
    }
  });
}
