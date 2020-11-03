# 명세

```
수정 로그
- v0.0.0 첫 배포 (20201012)
- v0.1.0 access token 도입, 아이디 중복 체크 api 도입
```



## API 목록

### 로그인

로그인과 관련된 api들입니다. 로그인 성공시 해당 아이디의 access token을 반환하고 로그인과 회원가입을 제외한 api 요청시 header에 token을 넣어 주어야 합니다.

| 메소드 | 경로   | 설명                                                         | 파라미터                            |
| ------ | ------ | :----------------------------------------------------------- | ----------------------------------- |
| POST.  | /login | body에 있는 아이디와 패스워드가 일치하는지 return해줍니다. 맞으면 {success : true , token : string }를 반환합니다. | {userID : string , userPW : string} |

### 회원가입

회원가입과 관련된 api들입니다.

| 메소드 | 경로            | 설명                                                         | 파라미터                                                     |
| ------ | --------------- | :----------------------------------------------------------- | ------------------------------------------------------------ |
| POST.  | /register       | 요청하는 body로 회원가입을 진행합니다. 회원가입에 성공하면 {success : true}를 반환합니다. 서버측에서 따로 인자들에 제한을 걸어두지 않아서 프론트측에서 걸어주어야 합니다. | {userID : string , userPW : string, name: string , birth : Date, email : string , phone : string ,  sex : bool , Lawyer : bool } |
| POST.  | /register/check | 요청하는 userID가 이미 회원가입이 되어있는 아이디인지 확인합니다. 없으면 { success : true } 를 반환하고 있으면 { success : false } 를 반환합니다. | { userID : string }                                          |

이 아래 api들은 요청시 header에 토큰을 추가해줘야 합니다.

```javascript
headers : {

	token : abcd

}
```

### QNA

QNA와 관련된 api들입니다. 상세 명세는 아래와 같습니다.

| 메소드 | 경로                    | 설명                                                         | 파라미터                                                     |
| ------ | ----------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| GET    | /qna/question           | 모든 게시판 정보 가져오기                                    | -                                                            |
| GET    | /qna/category           | 모든 카테고리 가져오기                                       | -                                                            |
| POST   | /qna/question           | 새로운 게시글을 등록합니다. question에는 json 형식으로 게시글에 관한 정보를 넘겨주고 category에 해당되는 카테고리 id를 전부 넘겨줍니다. | { question : { title : string, content : string, Category : int } , category : { { Category_ID : int}, ... } } |
| POST   | /boards/question/search | 검색 기능을 제공하는 api입니다.                              | { kind : string , content : string }                         |
| DELETE | /boards/:id             | id에 해당하는 질문을 삭제합니다                              |                                                              |

### 게시판 

게시판과 관련된 api들입니다. 상세 명세는 아래와 같습니다.

| 메소드 | 경로                          | 설명                                                         | 파라미터                                                     |
| ------ | ----------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| GET    | /boards/posts                 | 모든 게시판 정보 가져오기                                    | -                                                            |
| GET    | /boards/posts/:id             | id에 해당하는 게시글 정보 가져오기                           | -                                                            |
| GET    | /boards/:category?limit=value | 게시판 종류마다 게시글을 받아오기 value만큼의 개수를 받아옴 없을시 전부 가져옴 | -                                                            |
| POST   | /boards/write                 | 새로운 게시글을 작성함                                       | {title : string , boardCategory: int, content : string, User_ID : int} |
| DELETE | /boards/:id                   | id에 해당하는 게시글을 삭제합니다                            |                                                              |

### 댓글

댓글과 관련된 api들입니다. 상세 명세는 아래와 같습니다. 댓글삭제는 추후에 추가될 예정입니다. 

| 메소드 | 경로           | 설명                                                | 파라미터                                       |
| ------ | -------------- | :-------------------------------------------------- | ---------------------------------------------- |
| GET    | /reply/:postid | postid에 해당하는 게시글의 모든 댓글들을 가져옵니다 | -                                              |
| POST.  | /reply/write   | 새로운 댓글을 작성합니다.                           | {content:string , Post_ID : int , User_ID:int} |

### 개인정보

유저의 개인정보에 관한 api들입니다. 유저의 개인정보를 반환하거나 즐겨찾기 등에 사용됩니다. 여기서 일컫는 유저는 access token에 해당하는 유저입니다.

| 메소드 | 경로            | 설명                                     | 파라미터               |
| ------ | --------------- | :--------------------------------------- | ---------------------- |
| GET    | /user/:id       | id에 해당하는 유저의 정보를 가져옵니다   | -                      |
| GET    | /user/interests | 유저의 관심사를 전부 가져옵니다          | -                      |
| POST   | /user/judgement | 유저의 판례 즐겨찾기에 판례를 추가합니다 | { Precedent_ID : int } |
| POST   | /user/interests | 유저의 관심사를 추가합니다.              | { Category_ID : int}   |
| DELETE | /user/intetests | 유저의 관심사를 삭제합니다               | { Category_ID : int}   |
| GET    | /user           | 유저의 정보를 가져옵니다                 |                        |
