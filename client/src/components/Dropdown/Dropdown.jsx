import { useEffect, useState } from 'react';
import { useDataLayerValue } from '../../context/data.context';

// styles
import './Dropdown.scss';

export const Dropdown = ({ menu = [] }) => {
    const [{ current_season }, dispatch] = useDataLayerValue();
    const [dropdown_menu, setDropdownMenu] = useState(
        menu?.map((item, index) => ({
            ...item,
            id: index + 1,
            is_selected: index === 0 ? true : false,
        }))
    );
    const [show_menu, setShowMenu] = useState(false);

    useEffect(() => {
        const new_selected_value = dropdown_menu?.filter((item) => item?.is_selected)?.[0]?.content;
        if (`Season ${current_season}` !== new_selected_value)
            dispatch({ type: 'SET_CURRENT_SEASON', result: +new_selected_value?.split(' ')?.[1] });
    }, [dropdown_menu]);

    return (
        <div
            className='dropdown'
            style={{ cursor: `${dropdown_menu?.length > 1 ? 'pointer' : 'not-allowed'}` }}
            onClick={() => dropdown_menu?.length > 1 && setShowMenu((prevState) => !prevState)}
        >
            <p className='selected_value'>{`Season ${current_season}`}</p>
            {show_menu && (
                <DropdownMenu menu={dropdown_menu} handleMenuSelection={setDropdownMenu} />
            )}
        </div>
    );
};

export const DropdownMenu = ({ menu, handleMenuSelection }) => {
    return (
        <div className='dropdown_menu'>
            {menu?.map(({ id, content, is_selected }) => (
                <div
                    className={`menu_item ${is_selected ? 'active' : ''}`}
                    key={id}
                    onClick={() =>
                        handleMenuSelection((prevState) =>
                            prevState?.map((item) =>
                                id === item?.id
                                    ? { ...item, is_selected: true }
                                    : { ...item, is_selected: false }
                            )
                        )
                    }
                >
                    {content}
                </div>
            ))}
        </div>
    );
};
