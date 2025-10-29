type SortOrder = "asc" | "desc";
type NullsPosition = "first" | "last";

// [개선 1, 2] 타입 안정성 및 유연성 강화
export interface SortOption<T> {
  key: keyof T;
  order: SortOrder;
  nullsPosition?: NullsPosition; // 컬럼별 null 위치 지정
}

export interface SortConfig<T> {
  sortOptions: SortOption<T>[];
  defaultNullsPosition?: NullsPosition; // 전역 기본값
}

// [개선 3] 더 엄격한 날짜 문자열 검사
const isValidDateString = (value: any): value is string => {
  if (typeof value !== "string" || value.length < 10) return false;
  // '2023-01-01' 같은 순수 숫자 문자열을 날짜로 오인하는 것을 방지
  if (!isNaN(Number(value))) return false;
  const parsed = Date.parse(value);
  return !isNaN(parsed);
};

const compareValues = (
  a: any,
  b: any,
  order: SortOrder,
  nullsPosition: NullsPosition
): number => {
  const aIsNull = a === null || a === undefined;
  const bIsNull = b === null || b === undefined;

  if (aIsNull || bIsNull) {
    if (aIsNull && bIsNull) return 0;
    if (nullsPosition === "first") return aIsNull ? -1 : 1;
    return aIsNull ? 1 : -1;
  }

  // 숫자 타입
  if (typeof a === "number" && typeof b === "number") {
    return order === "asc" ? a - b : b - a;
  }
  
  // Date 객체 타입
  if (a instanceof Date && b instanceof Date) {
    return order === "asc" ? a.getTime() - b.getTime() : b.getTime() - a.getTime();
  }

  // 문자열 타입 (날짜 가능성 포함)
  if (typeof a === "string" && typeof b === "string") {
    const aIsDate = isValidDateString(a);
    const bIsDate = isValidDateString(b);

    if (aIsDate && bIsDate) {
      const dateA = new Date(a).getTime();
      const dateB = new Date(b).getTime();
      return order === "asc" ? dateA - dateB : dateB - dateA;
    }
    // 하나만 날짜 문자열인 경우에 대한 정렬 규칙을 정할 수도 있습니다.
    // 예: 날짜 문자열이 일반 문자열보다 항상 앞에 오도록
    
    return order === "asc"
      ? a.localeCompare(b, "ko-KR")
      : b.localeCompare(a, "ko-KR");
  }

  // 그 외 혼합 타입 (boolean 등)은 문자열로 변환하여 비교
  const strA = String(a);
  const strB = String(b);
  return order === "asc"
    ? strA.localeCompare(strB, "ko-KR")
    : strB.localeCompare(strA, "ko-KR");
};

export const multiColumnSort = <T extends Record<string, any>>(
  data: T[],
  config: SortConfig<T>
): T[] => {
  const { sortOptions, defaultNullsPosition = "last" } = config;

  if (!sortOptions || sortOptions.length === 0) {
    return data; // 정렬 옵션이 없으면 원본 데이터 반환
  }

  return [...data].sort((rowA, rowB) => {
    for (const option of sortOptions) {
      const { key, order } = option;
      // [개선 2] 컬럼별 nullsPosition 적용, 없으면 전역 기본값 사용
      const nullsPosition = option.nullsPosition || defaultNullsPosition;
      
      const result = compareValues(rowA[key], rowB[key], order, nullsPosition);
      if (result !== 0) {
        return result;
      }
    }
    return 0;
  });
};