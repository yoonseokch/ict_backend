# ict_backend [![travis build status](https://travis-ci.org/yoonseokch/ict_backend.svg?branch=master)](https://travis-ci.org/github/yoonseokch/ict_backend)

### 자연어처리 및 비전을 이용한 AI 기반 맞춤형 법률 서비스 앱 개발 팀 lawbot

### 2020 ict 한이음 공모전 동상 수상

![메인 사진](http://15.164.245.11:8080/file/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202020-12-26%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%205.44.11.png)

## 📣 소개

- **Lawbot**은 법률로 부터 소외될 수 있는 계층을 위해 만들어진 자연어처리를 이용한 AI 기반 맞춤형 법률 서비스입니다.
- 소장 입력시 네이버 ocr api를 통하여 키워드를 뽑아낸 후 nlp모델을 통해 분석 후 관련 판례 제공.
- 네이버 검색 api와 국가에서 제공하는 법령 api를 통하여 법률 용어와 관련 법령 검색 서비스 제공
- 변호사 인증을 통해 인증된 변호사와 Qna 서비스 제공
- 마이페이지 기능을 통해 판례 다시보기 및 원하는 나의 변호사 기능 지원
- 비슷한 사람들과의 소통을 위한 커뮤니티 기능 지원

## 로그인과 회원가입

![로그인 사진](http://15.164.245.11:8080/file/login.jpeg)
![회원가입](http://15.164.245.11:8080/file/%E1%84%92%E1%85%AC%E1%84%8B%E1%85%AF%E1%86%AB%E1%84%80%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%B8.jpeg)

본인 인증 시스템은 AWS의 SNS 서비스를 
활용하였으나 현재는 AWS계정이 중지된 상태

## 소장 입력시 유사판례 제공

![유사판례 제공](http://15.164.245.11:8080/file/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-01-13%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%203.29.50.png)

소장을 사진으로 찍어 넣으면 네이버 ocr api를 통해 청구취지와 청구원인을 도출하고 그를 바탕으로 nlp분석을 시행해 키워드와 유사판례 제공


## ERD 설계도

![ERD](http://15.164.245.11:8080/file/%E1%84%80%E1%85%B3%E1%84%85%E1%85%B5%E1%86%B71.png)

## how to install
```
npm install
```

## how to run

```
npm start
```

## 도커로 실행하는법

```
sudo docker pull yoonseokch/ict-backend:latest
sudo docker run --name your-name -p 8080:8080 --detach --env-file .env --rm yoonseokch/ict-backend:latest
```


