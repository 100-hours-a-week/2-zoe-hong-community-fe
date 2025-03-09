export function CommentInput(comments, postId, currentUser) {
  const commentListElement = document.getElementById("comment-list");
  const commentCountElement = document.getElementById("comment-count");
  const commentForm = document.getElementById("comment-card");
  const commentInput = commentForm ? commentForm.querySelector(".comment-input-field") : null;
  const submitButton = commentForm ? commentForm.querySelector(".color-button") : null;
  
  // 현재 수정 중인 댓글 정보 
  let editingCommentId = null;

  if (!commentForm || !commentInput || !submitButton) {
    console.error("댓글 입력 폼을 찾을 수 없습니다.");
    return;
  }

  // 댓글 입력 모드 설정
  window.setCommentEditMode = function(comment) {
    if (!comment) {
      // 일반 댓글 입력 모드로 전환
      editingCommentId = null;
      commentInput.value = "";
      submitButton.textContent = "댓글 등록";
      return;
    }
    
    // 수정 모드로 전환
    editingCommentId = comment.id;
    commentInput.value = comment.content;
    commentInput.focus();
    submitButton.textContent = "댓글 수정";
    
    // 스크롤을 입력 폼으로 이동
    commentForm.scrollIntoView({ behavior: 'smooth' });
  };

  commentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const content = commentInput.value.trim();
    if (!content) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    
    if (editingCommentId) {
      // 수정 모드
      const editingComment = comments.find(c => c.id === editingCommentId);
      if (editingComment) {
        fetch(`/api/posts/${postId}/comment/${editingCommentId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("수정 응답:", data);
            
            // 댓글 내용 업데이트
            editingComment.content = content;
            
            // 일반 모드로 전환
            window.setCommentEditMode(null);
            
            // 댓글 목록 새로고침
            window.refreshComments(comments, postId, currentUser);
          })
          .catch(error => {
            console.error("댓글 수정 중 오류가 발생했습니다:", error);
            
            // 서버 연결 없을 때 임시 대응
            editingComment.content = content;
            window.setCommentEditMode(null);
            window.refreshComments(comments, postId, currentUser);
          });
      }
    } else {
      // 새 댓글 작성 모드
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

      fetch(`/api/posts/${postId}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("등록 응답:", data);
          
          // 댓글 배열에 추가
          comments.push(newComment);
          
          // 입력창 초기화
          commentInput.value = "";
          
          // 댓글 목록 새로고침
          window.refreshComments(comments, postId, currentUser);
        })
        .catch(error => {
          console.error("댓글 등록 중 오류가 발생했습니다:", error);
          
          // 서버 연결 없을 때 임시 대응
          comments.push(newComment);
          commentInput.value = "";
          window.refreshComments(comments, postId, currentUser);
        });
    }
  });
}