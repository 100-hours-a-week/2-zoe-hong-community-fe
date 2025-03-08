import { currentUser } from '/js/data/data.js';

document.addEventListener('DOMContentLoaded', () => {
  const editPassword = document.getElementById('edit-password');

  if (editPassword) {
    editPassword.addEventListener('submit', function(event) {
      event.preventDefault();
      const password = document.getElementById('password').value;
      const passwordCheck = document.getElementById('password-check').value;
      if (!password) {
        alert('비밀번호을 입력해주세요.');
        return;
      }
      if (!passwordCheck) {
        alert('비밀번호 확인을 입력해주세요.');
        return;
      }
      if (password !== passwordCheck) {
        alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        return;
      }
      console.log('비밀번호 수정:', { password, passwordCheck });

      fetch(`/api/user/password/${currentUser.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
      })
      .then(response => response.json())
      .then(data => {
        console.log('응답:', data);
      })

      alert('비밀번호를 수정하였습니다.');
      window.location.href = '/pages/posts/list.html';
    });
  } else {
    console.error('로그인 폼을 찾을 수 없습니다.');
  }
});