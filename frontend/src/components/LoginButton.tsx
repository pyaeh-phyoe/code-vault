import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'

const LoginButton = () => {
    const { logout } = useLogout()
    const navigate = useNavigate()
    const { state } = useAuthContext()
    const user = state.user

    return (<>
        {
            !user ? (<div className='button-type-1' onClick={() => navigate('/login')}>
                <div className='save'>Log in</div>
            </div>) : (<div className='button-type-1' onClick={() => logout()}>
                <div className='save'>Log out</div>
            </div>)
        }
    </>)
}

export default LoginButton;