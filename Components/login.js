import { useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../utilities/intercepter';
import { UserRoles } from "./UserRoleContext";

const Login = () => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({});
    const navigate = useNavigate();
    const { setRole } = UserRoles();
    const onSubmit = async (data) => {
        try {
            localStorage.clear();
            const response = await api.post('auth/login', data);
            if (response.status === 200) {
                const { accessToken, refreshToken } = response.data;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                setRole('admin');
                navigate('/admin')
            } else {
                toast.error('login error')
            }
        } catch (error) {
            console.log(error)
            toast.error('login error')
        }

    }
    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="email"> Email:</label>
                    <input type="email" id="email" {...register("email", { required: 'email is required' })}></input>
                    <span>{errors.email && errors.email.message}</span>
                </div>
                <div>
                    <label htmlFor="password"> Password:</label>
                    <input type="password" id="password" {...register('password', { required: 'password is required' })}></input>
                    <span>{errors.password && errors.password.message}</span>

                </div>
                <div>
                    <button type="submit" disabled={!isValid}> Login </button>
                </div>
            </form>
            <div>
                <Link to='/signup'>
                    <button> register </button>
                </Link>
            </div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        </div>
    )
};
export default Login;