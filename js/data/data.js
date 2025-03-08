export const currentUser = {
  id: 100,
  email: "user@example.com",
  nickname: "사용자",
  password: "0000",
  profileImg: "/assets/image/image01.jpg"
};

export const postsData = {
  posts: [
    {
      id: 1,
      title: "KTB 커뮤니티에 오신 것을 환영합니다!",
      user: {
        nickname: "관리자",
        profileImg: "/assets/image/image01.jpg"
      },
      createdAt: "2025-03-01 00:00:00",
      likeCount: 56,
      viewCount: 312,
      commentCount: 15
    },
    {
      id: 2,
      title: "3월 정기 모임 안내",
      user: {
        nickname: "이벤트팀",
        profileImg: "/images/profiles/event_team.jpg"
      },
      createdAt: "2025-03-02 00:00:00",
      likeCount: 42,
      viewCount: 287,
      commentCount: 23
    },
    {
      id: 3,
      title: "새로운 프로젝트 아이디어를 공유합니다",
      user: {
        nickname: "창의적인멤버",
        profileImg: "/images/profiles/creative.jpg"
      },
      createdAt: "2025-03-03 00:00:00",
      likeCount: 78,
      viewCount: 345,
      commentCount: 31
    },
    {
      id: 4,
      title: "독서 모임 참가자 모집",
      user: {
        nickname: "책벌레",
        profileImg: "/images/profiles/bookworm.jpg"
      },
      createdAt: "2025-03-04 00:00:00",
      likeCount: 34,
      viewCount: 201,
      commentCount: 17
    },
    {
      id: 5,
      title: "주말 등산 모임 안내",
      user: {
        nickname: "산사랑",
        profileImg: "/images/profiles/hiker.jpg"
      },
      createdAt: "2025-03-05 00:00:00",
      likeCount: 45,
      viewCount: 230,
      commentCount: 19
    }
  ]
};

export const postDetailData = [
  {
    id: 1,
    title: "KTB 커뮤니티에 오신 것을 환영합니다!",
    content: "안녕하세요, KTB 커뮤니티에 오신 것을 환영합니다! 이 공간은 서로의 아이디어와 경험을 나누는 곳입니다. 자유롭게 의견을 나누고 소통해주세요. 커뮤니티 가이드라인을 준수하며 모두가 존중받는 환경을 만들어 나가요. 여러분의 적극적인 참여를 기대합니다!",
    image: "/assets/image/image01.jpg",
    user: {
      nickname: "관리자",
      profileImg: "/assets/image/image01.jpg"
    },
    createdAt: "2025-03-01 00:00:00",
    likeCount: 56,
    viewCount: 312,
    commentCount: 15,
    comments: [
      {
        id: 1,
        content: "반갑습니다! 앞으로 많은 활동 기대해 주세요!",
        createdAt: "2025-03-01 10:12:33",
        user: {
          nickname: "새회원",
          profileImg: "/images/profiles/newbie.jpg"
        }
      },
      {
        id: 2,
        content: "안녕하세요! 이 커뮤니티를 통해 많은 분들과 좋은 관계를 맺고 싶습니다.",
        createdAt: "2025-03-01 11:20:45",
        user: {
          nickname: "활발한참여자",
          profileImg: "/images/profiles/active.jpg"
        }
      },
      {
        id: 3,
        content: "우리 동네에 이런 커뮤니티가 있어서 정말 좋네요. 자주 참여하겠습니다!",
        createdAt: "2025-03-01 14:05:17",
        user: {
          nickname: "지역주민",
          profileImg: "/images/profiles/local.jpg"
        }
      }
    ]
  },
  {
    id: 2,
    title: "3월 정기 모임 안내",
    content: "안녕하세요, 회원 여러분! 3월 정기 모임을 안내해 드립니다. 이번 모임은 3월 15일 토요일 오후 2시에 시청 근처 커뮤니티 센터에서 진행됩니다. 주제는 '지속 가능한 도시 생활'이며, 전문가 초청 강연과 그룹 토론이 있을 예정입니다. 간단한 다과도 준비되어 있으니 많은 참여 부탁드립니다. 참가 신청은 이 게시물 댓글로 해주세요!",
    image: "/images/meeting.jpg",
    user: {
      nickname: "이벤트팀",
      profileImg: "/images/profiles/event_team.jpg"
    },
    createdAt: "2025-03-02 00:00:00",
    likeCount: 42,
    viewCount: 287,
    commentCount: 23,
    comments: [
      {
        id: 4,
        content: "저도 참석하고 싶습니다! 인원이 몇 명 정도 예상되나요?",
        createdAt: "2025-03-02 15:30:22",
        user: {
          nickname: "참가희망",
          profileImg: "/images/profiles/participant.jpg"
        }
      },
      {
        id: 5,
        content: "현재 20명 정도 참석 예정이며, 최대 30명까지 가능합니다. 참가 신청 감사합니다!",
        createdAt: "2025-03-02 16:45:10",
        user: {
          nickname: "이벤트팀",
          profileImg: "/images/profiles/event_team.jpg"
        }
      },
      {
        id: 6,
        content: "지속 가능한 도시 생활에 관심이 많습니다. 꼭 참석하겠습니다!",
        createdAt: "2025-03-03 09:10:33",
        user: {
          nickname: "환경지킴이",
          profileImg: "/images/profiles/eco.jpg"
        }
      }
    ]
  },
  {
    id: 3,
    title: "새로운 프로젝트 아이디어를 공유합니다",
    content: "최근에 생각한 지역 환경 개선 프로젝트 아이디어를 공유합니다. 우리 동네 공원을 더 활기차게 만들기 위한 '시민 정원사' 프로그램을 제안합니다. 매주 토요일마다 주민들이 모여 공원의 화단을 가꾸고, 계절별 꽃과 식물을 심는 활동입니다. 이를 통해 공동체 의식도 높이고, 환경도 개선할 수 있을 것 같습니다. 관심 있으신 분들의 의견이나 추가 아이디어를 댓글로 남겨주세요!",
    image: "/images/garden_project.jpg",
    user: {
      nickname: "창의적인멤버",
      profileImg: "/images/profiles/creative.jpg"
    },
    createdAt: "2025-03-03 00:00:00",
    likeCount: 78,
    viewCount: 345,
    commentCount: 31,
    comments: [
      {
        id: 7,
        content: "정말 좋은 아이디어네요! 저는 가드닝 경험이 있어서 도움을 드릴 수 있을 것 같아요.",
        createdAt: "2025-03-03 11:25:19",
        user: {
          nickname: "원예가",
          profileImg: "/images/profiles/active.jpg"
        }
      },
      {
        id: 8,
        content: "구청에 제안서를 제출하면 작은 지원금을 받을 수도 있을 것 같아요. 함께 준비해볼까요?",
        createdAt: "2025-03-03 13:40:55",
        user: {
          nickname: "지역활동가",
          profileImg: "/images/profiles/local.jpg"
        }
      },
      {
        id: 9,
        content: "대학생들도 봉사활동으로 참여할 수 있을까요? 저희 동아리에서 관심 있어할 것 같습니다.",
        createdAt: "2025-03-04 09:15:27",
        user: {
          nickname: "학생봉사자",
          profileImg: "/images/profiles/newbie.jpg"
        }
      }
    ]
  },
  {
    id: 4,
    title: "독서 모임 참가자 모집",
    content: "매주 수요일 저녁 7시에 진행되는 독서 모임 참가자를 모집합니다. 이번 달에는 한국 현대 소설을 함께 읽고 이야기 나눌 예정입니다. 첫 번째 책은 김영하의 '살인자의 기억법'입니다. 책을 미리 읽어오시면 좋지만, 그렇지 않더라도 함께 이야기 나누는 자리에 참여하실 수 있습니다. 관심 있으신 분들은 댓글로 남겨주세요. 장소는 시립 도서관 스터디룸입니다.",
    image: "/images/book_club.jpg",
    user: {
      nickname: "책벌레",
      profileImg: "/images/profiles/bookworm.jpg"
    },
    createdAt: "2025-03-04 00:00:00",
    likeCount: 34,
    viewCount: 201,
    commentCount: 17,
    comments: [
      {
        id: 10,
        content: "참여하고 싶습니다! '살인자의 기억법' 읽은 적 있는데 같이 이야기 나누면 좋을 것 같아요.",
        createdAt: "2025-03-04 17:30:42",
        user: {
          nickname: "문학애호가",
          profileImg: "/images/profiles/participant.jpg"
        }
      },
      {
        id: 11,
        content: "독서 모임은 처음인데 괜찮을까요? 책은 지금 주문했습니다.",
        createdAt: "2025-03-05 10:20:15",
        user: {
          nickname: "첫참여",
          profileImg: "/images/profiles/active.jpg"
        }
      },
      {
        id: 12,
        content: "첫참여님, 물론이죠! 처음 오시는 분들도 편하게 참여하실 수 있는 분위기입니다. 기다리고 있겠습니다!",
        createdAt: "2025-03-05 12:35:50",
        user: {
          nickname: "책벌레",
          profileImg: "/images/profiles/bookworm.jpg"
        }
      }
    ]
  },
  {
    id: 5,
    title: "주말 등산 모임 안내",
    content: "이번 주말 등산 모임을 안내해 드립니다. 3월 9일 일요일 아침 8시, 북한산 국립공원 우이동 입구에서 만나 백운대 코스로 등산할 예정입니다. 초보자도 참여 가능한 코스이며, 약 4-5시간 소요될 예정입니다. 등산화, 간식, 물 등 기본 장비를 준비해주세요. 날씨가 변덕스러울 수 있으니 겉옷도 챙겨오시는 것이 좋습니다. 함께 자연을 즐기며 건강한 주말을 보내요!",
    image: "/images/hiking.jpg",
    user: {
      nickname: "산사랑",
      profileImg: "/images/profiles/hiker.jpg"
    },
    createdAt: "2025-03-05 00:00:00",
    likeCount: 45,
    viewCount: 230,
    commentCount: 19,
    comments: [
      {
        id: 13,
        content: "처음 등산하는데 참여해도 될까요? 체력은 나쁘지 않은 편입니다.",
        createdAt: "2025-03-05 10:10:18",
        user: {
          nickname: "등산초보",
          profileImg: "/images/profiles/participant.jpg"
        }
      },
      {
        id: 14,
        content: "등산초보님, 물론입니다! 천천히 함께 올라갈 예정이니 걱정 마세요. 등산화는 꼭 챙겨오세요!",
        createdAt: "2025-03-05 11:25:33",
        user: {
          nickname: "산사랑",
          profileImg: "/images/profiles/hiker.jpg"
        }
      },
      {
        id: 15,
        content: "백운대 코스는 초보자에게도 적당한 난이도입니다. 경치도 정말 좋아요. 저도 참석하겠습니다!",
        createdAt: "2025-03-06 09:05:27",
        user: {
          nickname: "경험자",
          profileImg: "/images/profiles/eco.jpg"
        }
      }
    ]
  }
];