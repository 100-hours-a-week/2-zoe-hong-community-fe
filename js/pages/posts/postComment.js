import { ENDPOINT } from '/js/config.js';
import { CommentInput } from "./postCommentInput.js";
import { deleteRequest } from '/js/utils/api.js';

export function Comments(comments, postId, currentUser) {
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".comment")) {
      document.querySelectorAll(".comment-actions").forEach((div) => {
        div.style.display = "none";
      });
    }
  });

  CommentInput(comments, postId, currentUser);
  refreshComments(comments, postId, currentUser);
}

export function refreshComments(comments, postId, currentUser) {
  console.log(comments);
  const commentListElement = document.getElementById("comment-list");
  const commentCountElement = document.getElementById("comment-count");
  const deleteCommentModal = document.getElementById("comment-delete-modal");

  commentListElement.innerHTML = "";

  // 댓글 불러오기
  comments
    .slice()
    .sort((a, b) => b.id - a.id) // ID 내림차순 정렬
    .forEach((comment) => {
      const isCurrentUser = comment.user.nickname === currentUser.nickname;
      const commentElement = createCommentElement(comment, isCurrentUser);
      commentListElement.appendChild(commentElement);

      const deleteButton = commentElement.querySelector(".comment-delete-btn");
      if (deleteButton && isCurrentUser) {
        setupDeleteButton(deleteButton, commentElement, comment.id);
      }

      const editButton = commentElement.querySelector(".comment-edit-btn");
      if (editButton && isCurrentUser) {
        setupEditButton(editButton, commentElement, comment);
      }
    });

  commentCountElement.textContent = comments.length;

  function setupDeleteButton(button, commentElement, commentId) {
    button.addEventListener("click", function (e) {
      e.stopPropagation();
      e.preventDefault();

      if (deleteCommentModal) {
        deleteCommentModal.openModal();
        deleteCommentModal.setOnConfirm(() => {
          const response = deleteRequest(ENDPOINT.CREATE_COMMENT(postId, commentId));
          if (!response.success) {
            console.error(response.message);
            // return;
          }
        });
      }
    });
  }

  // 수정 버튼 설정 함수
  function setupEditButton(button, commentElement, comment) {
    button.addEventListener("click", function (e) {
      e.stopPropagation();

      comment.content = newContent;
      refreshComments(comments, postId, currentUser);
    });
  }
}

function createCommentElement(comment, isCurrentUser) {
  const commentElement = document.createElement("div");
  commentElement.className = "comment";
  commentElement.dataset.commentId = comment.id;

  const actionButtons = isCurrentUser
    ? `
    <div class="comment-actions" style="display: none;">
      <button class="comment-edit-btn small-button">수정</button>
      <button class="comment-delete-btn small-button">삭제</button>
    </div>
  `
    : "";

  commentElement.innerHTML = `
    <div class="comment-box">
      <div class="comment">
        <div class="comment-title">
          <div class="comment-user">
            <div class="circle-img" ${
              comment.user.profileImg
                ? `style="background-image: url('${comment.user.profileImg}'); background-size: cover;"`
                : ""
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
    commentElement.addEventListener("click", function (e) {
      if (commentElement.querySelector(".comment-edit-form")) return;

      const actionsDiv = commentElement.querySelector(".comment-actions");
      const allActionDivs = document.querySelectorAll(".comment-actions");

      allActionDivs.forEach((div) => {
        if (div !== actionsDiv) {
          div.style.display = "none";
        }
      });

      actionsDiv.style.display =
        actionsDiv.style.display === "none" ? "flex" : "none";
    });
  }

  return commentElement;
}
