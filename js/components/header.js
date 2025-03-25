import { postRequest } from '/js/utils/api.js';
import { ROUTES, ENDPOINT } from '/js/config.js';

class LogoutHeaderComponent extends HTMLElement {
  connectedCallback() {
    const hasBackButton = this.hasAttribute('back');

    this.innerHTML = `
    <style>
      @import "/css/components/header.css";
    </style>
    <header class="header">
      ${hasBackButton ? `<div class="back-button">&lt;</div>` : ''}
      <div class="logo font24 black" style="cursor:pointer">
        <div>아무 말 대잔치</div>
      </div>
    </header>
    `;

    this.querySelector('.logo').addEventListener('click', () => {
      window.location.href = ROUTES.LOGIN;
    });

    if (hasBackButton) {
      this.querySelector('.back-button').addEventListener('click', () => {
        window.location.href = ROUTES.LOGIN;
      });
    }
  }
}

class LoginHeaderComponent extends HTMLElement {
  connectedCallback() {
    this.renderHeader();

    window.addEventListener('userImgChanged', () => {
      this.renderHeader();
    })
  }

  renderHeader() {
    const hasBackButton = this.hasAttribute('back');
    const userProfileImg = localStorage.getItem('userImg');

    this.innerHTML = `
    <style>
      @import "/css/components/header.css";
    </style>
    <header class="header">
      ${hasBackButton ? `<div class="back-button">&lt;</div>` : ''}
      <div class="logo font24 black" style="cursor:pointer">
        <div>아무 말 대잔치</div>
      </div>
      <div class="profile-container">
        <div class="right-icon circle-img profile-img" style="background-image: url('${userProfileImg}'); background-size: cover;">
        </div>
        <div class="dropdown-menu">
          <div class="dropdown-item" id="to-profile">회원정보 수정</div>
          <div class="dropdown-divider"></div>
          <div class="dropdown-item" id="to-password">비밀번호 수정</div>
          <div class="dropdown-divider"></div>
          <div class="dropdown-item" id="logout">로그아웃</div>
        </div>
      </div>
    </header>
    `;

    this.querySelector('.logo').addEventListener('click', () => {
      window.location.href = ROUTES.POST_LIST;
    });

    if (hasBackButton) {
      this.querySelector('.back-button').addEventListener('click', () => {
        window.location.href = ROUTES.POST_LIST;
      });
    }

    const profileImg = this.querySelector('.profile-img');
    const dropdownMenu = this.querySelector('.dropdown-menu');

    if (profileImg && dropdownMenu) {
      profileImg.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('active');
      });

      document.addEventListener('click', () => {
        dropdownMenu.classList.remove('active');
      });

      dropdownMenu.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    const toMypage = this.querySelector('#to-profile');
    if (toMypage) {
      toMypage.addEventListener('click', () => {
        window.location.href = ROUTES.USER_PROFILE;
      });
    }

    const toSettings = this.querySelector('#to-password');
    if (toSettings) {
      toSettings.addEventListener('click', () => {
        window.location.href = ROUTES.USER_PASSWORD;
      });
    }

    const logout = this.querySelector('#logout');
    if (logout) {
      try {
        logout.addEventListener('click', async () => {
          console.log('로그아웃 처리');
          const response = await postRequest(ENDPOINT.LOGOUT);
          if (!response.success) {
            throw new Error(response.message);
          }
          localStorage.removeItem('authToken');
          window.location.href = ROUTES.LOGIN;
        });
      } catch (err) {
        console.error("로그아웃 처리 중 오류:", err);
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  customElements.define('login-header', LoginHeaderComponent);
  customElements.define('logout-header', LogoutHeaderComponent);
});
