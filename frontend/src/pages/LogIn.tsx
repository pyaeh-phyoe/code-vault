import { useState } from 'react';
import { useLogin } from '../hooks/useLogin'
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/backgroundImage.jpg'


const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await login(email, password)
    }

    return (
        <div className='text-white flex items-center justify-center h-screen bg-primaryColor bg-cover' style={{ backgroundImage: `url(${backgroundImage})`}}>
            <form className='w-96 bg-secondaryColor rounded-md flex flex-col px-5 py-14' onSubmit={handleSubmit}>
                <div className='border rounded-md	 border-borderColor'>
                    <section className='px-5 py-5 border-b border-borderColor'>
                        <label className='mx-1'>Email:</label>
                        <input className='bg-secondaryColor text-white caret-white	' type='email' value={email} onChange={e => setEmail(e.target.value)} />
                    </section>
                    <section className='px-5 py-5'>
                        <label className='mx-1'>Password:</label>
                        <input className='bg-secondaryColor text-white' type='password' value={password} onChange={e => setPassword(e.target.value)} />
                    </section>
                </div>
                <div className='py-4 text-crimson'>{error}</div>
                <button disabled={isLoading} type='submit' className='bg-adjacentColor h-12	px-7 rounded active:opacity-60	'>Log in</button>
                <section className='mt-4'>
                    <a className=' cursor-pointer hover:underline' onClick={() => navigate('/signup')}>Sign up</a>
                    <span className='mx-1'>/</span>
                    <a className='cursor-pointer hover:underline' onClick={() => navigate('/signup')}>Reset password</a>
                </section>
            </form>
        </div>
    );
}

export default Login;