import { validatePost } from '/js/utils/postUtil.js';
import { ROUTES, ENDPOINT } from '/js/config.js';
import { postRequest } from '/js/utils/api.js';
import { showErrorMessage, clearErrorMessage } from '/js/utils/util.js';

document.addEventListener('DOMContentLoaded', () => {
  const createPost = document.getElementById('create-post');
  const imageInput = document.getElementById('image');

  let image = null;

  if (imageInput) {
    imageInput.addEventListener('change', function (event) {
      image = event.target.files[0];
    });
  }
  if (createPost) {
    createPost.addEventListener('submit', async function (event) {
      event.preventDefault();
      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;

      const validation = validatePost(title, content);
      if (!validation.valid) {
        showErrorMessage('create-post', validation.message);
        return;
      } else {
        clearErrorMessage('create-post');
      }

      const postData = new FormData();
      postData.append('title', title);
      postData.append('content', content);
      if (image) {
        postData.append('image', image);
      }

      console.log('게시글 생성 시도: ', { postData });
      try {
        const response = await postRequest(ENDPOINT.POSTS, postData, true);
        if (!response.success) {
          throw new Error(response.message);
        }
        window.location.href = ROUTES.POST_LIST;
      } catch (err) {
        console.error("게시글 생성 중 오류:", err);
      }
    });
  } else {
    console.error('회원가입 폼을 찾을 수 없습니다.');
  }
});
