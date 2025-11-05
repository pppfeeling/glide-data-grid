# TODO List

## 할일 (To-do)
- [ ] column masked input
- [ ] column date
- [ ] column select
- [ ] column relational select (대중소) itemList -> column select에서 구현
- [ ] column image (버튼) -> itemClick에서 popup나온후 선택된 데이터 row에 삽입
- [ ] column fileupload -> 팝업에서 file upload 후 group_cd값을 value로 추가하도록 함
- [ ] column dataState : row에 대한 add,delete,update 상태표시 data에 추가
- [ ] column rowid : row에 대한 unique value..정렬 필터링시 index는 변해도 rowid는 변하지 않음. data에추가

## 완료된 일 (Done)

- [x] 편집시 tab 입력시 다음 컬럼으로 이동하고 편집모드로
- [x] 컬럼 순서 옮기기. d&d 이용. 움질일때 헤더가 50% 투명해지고 왼쪽으로 이동시 움직일 왼쪽 컬럼 라인에 진한색 표시, 오른쪽으로 이동시 움질일 오른쪽 컬럼 라인에 진하게 표시
- [x] tail 쪽에 합계, 총 카운트 표시
- [x] enter, tab 편집 -> 이동 -> 편집 또는 편집 -> 이동 -> 네비 이렇게 될수 있게 prop추가
- [x] 문자 편집모드 금지 어디서 막았는지 확인
- [x] 제일 마지막 row에서 엔터시 편집모드에서 네비모드로 전환
- [x] data copy & paste 기능
- [x] marker선택 확인..선택된 row가 어떤것인지...확인하는 방법
- [x] marker가 radio로 하는 방법 확인
- [x] fill handler 조정해서 data 채우기
- [x] row add, delete
- [x] excel csv 다운로드, 업로드
- [x] grouping시 border없애고 데이터도 한개만 나오게 하기
- [x] selectionAbleFunction (row_data):boolean
    - marker column이 선택가능한지 여부 return
- [x] itemClick (row_data, click_column)
    - 그리드 리스트 -> 상세보기로 이동
    - 팝업생성 -> 선택한 팝업 row의 column에 넣기
- [x] onItemEditEnd (row_data, item(rowindex,columnidex), new_value)
    - 입력된 값으로 다른셀의 값을 채우기 위해 사용
    - 입력된 값으로 팝업에서 값 찾기 ()
- [x] column number
- [x] column check

