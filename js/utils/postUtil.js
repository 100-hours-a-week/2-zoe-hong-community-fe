export function validatePost(title, content) {
  if (!title || !content) {
    return { valid: false, message: '* 제목과 내용을 모두 작성해주세요.' };
  }

  return { valid: true };
}
