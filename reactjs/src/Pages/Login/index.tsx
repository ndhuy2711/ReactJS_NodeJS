import FormLogin from "../../Components/Form/Login"
import Header from "../../Components/Layout/Header"
import ActiveNav from "../Interface/ActiveNav"

const Login: React.FC<ActiveNav> = (active) => {
    return (
        <>
            <Header active={active.active} />
            <FormLogin />
        </>
    )
}
export default Login