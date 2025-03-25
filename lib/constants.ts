import {
  Calendar,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  ListPlus,
  Pencil,
  ReceiptText,
  Search,
  Tag,
  Trash2,
} from "lucide-react";

export const SERVER_URL = process.env.SERVER_URL;
export const APP_NAME = process.env.APP_NAME;
export const APP_DESCRIPTION = process.env.APP_DESCRIPTION;

export const SIDEBAR = {
  CATEGORY: [
    {
      title: "대시보드",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "수입 / 지출 내역",
      href: "/transactions",
      icon: ReceiptText,
    },
    {
      title: "카드 / 계좌",
      href: "/cards-accounts",
      icon: CreditCard,
    },
    {
      title: "카테고리 / 태그",
      href: "/category-tag",
      icon: Tag,
    },
    {
      title: "달력",
      href: "/calendar",
      icon: Calendar,
    },
  ],
  REPORT: {
    title: "보고서",
    icon: ClipboardList,
    items: [
      {
        title: "주간",
        href: "/reports/weekly",
      },
      {
        title: "월간",
        href: "/reports/monthly",
      },
      {
        title: "연간",
        href: "/reports/yearly",
      },
      {
        title: "분류별",
        href: "/reports/categories",
      },
    ],
  },
};

export const CATEGORIES = {
  EXPENSES: [
    {
      id: "62f1992f-bcc1-4a9c-acbc-f534d83eb960",
      name: "식사",
      color: "#ff7b3a",
      icon: "🍽️",
      subCategories: [
        {
          id: "057527bc-ba6b-4b2a-8c88-463f006cf049",
          name: "고기",
        },
        {
          id: "40fe1743-cd74-4b65-9565-80bd861d0ca8",
          name: "배달",
        },
        {
          id: "e3b16c3c-7642-46b5-a411-70ccbe845e3e",
          name: "분식",
        },
        {
          id: "7fcb3153-469c-4366-81ea-ade099484908",
          name: "뷔페",
        },
        {
          id: "449c1448-18ba-4381-a7ae-534a937fb7d7",
          name: "양식",
        },
        {
          id: "4aecb8b0-053a-4af0-9bf2-33e87c8cd55f",
          name: "일반식당",
        },
        {
          id: "10a7de6b-a075-442e-98dc-be418b30f464",
          name: "일식",
        },
        {
          id: "29d0c831-e346-4ccc-9b57-225c4437d8aa",
          name: "중식",
        },
      ],
    },
    {
      id: "5fc548d3-0d99-4274-b9f5-ad104baedc29",
      name: "카페/간식",
      color: "#ff6861",
      icon: "🍵",
      subCategories: [
        {
          id: "1acafe63-5355-4bbd-ac66-d0c15376f874",
          name: "도넛/아이스크림",
        },
        {
          id: "65275e50-224a-488c-9834-d6d3484e177f",
          name: "디저트/떡",
        },
        {
          id: "84efa68b-2056-49ce-9491-8bd2430f9844",
          name: "베이커리",
        },
        {
          id: "bab760d6-5b06-4be5-a355-d8285a68e9d6",
          name: "샌드위치/핫도그",
        },
        {
          id: "8d845be9-940b-4dec-84ac-e607e04b7ae1",
          name: "차/주스/빙수",
        },
        {
          id: "587fd35e-04a9-431c-99f9-16ed15b44f2c",
          name: "커피",
        },
        {
          id: "a0d85097-e8f9-44f8-a45d-b3b96fff83de",
          name: "자판기",
        },
        {
          id: "c734e56f-5726-47d9-9b3f-71c750e3e86c",
          name: "기타",
        },
      ],
    },
    {
      id: "f267cb62-f1dd-47c3-9450-36418175fd95",
      name: "술/유흥",
      color: "#f34a43",
      icon: "🍻",
      subCategories: [
        {
          id: "60b1a3aa-1470-4d42-8c55-40cad27fb685",
          name: "노래방",
        },
        {
          id: "85051d4d-06f6-425d-ac10-f1583927a1dd",
          name: "단란주점",
        },
        {
          id: "e37437e0-5dc6-448d-be10-a36109af46a7",
          name: "룸살롱",
        },
        {
          id: "aacb5d43-9ff0-4ce1-8c9c-6007bd36e710",
          name: "맥주",
        },
        {
          id: "5d3beb40-3b0a-49c4-9f4e-b1a1c9381399",
          name: "바",
        },
        {
          id: "9fa6ef54-e848-4c86-a182-5aeeeb343e48",
          name: "와인",
        },
        {
          id: "fefde75d-6db9-41b1-b163-34dc9504cb1d",
          name: "주류",
        },
        {
          id: "1620cdd8-4585-4c52-8c39-0e0bfe338fc3",
          name: "주점",
        },
        {
          id: "cd1c80c3-6108-4e10-860e-6413300b0f4c",
          name: "칵테일",
        },
        {
          id: "aca00759-5a5d-4123-9e7e-51716e1507d0",
          name: "포차",
        },
        {
          id: "90a7e941-180c-4738-b5d6-05ab92f12313",
          name: "호프",
        },
      ],
    },
    {
      id: "cbf3673e-2962-4659-9694-984b2ee92982",
      name: "생활/마트",
      color: "#d563ff",
      icon: "🏪",
      subCategories: [
        {
          id: "b2ddb7c4-03cb-4cbc-b239-a66f13d72f55",
          name: "가전/가구",
        },
        {
          id: "1df40f2f-364c-4742-8183-c95a3e23bb06",
          name: "마트",
        },
        {
          id: "c9567129-8749-49dd-be1a-382fe741e861",
          name: "반려동물",
        },
        {
          id: "8c609e72-33ac-42c4-aceb-f3a38762491b",
          name: "육아",
        },
        {
          id: "8b036321-9a24-41b9-ac96-7f2ba51a783f",
          name: "기프트샵/꽃",
        },
        {
          id: "5fab3ad6-feea-4466-bae5-c4c4124c2d1c",
          name: "일상용품",
        },
        {
          id: "c298b672-963e-4ebb-84b6-cc06da2e063f",
          name: "생활서비스",
        },
        {
          id: "0c3a68de-70c1-486f-94a1-8bc9a0608297",
          name: "편의점",
        },
        {
          id: "76bc3292-0287-4d68-a0cf-3eba02ac5b4a",
          name: "기타",
        },
      ],
    },
    {
      id: "46a7cbe2-5e6c-49b5-92fa-aa5cb9d40c89",
      name: "온라인쇼핑",
      color: "#f34a43",
      icon: "🛒",
      subCategories: [
        {
          id: "166ce8d8-ef08-432b-bcb7-36496a4865c4",
          name: "결제/충전",
        },
        {
          id: "e35dfd1d-d169-47b9-be39-1c6dfc803d81",
          name: "인터넷쇼핑",
        },
        {
          id: "d1fa5a40-1dc9-45ee-b3e7-d5857af1f7db",
          name: "카드포인트",
        },
        {
          id: "030973da-5bc4-4b29-8021-6b2bca3d0e5a",
          name: "홈쇼핑",
        },
        {
          id: "4674b885-dabe-46e7-8629-c07a30952204",
          name: "앱스토어",
        },
        {
          id: "a9288410-1333-467c-9db5-04d06e89b30e",
          name: "기타",
        },
      ],
    },
    {
      id: "9ed2058c-acd2-4580-b053-e75cc0a88102",
      name: "백화점/패션",
      color: "#bb16ff",
      icon: "👗",
      subCategories: [
        {
          id: "4c8d499a-6a7b-49d9-b8f7-e4f689c822e1",
          name: "백화점",
        },
        {
          id: "e0bbd406-acbd-40b5-b806-9b371a3c7537",
          name: "스포츠의류",
        },
        {
          id: "789b0d0f-8f2b-4445-8542-a4c1681bc335",
          name: "아울렛/몰",
        },
        {
          id: "370ef960-c6eb-45d7-882e-b13978b9c754",
          name: "잡화",
        },
        {
          id: "8b4b4790-40f4-4dcc-a8d5-c5c9f01e3224",
          name: "패션",
        },
        {
          id: "bb2fe516-0b28-48f5-b739-2d32782469cc",
          name: "기타",
        },
      ],
    },
    {
      id: "b21312c3-ef4c-4b03-8a45-91670a7c0e34",
      name: "금융/보험",
      color: "#51d1fb",
      icon: "🏦",
      subCategories: [
        {
          id: "dfb1bb60-e215-4059-8b9f-56959f1b16e2",
          name: "보험",
        },
        {
          id: "b01afc45-150f-4bca-9281-b4b92f2d7db6",
          name: "은행",
        },
        {
          id: "78fdd5e7-c975-4b41-9b4c-a1898050da77",
          name: "세금/과태료",
        },
        {
          id: "c0cb43f2-4d8f-4ade-bbb5-7cc7760a0932",
          name: "카드",
        },
        {
          id: "a720f160-2110-4009-bd40-4f2cf3bf3d6a",
          name: "증권/투자",
        },
        {
          id: "523afda1-226c-4bb3-8538-f7b9a02eb34d",
          name: "이자/대출",
        },
        {
          id: "1cc0994f-584b-4c0f-b356-22e536c1066f",
          name: "기타",
        },
      ],
    },
    {
      id: "981d9f19-bd87-4f99-b86c-293c59195dfb",
      name: "의료/건강",
      color: "#2da0ff",
      icon: "🏥",
      subCategories: [
        {
          id: "f8830ae8-4b42-4f78-8456-295dada33858",
          name: "병원",
        },
        {
          id: "ceb94a2e-e1eb-4fd4-b119-9b6cfb3510b1",
          name: "보조식품",
        },
        {
          id: "ec1a870d-31d8-4f2a-a01e-a193eb142473",
          name: "약국",
        },
        {
          id: "35f0520e-ef33-4b2a-b967-fe1d5db35e93",
          name: "요양",
        },
        {
          id: "05fe1ddc-caf7-457c-a51d-87c34fbb4aa6",
          name: "의료기기",
        },
        {
          id: "dc4da619-a1f9-46e6-8162-35d91dbde0df",
          name: "치과",
        },
        {
          id: "af38af57-7cd0-443f-b68b-a95594f101fe",
          name: "한의원",
        },
        {
          id: "0c7f8cd7-a1f6-458a-b175-aa0de22ab30d",
          name: "기타",
        },
      ],
    },
    {
      id: "febad9de-ae3f-4cb0-815e-351d9576cdf1",
      name: "뷰티/미용",
      color: "#7d4aff",
      icon: "💇🏻",
      subCategories: [
        {
          id: "9cec8762-7e48-449b-90ab-da505747d130",
          name: "네일",
        },
        {
          id: "28df08a5-494f-4c19-9949-8738a489d6e1",
          name: "뷰티제품",
        },
        {
          id: "79c462b3-068b-4b2b-88b6-18cab5a853df",
          name: "피부/체형관리",
        },
        {
          id: "6267aa5d-54aa-485a-9333-b0e6fe6458d7",
          name: "헤어샵",
        },
        {
          id: "d7f49d0e-4254-497a-9525-0c285b2f05c0",
          name: "기타",
        },
      ],
    },
    {
      id: "0a062e40-e4b1-4591-8d94-79ab952b3cb1",
      name: "주거/통신",
      color: "#37cc77",
      icon: "🏠",
      subCategories: [
        {
          id: "e5fc1866-a024-419e-810a-e2e8f46bb0b7",
          name: "공과금",
        },
        {
          id: "cde55a54-a204-410e-a76c-5b853e67525e",
          name: "관리비",
        },
        {
          id: "bc1ca61f-1d09-4f0d-aaf9-06a171b237f9",
          name: "부동산",
        },
        {
          id: "13aafdd1-d9b5-4b20-abf8-6e9150ed0ee2",
          name: "월세",
        },
        {
          id: "fe4fbce5-9096-4956-8d9f-b4f495b65f70",
          name: "이사",
        },
        {
          id: "293682a8-ce27-4e60-9b53-ef564e9a156a",
          name: "통신",
        },
        {
          id: "316477f2-fb73-45e4-a554-0c02f3b7dfe9",
          name: "기타",
        },
      ],
    },
    {
      id: "3ee4d04e-f071-46a0-b4a8-186907ffe546",
      name: "학습/교육",
      color: "#7ed637",
      icon: "📚",
      subCategories: [
        {
          id: "13398b0f-2075-4f66-a0b9-b57c11acbd44",
          name: "학교",
        },
        {
          id: "c619509c-15b4-44ea-8585-466255e07254",
          name: "학습교재",
        },
        {
          id: "a026fd37-fa63-43cf-a49c-b37521b69f16",
          name: "학습시설",
        },
        {
          id: "38544aa6-a7ab-4ca3-93d5-bb3cf2b60805",
          name: "학원",
        },
        {
          id: "ad5fd9dd-7b19-4c64-aa4f-6f323c48d665",
          name: "시험",
        },
        {
          id: "559b96b0-424b-42bc-9a9d-dc1f343c532f",
          name: "기타",
        },
      ],
    },
    {
      id: "4425b86b-6907-40a3-bb67-6a54e57eeceb",
      name: "문화/예술",
      color: "#ffc41f",
      icon: "🍿",
      subCategories: [
        {
          id: "9848de40-0c90-482f-bfbd-e30e82081d1d",
          name: "공연",
        },
        {
          id: "dac74529-309b-412c-9000-1c33cde10730",
          name: "도서",
        },
        {
          id: "7fdee32c-d1e9-4107-9d88-c678d6a03ea3",
          name: "영화",
        },
        {
          id: "adb9a12f-72c7-40cd-96ed-4550279f55e7",
          name: "전시/관람",
        },
        {
          id: "6bef2c42-d610-4f81-aef1-843a4b8e499e",
          name: "취미",
        },
        {
          id: "4b0c42b6-d928-460e-bf90-f2e0c4855dd0",
          name: "여가시설",
        },
        {
          id: "90d4ad4d-50b7-4b43-841d-2a27eee56107",
          name: "기타",
        },
      ],
    },
    {
      id: "bc5efb72-b410-4b5f-9e16-a3cebdf40ef6",
      name: "교통/차량",
      color: "#1cda90",
      icon: "🚗",
      subCategories: [
        {
          id: "71b32ee2-ab59-428c-bdf8-20d6612baab1",
          name: "대리운전",
        },
        {
          id: "025f6246-053e-4c3e-95b3-52d79ff5a397",
          name: "대중교통",
        },
        {
          id: "93f68439-667d-4ed7-a55a-3b46ff725ab5",
          name: "렌트카",
        },
        {
          id: "a42dfec6-a5ce-437d-9dfb-e6adaf6a8b6e",
          name: "정비/부품",
        },
        {
          id: "bb4f96ed-7e9b-4c26-98ea-6daa2e2e0e71",
          name: "주차/요금소",
        },
        {
          id: "f91b3e40-4565-4b27-9137-f7f0179853c9",
          name: "주유소",
        },
        {
          id: "dbd6683f-f40e-4eb4-b213-0afcd45741a9",
          name: "택시",
        },
        {
          id: "54b4c2d1-c9cb-4103-8b47-d942eaff8fd0",
          name: "휴게소",
        },
        {
          id: "d847ebf5-848f-4818-b82c-b25db0325326",
          name: "기타",
        },
      ],
    },
    {
      id: "ddd2e432-7217-4fd5-9757-24c311df334c",
      name: "스포츠/레저",
      color: "#ffb400",
      icon: "⚽",
      subCategories: [
        {
          id: "159f65a0-c968-45f2-992c-f9e13ce5b88e",
          name: "레저",
        },
        {
          id: "0a05f9be-427e-45c4-a069-5da5950bd048",
          name: "무예",
        },
        {
          id: "9e858e04-d79d-4512-b54c-0927745ff141",
          name: "스파/마사지",
        },
        {
          id: "da94a8f1-5511-4e94-b229-d9353184ffd1",
          name: "스포츠",
        },
        {
          id: "bfddb18a-65d9-4d87-9fd4-fe6149e98267",
          name: "요가/헬스",
        },
        {
          id: "889916bf-e238-4fab-9499-051201c1d704",
          name: "테마파크",
        },
        {
          id: "c20fe05b-3af0-4f2c-9516-da3fbc55dd8e",
          name: "기타",
        },
      ],
    },
    {
      id: "2aa92f3a-103a-4709-8d66-b2f8ca3d6d28",
      name: "여행/숙박",
      color: "#ffdd1f",
      icon: "🏖️",
      subCategories: [
        {
          id: "8a794218-808e-4428-8c92-30e037935daa",
          name: "항공",
        },
        {
          id: "7997340b-ab39-4215-be05-70e619fe1fc2",
          name: "관광",
        },
        {
          id: "661f956b-eaad-4c7a-a744-a11e858df4f5",
          name: "숙박",
        },
        {
          id: "3075212e-485d-4caf-8fce-3b3d866a879b",
          name: "여행",
        },
        {
          id: "fa0b4bcb-b57f-41e0-a546-5f45cd7c2af9",
          name: "여행용품",
        },
        {
          id: "17c73088-5f7f-49b3-90ce-c33cb3f78a4c",
          name: "해외결제",
        },
        {
          id: "7d7c4162-4141-4dbf-b967-783c63fa125e",
          name: "기타",
        },
      ],
    },
    {
      id: "5f08ea26-1e0c-4a6c-8143-dac03c479b75",
      name: "경조사/회비",
      color: "#2d7aa5",
      icon: "🎁",
      subCategories: [
        {
          id: "2e2f48b0-57a6-427d-bcf8-8f6b30b67334",
          name: "기부",
        },
        {
          id: "f6cb7a3e-990e-4821-89c8-785f1aff6f0e",
          name: "용돈",
        },
        {
          id: "e2310350-f079-418e-9c9e-822c0c93722c",
          name: "현금",
        },
        {
          id: "999cbccf-1698-4469-a01f-48805ddef991",
          name: "회비",
        },
        {
          id: "4ef87c1a-4a6a-4af6-a5c8-f5ad48fcf460",
          name: "경조사",
        },
        {
          id: "70321b2a-4eb8-4f8a-91a4-32b5ce465f2f",
          name: "기타",
        },
      ],
    },
    {
      id: "b4c71aa7-e48a-4f4d-ad72-c5c96e4f6165",
      name: "출금",
      color: "#2c394c",
      icon: "🏧",
      subCategories: [
        { id: "55fe2dd9-a762-4c13-be3b-9499831cbb1d", name: "기타" },
      ],
    },
    {
      id: "cd466699-2a34-4d3b-85d3-d8aaad9645a2",
      name: "자산이동",
      color: "#2e5575",
      icon: "💸",
      subCategories: [
        { id: "6f0138db-9cfb-430e-b1ac-03c0ac367c71", name: "출금" },
      ],
    },
    {
      id: "d9c80645-36ff-41e1-b320-7a06174ce750",
      name: "기타지출",
      color: "#c5c5c5",
      icon: "📦",
      subCategories: [
        {
          id: "643d93e8-c35b-459d-9853-35663ab622fa",
          name: "공공기관",
        },
        {
          id: "55e6b45e-69a3-44f5-9a49-3fc092ab891d",
          name: "기업",
        },
        {
          id: "b37a234d-0549-4ffa-8fa9-8d5087c67b46",
          name: "컨설팅",
        },
        {
          id: "7ef61a92-25a9-464e-aaea-39d6254dce94",
          name: "기타",
        },
      ],
    },
  ],
  INCOMES: [
    {
      id: "11610f99-2890-4476-a519-15af03e2c4ee",
      name: "주수입",
      color: "#ff7b3a",
      icon: "💵",
    },
    {
      id: "b9f0fbff-6ddb-47c6-b14b-75e540108271",
      name: "부수입",
      color: "#ff6861",
      icon: "🪙",
    },
    {
      id: "eb4792d5-067a-4a7a-a677-d1569273b030",
      name: "금융/대출",
      color: "#f34a43",
      icon: "🏦",
    },
    {
      id: "5259f373-a11d-4784-bfa1-1dff9e12199b",
      name: "자산이동",
      color: "#2e5575",
      icon: "💸",
    },
    {
      id: "8f292f84-6133-41dc-a527-e5e57a7f03ea",
      name: "기타수입",
      color: "#f34a43",
      icon: "💰",
    },
  ],
};

["주수입", "부수입", "금융/대출", "자산이동", "기타수입"];

export const TIMES = [
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
];

export const TAGS = ["가족", "데이트", "선물", "여행", "회사"];

export const TransactionListHeader = [ListPlus, Pencil, Trash2, Tag, Search];
