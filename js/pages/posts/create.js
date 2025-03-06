document.addEventListener('DOMContentLoaded', () => {
  const createPost = document.querySelector('form');
  if (createPost) {
    createPost.addEventListener('submit', function(event) {
      event.preventDefault();
      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;
      const image = document.getElementById('image').value;

      if(!title) {
        alert('제목을 입력해주세요.');
        return;
      }
      if(!content) {
        alert('내용을 입력해주세요.');
        return;
      }
      console.log('게시물 생성 시도: ', {title});
      window.location.href = 'list.html';
    })
  } else {
    console.error('회원가입 폼을 찾을 수 없습니다.')
  }
})