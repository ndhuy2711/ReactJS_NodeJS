import { useSelector } from "react-redux"
import Header from "../../Components/Layout/Header"
import LayoutTemplate from "../../Components/Layout/LayoutTemplate"
import ActiveNav from "../Interface/ActiveNav"
import AccountInfomation from "./Components/AccountInfomation"
import { HomePageLayout } from "./Components/Layout"
import { RootState } from '../../App/store'
import { MenuItems } from "./Constants/Menu"
import ChangeInfomation from "./Components/ChangeInfomation"
import { useEffect, useState } from "react"
import { getUser } from "./Service/User"
import ChangePassword from "./Components/ChangePassword"
import { getCookies } from "../../Api/Cookies/handleCookies"

const User: React.FC<ActiveNav> = (active) => {
    const _items = HomePageLayout
    const _getItemActive = useSelector((state: RootState) => state.item_active.item_active)
    const itemAcive = _getItemActive[0]
    let template = null
    const [users, setUsers] = useState<React.SetStateAction<any>>(null)
    useEffect(() => {
        const values = async () => {
            const issetCookies = getCookies()
            while (issetCookies !== null) {
                const _getUser = await getUser()
                const result = _getUser?.data?.users || null
                setUsers(result)
                return result
            }
        }
        values()
    }, [])
    switch (itemAcive) {
        case MenuItems.ITEM_1:
            template = <AccountInfomation getItemActive={_getItemActive} {...users} />
            break
        case MenuItems.ITEM_2:
            template = <ChangeInfomation getItemActive={_getItemActive} {...users} />
            break
        case MenuItems.ITEM_3:
            template = <ChangePassword getItemActive={_getItemActive} {...users} />
            break
        default:
            template = null
    }
    return (
        <>
            <Header active={active.active} />
            <LayoutTemplate items={_items} >
                {template}
            </LayoutTemplate>
        </>
    )
}

export default User