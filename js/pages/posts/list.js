import { ROUTES } from '/js/config.js';
import { postsData } from '/data/data.js';
import { postCard } from './listCard.js';

document.addEventListener('DOMContentLoaded', () => {
  const createPostButton = document.getElementById('create-post');
  const boxComponent = document.querySelector('.box-component-500');

  if (createPostButton) {
    createPostButton.addEventListener('click', function () {
      window.location.href = ROUTES.POST_CREATE;
    });
  } else {
    console.error('게시물 작성 버튼을 찾을 수 없습니다.');
  }

  // 게시물 카드 불러오기
  postsData.posts.forEach((post) => {
    const cardList = document.createElement('div');
    const card = document.createElement('div');

    cardList.className = 'card-list';
    card.className = 'card hover';
    card.setAttribute('post-id', post.id);

    postCard(post, card);

    cardList.appendChild(card);
    boxComponent.appendChild(cardList);
  });
});
