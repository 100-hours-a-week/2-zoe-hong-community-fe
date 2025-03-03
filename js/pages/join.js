document.addEventListener('DOMContentLoaded', () => {
  const joinForm = document.querySelector('form');
  let profileImageFile = null; // 프로필 이미지 파일 저장 변수
  
  // 이미지 업로드 처리
  const imageInput = document.querySelector('.circle-img input[type="file"]');
  if (imageInput) {
    imageInput.addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (file) {
        profileImageFile = file;
        
        // 이미지 미리보기 표시 (선택적)
        const circleImg = document.querySelector('.circle-img');
        if (circleImg) {
          // plus 아이콘 숨기기
          const plusIcon = circleImg.querySelector('.plus-icon');
          if (plusIcon) {
            plusIcon.style.display = 'none';
          }
          
          // 이미지 미리보기 생성
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
          
          // 기존 이미지 미리보기가 있으면 제거
          const existingPreview = circleImg.querySelector('.preview-image');
          if (existingPreview) {
            circleImg.removeChild(existingPreview);
          }
          
          circleImg.appendChild(previewImg);
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
      const passwordCheck = document.getElementById('password_check').value;
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
      console.log('회원가입 시도: ', { email, password, passwordCheck, nickname});
      window.location.href = 'login.html';
    })
  } else {
    console.error('회원가입 폼을 찾을 수 없습니다.')
  }
})