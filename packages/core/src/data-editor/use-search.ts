import * as React from "react";

interface UseSearchProps {
    readonly showSearchIn: boolean | undefined;
    readonly onSearchCloseIn: (() => void) | undefined;
}

export function useSearch(props: UseSearchProps) {
    const { showSearchIn, onSearchCloseIn } = props;

    const [showSearchInner, setShowSearchInner] = React.useState(false);
    const showSearch = showSearchIn ?? showSearchInner;

    const onSearchClose = React.useCallback(() => {
        if (onSearchCloseIn !== undefined) {
            onSearchCloseIn();
        } else {
            setShowSearchInner(false);
        }
    }, [onSearchCloseIn]);

    return {
        showSearch,
        setShowSearch: setShowSearchInner,
        onSearchClose,
    };
}
