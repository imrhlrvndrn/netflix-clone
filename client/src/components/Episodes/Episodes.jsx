// styles
import axios from '../../axios';
import { useEffect } from 'react';
import { getSeasonDetails } from '../../requests';
import { useDataLayerValue } from '../../context/data.context';
import { baseImageUrl, calculateRuntime, formatDate } from '../../utils';

// styles
import '../../shared/MediaContent.scss';

export const Episodes = ({ show_id }) => {
    const [{ season_details, current_season }, dispatch] = useDataLayerValue();

    useEffect(() => {
        const fetch_episodes = async () => {
            const response = await axios.get(getSeasonDetails(show_id, current_season));
            dispatch({ type: 'SET_SEASON_DETAILS', result: response });
        };

        (async () => await fetch_episodes())();

        return () => dispatch({ type: 'SET_SEASON_DETAILS', result: null });
    }, [current_season]);

    return (
        <div style={{ margin: '2rem 0' }}>
            {season_details?.data?.episodes?.map((episode) => (
                <div className='media_content' key={episode?.id}>
                    {baseImageUrl(
                        'original',
                        episode?.still_path,
                        episode?.name || episode?.episode_number
                    )}
                    <div className='content'>
                        <div className='title'>
                            <h1>
                                {episode?.episode_number}. {episode?.name}
                            </h1>
                            <p>{calculateRuntime(episode?.runtime)}</p>
                        </div>
                        <p className='release_date'>
                            {episode?.air_date === null
                                ? null
                                : `${formatDate('Do MMM YYYY', episode?.air_date)}`}
                        </p>
                        <p className='overview'>{episode?.overview}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
