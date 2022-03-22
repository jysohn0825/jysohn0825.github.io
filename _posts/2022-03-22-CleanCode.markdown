---
layout: post
title:  "Clean Code(1) - 좋은/니쁜 코드란"
date:   2022-03-22 23:29:50 +0900
categories: Clean Code
---

## 나쁜 코드란?

- 성능이 나쁜 코드 : 불필요한 연산이 있는 코드
- 의미가 모호한 코드 : 이해하기 어려운 코드
- 중복된 코드 : 비슷한 내용이 중복된 코드

## 나쁜 코드가 안 좋은 이유

- 생산성 저하
- 개선을 위한 새로운 시스템이 불가피

## 나쁜 코드를 짜는 이유

- 촉박한 일정
- 사이드 이펙트에 대한 염려

## 클린 코드란?

- 성능이 좋은 코드
- 중복이 제거된 코드 (한 가지를 제대로 수행)
- 가독성이 좋은 코드

## 명명 규칙

- 의미가 분명한 이름 짓기 (e.g. SalesItem selectedItem = salesItemRepository.getItemById(~~) -> selectedItem이라고 이름 지어 좀 더 명확하게 어떠한 Item인지 알려줄 수 있다)
- 루프 속 i,j,k 사용하지 않기 : advanced loop / lamda로 대체
- 통일성 있는 단어 사용 (e.g. Member, Customer, User 중 통일해서 사용하자)
- 변수명에 타입 넣지 않기 (e,g, String nameString -> String name, Impl은 구현체의 명확한 명칭을 통해 제외하자 -> 팀의 명명 규칙을 먼저 따져보자)

## Google Java Naming Guide

- Package : All lower case, Except under bar
- Class : UpperCamelCase (인터페이스는 형용사구도 사용, 테스트는 Test로 끝내기)
- Method : LowerCamelCase (junit test는 underscore 사용하기도 함)





### 참조 : [제로베이스] 한달한권 클린코드
