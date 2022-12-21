import Register from "../../Components/Form/Register"
import Header from "../../Components/Layout/Header"
import ActiveNav from "../Interface/ActiveNav"


const FormRegister: React.FC<ActiveNav> = (active) => {
    return (
        <>
            <Header active={active.active} />
            <Register />
        </>
    )
}
export default FormRegister