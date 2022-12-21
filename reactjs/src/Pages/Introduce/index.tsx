import Header from "../../Components/Layout/Header"
import ActiveNav from "../Interface/ActiveNav"

const Introduce: React.FC<ActiveNav> = (active) => {
    return (
        <>
            <Header active={active.active} />
        </>
    )
}
export default Introduce