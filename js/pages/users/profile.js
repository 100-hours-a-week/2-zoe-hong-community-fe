import { currentUser } from '/js/data/data.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('프로필 수정 페이지 로드됨');
  
  const profileForm = document.querySelector('form');
  const nicknameInput = document.getElementById('nickname');
  const emailDisplay = document.getElementById('email');
  const circleImg = document.querySelector('.circle-img');
  const fileInput = document.querySelector('input[type="file"]');
  const withdrawLink = document.querySelector('.link-component');
  
  if (currentUser) {
    console.log('현재 사용자 정보:', currentUser);
    
    if (nicknameInput) {
      nicknameInput.value = currentUser.nickname || '';
    }
    
    if (emailDisplay) {
      emailDisplay.textContent = currentUser.email || '';
    }
    
    if (circleImg && currentUser.profileImg) {
      const plusIcon = circleImg.querySelector('.plus-icon');
      if (plusIcon) {
        plusIcon.remove();
      }
      
      circleImg.style.backgroundImage = `url('${currentUser.profileImg}')`;
      circleImg.style.backgroundSize = 'cover';
      circleImg.style.backgroundPosition = 'center';
    }
  }
  
  if (fileInput) {
    fileInput.addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
          const plusIcon = circleImg.querySelector('.plus-icon');
          if (plusIcon) {
            plusIcon.remove();
          }
          
          circleImg.style.backgroundImage = `url('${e.target.result}')`;
          circleImg.style.backgroundSize = 'cover';
          circleImg.style.backgroundPosition = 'center';
        };
        
        reader.readAsDataURL(file);
      }
    });
  }
  
  if (profileForm) {
    profileForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      if (!nicknameInput.value.trim()) {
        alert('닉네임을 입력해주세요.');
        nicknameInput.focus();
        return;
      }
      
      const updatedUser = {
        ...currentUser,
        nickname: nicknameInput.value.trim()
      };
      
      if (fileInput.files && fileInput.files[0]) {
        updatedUser.profileImg = `/assets/image/${fileInput.files[0].name}`;
      }
      
      console.log('수정된 사용자 정보:', updatedUser);
      alert('회원정보가 수정되었습니다.');
      window.location.href = '/pages/posts/list.html';
    });
  }
  
  if (withdrawLink) {
    withdrawLink.addEventListener('click', function(event) {
      event.preventDefault();
      
      if (confirm('정말로 회원 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
        console.log('회원 탈퇴 처리');
        alert('회원 탈퇴가 완료되었습니다.');
        window.location.href = '/pages/login.html';
      }
    });
  }
});