# 🔧 Integration & Advanced - 통합과 고급 기능

고급 통합 시나리오와 특수한 사용 사례를 학습합니다.

---

## 📘 Layout Integration - 레이아웃 통합

### Flexbox와 통합
```typescript
<div style={{
    display: "flex",
    flexDirection: "column",
    height: "100vh",
}}>
    <header style={{ height: 60 }}>헤더</header>

    <div style={{ flex: 1, minHeight: 0 }}>
        <DataEditor
            columns={columns}
            rows={100}
            getCellContent={getCellContent}
            width="100%"
            height="100%"
        />
    </div>

    <footer style={{ height: 40 }}>푸터</footer>
</div>
```

---

## 📘 Right to Left - 오른쪽에서 왼쪽

### RTL 지원
```typescript
<div dir="rtl">
    <DataEditor
        columns={columns}
        rows={100}
        getCellContent={getCellContent}
        rightToLeft={true}
    />
</div>
```

---

## 📘 Shadow DOM - 섀도우 DOM

### 구현
```typescript
class GridComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        const root = ReactDOM.createRoot(this.shadowRoot!);
        root.render(
            <DataEditor
                columns={columns}
                rows={100}
                getCellContent={getCellContent}
                eventTargetRef={this.shadowRoot}
            />
        );
    }
}

customElements.define("data-grid", GridComponent);
```

---

## 📘 Scaled View - 스케일 뷰

### 확대/축소
```typescript
function ScaledGrid() {
    const [scale, setScale] = React.useState(1);

    return (
        <>
            <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
            />
            <div style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>
                <DataEditor
                    columns={columns}
                    rows={100}
                    getCellContent={getCellContent}
                />
            </div>
        </>
    );
}
```

---

## 📘 Custom Event Target - 커스텀 이벤트 대상

### 이벤트 위임
```typescript
<DataEditor
    eventTargetRef={customElement}
    columns={columns}
    rows={100}
    getCellContent={getCellContent}
/>
```

---

## 🎓 학습 포인트

### Integration & Advanced 완료 후 할 수 있는 것
✅ 복잡한 레이아웃 통합
✅ RTL 언어 지원
✅ Shadow DOM 사용
✅ 확대/축소 기능
✅ 커스텀 이벤트 처리

---

## 🎉 전체 학습 완료!

DataEditor의 모든 기능을 마스터했습니다!

### 다음 단계
1. 실제 프로젝트에 적용
2. 커스텀 기능 개발
3. 성능 최적화
4. 커뮤니티 기여

### 추가 리소스
- [GitHub](https://github.com/glideapps/glide-data-grid)
- [API 문서](https://github.com/glideapps/glide-data-grid/blob/main/packages/core/API.md)
- [공식 웹사이트](https://grid.glideapps.com)