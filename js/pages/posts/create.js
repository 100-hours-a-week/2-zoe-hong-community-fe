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
        alert('제목을 입력해주세요.');
        return;
      }
      if(!content) {
        alert('내용을 입력해주세요.');
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
      fetch('/api/posts/create', {
        method: 'POST',
        body: postData
      })
      .then(response => response.json())
      .then(data => {
        console.log('응답:', data);
      })

      window.location.href = '/pages/posts/list.html';
    })
  } else {
    console.error('회원가입 폼을 찾을 수 없습니다.')
  }
})