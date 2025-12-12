# LinkedIn #4 - Form 컴포넌트

---

폼 만들 때 label이랑 input 연결, 에러 메시지 aria 속성... 매번 반복하시죠?

검수 때 "웹접근성 미준수"로 걸리면 일정 다 밀리고.

그래서 HANUI FormField를 만들었습니다.

```tsx
<FormField id="email" required status="error">
  <FormLabel>이메일</FormLabel>
  <Input type="email" />
  <FormError>이메일 형식 오류</FormError>
</FormField>
```

이렇게 감싸면:

- htmlFor 자동 연결
- aria-invalid 자동
- role="alert" 자동
- 스크린리더 대응 완료

id 만들고, aria-describedby 연결하고... 이런 거 직접 안 해도 됩니다.

👉 https://hanui.io/components/form-field

#React #웹접근성 #공공SI #KRDS #프론트엔드 #오픈소스
