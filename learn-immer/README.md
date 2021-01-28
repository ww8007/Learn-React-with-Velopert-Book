yarn add immer

### immer를 사용하지 않고 불변성 유지

```jsx
import produce from "immer";
```

첫 번째 파라미터 : 수정하고 싶은 상태
두 번째 파라미터 : 상태를 어떻게 업데이트

### useState 함수형 업데이트와 같이 사용하기

useCallback의 deps에 데이터를 집어 넣지 않아도 되는 장점이 있으며<br/>
produce의 경우 첫 번째 파라미터가 함수형태 이면 업데이트 함수를 반환한다.

```jsx
const [number, setNumber] = useSate(0);

const onIncrease = useCallback(() => {
   setNumber((prevNumber) => prevNumber + 1);
}, []);
```

```jsx
const onChange = useCallback(
   (e) => {
      const { name, value } = e.target;
      setForm(
         produce(form, (draft) => {
            draft[name] = value;
         })
      );
   },
   [form]
);

const onChange = useCallback((e) => {
   const { name, value } = e.target;
   setForm(
      produce((draft) => {
         draft[name] = value;
      })
   );
}, []);
```
