export function showErrorMessage(inputId, message) {
  const errorElement = document.getElementById(`${inputId}-error`);
  if (errorElement) {
    errorElement.textContent = message;
  }
}

export function clearErrorMessage(inputId) {
  const errorElement = document.getElementById(`${inputId}-error`);
  if (errorElement) {
    errorElement.textContent = "";
  }
}