---
layout: post
title:  "MongoDB Intro"
date:   2021-12-06 22:17:50 +0900
categories: Writing...
---

### MongoDB Intro

**1. Database**

- 데이터베이스는 컬렉션의 물리적 컨테이너. 하나의 데이터베이스에는 보통 여러개의 컬렉션을 가지고 있음

**2. Collection**

- 컬렉션은 몽고DB Document 의 그룹이며 RDBMS 의 예를 들면 Table 과 개념과 유사
- 컬렉션은 단일 데이터베이스에 존재
- 컬렉션 내부의 도큐먼트는 서로 다른 필드를 가질 수 있
- 컬렉션 안에 도큐먼트는 일반적으로 서로 유사한 하거나 관련된 목적이 있

**3. Document**

- Docuemtn 는 하나의 키(key) 와 값(value)의 집합으로 이루어져 있으며 동적 스키마
- 동적 스키마는 동일한 컬랙션 내의 도큐먼트가 동일한 필드 또는 구조를 가질 필요 없
- 동일한 필드안에 다른 타입의 데이터를 보유할 수 있음

| RDBMS | MongoDB |
| --- | --- |
| Database	 | Database	 |
| Table	 | Collection |
| Tuple/Row | Document |
| Column	 | Field |
| Table Join | Embedded Documents |
| Primary Key | Primary Key ( Default _id ) |