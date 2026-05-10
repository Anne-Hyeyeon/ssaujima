import type { Question } from '../../../lib/types'

export const QUESTIONS_PRO: Question[] = [
  // Category: cleaning (15 questions)
  { id: 1, category: 'cleaning', text: '외출복으로 침대에 올라가는 거 어때요?', options: ['절대 안 됨', '가끔 OK', '상관없음', '신경 안 씀'] },
  { id: 2, category: 'cleaning', text: '침대에서 음식 먹기는?', options: ['절대 안 됨', '음료만', '과자까지', '다 OK'] },
  { id: 3, category: 'cleaning', text: '이불·베개 커버 교체는?', options: ['주 1회', '격주', '월 1회', '그 이상'] },
  { id: 4, category: 'cleaning', text: '매트리스 청소는?', options: ['월 1회', '분기 1회', '1년 1회', '안 함'] },
  { id: 5, category: 'cleaning', text: '이불 개기는?', options: ['매일', '가끔', '주말만', '안 함'] },
  { id: 6, category: 'cleaning', text: '샤워 후 물기 제거(스퀴지)는?', options: ['매번', '가끔', '거의 안 함', '안 함'] },
  { id: 7, category: 'cleaning', text: '샤워 후 머리카락 처리는?', options: ['즉시', '그날 안에', '모아서', '청소할 때'] },
  { id: 8, category: 'cleaning', text: '변기 뚜껑 닫기는?', options: ['항상', '자주', '가끔', '신경 안 씀'] },
  { id: 9, category: 'cleaning', text: '욕실 청소 빈도는?', options: ['주 1회', '2주 1회', '월 1회', '가끔'] },
  { id: 10, category: 'cleaning', text: '수건 사용은?', options: ['1회용', '2~3일', '일주일', '그 이상'] },
  { id: 11, category: 'cleaning', text: '양치 후 세면대 정리는?', options: ['매번', '자주', '가끔', '안 함'] },
  { id: 12, category: 'cleaning', text: '설거지 타이밍은?', options: ['바로', '그날 안에', '모아서', '식기세척기'] },
  { id: 13, category: 'cleaning', text: '식기세척기 애벌세척은?', options: ['그냥 넣음', '물로 헹굼', '수세미질', '식기세척기 안 씀'] },
  { id: 14, category: 'cleaning', text: '음식물 쓰레기 처리는?', options: ['매일', '2~3일', '일주일', '가득 차면'] },
  { id: 15, category: 'cleaning', text: '바닥 청소 빈도는?', options: ['매일', '주 2~3회', '주 1회', '가끔'] },

  // Category: laundry (5 questions)
  { id: 16, category: 'laundry', text: '세탁 빈도는?', options: ['매일', '주 2~3회', '주 1회', '가끔'] },
  { id: 17, category: 'laundry', text: '빨래 분리는?', options: ['안 함', '색깔만', '재질·속옷까지', '매우 세세하게'] },
  { id: 18, category: 'laundry', text: '건조 방식은?', options: ['건조기', '자연건조', '둘 다', '상황에 따라'] },
  { id: 19, category: 'laundry', text: '빨래 개기는?', options: ['바로', '그날', '며칠 방치', '그냥 꺼내 입음'] },
  { id: 20, category: 'laundry', text: '다림질은?', options: ['매번', '필요할 때', '거의 안 함', '드라이만 맡김'] },

  // Category: organizing (4 questions)
  { id: 21, category: 'organizing', text: '정리 스타일은?', options: ['제자리에', '자주 쓰는 건 꺼내둠', '쓴 자리에', '어디 있는지만'] },
  { id: 22, category: 'organizing', text: '미니멀 vs 맥시멀?', options: ['미니멀', '약간 미니멀', '약간 맥시멀', '맥시멀'] },
  { id: 23, category: 'organizing', text: '안 쓰는 물건 처분은?', options: ['자주', '가끔', '거의 안 함', '못 버림'] },
  { id: 24, category: 'organizing', text: '냉장고 유통기한 관리는?', options: ['철저', '보통', '안 함', '모름'] },

  // Category: food (5 questions)
  { id: 25, category: 'food', text: '아침 식사는?', options: ['꼭 챙김', '가끔', '안 먹음', '커피만'] },
  { id: 26, category: 'food', text: '집밥 vs 외식·배달?', options: ['집밥 위주', '반반', '외식 위주', '거의 외식'] },
  { id: 27, category: 'food', text: '매운 음식 선호도는?', options: ['매우 좋아함', '좋아함', '보통', '못 먹음'] },
  { id: 28, category: 'food', text: '야식 빈도는?', options: ['자주', '가끔', '거의 안 먹음', '안 먹음'] },
  { id: 29, category: 'food', text: '식사 중 핸드폰·TV는?', options: ['항상 OK', '가끔', '안 봄', '절대 안 됨'] },

  // Category: rhythm (5 questions)
  { id: 30, category: 'rhythm', text: '평일 취침 시간은?', options: ['11시 전', '12시쯤', '1~2시', '새벽'] },
  { id: 31, category: 'rhythm', text: '주말 기상 시간은?', options: ['평일과 비슷', '1~2시간 늦게', '점심까지', '더 늦게'] },
  { id: 32, category: 'rhythm', text: '샤워 시간대는?', options: ['아침', '저녁', '둘 다', '불규칙'] },
  { id: 33, category: 'rhythm', text: '집에서 옷차림은?', options: ['잠옷', '편한 옷', '외출복 그대로', '속옷 차림도 OK'] },
  { id: 34, category: 'rhythm', text: '여름 실내 적정 온도는?', options: ['22도 이하', '24도', '26도', '그 이상'] },

  // Category: money (5 questions)
  { id: 35, category: 'money', text: '통장은?', options: ['합치기', '분리', '일부만 공동', '미정'] },
  { id: 36, category: 'money', text: '생활비 분담은?', options: ['반반', '수입 비율', '한 명이', '미정'] },
  { id: 37, category: 'money', text: '큰 지출 상의 기준은?', options: ['10만원', '30만원', '50만원', '100만원 이상'] },
  { id: 38, category: 'money', text: '소비 성향은?', options: ['저축형', '약간 저축형', '약간 소비형', '소비형'] },
  { id: 39, category: 'money', text: '부모님 용돈은?', options: ['매달', '명절·생신', '가끔', '안 드림'] },

  // Category: family (5 questions)
  { id: 40, category: 'family', text: '양가 방문 빈도는?', options: ['주 1회', '월 1~2회', '분기', '명절만'] },
  { id: 41, category: 'family', text: '부모님 연락 빈도는?', options: ['매일', '주 2~3회', '주 1회', '가끔'] },
  { id: 42, category: 'family', text: '명절은?', options: ['양가 다', '번갈아', '따로 보내기', '안 감'] },
  { id: 43, category: 'family', text: '부모님 경제적 지원은?', options: ['받음', '안 받음', '상황 따라', '미정'] },
  { id: 44, category: 'family', text: '형제자매와 거리감은?', options: ['매우 친함', '보통', '멀음', '소원'] },

  // Category: social (5 questions)
  { id: 45, category: 'social', text: '회식·술자리는?', options: ['자주 OK', '가끔', '거의 안 함', '안 함'] },
  { id: 46, category: 'social', text: '친구 만남(주말 단독 외출)은?', options: ['자유', '미리 상의', '거의 안 함', '같이 다님'] },
  { id: 47, category: 'social', text: '이성 친구는?', options: ['자유', '단둘이는 X', '연락도 X', '절교'] },
  { id: 48, category: 'social', text: '혼자만의 시간 필요도는?', options: ['매우', '보통', '별로', '항상 같이'] },
  { id: 49, category: 'social', text: '여행 스타일은?', options: ['계획형', '약간 계획', '약간 즉흥', '즉흥형'] },

  // Category: communication (5 questions)
  { id: 50, category: 'communication', text: '다툼 해결은?', options: ['즉시', '그날 안에', '시간 두고', '흐지부지'] },
  { id: 51, category: 'communication', text: '자기 전 화해 원칙은?', options: ['무조건', '가능하면', '상관없음', '따로 잠'] },
  { id: 52, category: 'communication', text: '감정 표현은?', options: ['직설적', '적절히', '우회적', '표현 안 함'] },
  { id: 53, category: 'communication', text: '애정표현 빈도는?', options: ['매우 자주', '적당히', '가끔', '거의 안 함'] },
  { id: 54, category: 'communication', text: '기념일 챙기기는?', options: ['다 챙김', '큰 것만', '가끔', '안 챙김'] },

  // Category: future (5 questions)
  { id: 55, category: 'future', text: '자녀 희망은?', options: ['원함', '모름', '안 원함', '상황 따라'] },
  { id: 56, category: 'future', text: '자녀 인원은?', options: ['1명', '2명', '3명 이상', '안 낳음'] },
  { id: 57, category: 'future', text: '육아 분담은?', options: ['반반', '한 명 위주', '양가 도움', '미정'] },
  { id: 58, category: 'future', text: '사교육은?', options: ['적극적', '보통', '필수만', '최소화'] },
  { id: 59, category: 'future', text: '반려동물은?', options: ['키우고 싶음', '상관없음', '반대', '미정'] },

  // Category: digital (5 questions)
  { id: 60, category: 'digital', text: '핸드폰 비밀번호는?', options: ['공유', '알지만 안 봄', '비공유', '미정'] },
  { id: 61, category: 'digital', text: '위치 공유 앱은?', options: ['사용', '상황에 따라', '사용 안 함', '반대'] },
  { id: 62, category: 'digital', text: 'SNS 비공개 영역은?', options: ['인정', '일부 인정', '인정 안 함', '다 공유'] },
  { id: 63, category: 'digital', text: '거실 TV는?', options: ['거의 항상', '저녁만', '가끔', '거의 안 켬'] },
  { id: 64, category: 'digital', text: '게임·유튜브 시간은?', options: ['1시간 이내', '1~3시간', '3시간 이상', '거의 안 함'] },
]
