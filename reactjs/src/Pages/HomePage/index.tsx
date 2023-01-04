import Header from "../../Components/Layout/Header"
import LayoutTemplate from "../../Components/Layout/LayoutTemplate"
import ActiveNav from "../Interface/ActiveNav"
import { HomePageLayout } from "./Components/Layout"
const HomePage: React.FC<ActiveNav> = (active) => {
    const _items = HomePageLayout
    return (
        <>
            <Header active={active.active} />
            <LayoutTemplate items = {_items} />
        </>
    )
}

export default HomePage