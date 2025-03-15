const animationDutaion = 10;
const deleteDuration = 300;

export function showToast(message, type = "info", duration = 2000) {
  let toastContainer = document.querySelector(".toast-container");

  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = `toast-message ${type}`;
  toast.textContent = message;

  toastContainer.appendChild(toast);

  // 애니메이션을 위한 지연
  setTimeout(() => {
    toast.classList.add("show");
  }, animationDutaion);

  // 지정된 시간 후 제거
  setTimeout(() => {
    toast.classList.remove("show");

    setTimeout(() => {
      toastContainer.removeChild(toast);

      if (toastContainer.children.length === 0) {
        document.body.removeChild(toastContainer);
      }
    }, deleteDuration);
  }, duration);
}
