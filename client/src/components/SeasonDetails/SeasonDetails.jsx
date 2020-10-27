import React, { useEffect } from 'react';
import axios from '../../axios';
import { useDataLayerValue } from '../../DataLayer';
import { baseImageUrl, getSeasonDetails } from '../../requests';

// scss files
import './SeasonDetails.scss';

const SeasonDetails = ({ match }) => {
    const [{ tv, season_details }, dispatch] = useDataLayerValue();
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
            <div className='seasonDetails_banner'>
                <div className='seasonDetails_banner_details'>
                    <img src={`${baseImageUrl}${season_details?.data?.poster_path}`} alt='' />
                    kdlsfj;skd
                </div>
            </div>
        </div>
    );
};

export default SeasonDetails;
