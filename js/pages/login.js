import { ROUTES } from '/js/config.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  
  if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      
      if (!email) {
        // 검증 텍스트
        return;
      }
      
      if (!password) {
        // 검증 텍스트
        return;
      }
 
      const loginData = {
        email: email,
        password: password
      };
 
      console.log('로그인 시도:', { loginData });
      fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ loginData })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('로그인 실패');
        }
        return response.json();
      })
      .then(data => {
        console.log('응답:', data);
        window.location.href = ROUTES.POST_LIST;
      })
      .catch(error => {
        console.error('오류 발생:', error);
        // 임시
        window.location.href = ROUTES.POST_LIST;
      });
    });
  } else {
    console.error('로그인 폼을 찾을 수 없습니다.');
  }
 
  const redirectToJoin = document.getElementById('redirectToJoin');
  if (redirectToJoin) {
    redirectToJoin.addEventListener('click', function(event) {
      window.location.href = ROUTES.JOIN;
    });
  } else {
    console.error('회원가입 페이지로 이동하는 데 실패했습니다.');
  }
});