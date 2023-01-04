import { useEffect, useState } from 'react';
import { useTabs } from '../../hooks';
import { baseImageUrl, formatDate } from '../../utils';
import { useDataLayerValue } from '../../context/data.context';

// styles
import '../../shared/MediaContent.scss';

// components
import { Episodes, MediaBanner, Tabs, CastMembers, Dropdown } from '../';

export const Tv = ({ tv }) => {
    const [{ current_season }, dispatch] = useDataLayerValue();
    let queryValue =
        tv?.data?.name || tv?.data?.original_name || tv?.data?.title || tv?.data?.original_title;
    let query = queryValue?.toLowerCase().split(' ').join('+');

    const [media_tabs, setMediaTabs] = useState([
        {
            title: 'Episodes',
            component: () => <Episodes show_id={tv?.data?.id} />,
        },
        {
            title: 'Cast',
            component: () => <CastMembers />,
        },
    ]);
    const [tabs, current_tab, switch_tab] = useTabs(media_tabs);
    const TabComponent = current_tab?.component;

    const generateDropdownMenu = (limit) => {
        let menu = [];
        for (let i = 1; i <= limit; i++) {
            menu.push({ content: `Season ${i}` });
        }

        return menu;
    };

    useEffect(() => {
        return () => dispatch({ type: 'SET_CURRENT_SEASON', result: 1 });
    }, []);

    return (
        <>
            <MediaBanner media={tv} />

            <section className='detailedPage_mediaInfo'>
                <div className='detailedPage_mediaInfo_left'>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0 1rem 0 0',
                        }}
                    >
                        <Tabs tabs={tabs} switch_tab={switch_tab} />
                        <Dropdown menu={generateDropdownMenu(tv?.data?.number_of_seasons)} />
                    </div>
                    <TabComponent />
                </div>
                <div className='detailedPage_mediaInfo_right'>
                    <div className='mediaStats'>
                        <div className='mediaStats_stat'>
                            <h1>First air date</h1>
                            <p>{formatDate('Do MMM YYYY', tv?.data?.first_air_date)}</p>
                        </div>
                        <div className='mediaStats_stat'>
                            <h1>Last air date</h1>
                            <p>{formatDate('Do MMM YYYY', tv?.data?.last_air_date)}</p>
                        </div>
                        <div className='mediaStats_stat'>
                            <h1>Status</h1>
                            <p>{tv?.data?.status}</p>
                        </div>
                        <div className='mediaStats_stat'>
                            <h1>Type</h1>
                            <p>{tv?.data?.type}</p>
                        </div>
                        <div className='mediaStats_stat'>
                            <h1>Original language</h1>
                            <p>{tv?.data?.original_language}</p>
                        </div>
                        <div className='mediaStats_stat'>
                            <h1>Networks</h1>
                            <p>
                                {tv?.data?.networks?.map((network) => {
                                    {
                                        baseImageUrl('w200', network.logo_path, network?.name);
                                    }
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
