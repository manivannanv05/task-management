import { useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";

const Login = () => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({});
    const navigate = useNavigate();
    const onSubmit = (data) => {
        console.log("successfully logged in", data);
        navigate('/dashboard')
    }
    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="mail"> Email:</label>
                    <input type="email" id="mail" {...register("mail", { required: 'email is required' })}></input>
                    <span>{errors.mail && errors.mail.message}</span>
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
        </div>
    )
};
export default Login;