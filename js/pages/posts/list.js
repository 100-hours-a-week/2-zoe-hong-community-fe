import { postsData } from '/js/data/data.js';

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
    card.className = 'card hover'; // hover 클래스 추가
    card.setAttribute('post-id', post.id);
    
    card.addEventListener('click', function() {
      console.log(`게시물 ${post.id} 상세 페이지로 이동`);
      window.location.href = `post.html?id=${post.id}`;
    });

    card.innerHTML = `
      <div class="content">
        <div class="title">
          ${post.title}
        </div>
        <div class="metatext">
          <div>
            <span>좋아요 ${post.likeCount}</span>
            <span>댓글 ${post.commentCount}</span>
            <span>조회수 ${post.viewCount}</span>
          </div>
          <div>
            ${post.createdAt}
          </div>
        </div>
      </div>
      <hr class="hr-line"/>
      <div class="content">
        <div class="user">
          <div class="circle-img" ${post.user.profileImg ? `style="background-image: url('${post.user.profileImg}'); background-size: cover;"` : ''}></div>
          <div class="user-name">${post.user.nickname}</div>
        </div>
      </div>
    `;

    cardList.appendChild(card);
    boxComponent.appendChild(cardList);
  });
});