document.addEventListener('DOMContentLoaded', () => {
  const joinForm = document.querySelector('form');
  const redirectToLogin = document.querySelector('#redirectToLogin');
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
        alert('이메일을 입력해주세요.');
        return;
      }
      if(!password) {
        alert('비밀번호를 입력해주세요.');
        return;
      }
      if(!passwordCheck) {
        alert('비밀번호 확인을 입력해주세요.');
        return;
      }
      if(!nickname) {
        alert('닉네임을 입력해주세요.');
        return;
      }
      if(password !== passwordCheck) {
        alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
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
      })

      window.location.href = 'login.html';
    })
  } else {
    console.error('회원가입 폼을 찾을 수 없습니다.')
  }

  if (redirectToLogin) {
    redirectToLogin.addEventListener('click', function(event) {
      console.log('redirect to Login page.');
      window.location.href = '/pages/login.html';
    })
  } else {
    console.error('로그인 페이지로 이동하는 데 실패했습니다.');
  };
});