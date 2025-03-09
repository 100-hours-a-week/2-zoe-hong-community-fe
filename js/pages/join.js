document.addEventListener('DOMContentLoaded', () => {
  const joinForm = document.getElementById('join-form');
  const redirectToLogin = document.getElementById('redirectToLogin');
  let profileImage = null;
  
  const imageInput = document.querySelector('#profile-img input[type="file"]');
  if (imageInput) {
    imageInput.addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (file) {
        profileImage = file;
        
        const profileImg = document.getElementById('profile-img');
        if (profileImg) {
          const plusIcon = profileImg.querySelector('.plus-icon');
          if (plusIcon) {
            plusIcon.style.display = 'none';
          }
          
          const previewImg = document.createElement('img');
          previewImg.className = 'preview-image';
          previewImg.style.width = '100%';
          previewImg.style.height = '100%';
          previewImg.style.borderRadius = '50%';
          previewImg.style.objectFit = 'cover';
          
          const reader = new FileReader();
          reader.onload = function(e) {
            previewImg.src = e.target.result;
          }
          reader.readAsDataURL(file);
          
          const existingPreview = profileImg.querySelector('.preview-image');
          if (existingPreview) {
            profileImg.removeChild(existingPreview);
          }
          profileImg.appendChild(previewImg);
        }
        console.log('이미지 선택됨:', file.name);
      }
    });
  }
  
  if (joinForm) {
    joinForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const passwordCheck = document.getElementById('password-check').value;
      const nickname = document.getElementById('nickname').value;
      if(!email) {
        // 검증 코드
        return;
      }
      if(!password) {
        // 검증 코드
        return;
      }
      if(!passwordCheck) {
        // 검증 코드
        return;
      }
      if(!nickname) {
        // 검증 코드
        return;
      }
      if(password !== passwordCheck) {
        // 검증 코드
        return;
      }
      
      const joinForm = new FormData();
      joinForm.append('email', email);
      joinForm.append('password', password);
      joinForm.append('nickname', nickname);
      if (profileImage) {
        joinForm.append('profileImg', profileImage);
      }

      console.log('회원가입 시도: ', { joinForm });
      fetch('/api/join', {
        method: 'POST',
        body: joinForm
      })
      .then(response => response.json())
      .then(data => {
        console.log('응답:', data);
        window.location.href = '/pages/login.html';
      })
      .catch(error => {
        console.error('오류 발생:', error);
        // 임시
        window.location.href = '/pages/login.html';
      })
    })
  } else {
    console.error('회원가입 폼을 찾을 수 없습니다.')
  }

  if (redirectToLogin) {
    redirectToLogin.addEventListener('click', function(event) {
      window.location.href = '/pages/login.html';
    })
  } else {
    console.error('로그인 페이지로 이동하는 데 실패했습니다.');
  };
});