import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../utilities/intercepter';
const Registration = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm({
        defaultValues: {
            firstname: '',
            lastname: '',
            mail: '',
            password: '',
            confirmPassword: ''
        },
        mode: 'onChange'

    });
    const password = watch('password');
    const onSubmit = async (data) => {
        try {
            console.log(data);
            const payload = {
                email: data.mail,
                name: data.firstname + ' ' + data.lastname,
                password: data.password
            }
            const response = await api.post('auth/register', payload);
            if (response.status === 201) {
                toast.success('user created successfully', {
                    autoClose: 100,
                    onClose: () => {
                        const { accessToken, refreshToken } = response.data;
                        localStorage.setItem('accessToken', accessToken);
                        localStorage.setItem('refreshToken', refreshToken);
                        navigate('/dashboard');
                    }
                })
            } else {
                toast.error('error while  creating the user')
            }
        } catch (error) {
            toast.error('error while  creating the user')
            console.log("API response ", error)
        }

    }
    return (
        <div className='registeration'>
            <h3>Registration</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="firstname">First Name:</label>
                    <input {...register('firstname', { required: 'FirstName is required', maxLength: { value: 25, message: 'FirstName must be less than or equal to 25 characters' }, minLength: { value: 3, message: ' FirstName must be atleast 3 characters' } })} type="text" id="first"></input>
                    <span> {errors.firstname && <p>{errors.firstname.message}</p>}</span>
                </div>
                <div>
                    <label htmlFor="lastname">Last Name:</label>
                    <input  {...register('lastname', { required: 'LastName is required', maxLength: { value: 25, message: 'LastName must be less than or equal to 25 characters' }, minLength: { vlaue: 3, message: 'LastName must be atleast 3 characters' } })} type="text" id="last" ></input>
                    <span> {errors.lastname && <p>{errors.lastname.message}</p>}</span>
                </div>
                <div>
                    <label htmlFor="mail">Email:</label>
                    <input {...register('mail', { required: 'Email is requiered' })} type="email" id="mail"></input>
                    <span> {errors.mail && <p>{errors.mail.message}</p>}</span>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input {...register('password', { required: 'Password is required' })} type="password" id="password"></input>
                    <span> {errors.password && <p>{errors.password.message}</p>}</span>
                </div>
                <div>
                    <label htmlFor="confirm-password">ConfirmPassword:</label>
                    <input {...register('confirmPassword', { required: 'ConfirmPassword is required', validate: (value) => value === password || 'password do not match' })} type="password" id="confirm-password"></input>
                    <span> {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}</span>
                </div>
                <div>

                    <button type="submit" disabled={!isValid}>
                        Submit
                    </button>


                </div>

            </form>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        </div>)

}


export default Registration;