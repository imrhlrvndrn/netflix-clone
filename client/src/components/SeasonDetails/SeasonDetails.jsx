import React, { useEffect } from 'react';
import axios from '../../axios';
import useWindowSize from '../../utils/useWindowSize';
import { useDataLayerValue } from '../../DataLayer';
import { baseImageUrl, baseImageUrlLink, formatDate, getSeasonDetails } from '../../requests';

// scss files
import './SeasonDetails.scss';

const SeasonDetails = ({ match }) => {
    const [{ tv, season_details }, dispatch] = useDataLayerValue();
    const window = useWindowSize();
    const mediaId = match.params.mediaId;
    const season_number = match.params.seasonNumber;

    console.log('seasondetails match: ', match);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(getSeasonDetails(mediaId, season_number));
            dispatch({ type: 'SET_SEASON_DETAILS', result: response });
        };

        fetchData();
    }, [mediaId, season_number]);

    console.log('Season details: ', season_details);

    return (
        <div className='seasonDetails'>
            <div
                className='seasonDetails_banner'
                style={{
                    backgroundImage: `${
                        window?.width < 1024
                            ? `linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.6), #000), url(${baseImageUrlLink(
                                  'original'
                              )}/${season_details?.data?.poster_path})`
                            : 'black'
                    }`,
                }}
            >
                <div className='seasonDetails_banner_details'>
                    <h1>Season {season_details?.data?.season_number}</h1>
                </div>
                <div className='fadeElement'></div>
            </div>
            <div className='seasonDetails_mediaInfo'>
                {season_details?.data && (
                    <h1>Episodes ({season_details?.data?.episodes?.length})</h1>
                )}
                <div className='seasonDetails_mediaInfo_episodes'>
                    {season_details?.data?.episodes?.map((episode) => {
                        return (
                            <div
                                to={`/tv/${season_details?.data?.id}/episode/${episode?.episode_number}`}
                                className='episode'
                                key={episode?.id}
                            >
                                <div className='episodeInfo'>
                                    {baseImageUrl(
                                        'w500',
                                        episode?.still_path,
                                        episode?.name || episode?.episode_number
                                    )}
                                    <div className='episodeInfo_main'>
                                        <h1>
                                            {episode?.episode_number}.
                                            {episode?.name?.length > 8 && window?.width > 768
                                                ? ` ${episode?.name.substring(0, 8)}...`
                                                : ` ${episode?.name}`}
                                        </h1>
                                        <div>
                                            {episode?.air_date === null
                                                ? null
                                                : `${formatDate('Do MMM YYYY', episode?.air_date)}`}
                                        </div>
                                    </div>
                                </div>
                                {window?.width <= 1024 && (
                                    <div className='episode_overview'>{episode?.overview}</div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SeasonDetails;
