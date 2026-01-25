
## 인덱스 시그니처 [key: string]: any;
이 객체는 여러 개의 프로퍼티를 가질 수 있으며, 그 프로퍼티의 키는 문자열(string)이고 값은 어떤 타입이든 상관없다.

```ts
export interface GroupSummaryRow {
    readonly isGroupSummary: true;
    readonly groupName: string;
    readonly count: number;
    readonly level: number;
    [key: string]: any;
}
```

### extends Record<string, any> 했는데 {}, object는 안되나요?
- {}는 null과 undefined를 제외한 모든 타입을 허용합니다. 심지어 string이나 number 같은 원시 타입(primitive type)도 허용됩니다

- object는 원시 타입(string, number, boolean 등)을 제외한, 말 그대로 순수한 객체 타입만을 의미

```ts
let c: object = () => {}; // 함수도 객체이므로 가능`
let b: object = { name: "world" };
```

- Record<string, any>는 "키는 `string` 타입이고, 값은 `any` 타입인 프로퍼티를 가진 객체" 라는 의미의 유틸리티 타입


###  keyof T & string
 1. **유니온 타입(Union Type)에 적용될 때: 교집합 (Intersection)**
    `keyof T & string` 예시에서 &는 `"name" | 404 | symbol` 같은 값들의 집합(유니온 타입)에 적용되었습니다. 이 경우 &는 두 집합에 공통으로 존재하는 멤버를 찾습니다. 수학의 '교집합'과 같습니다.

 2. **객체 타입(Object Type)에 적용될 때: 타입 결합 (Combination)**
    `{a: string} & {c: string}` 예시에서 `&`는 객체의 구조에 적용됩니다. 이 경우 `&`는 "왼쪽 객체의 구조를 모두 만족시키면서 동시에 오른쪽 객체의 구조도 모두 만족시키는" 새로운 타입을 만듭니다.
    결과적으로 두 객체의 모든 프로퍼티를 합친 것과 같은 효과가 나타납니다. 타입을 확장(extend)하거나 믹스인(mixin)할 때 주로 사용됩니다.

###   new Map<any, T[]>(), Record<any, T[]>, {}
  #### Map
   - Map을 사용한 가장 결정적인 이유는, 객체(Object)와 달리 `Map`은 모든 타입의 값을 키(key)로 사용할 수 있기 때문
   - Map는 string, number, boolean, Date, null 모두 key로 가능

  #### Record, {}
    - key로  string, number, symbol만 가능