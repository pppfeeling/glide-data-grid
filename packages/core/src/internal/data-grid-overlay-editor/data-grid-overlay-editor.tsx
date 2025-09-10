import * as React from "react";
import { createPortal } from "react-dom";

import ClickOutsideContainer from "../click-outside-container/click-outside-container.js";
import { makeCSSStyle, type Theme, ThemeContext } from "../../common/styles.js";
import type { GetCellRendererCallback } from "../../cells/cell-types.js";
import {
    type EditableGridCell,
    type GridCell,
    GridCellKind,
    isEditableGridCell,
    isInnerOnlyCell,
    isObjectEditorCallbackResult,
    type Item,
    type ProvideEditorCallback,
    type ProvideEditorCallbackResult,
    type Rectangle,
    type ValidatedGridCell,
} from "../data-grid/data-grid-types.js";

import type { CellActivatedEventArgs } from "../data-grid/event-args.js";
import { DataGridOverlayEditorStyle } from "./data-grid-overlay-editor-style.js";
import type { OverlayImageEditorProps } from "./private/image-overlay-editor.js";
import { useStayOnScreen } from "./use-stay-on-screen.js";

type ImageEditorType = React.ComponentType<OverlayImageEditorProps>;

interface DataGridOverlayEditorProps {
    readonly target: Rectangle;
    readonly cell: Item;
    readonly content: GridCell;
    readonly className?: string;
    readonly id: string;
    readonly initialValue?: string;
    readonly bloom?: readonly [number, number];
    readonly theme: Theme;
    readonly onFinishEditing: (newCell: GridCell | undefined, movement: readonly [-1 | 0 | 1, -1 | 0 | 1]) => void;
    readonly forceEditMode: boolean;
    readonly highlight: boolean;
    readonly portalElementRef?: React.RefObject<HTMLElement>;
    readonly imageEditorOverride?: ImageEditorType;
    readonly getCellRenderer: GetCellRendererCallback;
    readonly markdownDivCreateNode?: (content: string) => DocumentFragment;
    readonly provideEditor?: ProvideEditorCallback<GridCell>;
    readonly activation: CellActivatedEventArgs;
    readonly validateCell?: (
        cell: Item,
        newValue: EditableGridCell,
        prevValue: GridCell
    ) => boolean | ValidatedGridCell;
    readonly isOutsideClick?: (e: MouseEvent | TouchEvent) => boolean;
    readonly customEventTarget?: HTMLElement | Window | Document;
}

const DataGridOverlayEditor: React.FunctionComponent<DataGridOverlayEditorProps> = p => {
    const {
        target,
        content,
        onFinishEditing: onFinishEditingIn,
        forceEditMode,
        initialValue,
        imageEditorOverride,
        markdownDivCreateNode,
        highlight,
        className,
        theme,
        id,
        cell,
        bloom,
        portalElementRef,
        validateCell,
        getCellRenderer,
        provideEditor,
        isOutsideClick,
        customEventTarget,
        activation,
    } = p;

    const [tempValue, setTempValueRaw] = React.useState<GridCell | undefined>(forceEditMode ? content : undefined);
    const lastValueRef = React.useRef(tempValue ?? content);
    lastValueRef.current = tempValue ?? content;

    const [isValid, setIsValid] = React.useState(() => {
        if (validateCell === undefined) return true;
        return !(isEditableGridCell(content) && validateCell?.(cell, content, lastValueRef.current) === false);
    });

    const onFinishEditing = React.useCallback<typeof onFinishEditingIn>(
        (newCell, movement) => {
            onFinishEditingIn(isValid ? newCell : undefined, movement);
        },
        [isValid, onFinishEditingIn]
    );

    const setTempValue = React.useCallback(
        (newVal: GridCell | undefined) => {
            // Update latest input value for Korean input tracking
            if (newVal?.kind === GridCellKind.Text) {
                latestInputValue.current = newVal.data;
            }
            
            if (validateCell !== undefined && newVal !== undefined && isEditableGridCell(newVal)) {
                const validResult = validateCell(cell, newVal, lastValueRef.current);
                if (validResult === false) {
                    setIsValid(false);
                } else if (typeof validResult === "object") {
                    newVal = validResult;
                    setIsValid(true);
                } else {
                    setIsValid(true);
                }
            }
            setTempValueRaw(newVal);
        },
        [cell, validateCell]
    );

    const finished = React.useRef(false);
    const customMotion = React.useRef<[-1 | 0 | 1, -1 | 0 | 1] | undefined>(undefined);
    const isComposing = React.useRef(false);
    const latestInputValue = React.useRef<string>("");

    const onClickOutside = React.useCallback(() => {
        onFinishEditing(tempValue, [0, 0]);
        finished.current = true;
    }, [tempValue, onFinishEditing]);

    const onEditorFinished = React.useCallback(
        (newValue: GridCell | undefined, movement?: readonly [-1 | 0 | 1, -1 | 0 | 1]) => {
            onFinishEditing(newValue, movement ?? customMotion.current ?? [0, 0]);
            finished.current = true;
        },
        [onFinishEditing]
    );

    const onKeyDown = React.useCallback(
        async (event: React.KeyboardEvent) => {
            let save = false;
            
            // Handle Korean/Chinese input composition - don't interfere with IME
            if (event.nativeEvent.isComposing || isComposing.current) {
                return; // Let IME handle the input completely
            }
            
            if (event.key === "Escape") {
                event.stopPropagation();
                event.preventDefault();
                customMotion.current = [0, 0];
            } else if (
                event.key === "Enter" &&
                // The shift key is reserved for multi-line editing
                // to allow inserting new lines without closing the editor.
                !event.shiftKey
            ) {
                event.stopPropagation();
                event.preventDefault();
                customMotion.current = [0, 1];
                save = true;
            } else if (event.key === "Tab") {
                event.stopPropagation();
                event.preventDefault();
                customMotion.current = [event.shiftKey ? -1 : 1, 0];
                save = true;
            }

            if (customMotion.current !== undefined) {
                window.setTimeout(() => {
                    if (!finished.current) {
                        onFinishEditing(save ? tempValue : undefined, customMotion.current ?? [0, 0]);
                        finished.current = true;
                    }
                }, 0);
            }
        },
        [onFinishEditing, tempValue]
    );

    const onCompositionStart = React.useCallback(() => {
        isComposing.current = true;
    }, []);

    const onCompositionEnd = React.useCallback((event: React.CompositionEvent) => {
        isComposing.current = false;
        // Capture the final composed value for Korean input and update tempValue immediately
        if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
            latestInputValue.current = event.target.value;
            
            // Update tempValue with the composed text for Korean/Chinese input
            const currentContent = tempValue ?? content;
            if (currentContent.kind === GridCellKind.Text) {
                const updatedValue = {
                    ...currentContent,
                    data: event.target.value,
                };
                setTempValue(updatedValue);
            }
        }
        
        // Small delay to ensure composition is fully finished before allowing other key events
        setTimeout(() => {
            isComposing.current = false;
        }, 10);
    }, [tempValue, content, setTempValue]);

    const targetValue = tempValue ?? content;

    const [editorProvider, useLabel] = React.useMemo((): [ProvideEditorCallbackResult<GridCell>, boolean] | [] => {
        if (isInnerOnlyCell(content)) return [];
        const cellWithLocation = { ...content, location: cell, activation } as GridCell & {
            location: Item;
            activation: CellActivatedEventArgs;
        };
        const external = provideEditor?.(cellWithLocation);
        if (external !== undefined) return [external, false];
        return [getCellRenderer(content)?.provideEditor?.(cellWithLocation), false];
    }, [cell, content, getCellRenderer, provideEditor, activation]);

    const { ref, style: stayOnScreenStyle } = useStayOnScreen();

    let pad = true;
    let editor: React.ReactNode;
    let style = true;
    let styleOverride: React.CSSProperties | undefined;

    if (editorProvider !== undefined) {
        pad = editorProvider.disablePadding !== true;
        style = editorProvider.disableStyling !== true;
        const isObjectEditor = isObjectEditorCallbackResult(editorProvider);
        if (isObjectEditor) {
            styleOverride = editorProvider.styleOverride;
        }
        const CustomEditor = isObjectEditor ? editorProvider.editor : editorProvider;
        editor = (
            <CustomEditor
                portalElementRef={portalElementRef}
                isHighlighted={highlight}
                activation={activation}
                onChange={setTempValue}
                value={targetValue}
                initialValue={initialValue}
                onFinishedEditing={onEditorFinished}
                validatedSelection={isEditableGridCell(targetValue) ? targetValue.selectionRange : undefined}
                forceEditMode={forceEditMode}
                target={target}
                imageEditorOverride={imageEditorOverride}
                markdownDivCreateNode={markdownDivCreateNode}
                isValid={isValid}
                theme={theme}
            />
        );
    }

    styleOverride = { ...styleOverride, ...stayOnScreenStyle };

    // Consider imperatively creating and adding the element to the dom?
    const portalElement = portalElementRef?.current ?? document.getElementById("portal");
    if (portalElement === null) {
        // eslint-disable-next-line no-console
        console.error(
            'Cannot open Data Grid overlay editor, because portal not found. Please, either provide a portalElementRef or add `<div id="portal" />` as the last child of your `<body>`.'
        );
        return null;
    }

    let classWrap = style ? "gdg-style" : "gdg-unstyle";
    if (!isValid) {
        classWrap += " gdg-invalid";
    }

    if (pad) {
        classWrap += " gdg-pad";
    }

    const bloomX = bloom?.[0] ?? 1;
    const bloomY = bloom?.[1] ?? 1;

    return createPortal(
        <ThemeContext.Provider value={theme}>
            <ClickOutsideContainer
                style={makeCSSStyle(theme)}
                className={className}
                onClickOutside={onClickOutside}
                isOutsideClick={isOutsideClick}
                customEventTarget={customEventTarget}>
                <DataGridOverlayEditorStyle
                    ref={ref}
                    id={id}
                    className={classWrap}
                    style={styleOverride}
                    as={useLabel === true ? "label" : undefined}
                    targetX={target.x - bloomX}
                    targetY={target.y - bloomY}
                    targetWidth={target.width + bloomX * 2}
                    targetHeight={target.height + bloomY * 2}>
                    <div 
                        className="gdg-clip-region" 
                        onKeyDown={onKeyDown}
                        onCompositionStart={onCompositionStart}
                        onCompositionEnd={onCompositionEnd}
                    >
                        {editor}
                    </div>
                </DataGridOverlayEditorStyle>
            </ClickOutsideContainer>
        </ThemeContext.Provider>,
        portalElement
    );
};

export default DataGridOverlayEditor;
