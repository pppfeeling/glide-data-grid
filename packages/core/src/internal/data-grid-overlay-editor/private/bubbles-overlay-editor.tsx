import * as React from "react";
import { BubblesOverlayEditorStyle } from "./bubbles-overlay-editor-style.js";
import { GhostModeContext } from "../data-grid-overlay-editor.js";

interface Props {
    readonly bubbles: readonly string[];
}

const BubblesOverlayEditor: React.FunctionComponent<Props> = p => {
    const { bubbles } = p;
    const { isGhostMode } = React.useContext(GhostModeContext);
    return (
        <BubblesOverlayEditorStyle>
            {bubbles.map((b, i) => (
                <div key={i} className="boe-bubble">
                    {b}
                </div>
            ))}
            <textarea className="gdg-input" autoFocus={!isGhostMode} />
        </BubblesOverlayEditorStyle>
    );
};
export default BubblesOverlayEditor;
