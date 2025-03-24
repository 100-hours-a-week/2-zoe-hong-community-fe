import { ROUTES } from '/js/config.js';
import { postCard } from './listCard.js';
import { ENDPOINT } from '/js/config.js';
import { getRequest } from '/js/utils/api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const createPostButton = document.getElementById('create-post');
  const boxComponent = document.querySelector('.box-component-500');

  if (createPostButton) {
    createPostButton.addEventListener('click', function () {
      window.location.href = ROUTES.POST_CREATE;
    });
  } else {
    console.error('게시글 작성 버튼을 찾을 수 없습니다.');
  }

  // 게시글 카드 불러오기
  try {
    const response = await getRequest(ENDPOINT.POSTS);
    if (!response.success) {
      throw new Error(response.message);
    }

    (response.posts ?? []).forEach((post) => {
      const cardList = document.createElement('div');
      const card = document.createElement('div');

      cardList.className = 'card-list';
      card.className = 'card hover';
      card.setAttribute('post-id', post.id);

      postCard(post, card);

      cardList.appendChild(card);
      boxComponent.appendChild(cardList);
    });
  } catch (err) {
    console.error("게시글 카드 불러오기 중 오류:", err);
  }
});
