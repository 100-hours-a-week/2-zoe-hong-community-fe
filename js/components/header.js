import { ROUTES } from '/js/config.js';

class LogoutHeaderComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <style>
      @import "/css/components/header.css";
    </style>
    <header class="header">
      <div class="logo font24 black" style="cursor:pointer">
        <div>아무 말 대잔치</div>
      </div>
    </header>
    `;
    
    this.querySelector('.logo').addEventListener('click', () => {
      window.location.href = ROUTES.LOGIN;
    });
  }
}

class BackLogoutHeaderComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <style>
      @import "/css/components/header.css";
    </style>
    <header class="header">
      <div class="back-button" onclick="history.back()">&lt;</div>
      <div class="logo font24 black" style="cursor:pointer">
        <div>아무 말 대잔치</div>
      </div>
    </header>
    `;
    
    this.querySelector('.logo').addEventListener('click', () => {
      window.location.href = ROUTES.LOGIN;
    });
  }
}

class LoginHeaderComponent extends HTMLElement {
  connectedCallback() {
    import('/data/data.js')
      .then(module => {
        const { currentUser } = module;
        this.renderHeader(currentUser);
      })
      .catch(error => {
        console.error('데이터 로드 실패:', error);
        this.renderHeader({ profileImg: '/assets/user-profile.jpg' });
      });
  }

  renderHeader(user) {
    const userProfileImg = user.profileImg || '/assets/user-profile.jpg';

    this.innerHTML = `
    <style>
      @import "/css/components/header.css";
    </style>
    <header class="header">
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
      logout.addEventListener('click', () => {
        console.log('로그아웃 처리');
        localStorage.removeItem('authToken');
        window.location.href = ROUTES.LOGIN;
      });
    }
  }
}

class BackLoginHeaderComponent extends HTMLElement {
  connectedCallback() {
    import('/data/data.js')
      .then(module => {
        const { currentUser } = module;
        this.renderHeader(currentUser);
      })
      .catch(error => {
        console.error('데이터 로드 실패:', error);
        this.renderHeader({ profileImg: '/assets/user-profile.jpg' });
      });
  }

  renderHeader(user) {
    const userProfileImg = user.profileImg || '/assets/user-profile.jpg';

    this.innerHTML = `
    <style>
      @import "/css/components/header.css";
    </style>
    <header class="header">
      <div class="back-button" onclick="history.back()">&lt;</div>
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
      logout.addEventListener('click', () => {
        console.log('로그아웃 처리');
        localStorage.removeItem('authToken');
        window.location.href = ROUTES.LOGIN;
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  customElements.define("login-header", LoginHeaderComponent);
  customElements.define("back-login-header", BackLoginHeaderComponent);
  customElements.define("logout-header", LogoutHeaderComponent);
  customElements.define("back-logout-header", BackLogoutHeaderComponent);
});
