import { postRequest, putRequest } from '/js/utils/api.js';
import { validateComment } from '/js/utils/commentUtil.js';
import { ENDPOINT } from '/js/config.js';

export function CommentInput(postId, comment = null) {
  const commentForm = document.querySelector('#comment-card');
  commentForm.innerHTML = `
  <div class="comment-input-content">
  <textarea id="comment-input-textarea" type="text" placeholder="댓글을 남겨주세요!" class="comment-input-textarea">${
    comment ? comment.content : ''
  }</textarea>
  </div>
  <hr class="hr-line" />
  <div class="comment-button right-align-container">
  <button id="comment-submit-btn" class="color-button">${comment ? `수정하기` : `댓글 등록`}</button>
  </div>
  `;

  CommentAPIHandler(postId, comment);
}

function CommentAPIHandler(postId, comment) {
  const commentInput = document.querySelector('#comment-input-textarea');
  const commentButton = document.querySelector('#comment-submit-btn');
  commentButton.addEventListener('click', async function (e) {
    e.preventDefault();

    const content = commentInput.value.trim();

    const validation = validateComment(content);
    if (!validation.valid) {
      console.error(validation.message);
      return;
    }

    // comment ? 댓글 추가 : 댓글 수정
    try {
      const response = !comment
        ? await postRequest(ENDPOINT.CREATE_COMMENT(postId), { content })
        : await putRequest(ENDPOINT.UPDATE_COMMENT(postId, comment.id), { content });
      if (!response.success) {
        console.error(response.message);
        // return;
      }
      CommentInput(postId);
    } catch (error) {
      console.error(response.message);
    }
  });
}
