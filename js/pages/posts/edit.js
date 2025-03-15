import { ROUTES, ENDPOINT } from '/js/config.js';
import { postDetailData } from '/data/data.js';

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
    alert('수정할 게시물을 찾을 수 없습니다.');
    window.location.href = ROUTES.POST(postId);
    return;
  }

  const post = postDetailData.find(post => post.id === postId);
  if (!post) {
    console.error(`ID ${postId}에 해당하는 게시물을 찾을 수 없습니다.`);
    alert('수정할 게시물을 찾을 수 없습니다.');
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
      
      if (!title.value.trim()) {
        // 검증 코드
        return;
      }
      if (!content.value.trim()) {
        // 검증 코드
        return;
      }
      
      const postForm = new FormData();
      postForm.append('title', title.value.trim());
      postForm.append('content', content.value.trim());
      if (newImageFile) {
        postForm.append('image', newImageFile);
      } else {
        postForm.append('image', post.image);
      }

      fetch(ENDPOINT.UPDATE_POST(postId), {
        method: 'PATCH',
        body: postForm
      })
      .then(response => response.json())
      .then(data => {
        console.log('응답:', data);
        window.location.href = ROUTES.POST(postId);
      })
      .catch(error => {
        console.error('오류 발생:', error);
        // 임시
        window.location.href = ROUTES.POST(postId);
      })
    });
  } else {
    console.error('수정 폼을 찾을 수 없습니다.');
  }
});