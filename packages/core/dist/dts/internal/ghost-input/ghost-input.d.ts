import * as React from "react";
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
export declare const GhostInput: React.MemoExoticComponent<React.ForwardRefExoticComponent<GhostInputProps & React.RefAttributes<GhostInputRef>>>;
//# sourceMappingURL=ghost-input.d.ts.map