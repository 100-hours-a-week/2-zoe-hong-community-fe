export function getPostIdFromURL() {
  const postId = parseInt(new URLSearchParams(window.location.search).get('id'));
  if (!postId) {
    console.error('유효하지 않은 게시글 ID입니다.');
    return null;
  }
  return postId;
}