import * as React from "react";

import { GrowingEntryStyle, ShadowBox, InputBox } from "./growing-entry-style.js";
import { assert } from "../../common/support.js";
import type { SelectionRange } from "../data-grid/data-grid-types.js";
import { GhostModeContext } from "../data-grid-overlay-editor/data-grid-overlay-editor.js";

interface Props
    extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    readonly placeholder?: string;
    readonly highlight: boolean;
    readonly altNewline?: boolean;
    readonly validatedSelection?: SelectionRange;
}

let globalInputID = 0;
function nextInputId() {
    return (globalInputID = (globalInputID + 1) % 10_000_000);
}

/** @category Renderers */
export const GrowingEntry: React.FunctionComponent<Props> = (props: Props) => {
    const { placeholder, value, onKeyDown, highlight, altNewline, validatedSelection, autoFocus: _autoFocus, ...rest } = props;
    const { onChange, className } = rest;

    const inputRef = React.useRef<HTMLTextAreaElement | null>(null);
    const { isGhostMode, ghostValue } = React.useContext(GhostModeContext);

    // In Ghost Mode, display ghostValue instead of the original value
    const useText = isGhostMode && ghostValue ? ghostValue : (value ?? "");

    assert(onChange !== undefined, "GrowingEntry must be a controlled input area");

    // 10 million id's aught to be enough for anybody
    const [inputID] = React.useState(() => "input-box-" + nextInputId());

    const useTextRef = React.useRef(useText);
    const highlightRef = React.useRef(highlight);
    React.useEffect(() => {
        useTextRef.current = useText;
        highlightRef.current = highlight;
    });

    React.useEffect(() => {
        // Skip autofocus when in Ghost Mode (IME input is handled by GhostInput)
        if (isGhostMode) return;

        const ta = inputRef.current;
        if (ta === null) return;

        if (ta.disabled) return;
        const length = useTextRef.current.toString().length;
        ta.focus();
        ta.setSelectionRange(highlightRef.current ? 0 : length, length);
    }, [isGhostMode]);

    React.useLayoutEffect(() => {
        if (validatedSelection !== undefined) {
            const range = typeof validatedSelection === "number" ? [validatedSelection, null] : validatedSelection;
            inputRef.current?.setSelectionRange(range[0], range[1]);
        }
    }, [validatedSelection]);

    const onKeyDownInner = React.useCallback<NonNullable<typeof onKeyDown>>(
        e => {
            if (e.key === "Enter" && e.shiftKey && altNewline === true) {
                return;
            }
            onKeyDown?.(e);
        },
        [altNewline, onKeyDown]
    );

    // In Ghost Mode, hide the InputBox (visibility: hidden) so GhostInput can be visible on top.
    // The ShadowBox still takes up space for layout purposes.
    const inputStyle: React.CSSProperties | undefined = isGhostMode
        ? { visibility: "hidden" as const }
        : undefined;

    return (
        <GrowingEntryStyle className="gdg-growing-entry">
            <ShadowBox className={className}>{useText + "\n"}</ShadowBox>
            <InputBox
                {...rest}
                className={(className ?? "") + " gdg-input"}
                id={inputID}
                ref={inputRef}
                onKeyDown={onKeyDownInner}
                value={useText}
                placeholder={placeholder}
                dir="auto"
                style={inputStyle}
            />
        </GrowingEntryStyle>
    );
};
