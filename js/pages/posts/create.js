document.addEventListener('DOMContentLoaded', () => {
  const createPost = document.getElementById('create-post');
  const imageInput = document.getElementById('image');
  
  let image = null;

  if (imageInput) {
    imageInput.addEventListener('change', function(event) {
      image = event.target.files[0];
    })
  }
  if (createPost) {
    createPost.addEventListener('submit', function(event) {
      event.preventDefault();
      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;

      if(!title) {
        // 검증 코드
        return;
      }
      if(!content) {
        // 검증 코드
        return;
      }

      const postData = new FormData();
      postData.append('title', title);
      postData.append('content', content);
      if (image) {
        postData.append('image', image);
      } else {
        postData.append('image', null);
      }

      console.log('게시물 생성 시도: ', { postData });
      fetch('/api/posts', {
        method: 'POST',
        body: postData
      })
      .then(response => response.json())
      .then(data => {
        console.log('응답:', data);
        // 서버와 연결한 이후, 해당 id의 게시물 조회 페이지로 이동하도록 변경
        window.location.href = '/pages/posts/list.html';
      })
      .catch(error => {
        console.error('오류 발생:', error);
        // 임시
        window.location.href = '/pages/posts/list.html';
      })
    })
  } else {
    console.error('회원가입 폼을 찾을 수 없습니다.')
  }
})