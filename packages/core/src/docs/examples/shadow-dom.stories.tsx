import React from "react";

import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    BeautifulWrapper,
    Description,
    PropName,
    useMockDataGenerator,
    defaultProps,
} from "../stories/utils.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";
import { createPortal } from "react-dom";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Shadow DOM"
                    description={
                        <Description>
                            Columns in the data grid may be grouped by setting their <PropName>group</PropName>{" "}
                            property.
                        </Description>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const ShadowDOM: React.FC = () => {
    const { cols, getCellContent } = useMockDataGenerator(20, false, false);

    const renderEditor = React.useCallback(() => {
        return (
            <DataEditor
                {...defaultProps}
                getCellContent={getCellContent}
                columns={cols}
                rows={1000}
                height={"100%"}
                rowMarkers="both"
            />
        );
    }, [cols, getCellContent]);

    return <ShadowDOMWrapper render={renderEditor} />;
};

const cloneExternalStylesheet = (shadowRoot: ShadowRoot, sheet: CSSStyleSheet): void => {
    if (!sheet.href) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = sheet.href;

    if (sheet.ownerNode instanceof HTMLLinkElement && sheet.ownerNode.crossOrigin) {
        link.crossOrigin = sheet.ownerNode.crossOrigin;
    }

    shadowRoot.append(link);
};

const copyStylesToShadowRoot = (shadowRoot: ShadowRoot): void => {
    const styleElement = document.createElement("style");

    for (const sheet of document.styleSheets) {
        try {
            const rules = Array.from(sheet.cssRules, rule => rule.cssText).join("\n");
            if (rules.length > 0) {
                styleElement.append(document.createTextNode(`${rules}\n`));
            }
        } catch (error: unknown) {
            if (error instanceof DOMException && error.name === "SecurityError") {
                cloneExternalStylesheet(shadowRoot, sheet);
                continue;
            }

            // eslint-disable-next-line no-console
            console.warn("Failed to copy stylesheet into shadow root", error);
        }
    }

    if (styleElement.childNodes.length > 0) {
        shadowRoot.append(styleElement);
    }
};

const ShadowDOMWrapper: React.FC<{
    className?: string;
    render: () => React.ReactElement;
}> = ({ className, render }) => {
    const hostRef = React.useRef<HTMLDivElement | null>(null);
    const [portalContainer, setPortalContainer] = React.useState<HTMLDivElement | null>(null);

    React.useEffect(() => {
        if (hostRef.current === null) return;

        const host = hostRef.current;
        const shadowRoot = host.shadowRoot ?? host.attachShadow({ mode: "open" });

        (window as any).glideShadowRoot = shadowRoot;

        shadowRoot.replaceChildren();
        copyStylesToShadowRoot(shadowRoot);

        const reactRootContainer = document.createElement("div");
        reactRootContainer.style.height = "100%";
        shadowRoot.append(reactRootContainer);
        setPortalContainer(reactRootContainer);

        return () => {
            shadowRoot.replaceChildren();
        };
    }, []);

    return (
        <>
            <div ref={hostRef} className={className} style={{ height: "100%" }} />
            {portalContainer === null ? null : createPortal(render(), portalContainer)}
        </>
    );
};
