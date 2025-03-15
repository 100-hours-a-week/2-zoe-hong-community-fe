import { ROUTES } from '/js/config.js';
import { postDetailData, currentUser } from "/data/data.js";
import { Comments } from "/js/pages/posts/postComment.js";

document.addEventListener("DOMContentLoaded", () => {
  // url에서 id 값 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const postId = parseInt(urlParams.get("id"));
  if (!postId) {
    console.error("유효하지 않은 게시물 ID입니다.");
    return;
  }

  // 게시물 데이터 가져오기
  const post = postDetailData.find((post) => post.id === postId);
  if (!post) {
    console.error(`ID ${postId}에 해당하는 게시물을 찾을 수 없습니다.`);
    return;
  }

  // 제목
  console.log("찾은 게시물:", post);
  document.getElementById("title").textContent = post.title;
  document.getElementById("username").textContent = post.user.nickname;
  document.getElementById("date").textContent = post.createdAt;

  const profileImgElement = document.getElementById("profile-img");
  if (profileImgElement && post.user.profileImg) {
    profileImgElement.style.backgroundImage = `url('${post.user.profileImg}')`;
    profileImgElement.style.backgroundSize = "cover";
  }

  // 내용
  document.getElementById("content-text").innerHTML = post.content.replace(/\n/g, "<br/>");
  const contentImgElement = document.getElementById("content-img");
  if (post.image) {
    const img = document.createElement("img");
    img.src = post.image;
    img.alt = post.title;
    img.className = "post-image";
    contentImgElement.appendChild(img);
  } else {
    contentImgElement.style.display = "none";
  }

  // 게시물 수정/삭제 버튼
  const editButton = document.getElementById("post-edit-button");
  const deleteButton = document.getElementById("post-delete-button");
  const deletePostModal = document.getElementById("post-delete-modal");

  if (editButton) {
    editButton.addEventListener("click", function (e) {
      e.stopPropagation();
      console.log(`게시물 ${postId} 수정 페이지로 이동`);
      window.location.href = ROUTES.POST_EDIT(postId);
    });
  }
  if (deleteButton) {
    deleteButton.addEventListener("click", function (e) {
      e.preventDefault();
      deletePostModal.openModal();
    });
  }
  if (deletePostModal) {
    deletePostModal.setOnConfirm(() => {
      fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("응답:", data);
        });
      window.location.href = ROUTES.POST_LIST;
    });
  }

  // 댓글
  const comments = post.comments || [];
  Comments(comments, postId, currentUser);

  // 메타데이터 카드
  const likeCount = document.getElementById("like-count");
  const viewCount = document.getElementById("view-count");
  likeCount.textContent = post.likeCount;
  viewCount.textContent = post.viewCount;

  // 좋아요 처리
  let isLiked = false;
  const likeCard = likeCount.parentElement;
  likeCard.style.cursor = "pointer";

  likeCard.addEventListener("click", function () {
    isLiked = !isLiked;

    fetch(`/api/posts/${postId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        liked: isLiked,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("응답:", data);
      });

    if (isLiked) {
      likeCount.textContent = parseInt(likeCount.textContent) + 1;
      likeCard.classList.add("liked");
      localStorage.setItem(likeKey, "true");
    } else {
      likeCount.textContent = parseInt(likeCount.textContent) - 1;
      likeCard.classList.remove("liked");
      localStorage.removeItem(likeKey);
    }
  });
});
