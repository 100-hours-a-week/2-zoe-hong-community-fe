import { ENDPOINT } from '/js/config.js';
import { postRequest, putRequest } from '/js/utils/api.js';
import { validateComment } from '/js/utils/commentUtil.js';

export function CommentInput(postId, comment = null, onSuccess = () => {}) {
  renderCommentForm(comment);
  commentAPIHandler(postId, comment, onSuccess);
}

function renderCommentForm(comment) {
  const commentForm = document.querySelector('#comment-card');
  if (!commentForm) {
    console.error('댓글 입력 창을 찾을 수 없습니다.');
    return;
  }

  commentForm.innerHTML = `
    <div class="comment-input-content">
      <textarea
        id="comment-input-textarea"
        type="text"
        placeholder="댓글을 남겨주세요!"
        class="comment-input-textarea"
      >${
        comment ? comment.content : ''
      }</textarea>
    </div>
    <hr class="hr-line" />
    <div class="comment-button right-align-container">
      <button id="comment-submit-btn" class="color-button">
        ${comment ? `수정하기` : `댓글 등록`}
      </button>
    </div>
  `;
}

function commentAPIHandler(postId, comment, onSuccess) {
  const commentInput = document.querySelector('#comment-input-textarea');
  const commentButton = document.querySelector('#comment-submit-btn');
  
  if (!commentInput || !commentButton) {
    console.error("댓글의 텍스트 입력란 또는 입력 버튼을 찾을 수 없습니다.");
    return;
  }

  const newButton = commentButton.cloneNode(true);
  commentButton.parentNode.replaceChild(newButton, commentButton);
  

  newButton.addEventListener('click', async function (e) {
    e.preventDefault();
    const content = commentInput.value.trim();

    const validation = validateComment(content);
    if (!validation.valid) {
      console.error(validation.message);
      return;
    }

    // comment ? 댓글 추가 : 댓글 수정
    try {
      const response = comment
        ? await putRequest(ENDPOINT.COMMENT_DETAIL(postId, comment.id), { content })
        : await postRequest(ENDPOINT.COMMENTS(postId), { content });

      if (!response.success) {
        throw new Error(response.message);
      }

      commentInput.value = '';
      
      await onSuccess();
    } catch (err) {
      console.error('댓글 생성 중 오류:', err);
    }
  });
}
