import { ENDPOINT } from '/js/config.js';
import { deleteRequest } from '/js/utils/api.js';
import { CommentInput } from './postCommentInput.js';

export function Comments(/*임시 데이터*/ comments, postId, currentUser) {
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.comment')) {
      document.querySelectorAll('.comment-actions').forEach((div) => {
        div.style.display = 'none';
      });
    }
  });

  CommentInput(postId);
  refreshComments(postId, currentUser, comments);
}

async function refreshComments(postId, currentUser, comments) {
  try {
    // const response = await fetch(ENDPOINT.GET_COMMENTS(postId));
    // const comments = await response.json();
    // if (!response.ok) {
    //   console.error("최신 댓글 목록 불러오기 실패");
    //   return;
    // }

    const commentListElement = document.getElementById('comment-list');
    const commentCountElement = document.getElementById('comment-count');
    const deleteCommentModal = document.getElementById('comment-delete-modal');

    commentListElement.innerHTML = '';

    // 댓글 불러오기
    comments
      .slice()
      .sort((a, b) => b.id - a.id) // ID 내림차순 정렬
      .forEach((comment) => {
        const isCurrentUser = comment.user.nickname === currentUser.nickname;
        const commentElement = createCommentElement(comment, isCurrentUser);
        commentListElement.appendChild(commentElement);

        const deleteButton = commentElement.querySelector('#comment-delete-btn');
        if (deleteButton && isCurrentUser) {
          setupDeleteButton(deleteButton, deleteCommentModal, postId, comment.id, currentUser, comments);
        }

        const editButton = commentElement.querySelector('#comment-edit-btn');
        if (editButton && isCurrentUser) {
          setupEditButton(editButton, postId, comment, currentUser, comments);
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

  commentElement.innerHTML = `
    <div class="comment-box">
      <div class="comment">
        <div class="comment-title">
          <div class="comment-user">
            <div class="circle-img" ${
              comment.user.profileImg
                ? `style="background-image: url('${comment.user.profileImg}'); background-size: cover;"`
                : ''
            }></div>
            <div id="username">${comment.user.nickname}</div>
          </div>
          <div class="comment-meta">
            <div id="date">${comment.createdAt}</div>
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
async function setupDeleteButton(button, deleteCommentModal, postId, commentId, currentUser, comments) {
  button.addEventListener('click', function (e) {
    e.stopPropagation();
    e.preventDefault();

    if (deleteCommentModal) {
      deleteCommentModal.openModal();
      deleteCommentModal.setOnConfirm(async () => {
        try {
          const response = await deleteRequest(ENDPOINT.DELETE_COMMENT(postId, commentId));
          if (!response.success) {
            console.error(response.message);
            // return;
          }

          refreshComments(postId, currentUser, comments);
        } catch (error) {
          console.error(response.message);
        }
      });
    }
  });
}

// 수정 버튼 설정 함수
async function setupEditButton(button, postId, comment, currentUser, comments) {
  button.addEventListener('click', function (e) {
    e.stopPropagation();
    try {
      CommentInput(postId, comment);
      refreshComments(postId, currentUser, comments);
    } catch (error) {
      console.error(error);
    }
  });
}
