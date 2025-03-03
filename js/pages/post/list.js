document.addEventListener('DOMContentLoaded', () => {
  const createPostButton = document.querySelector('button');
  if (createPostButton) {
    createPostButton.addEventListener('click', function() {
      console.log('게시물 생성 리다이렉트');
      window.location.href = 'create.html';
    });
  } else {
    console.error('게시물 리스트를 찾을 수 없습니다.');
  }
})