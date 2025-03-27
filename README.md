# 2-ktb-community-fe
KTB 3-4주차 과제: 기능 정의서와 화면 설계서를 기반으로 커뮤니티 레이아웃을 구현하고 이벤트 리스너를 설정한다.<br/>

<br/>

## 1. 프로젝트 소개
커뮤니티 웹 서비스 프론트엔드입니다.<br/>
주요 기능: 회원가입, 로그인, 게시글, 댓글

<br/>

## 2. 기술 스택
- HTML5
- CSS3
- Vanilla JS

<br/>

## 3. 주요 기능
- 사용자 로그인 및 회원가입 폼
- 게시글 목록 및 상세 페이지 구현
- 댓글 입력 및 삭제 기능
- 반응형 디자인 지원

<br/>

## 4. 프로젝트 구조
```
2-ktb-community-fe/
├── .DS_Store
├── .prettierignore
├── .prettierrc
├── README.md
├── index.html
├── css/
│   ├── reset.css
│   ├── main.css
│   └── components/
│       ├── comment.css
│       ├── form.css
│       ├── header.css
│       ├── img.css
│       ├── modal.css
│       ├── post.css
│       └── toast.css
├── js/
│   ├── config.js
│   ├── main.js
│   ├── components/
│   │   ├── header.js
│   │   ├── modal.js
│   │   └── toast.js
│   ├── pages/
│   │   ├── join.js
│   │   ├── login.js
│   │   ├── posts/
│   │   │   ├── comment.js
│   │   │   ├── commentInput.js
│   │   │   ├── create.js
│   │   │   ├── edit.js
│   │   │   ├── list.js
│   │   │   ├── listCard.js
│   │   │   └── post.js
│   │   └── users/
│   │       ├── password.js
│   │       └── profile.js
│   └── utils/
│       ├── api.js
│       ├── commentUtil.js
│       ├── dateUtil.js
│       ├── loginUtil.js
│       ├── postUtil.js
│       ├── urlUtil.js
│       ├── userUtil.js
│       └── util.js
└── pages/
    ├── join.html
    ├── login.html
    ├── posts/
    │   ├── create.html
    │   ├── edit.html
    │   ├── list.html
    │   └── post.html
    └── users/
        ├── password.html
        └── profile.html
```

<br/>

## 5. 실행 방법
```bash
# 1. Git 클론
git clone https://github.com/your-username/your-project.git

# 2. 프로젝트 폴더로 이동
cd your-project

# 3. Live Server 실행
```

## 6. 데모 페이지
### 로그인
<img width="1624" alt="Image" src="https://github.com/user-attachments/assets/17151756-2817-4c7a-b456-16e061e16e4b" />

- [로그인] 버튼: 로그인에 성공하면 게시글 목록 페이지로 이동한다.
    - 모든 항목이 입력되어야 한다.
    - 이메일: 이메일 주소 형식 검증
- [회원가입] 텍스트: 클릭 시 회원가입 페이지로 이동한다.

---

### 회원가입
<img width="1624" alt="Image" src="https://github.com/user-attachments/assets/09bd2dfc-9c70-4440-8d7a-89b835356192" />

- [회원가입] 버튼: 회원가입에 성공하면 로그인 페이지로 이동한다.
    - 모든 항목이 입력되어야 한다.
    - 이메일: 이메일 주소 형식, 중복 여부 검증
    - 비밀번호: 대소문자, 숫자, 특수문자가 1개 이상씩 들어간 8~20자의 문자열 검증
    - 비밀번호 확인: 비밀번호와 동일한지 검증
    - 닉네임: 중복되지 않은, 띄어쓰기가 없는 10자 미만의 문자열 검증
- [로그인하러 가기] 텍스트: 클릭 시 로그인 페이지로 이동한다.

---

### 전체 게시글 목록 조회
<img width="1624" alt="Image" src="https://github.com/user-attachments/assets/062f5b6d-c81c-4685-b87d-2162a387d8d8" />

- [게시글 카드]: 클릭 시 해당 게시글(?id={postId}) 조회 페이지로 이동한다.
- [게시글 작성] 버튼: 클릭 시 게시글 작성 페이지로 이동한다.

---

### 게시글 작성
<img width="1624" alt="Image" src="https://github.com/user-attachments/assets/e1d4fd0f-c317-485b-bf06-cac87288dd28" />

- 필수 입력 항목: 제목란, 내용란
- [완료] 버튼: 게시글 작성에 성공하면 해당 게시글 조회 페이지로 이동한다.

---

### 게시글 단건 조회
![Image](https://github.com/user-attachments/assets/79bb0f86-0736-448e-8928-15cb89b3d3c1)
<img width="1624" alt="Image" src="https://github.com/user-attachments/assets/4627ecf0-7551-4a9e-b7e5-da69f1f3c873" />
<img width="1624" alt="Image" src="https://github.com/user-attachments/assets/adfd8a1d-632a-408a-9103-a6577c1e79c1" />

- 게시글과 댓글로 모듈을 분리했다.
- 게시글
    - [수정] 버튼: 클릭 시 해당 게시글(?id={postId}) 수정 페이지로 이동한다.
    - [삭제] 버튼 → 모달 → [삭제] 버튼 클릭: 게시글 삭제에 성공하면 게시글 목록 페이지로 이동한다.
    - [좋아요 수] 버튼 → 좋아요/좋아요 취소 처리에 성공하면 좋아요 수가 증가/감소한다.
- 댓글
    - [댓글 등록] 버튼: 댓글 생성에 성공하면 GET 응답을 받아와 댓글 목록을 업데이트하고, 댓글 수가 증가한다.
    - [댓글 카드]: 클릭 시 수정, 삭제 버튼이 나타난다.
        - [수정] 버튼: 댓글 입력란에 수정하려는 댓글의 내용이 나타나고, 등록 버튼을 누르면 수정된다.
        - [삭제] 버튼 → 모달 → [삭제] 버튼 클릭: 댓글 삭제에 성공하면 GET 응답을 받아와 댓글 목록을 업데이트하고, 댓글 수가 감소한다.

---

### 게시글 수정
<img width="1624" alt="Image" src="https://github.com/user-attachments/assets/f1ab05f0-d0a4-44f5-bfc9-fae25e586b6c" />

- 해당 게시글의 기존 데이터를 수정 폼에 불러온다.
    - 닉네임: 중복되지 않은, 띄어쓰기가 없는 10자 미만의 문자열 검증
- [수정하기] 버튼: 게시글 수정에 성공하면 해당 게시글 조회 페이지로 이동한다.

---

### 회원정보 수정
<img width="1624" alt="Image" src="https://github.com/user-attachments/assets/bb72c3b0-fcd8-4acc-8ea0-57cb2b752022" />
<img width="1624" alt="Image" src="https://github.com/user-attachments/assets/ffa9e9f2-b4bf-492f-9e37-23e81fb7f345" />

- 회원의 기존 데이터를 수정 폼 양식에 불러온다.
- [수정하기] 버튼: 회원정보 수정에 성공하면 토스트 메시지(’수정 완료’)가 나타난다.
    - 닉네임: 
- [회원 탈퇴] 텍스트 → 모달 → [확인] 버튼 클릭: 회원 탈퇴에 성공하면 로그인 페이지로 이동한다.
- 탈퇴한 회원의 게시글과 댓글은 조회 대상에서 제외된다.

---

### 비밀번호 수정
<img width="1624" alt="Image" src="https://github.com/user-attachments/assets/82ce7ca4-6e5d-4758-8823-385cea003565" />

- [수정하기] 버튼: 비밀번호 수정에 성공하면 토스트 메시지(’수정 완료’)가 나타난다.
    - 비밀번호: 대소문자, 숫자, 특수문자가 1개 이상씩 들어간 8~20자의 문자열 검증
    - 비밀번호 확인: 비밀번호와 동일한지 검증

<br/>
<br/>

## 7. 참고 사항
- Fetch API를 이용하여 백엔드와 통신합니다.
- 엔드포인트는 `js/config.js` 파일에서 설정할 수 있습니다.
- 로컬 환경에서 백엔드 서버가 실행 중이어야 정상적으로 동작합니다.

## 8. 이슈 및 해결 방법
### 1. 게시글 모듈과 댓글 모듈 분리

- **문제**: 댓글이 생성/수정/삭제된 후 UI에 자동 반영되지 않음
- **원인**: 댓글 조회 시 필요한 `postId`를 각 모듈에서 명확히 참조하지 못함
- **해결**
  - 게시글 조회 페이지를 **게시글 모듈**과 **댓글 모듈**로 분리
  - 댓글 로직에서 `postId`를 URL에서 추출하여 사용

    ```js
    const postId = parseInt(new URLSearchParams(window.location.search).get('id'));
    ```

---

### 2. 댓글 연속 생성/수정 시 UI에 반영되지 않는 오류

- **문제**: 댓글을 여러 번 생성/수정해도 댓글 목록이 갱신되지 않음
- **원인**: `refreshComments()` 함수가 `comment.js`에 위치해 있고, `commentInput.js`에서 직접 호출할 수 없음 → **순환 참조 문제**
- **해결**
  - `refreshComments()`를 **콜백 함수로 주입**하여 `commentInput.js`에서 사용할 수 있도록 함
  - 콜백 함수 호출을 **동기적으로 처리**해 댓글 반영이 보장되도록 함

---

### 3. 댓글 연속 삭제 시 이전 삭제 대상까지 함께 요청되는 오류

- **문제**: 삭제 모달에서 확인 버튼 클릭 시 이전 삭제 대상까지 중복 삭제됨
- **원인**: confirm 버튼의 `click` 이벤트 리스너가 누적되며 과거 콜백까지 실행됨
- **해결**
  - `setOnConfirm()` 함수에서 기존 버튼을 **새로 복제하여 교체**, 리스너 초기화

    ```js
    setOnConfirm(callback) {
      const newBtn = this.confirmBtn.cloneNode(true);
      this.confirmBtn.parentNode.replaceChild(newBtn, this.confirmBtn);
      this.confirmBtn = newBtn;

      this.confirmBtn.addEventListener('click', () => {
        callback();
        this.closeModal();
      });
    }
    ```

---

### 4. 헤더에 프로필 이미지를 적용하려면 매 페이지마다 데이터를 받아와야 하는 문제
- **문제**  
  로그인한 사용자의 프로필 이미지를 헤더에 표시하려면,  
  매 페이지 진입 시마다 서버에 GET 요청을 보내야 하는 부담이 있음

- **원인**  
  헤더는 모든 페이지에서 공통으로 사용되지만,  
  로그인한 사용자 정보를 클라이언트에 별도로 저장해두지 않으면  
  매번 서버에서 사용자 정보를 받아와야 프로필 이미지를 표시할 수 있음

- **해결**  
  로그인 성공 시 사용자 정보(userId, 프로필 이미지 경로)를 `localStorage`에 저장하고,  
  각 페이지에서 이를 참조하여 별도의 요청 없이 프로필 이미지를 렌더링함

---

### 5. 헤더의 프로필 이미지 즉시 반영 문제

- **문제**: 프로필 수정 후에도 헤더의 이미지가 즉시 반영되지 않음
- **원인**: 이미지 경로 변경 후 UI 재렌더링이 발생하지 않음
- **해결**
  1. 프로필 수정 성공 시, `localStorage`에 이미지 경로를 업데이트
  2. `window.dispatchEvent(new Event('userImgChanged'))`로 커스텀 이벤트 발생
  3. 헤더 모듈이 해당 이벤트를 수신하면 **재렌더링 실행**