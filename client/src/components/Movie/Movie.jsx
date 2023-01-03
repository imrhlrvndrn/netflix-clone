import { useTabs, useWindowSize } from '../../hooks';
import { formatDate } from '../../utils';
import { useDataLayerValue } from '../../context/data.context';

// components
import { CastMembers, MediaBanner, Tabs } from '../';

export const Movie = ({ movie }) => {
    const media_tabs = [
        {
            title: 'Cast',
            component: () => <CastMembers />,
        },
    ];
    const [tabs, current_tab, switch_tab] = useTabs(media_tabs);
    const TabComponent = current_tab?.component;

    return (
        <>
            <MediaBanner media={movie} />
            <section className='detailedPage_mediaInfo'>
                <div className='detailedPage_mediaInfo_left'>
                    <Tabs tabs={tabs} switch_tab={switch_tab} />
                    <TabComponent />
                </div>
                <div className='detailedPage_mediaInfo_right'>
                    <div className='mediaStats'>
                        <div className='mediaStats_stat'>
                            <h1>Release date</h1>
                            <p>{formatDate('Do MMM YYYY', movie?.data?.release_date)}</p>
                        </div>
                        <div className='mediaStats_stat'>
                            <h1>Status</h1>
                            <p>{movie?.data?.status}</p>
                        </div>
                        <div className='mediaStats_stat'>
                            <h1>Spoken languages</h1>
                            <p>
                                {movie?.data?.spoken_languages?.map((lang) => lang.name).join(', ')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
