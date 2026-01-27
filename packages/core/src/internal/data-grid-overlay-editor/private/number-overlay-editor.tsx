import * as React from "react";
import { NumberOverlayEditorStyle } from "./number-overlay-editor-style.js";
import { NumericFormat } from "react-number-format";
import type { SelectionRange } from "../../data-grid/data-grid-types.js";
import type { NumberFormatValues } from "react-number-format/types/types.js";
import { GhostModeContext } from "../data-grid-overlay-editor.js";

interface Props {
    readonly value: number | undefined;
    readonly disabled?: boolean;
    readonly onChange: (values: NumberFormatValues) => void;
    readonly highlight: boolean;
    readonly validatedSelection?: SelectionRange;
    readonly fixedDecimals?: number;
    readonly allowNegative?: boolean;
    readonly thousandSeparator?: boolean | string;
    readonly decimalSeparator?: string;
}

function getDecimalSeparator() {
    const numberWithDecimalSeparator = 1.1;
    const result = Intl.NumberFormat()
        ?.formatToParts(numberWithDecimalSeparator)
        ?.find(part => part.type === "decimal")?.value;

    return result ?? ".";
}

function getThousandSeprator() {
    return getDecimalSeparator() === "." ? "," : ".";
}

const NumberOverlayEditor: React.FunctionComponent<Props> = p => {
    const {
        value,
        onChange,
        disabled,
        highlight,
        validatedSelection,
        fixedDecimals,
        allowNegative,
        thousandSeparator,
        decimalSeparator,
    } = p;

    const inputRef = React.useRef<HTMLInputElement>();
    const { isGhostMode } = React.useContext(GhostModeContext);

    React.useLayoutEffect(() => {
        if (validatedSelection !== undefined) {
            const range = typeof validatedSelection === "number" ? [validatedSelection, null] : validatedSelection;
            inputRef.current?.setSelectionRange(range[0], range[1]);
        }
    }, [validatedSelection]);

    const ghostStyle: React.CSSProperties | undefined = isGhostMode
        ? { visibility: "hidden" as const }
        : undefined;

    return (
        <NumberOverlayEditorStyle style={ghostStyle}>
            <NumericFormat
                autoFocus={!isGhostMode}
                getInputRef={inputRef}
                className="gdg-input"
                onFocus={(e: React.FocusEvent<HTMLInputElement>) =>
                    e.target.setSelectionRange(highlight ? 0 : e.target.value.length, e.target.value.length)
                }
                disabled={disabled === true}
                decimalScale={fixedDecimals}
                allowNegative={allowNegative}
                thousandSeparator={thousandSeparator ?? getThousandSeprator()}
                decimalSeparator={decimalSeparator ?? getDecimalSeparator()}
                value={Object.is(value, -0) ? "-" : value ?? ""}
                // decimalScale={3}
                // prefix={"$"}
                onValueChange={onChange}
            />
        </NumberOverlayEditorStyle>
    );
};

export default NumberOverlayEditor;
