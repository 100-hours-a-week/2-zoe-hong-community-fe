export function validateEmail(email) {
  if (!email) {
    return { valid: false, message: '* 이메일을 입력해주세요.' };
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return {
      valid: false,
      message: '* 올바른 이메일 주소 형식을 입력해주세요.',
    };
  }

  return { valid: true };
}

export function validatePassword(password) {
  if (!password) {
    return { valid: false, message: '* 비밀번호를 입력해주세요.' };
  }
  return { valid: true };
}
