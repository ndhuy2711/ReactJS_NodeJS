import { IconItems, MenuItems } from '../Constants/Menu'
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        key,
        icon,
        children,
        label
    } as MenuItem;
}

export const HomePageLayout = [
    getItem(MenuItems.ITEM_1, MenuItems.ITEM_1, IconItems.ICON_1),
    getItem(MenuItems.ITEM_2, MenuItems.ITEM_2, IconItems.ICON_2),
    getItem(MenuItems.ITEM_3, MenuItems.ITEM_3, IconItems.ICON_3)
];