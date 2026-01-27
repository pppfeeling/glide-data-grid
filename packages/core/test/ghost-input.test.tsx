import * as React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { vi, expect, describe, test, beforeEach, afterEach } from "vitest";
import { GhostInput, type GhostInputRef } from "../src/internal/ghost-input/index.js";

describe("GhostInput", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    test("renders textarea element", () => {
        const onInput = vi.fn();
        const onCompositionStart = vi.fn();
        const onCompositionEnd = vi.fn();
        const onKeyDown = vi.fn();

        const { container } = render(
            <GhostInput
                onInput={onInput}
                onCompositionStart={onCompositionStart}
                onCompositionEnd={onCompositionEnd}
                onKeyDown={onKeyDown}
            />
        );

        const textarea = container.querySelector("textarea");
        expect(textarea).toBeTruthy();
        // Initial position is set via CSS (not inline style)
        // The textarea should exist and be ready for input
    });

    test("setPosition and setVisible ref methods update inline styles", () => {
        const onInput = vi.fn();
        const onCompositionStart = vi.fn();
        const onCompositionEnd = vi.fn();
        const onKeyDown = vi.fn();
        const ref = React.createRef<GhostInputRef>();

        const { container } = render(
            <GhostInput
                ref={ref}
                onInput={onInput}
                onCompositionStart={onCompositionStart}
                onCompositionEnd={onCompositionEnd}
                onKeyDown={onKeyDown}
            />
        );

        const textarea = container.querySelector("textarea");
        expect(textarea).toBeTruthy();

        // Initially, inline style for left should be empty (CSS handles default position)
        expect(textarea?.style.left).toBe("");

        // Set position and make visible via ref methods (direct DOM manipulation)
        act(() => {
            ref.current?.setPosition(100, 200, 150, 30);
            ref.current?.setVisible(true);
        });

        // After calling ref methods, inline styles should be set
        expect(textarea?.style.left).toBe("100px");
        expect(textarea?.style.top).toBe("200px");
        expect(textarea?.style.width).toBe("150px");
        expect(textarea?.style.height).toBe("30px");
        expect(textarea?.style.opacity).toBe("1");
    });

    test("can be focused via ref", () => {
        const onInput = vi.fn();
        const onCompositionStart = vi.fn();
        const onCompositionEnd = vi.fn();
        const onKeyDown = vi.fn();
        const ref = React.createRef<GhostInputRef>();

        const { container } = render(
            <GhostInput
                ref={ref}
                onInput={onInput}
                onCompositionStart={onCompositionStart}
                onCompositionEnd={onCompositionEnd}
                onKeyDown={onKeyDown}
            />
        );

        const textarea = container.querySelector("textarea");
        expect(textarea).toBeTruthy();

        act(() => {
            ref.current?.focus();
        });

        expect(document.activeElement).toBe(textarea);
    });

    test("calls onInput when text is entered", () => {
        const onInput = vi.fn();
        const onCompositionStart = vi.fn();
        const onCompositionEnd = vi.fn();
        const onKeyDown = vi.fn();

        const { container } = render(
            <GhostInput
                onInput={onInput}
                onCompositionStart={onCompositionStart}
                onCompositionEnd={onCompositionEnd}
                onKeyDown={onKeyDown}
            />
        );

        const textarea = container.querySelector("textarea")!;

        // Simulate input
        fireEvent.input(textarea, { target: { value: "test" } });

        expect(onInput).toHaveBeenCalledWith("test", false);
    });

    test("calls onCompositionStart and onCompositionEnd for IME input", () => {
        const onInput = vi.fn();
        const onCompositionStart = vi.fn();
        const onCompositionEnd = vi.fn();
        const onKeyDown = vi.fn();

        const { container } = render(
            <GhostInput
                onInput={onInput}
                onCompositionStart={onCompositionStart}
                onCompositionEnd={onCompositionEnd}
                onKeyDown={onKeyDown}
            />
        );

        const textarea = container.querySelector("textarea")!;

        // Simulate IME composition start (Korean input)
        fireEvent.compositionStart(textarea);
        expect(onCompositionStart).toHaveBeenCalled();

        // Simulate input during composition
        fireEvent.input(textarea, { target: { value: "ㅎ" } });
        expect(onInput).toHaveBeenCalledWith("ㅎ", true); // isComposing should be true

        // Simulate more composition
        fireEvent.input(textarea, { target: { value: "하" } });
        expect(onInput).toHaveBeenCalledWith("하", true);

        fireEvent.input(textarea, { target: { value: "한" } });
        expect(onInput).toHaveBeenCalledWith("한", true);

        // Simulate composition end
        fireEvent.compositionEnd(textarea, { target: { value: "한" } });
        expect(onCompositionEnd).toHaveBeenCalledWith("한");
    });

    test("onKeyDown is called for non-IME keys", () => {
        const onInput = vi.fn();
        const onCompositionStart = vi.fn();
        const onCompositionEnd = vi.fn();
        const onKeyDown = vi.fn();

        const { container } = render(
            <GhostInput
                onInput={onInput}
                onCompositionStart={onCompositionStart}
                onCompositionEnd={onCompositionEnd}
                onKeyDown={onKeyDown}
            />
        );

        const textarea = container.querySelector("textarea")!;

        // Simulate arrow key
        fireEvent.keyDown(textarea, { key: "ArrowDown", keyCode: 40 });
        expect(onKeyDown).toHaveBeenCalled();
    });

    test("clear() resets the textarea value", () => {
        const onInput = vi.fn();
        const onCompositionStart = vi.fn();
        const onCompositionEnd = vi.fn();
        const onKeyDown = vi.fn();
        const ref = React.createRef<GhostInputRef>();

        const { container } = render(
            <GhostInput
                ref={ref}
                onInput={onInput}
                onCompositionStart={onCompositionStart}
                onCompositionEnd={onCompositionEnd}
                onKeyDown={onKeyDown}
            />
        );

        const textarea = container.querySelector("textarea")!;

        // Set value
        fireEvent.input(textarea, { target: { value: "test" } });
        expect(textarea.value).toBe("test");

        // Clear
        act(() => {
            ref.current?.clear();
        });

        expect(textarea.value).toBe("");
    });

    test("getValue() returns current textarea value", () => {
        const onInput = vi.fn();
        const onCompositionStart = vi.fn();
        const onCompositionEnd = vi.fn();
        const onKeyDown = vi.fn();
        const ref = React.createRef<GhostInputRef>();

        const { container } = render(
            <GhostInput
                ref={ref}
                onInput={onInput}
                onCompositionStart={onCompositionStart}
                onCompositionEnd={onCompositionEnd}
                onKeyDown={onKeyDown}
            />
        );

        const textarea = container.querySelector("textarea")!;

        // Set value directly on the DOM element (simulating user input)
        textarea.value = "hello";

        expect(ref.current?.getValue()).toBe("hello");
    });
});
