import { useState } from 'react';

export const useTabs = (tabs = [], initialTab = 0) => {
    /**
     * {
     *      title: 'Title of the tab',
     *      component: 'The component that has to rendered when the tab is active',
     *      is_active: 'The active status (added automatically)'
     *      tab_index: 'Keeps all the tabs unique & acts as an identifier (added automatically)'
     * }
     *
     */

    const processedTabs = tabs?.reduce(
        (acc, cur_value, cur_index) => [
            ...acc,
            {
                ...cur_value,
                tab_index: cur_index,
                is_active: cur_index === 0 ? true : false,
            },
        ],
        []
    );

    const [totalTabs, setTotalTabs] = useState(processedTabs);
    const [currentTab, setCurrentTab] = useState(initialTab);

    const switch_tab = (tab_index) => {
        if (typeof tab_index !== 'number') return;

        if (!!totalTabs[tab_index]) {
            setTotalTabs((prevState) =>
                prevState.map((tab) =>
                    tab.tab_index === tab_index
                        ? { ...tab, is_active: true }
                        : { ...tab, is_active: false }
                )
            );
            return setCurrentTab(tab_index);
        }
    };

    return [totalTabs, totalTabs?.filter((tab) => tab?.tab_index === currentTab)[0], switch_tab];
};
