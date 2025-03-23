import { BE_URL, ROUTES } from '/js/config.js';
import { formatDateTime } from '/js/utils/dateUtil.js';

export function postCard(post, card) {

  const profileImgUrl = post.createdBy.profileImgUrl
    ? `${BE_URL}${post.createdBy.profileImgUrl}` : '';

  card.addEventListener('click', function () {
    window.location.href = ROUTES.POST(post.id);
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
          ${formatDateTime(post.createdAt)}
        </div>
      </div>
    </div>
    <hr class="hr-line"/>
    <div class="content">
      <div class="user">
        <div class="circle-img"${
          profileImgUrl
            ? `style="background-image: url('${profileImgUrl}'); background-size: cover;"`
            : ''
        }
        >
        </div>
        <div class="user-name">${post.createdBy.nickname}</div>
      </div>
    </div>
  `;
}
