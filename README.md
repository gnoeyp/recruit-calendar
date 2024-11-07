## 기술 스택

### Framework

- Next.js v15 App Router
  - Stable 버전 사용했습니다.

### UI

- TailwindCSS
- Radix UI

  - Carousel Dialog 구현을 위해 Radix Dialog의 Portal, Overlay를 사용했습니다.

- 디자인 시스템이 적용된 UI 라이브러리는 사용하지 않았습니다.

### Testing

- Vitest
- React Testing Library

## 폴더 구조

```
  ├── app
  ├── components
  │   └── ui
  ├── api
  ├── hooks
  ├── models
  └── utils

```

- `app`: Layout, page 컴포넌트
- `components`: 컴포넌트
  - `ui`: 도메인과 무관한 UI 컴포넌트
- `api`: API 호출 함수
- `hooks`: 커스텀 훅
- `models`: 데이터 모델
- `utils`: 유틸리티 함수 및 클래스

## 상태 관리

- CheckboxTree 컴포넌트의 checkedValues 상태를 관리하기 위해 ContextAPI 사용.

## API 통신

- interceptor 등 복잡한 설정이 필요하지 않아 fetch를 사용했습니다.

- 서버로부터 반환되는 데이터의 타입인 DTO 타입을 \*.dto.ts에 정의하고 API 함수는 dto 객체를 클라이언트에서 사용할 수 있는 model로 변환하여 반환합니다.
