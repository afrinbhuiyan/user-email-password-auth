import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth/cordova";
import auth from "../../firebase/firebase";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";

const Login = () => {

    const [loginError, setLoginError] = useState('');
    const [loginSuccess, setLoginSuccess] = useState('');
    const emailRef = useRef(null);

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)
        // reset error and success
        setLoginError('')
        setLoginSuccess('')
        // add validation
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                if(result.user.emailVerified){
                    setLoginSuccess('User Logged In Successfully.')
                }
                else{
                    alert('Plese varify your email address.')
                }
            })
            .catch(error => {
                console.error(error)
                setLoginError(error.message);
            })
    }

    const handleForgerPassword = () => {
        const email = emailRef.current.value;
        if(!email){
            console.log('Please Provide an email', emailRef.current.value)
            return;
        }
        else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            console.log('Please write a valid email')
            return;
        }
        // send validation email
        sendPasswordResetEmail(auth, email)
        .then(() => {
            alert('Please check your email')
        })
        .catch(error => {
            console.error(error)
        })
    }

    return (
        <div className="hero bg-base-200 py-20">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" name="email" ref={emailRef} className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                            <label className="label">
                                <a onClick={handleForgerPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-blue-400 text-white hover:shadow-xl hover:shadow-[#87b3e6] hover:bg-blue-300">Login</button>
                        </div>
                        <div>

                            {
                                loginError && <p className="text-[#f03333] font-semibold pt-3">{loginError}</p>
                            }
                            {
                                loginSuccess && <p className="text-[#3da024] font-semibold pt-3" >{loginSuccess}</p>
                            }

                            <p><small>New to this website? Please <Link to={'/register'} ><a href="" 
                            className="underline font-medium hover:text-blue-500" >Register</a></Link> </small></p>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;