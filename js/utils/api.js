export async function getRequest(url) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
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
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
      method: 'POST',
      headers: isFormData
        ? {
          'Authorization': `Bearer ${token}`,
        }
        : {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
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
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
      method: 'PUT',
      headers: isFormData
        ? {
          'Authorization': `Bearer ${token}`,
        }
        : {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
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
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
      method: 'PATCH',
      headers: isFormData
        ? {
          'Authorization': `Bearer ${token}`,
        }
        : {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
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
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  } catch (error) {
    console.error('DELETE 요청 오류:', error);
    return { success: false, message: '네트워크 오류가 발생했습니다.' };
  }
}
