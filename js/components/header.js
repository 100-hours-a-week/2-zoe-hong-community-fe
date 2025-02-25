class HeaderComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <style>
      @import "/css/main.css";
      @import "/css/reset.css";
      @import "/css/components/header.css";
    </style>
    <header class="header">
      <div class="center column">
        <a href="#" class="logo center column">
          <img src="/assets/icons/logo.svg" title="logo"/>
          <div class="font12-bold">2-KTB</div>
          <div class="font12-bold">COMMUNITY</div>
        </div>
        </div>
    </header>
    `;
  }
}

customElements.define("site-header", HeaderComponent);
