import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/backgroundImage.jpg'

const SignUp = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error, isLoading } = useSignup()

    const handleSubmit = async (e: React.FormEvent) => {
        console.log(email, password)
        e.preventDefault()
        await signup(email, password)
    }

    return (
        <div className='text-white flex items-center justify-center h-screen bg-primaryColor bg-cover' style={{ backgroundImage: `url(${backgroundImage})`}}>
            <form className='w-96 bg-secondaryColor rounded-md flex flex-col px-5 py-14' onSubmit={handleSubmit}>
                <div className='border rounded-md	 border-borderColor '>
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
                <button disabled={isLoading} type='submit' className='bg-adjacentColor h-12	px-7 rounded active:opacity-60	'>Sign up</button>
                <section className='mt-4'>
                    <a className='cursor-pointer hover:underline' onClick={() => navigate('/login')}>Login</a>
                    <span className='mx-1'>/</span>
                    <a className='cursor-pointer hover:underline' onClick={() => navigate('/signup')}>Reset password</a>
                </section>
            </form>
        </div>
    );
}

export default SignUp;