export function validateComment(content) {
  if (!content) {
    return { valid: false, message: '* 댓글을 입력해주세요.' };
  }

  return { valid: true };
}
