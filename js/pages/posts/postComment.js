import { CommentInput } from "./postCommentInput.js";

export function Comments(comments, postId, currentUser) {
  const commentListElement = document.getElementById("comment-list");
  const commentCountElement = document.getElementById("comment-count");
  const deleteCommentModal = document.querySelector("custom-modal");
  
  commentCountElement.textContent = comments.length;

  CommentInput(comments, postId, currentUser);

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
          ${actionButtons}
        </div>
      </div>
      <div class="comment-content">
        ${comment.content}
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

  // 문서 클릭 시 모든 댓글 버튼 숨기기
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.comment')) {
      document.querySelectorAll('.comment-actions').forEach(div => {
        div.style.display = 'none';
      });
    }
  });

  // 삭제 버튼 설정 함수 (중복 코드 제거)
  function setupDeleteButton(button, commentElement, commentId) {
    button.addEventListener("click", function(e) {
      e.stopPropagation();
      e.preventDefault();
      
      if (deleteCommentModal) {
        deleteCommentModal._confirmCallback = function() {
          fetch(`/api/posts/${postId}/comments/${commentId}`, {
            method: "DELETE"
          })
            .then(response => response.json())
            .then(data => { console.log("응답:", data); });
          
          commentElement.remove();
          commentCountElement.textContent = 
            parseInt(commentCountElement.textContent) - 1;
            
          deleteCommentModal._confirmCallback = null;
        };
        
        if (typeof deleteCommentModal.openModal === 'function') {
          deleteCommentModal.openModal();
        } else {
          console.error('모달에 openModal 메서드가 없습니다');
        }
      }
    });
  }

  // 수정 버튼 설정 함수
  function setupEditButton(button, commentElement, comment) {
    button.addEventListener("click", function (e) {
      e.stopPropagation();
      const contentElement = commentElement.querySelector(".comment-content");
      const originalContent = comment.content;

      if (contentElement.querySelector("textarea")) return;

      contentElement.innerHTML = `
        <form class="comment-edit-form">
          <textarea class="comment-edit-input">${originalContent}</textarea>
          <div class="comment-edit-buttons">
            <button type="button" class="cancel-edit">취소</button>
            <button type="submit" class="save-edit">저장</button>
          </div>
        </form>
      `;

      contentElement
        .querySelector(".comment-edit-form")
        .addEventListener("click", (e) => e.stopPropagation());

      contentElement
        .querySelector(".cancel-edit")
        .addEventListener("click", function (e) {
          e.stopPropagation();
          contentElement.innerHTML = originalContent;
        });

      const editForm = contentElement.querySelector(".comment-edit-form");
      editForm.addEventListener("submit", function (e) {
        e.preventDefault();
        e.stopPropagation();
        const newContent = editForm
          .querySelector(".comment-edit-input")
          .value.trim();

        if (!newContent) {
          alert("댓글 내용을 입력해주세요.");
          return;
        }

        comment.content = newContent;
        contentElement.innerHTML = newContent;
        console.log(`댓글 ${comment.id} 수정됨: ${newContent}`);
      });
    });
  }

  // 댓글 데이터 불러오기
  comments.forEach((comment) => {
    const isCurrentUser = comment.user.nickname === currentUser.nickname;
    const commentElement = createCommentElement(comment, isCurrentUser);
    commentListElement.appendChild(commentElement);

    const deleteButton = commentElement.querySelector(".comment-delete-btn");
    if (deleteButton) {
      setupDeleteButton(deleteButton, commentElement, comment.id);
    }

    const editButton = commentElement.querySelector(".comment-edit-btn");
    if (editButton) {
      setupEditButton(editButton, commentElement, comment);
    }
  });
}