import React, { useEffect, useState } from 'react';
import "./style.css"
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../App/store';
import { getItemActive } from './activeItemSlice';
const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const LayoutTemplate: React.FC<any | React.ReactNode | React.ReactNode[]> = (props) => {
    const items: MenuItem[] = props.items
    const [collapsed, setCollapsed] = useState(false);
    const active = useSelector((state: RootState) => state.active.active)
    const itemActiveDefault = props.items[0]?.key || ""

    const keyUCFirst = (key: string) => key.charAt(0).toUpperCase() + key.slice(1);
    const [itemAcive, setItemActive] = useState<string[]>([itemActiveDefault])
    const onClick: MenuProps['onClick'] = (e) => {
        setItemActive(e.keyPath.reverse())
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getItemActive(itemAcive.reverse()))
    }, [itemAcive, dispatch])
    return (
        <Layout className="layout_container">
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Menu
                    onClick={onClick}
                    theme="light"
                    defaultSelectedKeys={[itemActiveDefault]}
                    items={items}
                    mode='inline'
                    className="menu"
                />
            </Sider>
            <Layout className="site-layout">
                <Content className='content'>
                    <Breadcrumb className='breadcrumb'>
                        <Breadcrumb.Item>{keyUCFirst(active)}</Breadcrumb.Item>
                        {itemAcive.map((key) => <Breadcrumb.Item key={key}>{keyUCFirst(key)}</Breadcrumb.Item>)}
                    </Breadcrumb>
                    <div className='body'>
                        {props?.children}
                    </div>
                </Content>
                <Footer className='footer'>©2022 Created by Duong Huy Nguyen</Footer>
            </Layout>
        </Layout>
    );
};

export default LayoutTemplate;