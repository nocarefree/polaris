import { TabProps } from "./Tab"


export type TabsProps = {
    /** The items that map to each Tab. */
    tabs: (TabProps & { onAction?: () => void })[];
    /** The index of the currently selected Tab. */
    selected: number;
    /** Whether the Tabs are disabled or not. */
    disabled?: boolean;
    /** Whether to show the add new view Tab. */
    canCreateNewView?: boolean;
    /** Label for the new view Tab. Will override the default of "Create new view" */
    newViewAccessibilityLabel?: string;
    /** Fit tabs to container */
    fitted?: boolean;
    /** Text to replace disclosures horizontal dots */
    disclosureText?: string;
}



export function getVisibleAndHiddenTabIndices(
    tabs: TabProps[],
    selected: number,
    disclosureWidth: number,
    tabWidths: number[],
    containerWidth: number,
) {
    const sumTabWidths = tabWidths.reduce((sum, width) => sum + width, 0);
    const arrayOfTabIndices = tabs.map((_, index) => {
        return index;
    });

    const visibleTabs: number[] = [];
    const hiddenTabs: number[] = [];

    if (containerWidth > sumTabWidths) {
        visibleTabs.push(...arrayOfTabIndices);
    } else {
        visibleTabs.push(selected);

        let tabListWidth = tabWidths[selected];

        arrayOfTabIndices.forEach((currentTabIndex) => {
            if (currentTabIndex !== selected) {
                const currentTabWidth = tabWidths[currentTabIndex];

                if (
                    tabListWidth + currentTabWidth >=
                    containerWidth - disclosureWidth
                ) {
                    hiddenTabs.push(currentTabIndex);
                    return;
                }

                visibleTabs.push(currentTabIndex);
                tabListWidth += currentTabWidth;
            }
        });
    }

    return {
        visibleTabs,
        hiddenTabs,
    };
}