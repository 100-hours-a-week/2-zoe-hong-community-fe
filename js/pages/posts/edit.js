import { ROUTES, ENDPOINT } from '/js/config.js';
import { postDetailData } from '/data/data.js';
import { patchRequest } from '/js/utils/api.js';
import { showErrorMessage, clearErrorMessage } from '/js/utils/util.js';
import { validatePost } from '/js/utils/postUtil.js';

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = parseInt(urlParams.get('id'));
  
  const title = document.getElementById('title');
  const content = document.getElementById('content');
  const imageFile = document.getElementById('image');
  const editPost = document.getElementById('edit-post');

  if (editPost) editPost.dataset.postId = postId;

  if (!postId) {
    console.error('유효하지 않은 게시물 ID입니다.');
    window.location.href = ROUTES.POST(postId);
    return;
  }

  const post = postDetailData.find(post => post.id === postId);
  if (!post) {
    console.error(`ID ${postId}에 해당하는 게시물을 찾을 수 없습니다.`);
    window.location.href = ROUTES.POST(postId);
    return;
  }
  
  if (title) title.value = post.title;
  if (content) content.value = post.content;

  let newImageFile = null;
  if (imageFile) {
    imageFile.addEventListener('change', function(event) {
      if (event.target.files && event.target.files[0]) {
        newImageFile = event.target.files[0];
      }
    })
  }
  
  if (editPost) {
    editPost.addEventListener('submit', function(event) {
      event.preventDefault();

      const validation = validatePost(title.value, content.value);
      if (!validation.valid) {
        showErrorMessage('edit-post', validation.message);
        return;
      } else {
        clearErrorMessage('edit-post');
      }
      
      const postForm = new FormData();
      postForm.append('title', title.value.trim());
      postForm.append('content', content.value.trim());
      if (newImageFile) {
        postForm.append('image', newImageFile);
      } else {
        postForm.append('image', null);
      }

      const response = patchRequest(ENDPOINT.UPDATE_POST(postId), postForm, true);
      if (!response.success) {
        console.error(response.message);
        // return;
      }
      window.location.href = ROUTES.POST(postId);
    });
  } else {
    console.error('수정 폼을 찾을 수 없습니다.');
  }
});