document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('form');
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
      window.location.href = 'post/list.html';
    });
  } else {
    console.error('로그인 폼을 찾을 수 없습니다.');
  }
});