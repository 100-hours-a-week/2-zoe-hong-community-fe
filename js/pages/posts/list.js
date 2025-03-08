import { postsData } from '/js/data/data.js';
import { postCard } from './listCard.js';

document.addEventListener('DOMContentLoaded', () => {
  const createPostButton = document.getElementById('createPost');
  if (createPostButton) {
    createPostButton.addEventListener('click', function() {
      console.log('게시물 작성 페이지로 이동');
      window.location.href = 'create.html';
    });
  } else {
    console.error('게시물 작성 버튼을 찾을 수 없습니다.');
  }

  const boxComponent = document.querySelector('.box-component-500');
  if (!boxComponent) {
    console.error('.box-component-500 요소를 찾을 수 없습니다.');
    return;
  }

  const existingCardLists = document.querySelectorAll('.card-list');
  existingCardLists.forEach(cardList => {
    cardList.remove();
  });

  postsData.posts.forEach(post => {
    const cardList = document.createElement('div');
    cardList.className = 'card-list';

    const card = document.createElement('div');
    card.className = 'card hover';
    card.setAttribute('post-id', post.id);
    
    postCard(post, card);

    cardList.appendChild(card);
    boxComponent.appendChild(cardList);
  });
});