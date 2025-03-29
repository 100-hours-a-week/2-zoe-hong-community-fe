import { BE_URL, ENDPOINT } from '/js/config.js';
import { getRequest, deleteRequest } from '/js/utils/api.js';
import { CommentInput } from './commentInput.js';
import { formatDateTime } from '/js/utils/dateUtil.js';
import { getPostIdFromURL } from '/js/utils/urlUtil.js';

document.addEventListener('DOMContentLoaded', async () => {
  const postId = Number(getPostIdFromURL());
  if (!postId) return;

  document.addEventListener('click', async function (e) {
    if (!e.target.closest('.comment')) {
      document.querySelectorAll('.comment-actions').forEach((div) => {
        div.style.display = 'none';
      });
    }
  });

  CommentInput(postId, null, async () => {
    await refreshComments(postId);
  });
  await refreshComments(postId);
});

// 댓글 목록 로딩
async function refreshComments(postId) {
  try {
    const response = await getRequest(ENDPOINT.COMMENTS(postId));
    if (!response.success) {
      throw new Error(response.message);
    }
    
    const comments = response.comments;
    const commentListElement = document.getElementById('comment-list');
    const commentCountElement = document.getElementById('comment-count');
    const deleteCommentModal = document.getElementById('comment-delete-modal');

    commentListElement.innerHTML = '';
    
    // 댓글 불러오기
    const token = localStorage.getItem('token');
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload.id;

    comments
      .slice()
      .sort((a, b) => b.id - a.id) // ID 내림차순 정렬
      .forEach((comment) => {
        const isCurrentUser = comment.user.id === userId;
        const commentElement = createCommentElement(comment, isCurrentUser);
        commentListElement.appendChild(commentElement);

        const deleteButton = commentElement.querySelector('#comment-delete-btn');
        if (deleteButton && isCurrentUser) {
          setupDeleteButton(deleteButton, deleteCommentModal, postId, comment.id);
        }

        const editButton = commentElement.querySelector('#comment-edit-btn');
        if (editButton && isCurrentUser) {
          setupEditButton(editButton, postId, comment);
        }
      });

    commentCountElement.textContent = comments.length;
  } catch (error) {
    console.error('댓글 불러오기 실패:', error);
  }
}

function createCommentElement(comment, isCurrentUser) {
  const commentElement = document.createElement('div');
  commentElement.className = 'comment';
  commentElement.dataset.commentId = comment.id;

  const actionButtons = isCurrentUser
    ? `
    <div class="comment-actions" style="display: none;">
      <button id="comment-edit-btn" class="small-button">수정</button>
      <button id="comment-delete-btn" class="small-button">삭제</button>
    </div>
  `
    : '';

  const profileImgUrl = `${BE_URL}${comment.user.profileImgUrl}`;

  commentElement.innerHTML = `
    <div class="comment-box">
      <div class="comment">
        <div class="comment-title">
          <div class="comment-user">
            <div class="circle-img" ${
              comment.user.profileImgUrl
                ? `style="background-image: url('${profileImgUrl}'); background-size: cover;"`
                : ''
            }></div>
            <div id="username">${comment.user.nickname}</div>
          </div>
          <div class="comment-meta">
            <div id="date">${formatDateTime(comment.createdAt)}</div>
            </div>
        </div>
        <div class="comment-content">
          ${comment.content}
        </div>
      </div>
      ${actionButtons}
    </div>
  `;

  if (isCurrentUser) {
    commentElement.addEventListener('click', function (e) {
      if (commentElement.querySelector('.comment-edit-form')) return;

      const actionsDiv = commentElement.querySelector('.comment-actions');
      const allActionDivs = document.querySelectorAll('.comment-actions');

      allActionDivs.forEach((div) => {
        if (div !== actionsDiv) {
          div.style.display = 'none';
        }
      });

      actionsDiv.style.display = actionsDiv.style.display === 'none' ? 'flex' : 'none';
    });
  }

  return commentElement;
}

// 삭제 버튼 설정 함수
async function setupDeleteButton(button, deleteCommentModal, postId, commentId) {
  button.addEventListener('click', function (e) {
    deleteCommentModal.openModal();

    if (deleteCommentModal) {
      deleteCommentModal.setOnConfirm(async() => {
        try {
          const response = await deleteRequest(ENDPOINT.COMMENT_DETAIL(postId, commentId));
          if (!response.success) {
            throw new Error(response.message);
          }
          refreshComments(postId);
        } catch (err) {
          console.error("댓글 삭제 중 오류:", err);
        }
      })
    }
  });
}

// 수정 버튼 설정 함수
async function setupEditButton(button, postId, comment) {
  button.addEventListener('click', async function (e) {
    e.stopPropagation();
    try {
      CommentInput(postId, comment, async () => {
        await refreshComments(postId);
      });
    } catch (err) {
      console.error("댓글 수정 조회 중 오류:", err);
    }
  });
}
