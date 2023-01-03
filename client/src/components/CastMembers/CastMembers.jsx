import { Link } from 'react-router-dom';
import { baseImageUrl } from '../../utils';
import { useDataLayerValue } from '../../context/data.context';

export const CastMembers = () => {
    const [{ media_cast }] = useDataLayerValue();

    return (
        <div style={{ margin: '2rem 0' }}>
            {media_cast?.data?.cast?.map((cast) => {
                return (
                    <div className='media_content' key={cast?.id}>
                        {baseImageUrl('w200', cast?.profile_path, cast?.name || cast?.character)}
                        <div className='content'>
                            <Link to={`/person/${cast?.id}`} className='title'>
                                <h1>{cast?.name}</h1>
                            </Link>
                            <div className='release_date'>{cast?.character}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
