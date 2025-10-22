import { styled } from "@linaria/react";
import React from "react";
import { useLayer } from "react-laag";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    BeautifulWrapper,
    Description,
    PropName,
    defaultProps,
    useAllMockedKinds,
} from "../../data-editor/stories/utils.js";
import type { GridColumn, Rectangle } from "../../internal/data-grid/data-grid-types.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Header menus"
                    description={
                        <>
                            <Description>
                                Headers on the data grid can be configured to support menus. We provide the events and
                                the menu icon, you provide the menu. The menu icon can be modified via the{" "}
                                <PropName>menuIcon</PropName> prop.
                            </Description>
                        </>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

const SimpleMenu = styled.div`
    width: 175px;
    padding: 8px 0;
    border-radius: 6px;
    box-shadow:
        0px 0px 1px rgba(62, 65, 86, 0.7),
        0px 6px 12px rgba(62, 65, 86, 0.35);

    display: flex;
    flex-direction: column;

    background-color: white;
    font-size: 13px;
    font-weight: 600;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
        "Helvetica Neue", sans-serif;

    .danger {
        color: rgba(255, 40, 40, 0.8);
        :hover {
            color: rgba(255, 40, 40, 1);
        }
    }

    > div {
        padding: 6px 8px;
        color: rgba(0, 0, 0, 0.7);
        :hover {
            background-color: rgba(0, 0, 0, 0.05);
            color: rgba(0, 0, 0, 0.9);
        }
        transition: background-color 100ms;
        cursor: pointer;
    }
`;

export const HeaderMenus: React.VFC = () => {
    const { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();

    const realCols = React.useMemo(() => {
        return cols.map((c, index) => {
            if (index === 2) {
                return {
                    ...c,
                    hasMenu: true,
                    menuIcon: "dots",
                    overlayIcon: "rowOwnerOverlay",
                };
            } else if (index === 3) {
                return {
                    ...c,
                    hasMenu: true,
                    menuIcon: "headerUri",
                };
            } else if (index === 4) {
                return {
                    ...c,
                    title: "CUSTOM",
                    icon: "custom",
                    themeOverride: {
                       bgHeader: "#212121",      // 헤더 배경색을 짙은 회색으로
                       textHeader: "#ffffff",    // 헤더 텍스트 색상을 흰색으로
                       fgIconHeader: "#00ff00",
                       bgIconHeader: "#ffff00",
                    },
                };
            }

            return {
                ...c,
                hasMenu: false,
                required: true,
                themeOverride: {
                       bgHeader: "#ff0000",      // 헤더 배경색을 짙은 회색으로
                       textHeader: "#ffffff",    // 헤더 텍스트 색상을 흰색으로
                    },
            };
        });
    }, [cols]);

    const [menu, setMenu] = React.useState<{
        col: number;
        bounds: Rectangle;
    }>();

    const isOpen = menu !== undefined;

    const { layerProps, renderLayer } = useLayer({
        isOpen,
        auto: true,
        placement: "bottom-end",
        triggerOffset: 2,
        onOutsideClick: () => setMenu(undefined),
        trigger: {
            getBounds: () => ({
                left: menu?.bounds.x ?? 0,
                top: menu?.bounds.y ?? 0,
                width: menu?.bounds.width ?? 0,
                height: menu?.bounds.height ?? 0,
                right: (menu?.bounds.x ?? 0) + (menu?.bounds.width ?? 0),
                bottom: (menu?.bounds.y ?? 0) + (menu?.bounds.height ?? 0),
            }),
        },
    });

    const drawHeader: DrawHeaderCallback = React.useCallback((args, draw) => {
      // 먼저 기본 헤더를 그립니다.
      draw();

      

      // required 속성이 없으면 아무것도 하지 않습니다.
      const col = realCols[args.column.sourceIndex];
    
      if (col.required !== true) {
        return;
      }

      // 빨간색 삼각형을 그립니다.
      const { ctx, rect } = args;
      const size = 7; // 삼각형 크기

      ctx.beginPath();
      // 헤더의 오른쪽 상단 코너로 이동
      ctx.moveTo(rect.x + rect.width - size, rect.y);
      // 오른쪽 상단 코너에 삼각형 그리기
      ctx.lineTo(rect.x + rect.width, rect.y);
      ctx.lineTo(rect.x + rect.width, rect.y + size);
      ctx.closePath();

      // 삼각형을 빨간색으로 채웁니다.
      ctx.fillStyle = "red";
      ctx.fill();
            
    }, []);

    const headerIcons = React.useMemo<SpriteMap>(() => {
            return {
                custom: p => `<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2.00015" y="2" width="16" height="16" rx="4" fill="${p.bgColor}"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.69759 6.00977C4.23735 6.00977 3.86426 6.38286 3.86426 6.8431C3.86426 7.30334 4.23735 7.67643 4.69759 7.67643H8.86426C9.3245 7.67643 9.69759 7.30334 9.69759 6.8431C9.69759 6.38286 9.32449 6.00977 8.86426 6.00977H4.69759Z" fill="${p.fgColor}"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.61426 4.76009C7.61426 4.29985 7.24116 3.92676 6.78092 3.92676C6.32069 3.92676 5.94759 4.29985 5.94759 4.76009L5.94759 8.92676C5.94759 9.387 6.32069 9.76009 6.78092 9.76009C7.24116 9.76009 7.61426 9.38699 7.61426 8.92676L7.61426 4.76009Z" fill="${p.fgColor}"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0336 6.00977C10.5734 6.00977 10.2003 6.38286 10.2003 6.8431C10.2003 7.30334 10.5734 7.67643 11.0336 7.67643H15.2003C15.6605 7.67643 16.0336 7.30334 16.0336 6.8431C16.0336 6.38286 15.6605 6.00977 15.2003 6.00977H11.0336Z" fill="${p.fgColor}"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.89704 10.9916C5.5716 10.6662 5.04397 10.6662 4.71853 10.9916C4.39309 11.317 4.39309 11.8447 4.71853 12.1701L7.66481 15.1164C7.99024 15.4418 8.51788 15.4418 8.84332 15.1164C9.16876 14.791 9.16876 14.2633 8.84332 13.9379L5.89704 10.9916Z" fill="${p.fgColor}"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.84332 12.1703C9.16875 11.8449 9.16875 11.3172 8.84332 10.9918C8.51788 10.6664 7.99024 10.6664 7.6648 10.9918L4.71853 13.9381C4.39309 14.2635 4.39309 14.7912 4.71853 15.1166C5.04396 15.442 5.5716 15.442 5.89704 15.1166L8.84332 12.1703Z" fill="${p.fgColor}"/>
                    <path d="M10.2003 11.804C10.2003 11.3438 10.5734 10.9707 11.0336 10.9707H15.2003C15.6605 10.9707 16.0336 11.3438 16.0336 11.804C16.0336 12.2643 15.6605 12.6374 15.2003 12.6374H11.0336C10.5734 12.6374 10.2003 12.2643 10.2003 11.804Z" fill="${p.fgColor}"/>
                    <path d="M10.2003 14.304C10.2003 13.8438 10.5734 13.4707 11.0336 13.4707H15.2003C15.6605 13.4707 16.0336 13.8438 16.0336 14.304C16.0336 14.7643 15.6605 15.1374 15.2003 15.1374H11.0336C10.5734 15.1374 10.2003 14.7643 10.2003 14.304Z" fill="${p.fgColor}"/>
                </svg>`,
            };
        }, []);

    const onHeaderMenuClick = React.useCallback((col: number, bounds: Rectangle) => {
        setMenu({ col, bounds });
    }, []);

    const onHeaderClicked = React.useCallback(() => {
        // eslint-disable-next-line no-console
        console.log("Header clicked");
    }, []);

    return (
        <>
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                onHeaderMenuClick={onHeaderMenuClick}
                onHeaderClicked={onHeaderClicked}
                columns={realCols}
                onCellContextMenu={(_, e) => e.preventDefault()}
                onCellEdited={setCellValue}
                onColumnResize={onColumnResize}
                rows={1000}
                drawHeader={drawHeader}
                headerIcons={headerIcons}
            />
            {isOpen &&
                renderLayer(
                    <SimpleMenu {...layerProps}>
                        <div onClick={() => setMenu(undefined)}>These do nothing</div>
                        <div onClick={() => setMenu(undefined)}>Add column right</div>
                        <div onClick={() => setMenu(undefined)}>Add column left</div>
                        <div className="danger" onClick={() => setMenu(undefined)}>
                            Delete
                        </div>
                    </SimpleMenu>
                )}
        </>
    );
};
