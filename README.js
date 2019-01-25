


// 회원 관련 API

// 아이디 및 이메일 중복검사
// head { where: 'id' or 'email', keyword: 중복검색할id or 중복검색할메일 }
router.get("/user/redun/:where/:keyword", userController.redundancy);

// 이메일을 받아서 아이디 찾기.
router.get("/user/findId/:email", userController.findId); // head { email: 회원이메일 }

// 유저정보 변경 창에 채워야할 정보 조회
router.get("/user/detail/:no", userController.detail); // head { no: 유저번호 }

// 회원가입
router.post("/user/regist", userController.regist); // body { id: 회원id, pw: 회원비밀번호, name: 회원이름, email: 회원이메일 }




// 토큰 확인
router.post("/user/verify", userController.verify); // body { token: 로그인 시 발급받은 token }


// 비밀번호 찾기
// 임시 번밀번호 생성 후 
// 회원 가입했을 때 등록된 이메일 찾고 메일로 전송
router.post("/user/findPw", smtpController.findPw); // body { id: 회원id }

// 메일 전송 API
// 문의 메일
router.post("/mailTransfer", smtpController.qnaSend); // body { name: 송신자 이름, email: 송신자 이메일, phone: 전화번호, subject: 메일 제목, contents: 메일 내용 }

// Portfolio 관련 API

// 메인화면서 사용할 포트폴리오 3개 리턴 
router.get("/portfolio/recent/", portfolioController.recent);

// 포트폴리오 전체 리스트 
// 기존에 year 있었지만..... 거르지 않고 전체 출력
router.get("/portfolio/list/", portfolioController.list); // head { year: 검색 연도 }

// 포트폴리오 1개 리턴
router.get("/portfolio/detail/:no", portfolioController.detail); // head { no: 글 번호 }

// Category 관련 API

// 등록된 솔루션 항목 전체 출력
// 메뉴 리스트에서 쓰임
router.get("/category/solution", commonController.solution);

// 등록된 솔루션 항목 1개 출력
// 왜 쓰는지 확인 필요.... 
router.get("/category/solutionOne/:no", commonController.solutionOne);


// 등록된 플랫폼 항목 전체 출력
// 이것 또한 항목 웹 / 안드로이드 / 아이오에스
router.get("/category/platform", commonController.platform);



// 개발가이드 게시판 API

// 솔루션 별 가이드 목록
// 오버뷰 로그인  주소록..등등
router.get("/guide/list/:solutionNo", apiGuideController.list); // head { solutionNo: 솔루션 번호 }

// 가이드 1개 출력
// 1:1화상 컨설팅에 --> 웹 개발 가이등 -->  오버뷰
router.get("/guide/detail/:solutionNo/:platformNo/:step", apiGuideController.detail); // head { solutionNo: 솔루션 번호, platformNo: 플랫폼 번호, step: 페이지 번호 }

// 솔루션 별 미리보기
// 메인페이지
router.get("/guide/preview/:solutionNo", apiGuideController.preview); // head { solutionNo: 솔루션 번호 }

// 테스터 신청 게시판 API
// 전체 목록
router.get("/request/list/:page", requestController.list); // head { page: 게시판 페이지 }

// 검색
router.get("/request/list/:type/:keyword/:page", requestController.list); // head {  type: 'id' or 'name' or 'title' or 'contents', keyword: 검색할 내용, page: 게시판 페이지 }

// 게시글 보기
router.get("/request/detail/:no", requestController.detail); // head { no: 글 번호 }

// 게시글 등록
router.post("/request/regist", requestController.regist); // body { userNo: 회원번호, subject: 제목, contents: 내용, solutionNo: API 번호, platformNo: 플랫폼 번호 }

// 게시글 수정
// body { no: 글 번호, subject: 제목, contents: 내용, solutionNo: API 번호, platformNo: 플랫폼 번호, state: API 진행 상태(int) }
router.post("/request/update", requestController.update);

// 게기글 삭제
router.post("/request/delete", requestController.delete); // body { no: 글 번호 }

// 문의사항 게시판 API
router.get("/qna/list/:page", qnaController.list); // head { page: 게시판 페이지 }
router.get("/qna/list/:type/:keyword/:page", qnaController.list); // head { type: 'id' or 'name' or 'title' or 'contents', keyword: 검색할 내용, page: 게시판 페이지 }
router.get("/qna/detail/:no", qnaController.detail); // head { no: 글 번호 }

router.post("/qna/regist", qnaController.regist); // body { userNo: 회원번호, subject: 제목, contents: 내용, solutionNo: API 번호 }
router.post("/qna/update", qnaController.update); // body { no: 글 번호, subject: 제목, contents: 내용, solutionNo: API 번호 }
router.post("/qna/delete", qnaController.delete); // body { no: 글 번호 }

// 문의사항 게시판 댓글 API
router.get("/qna/comment/list/:boardNo/:page", qnaCommentController.list); // head { boardNo: 글 번호, page: 댓글 페이지 }

router.post("/qna/comment/regist", qnaCommentController.regist); // body { boardNo: 본문번호, userNo: 회원번호, contents: 내용 }
router.post("/qna/comment/reply", qnaCommentController.reply); // body { boardNo: 본문번호, userNo: 회원번호, pOrder: 부모글 C_ORDER, pDepth: 부모글 C_DEPTH, contents: 내용 }
router.post("/qna/comment/update", qnaCommentController.update); // body { no: 글 번호, contents: 내용 }
router.post("/qna/comment/delete", qnaCommentController.delete); // body { no: 글 번호 }

// 개선사항 및 평가 게시판 API
router.get("/evaluation/list/:page", evaluationController.list); // head { page: 게시판 페이지 } query { type: 'id' or 'name' or 'contents', keyword: 검색할 내용 }

router.post("/evaluation/regist", evaluationController.regist); // body { userNo: 회원번호, solutionNo: API 번호, platformNo: platform 번호, contents: 글 내용 }
router.post("/evaluation/answer", evaluationController.answer); // body { boardNo: 글 번호, contents: 글 내용 }
router.post("/evaluation/update", evaluationController.update); // body { no: 글 번호, solutionNo: API 번호, platformNo: platform 번호, contents: 글 내용 }
router.post("/evaluation/delete", evaluationController.delete); // body { no: 글 번호 }
router.post("/evaluation/deleteAns", evaluationController.deleteAns); // body { no: 글 번호 }

module.exports = router;



////////////////////////////// 해결 /////////////////////////////











// 회원정보 변경
router.post("/user/update", userController.update); // body { no: 회원번호, pw: 변경할 비밀번호(빈칸), level: 변경할 등급(빈칸), name: 변경할 이름(빈칸), email: 변경할 메일주소(빈칸) }
// 일반 로그인
// 히스토리 넣고 IP 업데이트
router.post("/user/login", userController.login); // body { id: 회원id, pw: 회원비밀번호 }