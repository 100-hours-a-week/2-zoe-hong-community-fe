import { BE_URL, ROUTES, ENDPOINT } from '/js/config.js';
import { getRequest, postRequest, deleteRequest } from '/js/utils/api.js';
import { formatDateTime } from '/js/utils/dateUtil.js';
import { getPostIdFromURL } from '/js/utils/urlUtil.js';

document.addEventListener('DOMContentLoaded', async () => {
  const postId = Number(getPostIdFromURL());
  if (!postId) return;

  const post = await loadPostDetail(postId);
  if (!post) return;

  renderPost(post);
  setupPostActions(postId, post);

  const wasLiked = await loadLiked(postId);
  if (wasLiked === null) return;
  setupLike(postId, wasLiked);
});

async function loadPostDetail(postId) {
  try {
    const response = await getRequest(ENDPOINT.POST_DETAIL(postId));
    if (!response.success) throw new Error(response.message);
    return response.post;
  } catch (err) {
    console.error('게시글 조회 중 오류:', err);
    return null;
  }
}

function renderPost(post) {
  document.getElementById('title').textContent = post.title;
  document.getElementById('username').textContent = post.user.nickname;
  document.getElementById('date').textContent = formatDateTime(post.createdAt);

  const profileImgElement = document.getElementById('profile-img');
  const profileImgUrl = `${BE_URL}${post.user.profileImgUrl}`;
  if (profileImgElement && post.user.profileImgUrl) {
    profileImgElement.style.backgroundImage = `url(${profileImgUrl})`;
    profileImgElement.style.backgroundSize = 'cover';
  }

  document.getElementById('content-text').innerHTML = post.content.replace(/\n/g, '<br/>');

  const contentImgElement = document.getElementById('content-img');
  if (post.imageUrl) {
    const img = document.createElement('img');
    img.src = `${BE_URL}${post.imageUrl}`;
    img.alt = post.title;
    img.className = 'post-image';
    contentImgElement.appendChild(img);
  } else {
    contentImgElement.style.display = 'none';
  }

  document.getElementById('like-count').textContent = post.likeCount;
  document.getElementById('view-count').textContent = post.viewCount;
  document.getElementById('comment-count').textContent = post.commentCount;
}

function setupPostActions(postId, post) {
  const userId = Number(localStorage.getItem('userId'));
  const isCreatedBy = post.user.id === userId;

  const editButton = document.getElementById('post-edit-button');
  const deleteButton = document.getElementById('post-delete-button');
  const deletePostModal = document.getElementById('post-delete-modal');

  if (isCreatedBy) {
    editButton?.addEventListener('click', () => {
      window.location.href = ROUTES.POST_EDIT(postId);
    });

    deleteButton?.addEventListener('click', (e) => {
      e.preventDefault();
      deletePostModal?.openModal();
    });

    deletePostModal?.setOnConfirm(async () => {
      try {
        const response = await deleteRequest(ENDPOINT.POST_DETAIL(postId));
        if (!response.success) throw new Error(response.message);
        window.location.href = ROUTES.POST_LIST;
      } catch (err) {
        console.error("게시글 삭제 중 오류:", err);
      }
    });
  } else {
    if (editButton) editButton.style.display = 'none';
    if (deleteButton) deleteButton.style.display = 'none';
  }
}

async function loadLiked(postId) {
  try {
    const response = await getRequest(ENDPOINT.LIKE_POST(postId));
    if (!response.success) throw new Error(response.message);
    return response.liked;
  } catch (err) {
    console.error("좋아요 확인 중 오류:", err);
    return null;
  }
}

function setupLike(postId, wasLiked) {
  const likeCount = document.getElementById('like-count');
  const likeCard = likeCount.parentElement;

  likeCard.style.cursor = 'pointer';
  if (wasLiked) likeCard.classList.add('liked');

  likeCard.addEventListener('click', async () => {
    try {
      const response = await postRequest(ENDPOINT.LIKE_POST(postId), {
        liked: !wasLiked
      });

      if (!response.success) throw new Error(response.message);

      likeCount.textContent = response.likes;

      if (wasLiked) {
        likeCard.classList.remove('liked');
      } else {
        likeCard.classList.add('liked');
      }
      
      wasLiked = !wasLiked;

    } catch (err) {
      console.error("좋아요 처리 중 오류:", err);
    }
  });
}
