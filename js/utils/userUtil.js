import { ENDPOINT } from '/js/config.js';

export async function validateEmail(email) {
  if (!email) {
    return { valid: false, message: "* 이메일을 입력해주세요." };
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return { valid: false, message: "* 올바른 이메일 주소 형식을 입력해주세요." };
  }

  try {
    const response = await fetch(ENDPOINT.CHECK_EMAIL(email));
    const data = await response.json();
    if (data.exists) {
      return { valid: false, message: "* 중복된 이메일입니다." };
    }
    return { valid: true };
  } catch (error) {
    console.error("이메일 중복 검사 오류:", error);
    // 임시
    return { valid: true };
  }
}

export function validatePassword(password) {
  if (!password) {
    return { valid: false, message: "* 비밀번호를 입력해주세요." };
  }
  if (password.length < 8) {
    return { valid: false, message: "* 비밀번호는 최소 8자 이상이어야 합니다." };
  }
  if (password.length > 20) {
    return { valid: false, message: "* 비밀번호는 최대 20자 이하이어야 합니다." };
  }

  const hasUpperCase = /[A-Z]/.test(password); // 대문자
  const hasLowerCase = /[a-z]/.test(password); // 소문자
  const hasNumber = /[0-9]/.test(password); // 숫자
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // 특수문자
  if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
    return {
      valid: false,
      message:
        "* 대소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.",
    };
  }

  return { valid: true };
}

export function validatePasswordCheck(password, passwordCheck) {
  if (!passwordCheck) {
    return { valid: false, message: "* 비밀번호를 한 번 더 입력해주세요." };
  }
  if (password !== passwordCheck) {
    return { valid: false, message: "* 비밀번호가 일치하지 않습니다." };
  }
  return { valid: true };
}

export async function validateNickname(nickname) {
  if (!nickname) {
    return { valid: false, message: "* 닉네임을 입력해주세요." };
  }
  if (nickname.length > 10) {
    return { valid: false, message: "* 닉네임은 최대 10자까지 작성 가능합니다." };
  }
  if (/\s/.test(nickname)) {
    return { valid: false, message: "* 띄어쓰기를 없애주세요." };
  }

  try {
    const response = await fetch(ENDPOINT.CHECK_NICKNAME(nickname));
    const data = await response.json();
    if (data.exists) {
      return { valid: false, message: "* 중복된 닉네임입니다." };
    }
    return { valid: true };
  } catch (error) {
    console.error("닉네임 중복 검사 오류:", error);
    // 임시
    return { valid: true };
  }
}
