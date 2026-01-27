import * as React from "react";
import { GhostInputBox } from "./ghost-input-style.js";

export interface GhostInputRef {
    focus: () => void;
    blur: () => void;
    clear: () => void;
    getValue: () => string;
    setValue: (value: string) => void;
    setPosition: (x: number, y: number, width: number, height: number) => void;
    setVisible: (visible: boolean) => void;
}

export interface GhostInputPosition {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface GhostInputProps {
    readonly onInput: (value: string, isComposing: boolean) => void;
    readonly onCompositionStart: () => void;
    readonly onCompositionEnd: (finalValue: string) => void;
    readonly onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    readonly onKeyUp?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    readonly onFocus?: () => void;
    readonly onBlur?: () => void;
    readonly disabled?: boolean;
}

const GhostInputImpl: React.ForwardRefRenderFunction<GhostInputRef, GhostInputProps> = (props, ref) => {
    const {
        onInput,
        onCompositionStart,
        onCompositionEnd,
        onKeyDown,
        onKeyUp,
        onFocus,
        onBlur,
        disabled = false,
    } = props;

    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const isComposingRef = React.useRef(false);
    // Store minimum dimensions (cell size) for auto-resize
    const minDimensionsRef = React.useRef({ width: 0, height: 0 });

    // Auto-resize textarea based on content
    const autoResize = React.useCallback(() => {
        const el = textareaRef.current;
        if (!el || el.style.opacity === "0") return;

        const minWidth = minDimensionsRef.current.width;
        const minHeight = minDimensionsRef.current.height;

        // Temporarily reset size to measure scrollWidth/scrollHeight
        el.style.width = `${minWidth}px`;
        el.style.height = `${minHeight}px`;

        // Calculate new size based on content
        const newWidth = Math.max(minWidth, el.scrollWidth + 2);
        const newHeight = Math.max(minHeight, el.scrollHeight + 2);

        el.style.width = `${newWidth}px`;
        el.style.height = `${newHeight}px`;
    }, []);

    React.useImperativeHandle(ref, () => ({
        focus: () => {
            textareaRef.current?.focus({ preventScroll: true });
        },
        blur: () => {
            textareaRef.current?.blur();
        },
        clear: () => {
            if (textareaRef.current) {
                // Simply clear the value - don't blur as it can cause focus issues
                // IME composition will be properly reset when new composition starts
                textareaRef.current.value = "";
                // Reset selection to start
                textareaRef.current.setSelectionRange(0, 0);
            }
        },
        getValue: () => {
            return textareaRef.current?.value ?? "";
        },
        setValue: (value: string) => {
            if (textareaRef.current) {
                textareaRef.current.value = value;
                // Move cursor to end after setting value
                const len = value.length;
                textareaRef.current.setSelectionRange(len, len);
            }
        },
        // Direct DOM manipulation to avoid React re-render during IME composition
        setPosition: (x: number, y: number, width: number, height: number) => {
            const el = textareaRef.current;
            if (el) {
                // Store minimum dimensions for auto-resize
                minDimensionsRef.current = { width, height };
                el.style.left = `${x}px`;
                el.style.top = `${y}px`;
                el.style.width = `${width}px`;
                el.style.height = `${height}px`;
            }
        },
        setVisible: (visible: boolean) => {
            const el = textareaRef.current;
            if (el) {
                if (visible) {
                    el.style.opacity = "1";
                    el.style.pointerEvents = "auto";
                    el.style.zIndex = "10000";
                } else {
                    el.style.left = "-9999px";
                    el.style.top = "0";
                    el.style.width = "1px";
                    el.style.height = "1px";
                    el.style.opacity = "0";
                    el.style.pointerEvents = "none";
                    el.style.zIndex = "0";
                }
            }
        },
    }));

    const handleInput = React.useCallback(
        (e: React.FormEvent<HTMLTextAreaElement>) => {
            const target = e.currentTarget;
            onInput(target.value, isComposingRef.current);
            // Auto-resize after input
            autoResize();
        },
        [onInput, autoResize]
    );

    const handleCompositionStart = React.useCallback(() => {
        isComposingRef.current = true;
        onCompositionStart();
    }, [onCompositionStart]);

    const handleCompositionEnd = React.useCallback(
        (e: React.CompositionEvent<HTMLTextAreaElement>) => {
            isComposingRef.current = false;
            onCompositionEnd(e.currentTarget.value);
        },
        [onCompositionEnd]
    );

    const handleKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            onKeyDown(e);
        },
        [onKeyDown]
    );

    const handleKeyUp = React.useCallback(
        (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            onKeyUp?.(e);
        },
        [onKeyUp]
    );

    // All styles are defined in GhostInputBox (CSS-in-JS) to avoid React re-render
    // overwriting direct DOM manipulations for position/visibility changes.
    // Position changes during IME composition use ref methods (setPosition, setVisible)
    // which directly manipulate DOM style without triggering React re-renders.

    return (
        <GhostInputBox
            ref={textareaRef}
            defaultValue=""
            tabIndex={disabled ? -1 : 0}
            disabled={disabled}
            onInput={handleInput}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onFocus={onFocus}
            onBlur={onBlur}
            aria-label="Grid input"
            wrap="off"
            rows={1}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
        />
    );
};

// Wrap with React.memo to prevent re-render during IME composition
// Re-render can break IME composition state
export const GhostInput = React.memo(React.forwardRef(GhostInputImpl));
