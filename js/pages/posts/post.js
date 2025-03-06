import { postDetailData, currentUser } from '/js/data/data.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('상세 페이지 스크립트 로딩됨');
  console.log('더미 데이터 로드 확인:', { postDetailData, currentUser });
  
  const urlParams = new URLSearchParams(window.location.search);
  const postId = parseInt(urlParams.get('id'));
  
  console.log('게시물 ID:', postId);

  if (!postId) {
    console.error('유효하지 않은 게시물 ID입니다.');
    return;
  }

  // 게시물 찾기
  const post = postDetailData.find(post => post.id === postId);
  if (!post) {
    console.error(`ID ${postId}에 해당하는 게시물을 찾을 수 없습니다.`);
    return;
  }
  
  console.log('찾은 게시물:', post);

  // 게시물 제목 및 메타데이터 업데이트
  document.querySelector('.post-title .title').textContent = post.title;
  document.querySelector('.metatext-left #username').textContent = post.user.nickname;
  document.querySelector('.metatext-left div:nth-child(3)').textContent = post.createdAt.split(' ')[0];

  // 작성자 프로필 이미지 설정
  const profileImgElement = document.querySelector('.metatext-left .circle-img');
  if (profileImgElement && post.user.profileImg) {
    profileImgElement.style.backgroundImage = `url('${post.user.profileImg}')`;
    profileImgElement.style.backgroundSize = 'cover';
  }

  // 게시물 내용 업데이트 (줄바꿈 처리)
  document.querySelector('.content-text').innerHTML = post.content.replace(/\n/g, '<br/>');

  // 이미지가 있는 경우 이미지 표시
  const contentImgElement = document.querySelector('.content-img');
  if (post.image) {
    const img = document.createElement('img');
    img.src = post.image;
    img.alt = post.title;
    img.className = 'post-image';
    contentImgElement.appendChild(img);
  } else {
    contentImgElement.style.display = 'none';
  }

  const comments = post.comments || [];
  console.log('게시물의 댓글:', comments);
  
  const actualCommentCount = comments.length;
  const metadataElements = document.querySelectorAll('.post-metadata-card div:first-child');
  const likeCountElement = metadataElements[0];
  metadataElements[1].textContent = post.viewCount;
  metadataElements[2].textContent = actualCommentCount;

  // 좋아요 상태 저장 변수
  let isLiked = false;
  
  // 좋아요 버튼 기능 추가
  const likeCard = metadataElements[0].parentElement;
  
  // 좋아요 버튼 스타일 설정
  likeCard.style.cursor = 'pointer';
  likeCountElement.textContent = post.likeCount;
  
  // 로컬 스토리지에서 좋아요 상태 확인
  const likeKey = `post_${postId}_liked`;
  if (localStorage.getItem(likeKey) === 'true') {
    isLiked = true;
    likeCard.classList.add('liked');
  }
  
  // 좋아요 버튼 클릭 이벤트 리스너
  likeCard.addEventListener('click', function() {
    isLiked = !isLiked;
    
    if (isLiked) {
      likeCountElement.textContent = parseInt(likeCountElement.textContent) + 1;
      likeCard.classList.add('liked');
      localStorage.setItem(likeKey, 'true');
    } else {
      likeCountElement.textContent = parseInt(likeCountElement.textContent) - 1;
      likeCard.classList.remove('liked');
      localStorage.removeItem(likeKey);
    }
  });

  const commentListElement = document.querySelector('.comment-list');
  commentListElement.innerHTML = '';

  comments.forEach(comment => {
    const commentElement = document.createElement('div');
    commentElement.className = 'comment';
    
    commentElement.innerHTML = `
      <div class="comment-title">
        <div class="comment-user">
          <div class="circle-img" ${comment.user.profileImg ? `style="background-image: url('${comment.user.profileImg}'); background-size: cover;"` : ''}></div>
          <div id="username">${comment.user.nickname}</div>
        </div>
        <div id="date">${comment.createdAt}</div>
      </div>
      <div class="comment-content">
        ${comment.content}
      </div>
    `;
    
    commentListElement.appendChild(commentElement);
  });

  const editButton = document.querySelector('.metatext-right button:first-child');
  const deleteButton = document.querySelector('.metatext-right button:last-child');

  editButton.addEventListener('click', function(e) {
    e.stopPropagation();
    console.log(`게시물 ${postId} 수정 페이지로 이동`);
    window.location.href = `edit.html?id=${postId}`;
  });

  deleteButton.addEventListener('click', function(e) {
    e.stopPropagation();
    if (confirm('게시물을 삭제하시겠습니까?')) {
      console.log(`게시물 ${postId} 삭제`);
      alert('게시물이 삭제되었습니다.');
      window.location.href = 'list.html';
    }
  });

  // 댓글 등록 폼 이벤트 리스너 추가
  const commentForm = document.querySelector('.comment-input-container form');
  const commentInput = document.querySelector('.comment-input-field');

  commentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const commentText = commentInput.value.trim();
    if (!commentText) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }
    
    console.log(`게시물 ${postId}에 새 댓글 추가: ${commentText}`);
    
    const now = new Date();
    const formattedDate = now.toISOString().replace('T', ' ').substring(0, 19);
    
    const newComment = {
      id: comments.length > 0 ? Math.max(...comments.map(c => c.id)) + 1 : 1,
      content: commentText,
      createdAt: formattedDate,
      user: {
        nickname: currentUser.nickname,
        profileImg: currentUser.profileImg
      }
    };
    
    // 새 댓글 요소 생성
    const commentElement = document.createElement('div');
    commentElement.className = 'comment';
    
    // 댓글 HTML 구성
    commentElement.innerHTML = `
      <div class="comment-title">
        <div class="comment-user">
          <div class="circle-img" ${newComment.user.profileImg ? `style="background-image: url('${newComment.user.profileImg}'); background-size: cover;"` : ''}></div>
          <div id="username">${newComment.user.nickname}</div>
        </div>
        <div id="date">${formattedDate}</div>
      </div>
      <div class="comment-content">
        ${newComment.content}
      </div>
    `;
    
    commentListElement.prepend(commentElement);
    commentInput.value = '';
  
    const commentCountElement = document.querySelectorAll('.post-metadata-card div:first-child')[2];
    commentCountElement.textContent = parseInt(commentCountElement.textContent) + 1;
  });
  
  const style = document.createElement('style');
  style.textContent = `
    .post-metadata-card {
      transition: all 0.1s ease;
    }
    .liked {
      background-color: var(--light-purple);
      font-weight: bold;
    }
  `;
  document.head.appendChild(style);
});