import { ENDPOINT } from '/js/config.js';
import { showToast } from '/js/components/toast.js';
import { patchRequest } from '/js/utils/api.js';
import { showErrorMessage, clearErrorMessage } from '/js/utils/util.js';
import { validatePassword, validatePasswordCheck } from '/js/utils/userUtil.js';

document.addEventListener('DOMContentLoaded', () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/css/components/toast.css';
  document.head.appendChild(link);

  const editPasswordForm = document.getElementById('edit-password');
  const passwordInput = document.getElementById('password');
  const passwordCheckInput = document.getElementById('password-check');

  if (editPasswordForm) {
    editPasswordForm.addEventListener('submit', async function (event) {
      event.preventDefault();

      const password = passwordInput.value;
      const passwordCheck = passwordCheckInput.value;

      let isValid = true;

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

      if (!isValid) return;

      try {
        const response = await patchRequest(ENDPOINT.UPDATE_PASSWORD, { password });
        if (!response.success) {
          throw new Error(response.message);
        }
        showToast('수정 완료', 'success');
        editPasswordForm.reset();
      } catch (err) {
        console.error("비밀번호 수정 중 오류:", err);
      }
    });
  }
});
