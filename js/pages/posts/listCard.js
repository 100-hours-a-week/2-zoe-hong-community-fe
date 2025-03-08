export function postCard(post, card) {
  card.addEventListener('click', function() {
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
}