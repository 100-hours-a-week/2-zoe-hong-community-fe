import { postRequest } from '/js/utils/api.js';
import { ROUTES, ENDPOINT } from '/js/config.js';
import { validateEmail, validatePassword, validatePasswordCheck, validateNickname } from '/js/utils/userUtil.js';
import { showErrorMessage, clearErrorMessage } from '/js/utils/util.js';

document.addEventListener('DOMContentLoaded', () => {
  const joinForm = document.getElementById('join-form');
  const redirectToLogin = document.getElementById('redirectToLogin');
  const imageInput = document.querySelector('#profile-img input[type="file"]');
  let profileImage = null;

  if (imageInput) {
    imageInput.addEventListener('change', function (event) {
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
          reader.onload = function (e) {
            previewImg.src = e.target.result;
          };
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
    joinForm.addEventListener('submit', async function (event) {
      event.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const passwordCheck = document.getElementById('password-check').value;
      const nickname = document.getElementById('nickname').value;

      let isValid = true;

      if (!profileImage) {
        showErrorMessage('profile-img', '* 프로필 사진을 추가해주세요.');
        isValid = false;
      } else {
        clearErrorMessage('profile-img');
      }

      const emailValidation = await validateEmail(email);
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

      const passwordCheckValidation = validatePasswordCheck(password, passwordCheck);
      if (!passwordCheckValidation.valid) {
        showErrorMessage('password-check', passwordCheckValidation.message);
        isValid = false;
      } else {
        clearErrorMessage('password-check');
      }

      const nicknameValidation = await validateNickname(nickname);
      if (!nicknameValidation.valid) {
        showErrorMessage('nickname', nicknameValidation.message);
        isValid = false;
      } else {
        clearErrorMessage('nickname');
      }

      if (!isValid) return;

      
      const formData = new FormData();
      formData.append('profileImg', profileImage);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('nickname', nickname);

      console.log('회원가입 시도: ', { formData });
      try {
        const response = await postRequest(ENDPOINT.USERS, formData, true);
        if (!response.success) {
          throw new Error(response.message);
        }
        window.location.href = ROUTES.LOGIN;
      } catch (err) {
        console.error("회원가입 처리 중 오류:", err);
      }
    });
  } else {
    console.error('회원가입 폼을 찾을 수 없습니다.');
  }

  if (redirectToLogin) {
    redirectToLogin.addEventListener('click', function (event) {
      window.location.href = ROUTES.LOGIN;
    });
  } else {
    console.error('로그인 페이지로 이동하는 데 실패했습니다.');
  }
});
