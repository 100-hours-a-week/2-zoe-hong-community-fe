import { postDetailData } from '/js/data/data.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('수정 페이지 스크립트 로딩됨');
  
  const urlParams = new URLSearchParams(window.location.search);
  const postId = parseInt(urlParams.get('id'));
  
  console.log('수정할 게시물 ID:', postId);

  if (!postId) {
    console.error('유효하지 않은 게시물 ID입니다.');
    alert('수정할 게시물을 찾을 수 없습니다.');
    window.location.href = 'index.html';
    return;
  }

  const post = postDetailData.find(post => post.id === postId);
  if (!post) {
    console.error(`ID ${postId}에 해당하는 게시물을 찾을 수 없습니다.`);
    alert('수정할 게시물을 찾을 수 없습니다.');
    window.location.href = 'index.html';
    return;
  }
  
  console.log('수정할 게시물:', post);

  const titleInput = document.getElementById('title');
  const contentTextarea = document.getElementById('content');
  const editForm = document.getElementById('editPost');
  
  if (titleInput) {
    titleInput.value = post.title;
  } else {
    console.error('제목 입력 필드를 찾을 수 없습니다.');
  }
  
  if (contentTextarea) {
    contentTextarea.value = post.content;
  } else {
    console.error('내용 입력 필드를 찾을 수 없습니다.');
  }
  
  const imagePreviewContainer = document.querySelector('.image-preview');
  if (imagePreviewContainer && post.image) {
    const imgPreview = document.createElement('img');
    imgPreview.src = post.image;
    imgPreview.alt = '게시물 이미지';
    imgPreview.className = 'preview-image';
    imagePreviewContainer.appendChild(imgPreview);
    
    const deleteImgBtn = document.createElement('button');
    deleteImgBtn.textContent = '이미지 삭제';
    deleteImgBtn.className = 'delete-image-btn';
    deleteImgBtn.addEventListener('click', function(e) {
      e.preventDefault();
      imagePreviewContainer.innerHTML = '';
      console.log('이미지 삭제됨');
    });
    imagePreviewContainer.appendChild(deleteImgBtn);
  }
  
  if (editForm) {
    editForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      if (!titleInput.value.trim()) {
        alert('제목을 입력해주세요.');
        titleInput.focus();
        return;
      }
      
      if (!contentTextarea.value.trim()) {
        alert('내용을 입력해주세요.');
        contentTextarea.focus();
        return;
      }
      
      const updatedPost = {
        ...post,
        title: titleInput.value.trim(),
        content: contentTextarea.value.trim(),
      };
      
      console.log('수정된 게시물 정보:', updatedPost);
      
      alert('게시물이 수정되었습니다.');
      window.location.href = `post.html?id=${postId}`;
    });
  } else {
    console.error('수정 폼을 찾을 수 없습니다.');
  }
});