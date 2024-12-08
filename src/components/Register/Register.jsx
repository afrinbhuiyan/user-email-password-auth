import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth/cordova";
import auth from "../../firebase/firebase";
import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

const Register = () => {
    const [registerError, setRegisterError] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleRegister = e => {
        e.preventDefault();
        // reset error and success
        setRegisterError('')
        setRegisterSuccess('')
        const email = e.target.email.value;
        const name = e.target.name.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked
        console.log(email, name, password, accepted)
        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters or longer');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Your Password should have at least and upper case characters');
            return;
        }
        else if (!accepted) {
            setRegisterError('Please accept our terms and conditions!!')
            return;
        }
        //Create User
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setRegisterSuccess('User Created Successfully')
                // upDate Profile
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                .then(() => {
                    console.log('Profile upDated')
                })
                .catch(error => {
                    console.error(error)
                })
                // Send verification email
                sendEmailVerification(result.user)
                    .then(() => {
                        alert('Please check Your Email and verify your account')
                    })
            })
            .catch(error => {
                console.log(error);
                setRegisterError(error.message);
            })
    }
    return (
        <div>
            <div className="mx-auto md:w-1/2 flex flex-col justify-center items-center mt-40">
                <h2 className="text-2xl mb-10">Please Register</h2>
                <form onSubmit={handleRegister} className="bg-white shadow-2xl rounded-lg p-10 ">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input className="pr-96 mb-3 py-3 px-4 rounded-full border input-bordered"
                            placeholder="Email Address" type="email" name="email" id="" required />
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text">User Name</span>
                        </label>
                        <label className="input input-bordered rounded-full flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                            <input type="text" className="grow" name="name" placeholder="Username" />
                        </label>
                    </div>
                    <div className="mb-5 mt-3">
                        <label className="label-text">
                            <span className="label-text ">Password</span></label>
                        <br />
                        <label className="input input-bordered flex items-center gap-2 border rounded-full">
                            <input className="pr-80  py-3 px-4"
                                placeholder="Password" type={showPassword ? "text" : "password"}
                                name="password" id="" required />
                            <span onClick={() => setShowPassword(!showPassword)} >
                                {
                                    showPassword ? <AiFillEyeInvisible></AiFillEyeInvisible> : <AiOutlineEye></AiOutlineEye>
                                }
                            </span>
                        </label>
                    </div>
                    <div className="">
                        <input className="mr-2" type="checkbox" name="terms" id="terms" />
                        <small><label htmlFor="terms">Accept our <a href="">Terms and Conditions</a></label></small>
                        <br />
                        <input className="btn mt-4 bg-blue-400 px-[270px]" type="submit" value="register" />

                    </div>
                    {
                        registerError && <p className="text-[#f03333] font-semibold pt-3">{registerError}</p>
                    }
                    {
                        registerSuccess && <p className="text-[#3da024] font-semibold pt-3" >{registerSuccess}</p>
                    }

                    <p className="mt-2"><small>Already have an account? Please <Link to={'/login'} ><a
                        className="underline font-medium hover:text-blue-500"> Login </a></Link> </small></p>

                </form>
            </div>
        </div>
    );
};

export default Register;