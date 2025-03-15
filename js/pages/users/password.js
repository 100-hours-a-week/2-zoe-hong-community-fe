import { ENDPOINT } from "/js/config.js";
import { currentUser } from '/data/data.js';
import { showToast } from '/js/components/toast.js';

document.addEventListener('DOMContentLoaded', () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/css/components/toast.css';
  document.head.appendChild(link);
  
  const editPasswordForm = document.getElementById('edit-password');
  const passwordInput = document.getElementById('password');
  const passwordCheckInput = document.getElementById('password-check');
  
  if (editPasswordForm) {
    editPasswordForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const password = passwordInput.value;
      const passwordCheck = passwordCheckInput.value;
      
      if (!password) {
        // 검증 코드
        return;
      }
      if (!passwordCheck) {
        // 검증 코드
        return;
      }
      if (password !== passwordCheck) {
        // 검증 코드
        return;
      }
      
      const passwordData = {
        password: password
      };
      
      console.log('비밀번호 수정 요청:', { userId: currentUser.id });
      
      fetch(ENDPOINT.UPDATE_PASSWORD(currentUser.id), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(passwordData)
      })
      .then(response => response.json())
      .then(data => {
        console.log('비밀번호 수정 응답:', data);
        showToast('수정 완료', 'success');
        editPasswordForm.reset();
      })
      .catch(error => {
        console.error('오류 발생:', error);
        // 임시
        showToast('수정 완료', 'success');
      })
    });
  }
});