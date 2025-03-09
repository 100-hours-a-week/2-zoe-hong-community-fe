# 2-KTB-community-fe
KTB 3-4주차 과제: 기능 정의서와 화면 설계서를 기반으로 커뮤니티 레이아웃을 구현하고 이벤트 리스너를 설정한다.<br/>
**개발 환경:** MacOS, VSCode, HTML, CSS, JavaScript

<br/>

## 설계 구조
```plain text
0. index.html
1. 로그인 페이지
2. 회원가입 페이지
3. 게시물 목록 페이지
4. 게시물 작성 페이지
5. 게시물 조회 페이지
6. 게시물 수정 페이지
7. 회원정보 수정 페이지
8. 비밀번호 수정 페이지
```

<br/>

## 프로젝트 파일 구조
```
2-ktb-community-fe
├─ .DS_Store
├─ README.md
├─ assets
│  ├─ .DS_Store
│  ├─ icons
│  └─ image
│     └─ image01.jpg
├─ css
│  ├─ components
│  │  ├─ comment.css
│  │  ├─ form.css
│  │  ├─ header.css
│  │  ├─ img.css
│  │  ├─ modal.css
│  │  ├─ post.css
│  │  └─ toast.css
│  ├─ main.css
│  └─ reset.css
├─ data
│  └─ data.js
├─ index.html
├─ js
│  ├─ components
│  │  ├─ header.js
│  │  ├─ modal.js
│  │  └─ toast.js
│  ├─ main.js
│  ├─ pages
│  │  ├─ join.js
│  │  ├─ login.js
│  │  ├─ posts
│  │  │  ├─ create.js
│  │  │  ├─ edit.js
│  │  │  ├─ list.js
│  │  │  ├─ listCard.js
│  │  │  ├─ post.js
│  │  │  ├─ postComment.js
│  │  │  └─ postCommentInput.js
│  │  └─ users
│  │     ├─ password.js
│  │     └─ profile.js
│  └─ utils.js
└─ pages
   ├─ join.html
   ├─ login.html
   ├─ posts
   │  ├─ create.html
   │  ├─ edit.html
   │  ├─ list.html
   │  └─ post.html
   └─ users
      ├─ password.html
      └─ profile.html

```

<br/>
<br/>

## 각 페이지 레이아웃 및 기능
### 로그인 페이지
<img width="1624" alt="Image" src="https://github.com/user-attachments/assets/17151756-2817-4c7a-b456-16e061e16e4b" />

- [로그인] 버튼: 로그인에 성공하면 게시물 목록 페이지로 이동한다.
- [회원가입] 텍스트: 클릭 시 회원가입 페이지로 이동한다.

<br/>

### 회원가입 페이지
<img width="1624" alt="Image" src="https://github.com/user-attachments/assets/09bd2dfc-9c70-4440-8d7a-89b835356192" />

- [회원가입] 버튼: 회원가입에 성공하면 로그인 페이지로 이동한다.
- [로그인하러 가기] 텍스트: 클릭 시 로그인 페이지로 이동한다.

<br/>

### 게시물 목록 페이지
<img width="1624" alt="Image" src="https://github.com/user-attachments/assets/062f5b6d-c81c-4685-b87d-2162a387d8d8" />

1. 더미데이터에서 게시물들 전체 정보 postsData를 불러온다.
2. postsData에서 개별 게시물 정보 post를 postCard 컴포넌트에 담아 리스트에 추가한다.
- [게시물 카드]: 클릭 시 해당 게시물(?id={postId}) 조회 페이지로 이동한다.
- [게시물 작성] 버튼: 클릭 시 게시물 생성 페이지로 이동한다.

<br/>

### 게시물 작성 페이지
<img width="1624" alt="Image" src="https://github.com/user-attachments/assets/e1d4fd0f-c317-485b-bf06-cac87288dd28" />

- [완료] 버튼: 게시물 생성에 성공하면 게시물 목록 페이지로 이동한다.
   - 서버와 연결한 이후, 생성한 게시물 조회 페이지로 이동하도록 변경해야 한다.

<br/>

### 게시물 조회 페이지
![Image](https://github.com/user-attachments/assets/79bb0f86-0736-448e-8928-15cb89b3d3c1)
<img width="1624" alt="Image" src="https://github.com/user-attachments/assets/4627ecf0-7551-4a9e-b7e5-da69f1f3c873" />
<img width="1624" alt="Image" src="https://github.com/user-attachments/assets/adfd8a1d-632a-408a-9103-a6577c1e79c1" />

- 게시물, 댓글 목록, 댓글 작성창으로 컴포넌트를 분리했다.
1. URL에서 게시물 id 값(postId)를 가져온다.
2. 더미데이터에서 해당 id 값의 게시물을 가져온다.
3. 화면에 게시물, 댓글 데이터를 불러온다.
- 게시물
    - [수정] 버튼: 클릭 시 해당 게시물(?id={postId}) 수정 페이지로 이동한다.
    - [삭제] 버튼 → 모달 → 게시물 삭제에 성공하면 게시물 목록 페이지로 이동한다.
    - [좋아요 수] 버튼 → 좋아요 처리에 성공하면 좋아요 수가 증가한다.
- 댓글
    - [댓글 등록] 버튼: 댓글 생성에 성공하면 댓글 컴포넌트 영역만 새로고침하고 댓글 수가 증가한다.
        - 새로고침: 댓글 데이터를 서버로부터 새로이 가져와 댓글 목록을 업데이트한다.
    - [댓글 카드]: 클릭 시 수정, 삭제 버튼이 나타난다.
        - ~~[수정] 버튼: 미구현~~
        - [삭제] 버튼 → 모달 → 댓글 삭제에 성공하면 댓글 컴포넌트 영역만 새로고침하고 댓글 수가 감소한다.

<br/>

### 게시물 수정 페이지
<img width="1624" alt="Image" src="https://github.com/user-attachments/assets/f1ab05f0-d0a4-44f5-bfc9-fae25e586b6c" />

- 해당 게시물의 기존 데이터를 수정 폼에 불러온다.
- [수정하기] 버튼: 게시물 수정에 성공하면 해당 게시물 조회 페이지로 이동한다.

<br/>

### 회원정보 수정 페이지
<img width="1624" alt="Image" src="https://github.com/user-attachments/assets/bb72c3b0-fcd8-4acc-8ea0-57cb2b752022" />
<img width="1624" alt="Image" src="https://github.com/user-attachments/assets/ffa9e9f2-b4bf-492f-9e37-23e81fb7f345" />

- 회원의 기존 데이터를 수정 폼에 불러온다.
- [수정하기] 버튼: 회원정보 수정에 성공하면 토스트 메시지(’수정 완료’)가 나타난다.
- [회원 탈퇴] 텍스트 → 모달 → 회원 탈퇴에 성공하면 로그인 페이지로 이동한다.

<br/>

### 비밀번호 수정 페이지
<img width="1624" alt="Image" src="https://github.com/user-attachments/assets/82ce7ca4-6e5d-4758-8823-385cea003565" />

- [수정하기] 버튼: 비밀번호 수정에 성공하면 토스트 메시지(’수정 완료’)가 나타난다.

<br/>
<br/>

## Fetch API 적용
### JSON
텍스트 데이터만 있는 폼 전송
![Image](https://github.com/user-attachments/assets/9272d4b4-ab7a-4a93-b20b-77b6bb29a5a3)

### Form Data
이미지와 같은 비텍스트 데이터가 있는 폼 전송
![Image](https://github.com/user-attachments/assets/74e85f77-e707-4f52-997d-a7310771afe7)