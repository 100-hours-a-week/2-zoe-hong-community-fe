document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('#loginForm');
  const redirectToJoin = document.querySelector('#redirectToJoin');

  if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      if (!email) {
        alert('이메일을 입력해주세요.');
        return;
      }
      if (!password) {
        alert('비밀번호를 입력해주세요.');
        return;
      }
      console.log('로그인 시도:', { email, password });

      fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      .then(response => response.json())
      .then(data => {
        console.log('응답:', data);
      })

      window.location.href = 'posts/list.html';
    });
  } else {
    console.error('로그인 폼을 찾을 수 없습니다.');
  }

  if (redirectToJoin) {
    redirectToJoin.addEventListener('click', function(event) {
      console.log('redirect to Join page.');
      window.location.href = 'join.html';
    })
  } else {
    console.error('회원가입 페이지로 이동하는 데 실패했습니다.');
  }
});