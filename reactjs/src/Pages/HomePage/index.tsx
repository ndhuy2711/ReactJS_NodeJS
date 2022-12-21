import Header from "../../Components/Layout/Header"
import LayoutTemplate from "../../Components/Layout/LayoutTemplate"
import ActiveNav from "../Interface/ActiveNav"

const HomePage: React.FC<ActiveNav> = (active) => {
    return (
        <>
            <Header active={active.active} />
            <LayoutTemplate />
        </>
    )
}

export default HomePage