import { CommentInput } from "./postCommentInput.js";

export function Comments(comments, postId, currentUser) {
  const commentListElement = document.getElementById("comment-list");
  const commentCountElement = document.getElementById("comment-count");

  // 문서 클릭 시 모든 댓글 버튼 숨기기
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".comment")) {
      document.querySelectorAll(".comment-actions").forEach((div) => {
        div.style.display = "none";
      });
    }
  });

  // 댓글 입력
  CommentInput(comments, postId, currentUser);

  // 초기 댓글 로드
  refreshComments(comments, postId, currentUser);
}

export function refreshComments(comments, postId, currentUser) {
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

  // 댓글 수 업데이트
  commentCountElement.textContent = comments.length;

  // 삭제 버튼 설정 함수
  function setupDeleteButton(button, commentElement, commentId) {
    button.addEventListener("click", function (e) {
      e.stopPropagation();
      e.preventDefault();

      if (deleteCommentModal) {
        deleteCommentModal.openModal();
        deleteCommentModal.setOnConfirm(() => {
          fetch(`/api/posts/${postId}/comment/${commentId}`, {
            method: "DELETE",
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("응답:", data);

              // 댓글 배열에서 제거
              const index = comments.findIndex((c) => c.id === commentId);
              if (index !== -1) {
                comments.splice(index, 1);
              }

              // 댓글 목록 새로고침
              refreshComments(comments, postId, currentUser);
            })
            .catch((error) => {
              console.error("댓글 삭제 중 오류가 발생했습니다:", error);
            });
        });
      }
    });
  }

  // 수정 버튼 설정 함수
  function setupEditButton(button, commentElement, comment) {
    button.addEventListener("click", function (e) {
      e.stopPropagation();

      // 댓글 내용 업데이트
      comment.content = newContent;

      // 댓글 목록 새로고침
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
