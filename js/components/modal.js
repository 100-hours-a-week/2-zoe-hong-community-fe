class ModalComponent extends HTMLElement {
  constructor() {
    super();
    this.closeModal = this.closeModal.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleEscKey = this.handleEscKey.bind(this);
  }

  connectedCallback() {
    const header = this.getAttribute('header');
    const body = this.getAttribute('body');
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
            <button class="btn-cancel">취소</button>
            <button class="btn-danger">삭제</button>
          </div>
        </div>
      </div>
    `;

    this.modal = this.querySelector('.modal');
    this.cancelBtn = this.querySelector('.btn-cancel');
    this.confirmBtn = this.querySelector('.btn-danger');

    if (this.hasAttribute('cancel-text')) {
      this.cancelBtn.textContent = this.getAttribute('cancel-text');
    }    
    if (this.hasAttribute('confirm-text')) {
      this.confirmBtn.textContent = this.getAttribute('confirm-text');
    }

    this.cancelBtn.addEventListener('click', this.closeModal);
    window.addEventListener('click', this.handleOutsideClick);
    document.addEventListener('keydown', this.handleEscKey);
  }
  
  disconnectedCallback() {
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
    this.confirmBtn.addEventListener('click', () => {
      callback();
      this.closeModal();
    });
  }
}
customElements.define('custom-modal', ModalComponent);