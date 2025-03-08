import { currentUser } from '/js/data/data.js';

document.addEventListener('DOMContentLoaded', () => {  
  const editProfile = document.getElementById('edit-profile');
  const profileImg = document.getElementById('profile-img');
  const email = document.getElementById('email');
  const nickname = document.getElementById('nickname');
  const deleteUser = document.getElementById('delete-user');
  
  if (currentUser) {
    console.log('현재 사용자 정보:', currentUser);
    
    if (nickname) {
      nickname.value = currentUser.nickname || '';
    }
    
    if (email) {
      email.textContent = currentUser.email || '';
    }
    
    if (profileImg && currentUser.profileImg) {
      const imgContainer = profileImg.closest('.circle-img');
      if (imgContainer) {
        const plusIcon = imgContainer.querySelector('.plus-icon');
        if (plusIcon) {
          plusIcon.remove();
        }
        
        imgContainer.style.backgroundImage = `url('${currentUser.profileImg}')`;
        imgContainer.style.backgroundSize = 'cover';
        imgContainer.style.backgroundPosition = 'center';
      }
    }
  }
  
  let newProfileImage = null;
  
  if (profileImg) {
    profileImg.addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (file) {
        newProfileImage = file;
        const reader = new FileReader();
        
        reader.onload = function(e) {
          const imgContainer = profileImg.closest('.circle-img');
          if (imgContainer) {
            const plusIcon = imgContainer.querySelector('.plus-icon');
            if (plusIcon) {
              plusIcon.remove();
            }
            
            imgContainer.style.backgroundImage = `url('${e.target.result}')`;
            imgContainer.style.backgroundSize = 'cover';
            imgContainer.style.backgroundPosition = 'center';
          }
        };
        
        reader.readAsDataURL(file);
      }
    });
  }
  
  if (editProfile) {
    editProfile.addEventListener('submit', function(event) {
      event.preventDefault();
      
      if (!nickname.value.trim()) {
        alert('닉네임을 입력해주세요.');
        nickname.focus();
        return;
      }
      
      const profileData = new FormData();
      profileData.append('nickname', nickname.value.trim());
      if (newProfileImage) {
        profileData.append('profileImg', newProfileImage);
      } else {
        profileData.append('profileImg', currentUser.profileImg);
      }

      console.log('프로필 수정 요청 데이터:', nickname.value.trim());

      fetch(`/api/users/profile/${currentUser.id}`, {
        method: 'PATCH',
        body: profileData
      })
      .then(response => response.json())
      .then(data => {
        console.log('응답:', data);
      })
      alert('회원정보가 수정되었습니다.');
      window.location.href = '/pages/posts/list.html';
    });
  }
  
  if (deleteUser) {
    deleteUser.addEventListener('click', function(event) {
      event.preventDefault();
      
      if (confirm('정말로 회원 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
        console.log('회원 탈퇴 처리');
        
        fetch(`/api/users/${currentUser.id}`, {
          method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
          console.log('탈퇴 응답:', data);
        })
      }
      alert('회원 탈퇴가 완료되었습니다.');
      window.location.href = '/pages/login.html';
    });
  }
});