import { BE_URL, ROUTES, ENDPOINT } from '/js/config.js';
import { showToast } from '/js/components/toast.js';
import { getRequest, patchRequest, deleteRequest } from '/js/utils/api.js';
import { showErrorMessage, clearErrorMessage } from '/js/utils/util.js';
import { validateNickname } from '/js/utils/userUtil.js';

document.addEventListener('DOMContentLoaded', async () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/css/components/toast.css';
  document.head.appendChild(link);

  const editProfile = document.getElementById('edit-profile');
  const profileImg = document.getElementById('profile-img');
  const email = document.getElementById('email');
  const nickname = document.getElementById('nickname');
  const deleteUser = document.getElementById('delete-user');
  const deleteModal = document.getElementById('user-delete-modal');

  try {
    const response = await getRequest(ENDPOINT.UPDATE_PROFILE);
    if (!response.success) {
      throw new Error(response.message);
    }
  } catch (err) {
    console.error("프로필 조회 중 오류:", err);
  }

  const user = response.user;
  if (user) {
    console.log('현재 사용자 정보:', user);

    if (nickname) {
      nickname.value = user.nickname || '';
    }

    if (email) {
      email.textContent = user.email || '';
    }

    if (profileImg && user.profileImg) {
      const imgContainer = profileImg.closest('.circle-img');
      if (imgContainer) {
        const plusIcon = imgContainer.querySelector('.plus-icon');
        if (plusIcon) {
          plusIcon.remove();
        }

        imgContainer.style.backgroundImage = `url(${BE_URL}${user.profileImg})`;
        imgContainer.style.backgroundSize = 'cover';
        imgContainer.style.backgroundPosition = 'center';
      }
    }
  }

  let newProfileImage = null;

  if (profileImg) {
    profileImg.addEventListener('change', function (event) {
      const file = event.target.files[0];
      if (file) {
        newProfileImage = file;
        const reader = new FileReader();

        reader.onload = function (e) {
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
    editProfile.addEventListener('submit', async function (event) {
      event.preventDefault();

      const validation = await validateNickname(nickname.value);
      if (!validation.valid) {
        showErrorMessage('edit-profile', validation.message);
        return;
      } else {
        clearErrorMessage('edit-profile');
      }

      const profileData = new FormData();
      profileData.append('nickname', nickname.value.trim());
      if (newProfileImage) {
        profileData.append('profileImg', newProfileImage);
      } else {
        profileData.append('profileImg', user.profileImg);
      }

      try {
        const response = patchRequest(ENDPOINT.UPDATE_PROFILE, profileData, true);
        if (!response.success) {
          throw new Error(response.message);
        }
        showToast('수정 완료', 'success');
      } catch (err) {
        console.error("프로필 수정 중 오류:", err);
        showToast('수정 실패', 'fail');
      }
    });
  }

  // 회원 탈퇴
  if (deleteUser && deleteModal) {
    deleteModal.setOnConfirm(() => {
      const response = deleteRequest(ENDPOINT.DELETE_USER);
      if (!response.success) {
        console.error(response.message);
        return;
      }
      window.location.href = ROUTES.LOGIN;
    });

    deleteUser.addEventListener('click', function (event) {
      event.preventDefault();
      deleteModal.openModal();
    });
  }
});
