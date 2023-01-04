import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { QuestionCircleOutlined, HomeOutlined, UserOutlined, FormOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { getCookies, removeCookies } from '../../Api/Cookies/handleCookies';
import { RootState } from '../../App/store';
import { removeUser } from '../Form/userSlice';
import { getActive } from './activeSlice';

interface Active {
    active: string
}
const Header: React.FC<Active> = ({ active }) => {
    let getCookie = getCookies()
    const dispatch = useDispatch()
    const [cookie, setCookie] = useState<React.SetStateAction<string>>(getCookie || "")
    const [activePage, setActivePage] = useState<React.SetStateAction<string>>(active)
    useEffect(() => {
        const cookies = cookie
        if (cookies !== "") {
            setCookie(cookies)
        } else {
            setCookie("")
        }
    }, [cookie])
    useEffect(() => {
        const _active = activePage
        const _activePage = dispatch(getActive(_active))
        setActivePage(_activePage.payload)
    }, [activePage, dispatch])
    
    const userInfo = useSelector((state: RootState) => state.user.user)

    const handleClickLogout = () => {
        dispatch(removeUser())
        removeCookies()
        setCookie("")
        window.location.href = '/'
    }
    const items: MenuProps['items'] = [
        {
            label:
                <Link to='/'>
                    Home
                </Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label:
                <Link to="/introduce">
                    Introduce
                </Link>,
            key: 'introduce',
            icon: <QuestionCircleOutlined />,
        },
        cookie === "" ?
            {
                label:
                    <Link to='/login'>
                        Login
                    </Link>,
                key: 'login',
                icon: <UserOutlined />,

            } : {
                label: <Link to='/user'>
                    Welcome, {userInfo.name}
                </Link>,
                key: 'user',
                icon: <UserOutlined />,
            },
        cookie === "" ?
            {
                label:
                    <Link to="/register">
                        Register
                    </Link>,
                key: 'register',
                icon: <FormOutlined />,
            } :
            {
                label:
                    <span onClick={handleClickLogout}>
                        Logout
                    </span>,
                key: 'logout',
                icon: <LogoutOutlined />,
            }
    ];
    const [current, setCurrent] = useState(active);

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    return <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
    />;
};

export default Header;