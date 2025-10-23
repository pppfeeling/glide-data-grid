import { fn } from 'storybook/test';
import React from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    BeautifulWrapper,
    Description,
    MoreInfo,
    useMockDataGenerator,
    defaultProps,
} from "../../data-editor/stories/utils.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";
import type { GridColumn } from '../../internal/data-grid/data-grid-types.js';

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Add and remove columns"
                    description={
                        <>
                            <Description>You can add and remove columns at your disposal</Description>
                            <MoreInfo>Use the story&apos;s controls to change the number of columns
                              컬럼추가삭제, 컬럼고정, 컬럼리사이즈, 컬러정의
                            </MoreInfo>
                            
                        </>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

interface AddColumnsProps {
    columnsCount: number;
    onCellClicked: (cell: any) => void;
    onCellActivated: (cell: any) => void;
}

export const AddColumns: React.FC<AddColumnsProps> = p => {
    let { cols, getCellContent, onColumnResize } = useMockDataGenerator(p.columnsCount);

    cols = cols.map((c, index):GridColumn => {
      if(index == 0) {
        return {...c, grow: 1, style:"highlight"}
      } else if(index == 1) {
        return {...c, width: 400}
      }
        return { ...c }
    });

    return (
        <DataEditor
            {...defaultProps}
            rowMarkers="number"
            getCellContent={getCellContent}
            rows={200}
            
            freezeColumns={1}
            columns={cols}
            onColumnResize={onColumnResize}
            onCellClicked={p.onCellClicked}
            onCellActivated={p.onCellActivated}
            freezeTrailingRows={1}
        />
    );
};
AddColumns.storyName = "01. Column";
(AddColumns as any).args = {
    columnsCount: 10,
    onCellClicked: fn(),
    onCellActivated: fn(),
};
(AddColumns as any).argTypes = {
    columnsCount: {
        control: {
            type: "range",
            min: 2,
            max: 200,
        },
    },
};

/**
 * <baseGridColumn object 정의>
 * 
  * `title`: string - 컬럼 헤더에 표시될 텍스트입니다.
   * `group`: string (선택 사항) - 컬럼이 속한 그룹의 이름입니다. 컬럼 그룹화에 사용됩니다.
   * `icon`: GridColumnIcon | string (선택 사항) - 컬럼 헤더에 표시될 아이콘입니다. GridColumnIcon enum 또는 사용자 정의 아이콘 문자열을 사용할 수 있습니다.
   * `overlayIcon`: GridColumnIcon | string (선택 사항) - 컬럼 위에 오버레이될 아이콘입니다.
   * `menuIcon`: GridColumnMenuIcon | string (선택 사항) - 컬럼 헤더 메뉴 버튼에 표시될 아이콘입니다. GridColumnMenuIcon enum 또는 사용자 정의 아이콘 문자열을 사용할 수 있습니다.
   * `indicatorIcon`: GridColumnIcon | string (선택 사항) - 컬럼 헤더에 표시될 작은 지시자 아이콘입니다.
   * `hasMenu`: boolean (선택 사항) - 컬럼 헤더에 메뉴 버튼이 있는지 여부를 나타냅니다.
   * `grow`: number (선택 사항) - 컬럼이 그리드의 남은 공간을 채우기 위해 얼마나 확장될지 비율을 정의합니다. CSS flex-grow와 유사합니다.
   * `style`: "normal" | "highlight" (선택 사항) - 컬럼의 시각적 스타일을 정의합니다.
   * `themeOverride`: Partial<Theme> (선택 사항) - 해당 컬럼에만 적용될 테마 속성을 재정의합니다.
   * `trailingRowOptions`: object (선택 사항) - 그리드의 마지막 행(새 행 추가 등)에 대한 옵션을 정의합니다.
       * hint: string (선택 사항) - 힌트 텍스트입니다.
       * addIcon: string (선택 사항) - 추가 아이콘입니다.
       * targetColumn: number | GridColumn (선택 사항) - 새 행이 추가될 편집 가능한 열에 포커스가 가도록 할 수 있습니다.
       * themeOverride: Partial<Theme> (선택 사항) - 테마 재정의입니다.
       * disabled: boolean (선택 사항) - 비활성화 여부입니다.
   * `rowGroupBorder`: boolean (선택 사항) - 행 그룹 경계선을 표시할지 여부입니다.  신규
   * `required`: boolean (선택 사항) - 컬럼이 필수 입력 필드인지 여부를 나타냅니다.  신규
 */