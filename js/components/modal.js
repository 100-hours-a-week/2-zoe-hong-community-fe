class ModalUIHandler extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const header = this.getAttribute('header') || '알림';
    const body = this.getAttribute('body') || '내용';
    const cancelText = this.getAttribute('cancel-text') || '취소';
    const confirmText = this.getAttribute('confirm-text') || '확인';

    this.innerHTML = `
      <style>
        @import "/css/components/modal.css";
      </style>
      
      <div class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <h3>${header}</h3>
          </div>
          <div class="modal-body"> 
            <p class="sub-text">${body}</p>
          </div>
          <div class="modal-footer">
            <button class="btn-cancel">${cancelText}</button>
            <button class="btn-danger">${confirmText}</button>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('modal-ui', ModalUIHandler);

class ModalEventHandler {
  constructor(modalElement) {
    this.modal = modalElement.querySelector('.modal');
    this.cancelBtn = modalElement.querySelector('.btn-cancel');
    this.confirmBtn = modalElement.querySelector('.btn-danger');

    this.closeModal = this.closeModal.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleEscKey = this.handleEscKey.bind(this);
  }

  init() {
    if (!this.modal || !this.cancelBtn || !this.confirmBtn) {
      console.error('모달 초기화에 오류가 발생하였습니다.');
      return;
    }

    this.cancelBtn.addEventListener('click', this.closeModal);
    window.addEventListener('click', this.handleOutsideClick);
    document.addEventListener('keydown', this.handleEscKey);
  }

  destroy() {
    this.cancelBtn.removeEventListener('click', this.closeModal);
    window.removeEventListener('click', this.handleOutsideClick);
    document.removeEventListener('keydown', this.handleEscKey);
  }

  openModal() {
    this.modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  handleOutsideClick(event) {
    if (event.target === this.modal) {
      this.closeModal();
    }
  }

  handleEscKey(event) {
    if (event.key === 'Escape' && this.modal.style.display === 'block') {
      this.closeModal();
    }
  }

  setOnConfirm(callback) {
    const newBtn = this.confirmBtn.cloneNode(true);
    this.confirmBtn.parentNode.replaceChild(newBtn, this.confirmBtn);
    this.confirmBtn = newBtn;

    this.confirmBtn.addEventListener('click', () => {
      callback();
      this.closeModal();
    });
  }
}

class ModalComponent extends HTMLElement {
  constructor() {
    super();
    this.ModalEventHandler = null;
  }

  connectedCallback() {
    this.render();
    this.modalEventHandler = new ModalEventHandler(this);
    this.modalEventHandler.init();
  }

  disconnectedCallback() {
    this.modalEventHandler?.destroy();
  }

  render() {
    const modalUI = document.createElement('modal-ui');
    Array.from(this.attributes).forEach((attr) => {
      modalUI.setAttribute(attr.name, attr.value);
    });
    this.appendChild(modalUI);
  }

  openModal() {
    this.modalEventHandler?.openModal();
  }

  closeModal() {
    this.modalEventHandler?.closeModal();
  }

  setOnConfirm(callback) {
    this.modalEventHandler?.setOnConfirm(callback);
  }
}
customElements.define('custom-modal', ModalComponent);
