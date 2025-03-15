import { ENDPOINT } from "/js/config.js";

export function CommentInput(comments, postId, currentUser) {
  const commentForm = document.getElementById("comment-card");
  const commentInput = commentForm ? commentForm.querySelector(".comment-input-field") : null;
  const submitButton = commentForm ? commentForm.querySelector(".color-button") : null;

  if (!commentForm || !commentInput || !submitButton) {
    console.error("댓글 입력 폼을 찾을 수 없습니다.");
    return;
  }

  commentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const content = commentInput.value.trim();
    if (!content) {
      // 검증 코드
      return;
    }
    
    // 새 댓글
    const now = new Date();
    const formattedDate = now.toISOString().replace("T", " ").substring(0, 19);

    const newComment = {
      id: comments.length > 0 ? Math.max(...comments.map((c) => c.id)) + 1 : 1,
      content: content,
      createdAt: formattedDate,
      user: {
        nickname: currentUser.nickname,
        profileImg: currentUser.profileImg,
      },
    };

    fetch(ENDPOINT.CREATE_COMMENT(postId), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("등록 응답:", data);
        
        comments.push(newComment);
        commentInput.value = "";
        window.refreshComments(comments, postId, currentUser);
      })
      .catch(error => {
        console.error("오류 발생:", error);
        // 임시
        comments.push(newComment);
        commentInput.value = "";
        window.refreshComments(comments, postId, currentUser);
      });
  });
}