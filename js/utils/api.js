export async function getRequest(url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('GET 요청 오류:', error);
    return { success: false, message: '네트워크 오류가 발생했습니다.' };
  }
}

export async function postRequest(url, data, isFormData = false) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: isFormData ? {} : { 'Content-Type': 'application/json' },
      body: isFormData ? data : JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('POST 요청 오류:', error);
    return { success: false, message: '네트워크 오류가 발생했습니다.' };
  }
}

export async function putRequest(url, data, isFormData = false) {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      credentials: 'include',
      headers: isFormData ? {} : { 'Content-Type': 'application/json' },
      body: isFormData ? data : JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('PUT 요청 오류:', error);
    return { success: false, message: '네트워크 오류가 발생했습니다.' };
  }
}

export async function patchRequest(url, data, isFormData = false) {
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      credentials: 'include',
      headers: isFormData ? {} : { 'Content-Type': 'application/json' },
      body: isFormData ? data : JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('PATCH 요청 오류:', error);
    return { success: false, message: '네트워크 오류가 발생했습니다.' };
  }
}

export async function deleteRequest(url) {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      credentials: 'include'
    });
    return await response.json();
  } catch (error) {
    console.error('DELETE 요청 오류:', error);
    return { success: false, message: '네트워크 오류가 발생했습니다.' };
  }
}
