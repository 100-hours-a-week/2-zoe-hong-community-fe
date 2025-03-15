import { postRequest } from '../utils/api';
import { ROUTES, ENDPOINT } from '/js/config.js';
import { validateEmail, validatePassword } from '/js/utils/loginUtil.js';
import { showErrorMessage, clearErrorMessage } from '/js/utils/util.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const email = emailInput.value.trim();
      const password = passwordInput.value;

      let isValid = true;
      
      const emailValidation = validateEmail(email);
      if (!emailValidation.valid) {
        showErrorMessage('email', emailValidation.message);
        isValid = false;
      } else {
        clearErrorMessage('email');
      }
      
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.valid) {
        showErrorMessage('password', passwordValidation.message);
        isValid = false;
      } else {
        clearErrorMessage('password');
      }

      if (!isValid) return;
 
      const loginData = {
        email: email,
        password: password
      };
 
      console.log('로그인 시도:', { loginData });
      const response = postRequest(ENDPOINT.LOGIN, loginData);
      if (!response.success) {
        console.error(response.message);
        // return;
      }
      window.location.href = ROUTES.POST_LIST;
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