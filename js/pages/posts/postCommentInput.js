export function CommentInput(comments, postId, currentUser) {
  const commentListElement = document.getElementById("comment-list");
  const commentCountElement = document.getElementById("comment-count");
  const commentForm = document.querySelector(".comment-input-container form");
  const commentInput = document.querySelector(".comment-input-field");
  const deleteCommentModal = document.getElementById('comment-delete-modal');

  if (!commentForm || !commentInput) {
    console.error('댓글 입력 폼을 찾을 수 없습니다.');
    return;
  }

  commentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const commentText = commentInput.value.trim();
    if (!commentText) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    const now = new Date();
    const formattedDate = now.toISOString().replace("T", " ").substring(0, 19);

    const newComment = {
      id: comments.length > 0 ? Math.max(...comments.map((c) => c.id)) + 1 : 1,
      content: commentText,
      createdAt: formattedDate,
      user: {
        nickname: currentUser.nickname,
        profileImg: currentUser.profileImg,
      },
    };

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

    const commentElement = createCommentElement(newComment, true);
    commentListElement.prepend(commentElement);

    // 삭제 버튼 설정
    const deleteButton = commentElement.querySelector(".comment-delete-btn");
    if (deleteButton) {
      deleteButton.addEventListener("click", function(e) {
        e.stopPropagation();
        e.preventDefault();
        deleteCommentModal.openModal();
      });
    }
    if (deleteCommentModal) {
      deleteCommentModal.setOnConfirm(() => {
        fetch(`/api/posts/${postId}/comments/${comment.id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("응답:", data);
          });
        window.location.href = `/pages/post.html?=${postId}`;
      });
    }

    // 수정 버튼 설정
    const editButton = commentElement.querySelector(".comment-edit-btn");
    if (editButton) {
      editButton.addEventListener("click", function (e) {
        e.stopPropagation();
        const contentElement = commentElement.querySelector(".comment-content");
        const originalContent = newComment.content;

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
          const updatedContent = editForm
            .querySelector(".comment-edit-input")
            .value.trim();

          if (!updatedContent) {
            alert("댓글 내용을 입력해주세요.");
            return;
          }

          newComment.content = updatedContent;
          contentElement.innerHTML = updatedContent;
        });
      });
    }

    commentInput.value = "";
    commentCountElement.textContent =
      parseInt(commentCountElement.textContent) + 1;
  });
}