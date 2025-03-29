async function sendRequest(method, url, data = null, isFormData = false) {
  let token = localStorage.getItem('token');

  const makeRequest = async () => {
    const headers = isFormData
      ? { Authorization: `Bearer ${token}` }
      : {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

    const options = {
      method,
      headers,
    };

    if (data) {
      options.body = isFormData ? data : JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (response.status === 401) {
      // Access Token이 만료되었으면 Refresh 시도
      const success = await refreshAccessToken();
      if (success) {
        token = localStorage.getItem('token');
        return await sendRequest(method, url, data, isFormData);
      } else {
        throw new Error('인증 실패: 재로그인 필요');
      }
    }

    if (!response.ok) {
      throw new Error(`HTTP 오류: ${response.status}`);
    }

    return await response.json();
  };

  try {
    return await makeRequest();
  } catch (error) {
    console.error(`${method} 요청 오류:`, error);
    return { success: false, message: error.message };
  }
}

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return false;

  try {
    const res = await fetch('/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) return false;

    const { accessToken } = await res.json();
    localStorage.setItem('token', accessToken);
    return true;
  } catch (err) {
    return false;
  }
}

export const getRequest = (url) => sendRequest('GET', url);
export const postRequest = (url, data, isFormData = false) => sendRequest('POST', url, data, isFormData);
export const putRequest = (url, data, isFormData = false) => sendRequest('PUT', url, data, isFormData);
export const patchRequest = (url, data, isFormData = false) => sendRequest('PATCH', url, data, isFormData);
export const deleteRequest = (url) => sendRequest('DELETE', url);