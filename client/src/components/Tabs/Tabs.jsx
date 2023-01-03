// styles
import './Tabs.scss';

export const Tabs = ({ tabs, switch_tab }) => {
    return (
        <div className='tab_headers'>
            {tabs?.map(({ tab_index, title, is_active }) => (
                <h1
                    className={`tab ${is_active ? 'tab_active' : ''}`}
                    key={tab_index}
                    onClick={() => switch_tab(tab_index)}
                >
                    {title}
                </h1>
            ))}
        </div>
    );
};
