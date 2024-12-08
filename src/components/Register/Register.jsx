import { createUserWithEmailAndPassword } from "firebase/auth/cordova";
import auth from "../../firebase/firebase";
import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

const Register = () => {
    const [registerError, setRegisterError] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleRegister = e => {
        e.preventDefault();
        // reset error
        setRegisterError('')
        setRegisterSuccess('')
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked
        console.log(email, password, accepted)
        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters or longer');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Your Password should have at least and upper case characters');
            return;
        }
        else if(!accepted){
            setRegisterError('Please accept our terms and conditions!!')
            return;
        }
        //Create User
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setRegisterSuccess('User Created Successfully')
            })
            .catch(error => {
                console.log(error);
                setRegisterError(error.message);
            })
    }
    return (
        <div>
            <div className="mx-auto md:w-1/2 ">
                <h2 className="text-2xl">Please Register</h2>
                <form onSubmit={handleRegister} className="bg-white shadow-2xl rounded-lg p-10 flex flex-col items-center">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input className="pr-96 mb-3 py-3 px-4 rounded-full border input-bordered"
                            placeholder="Email Address" type="email" name="email" id="" required />
                    </div>
                    <div className="mb-5">
                        <label className="label-text">
                            <span className="label-text ">Password</span></label>
                        <br />
                        <label className="input input-bordered flex items-center gap-2 border rounded-full">
                        <input className="pr-80  py-3 px-4"
                            placeholder="password" type={showPassword ? "text" : "password"}
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
                    <label htmlFor="terms">Accept our <a href="">Terms and Conditions</a></label>
                    <br />
                    <input className="btn mt-4 bg-blue-400 px-[270px]" type="submit" value="register" />

                    </div>
                    {
                        registerError && <p className="text-[#f03333] font-semibold pt-3">{registerError}</p>
                    }
                    {
                        registerSuccess && <p className="text-[#3da024] font-semibold pt-3" >{registerSuccess}</p>
                    }
                </form>
            </div>
        </div>
    );
};

export default Register;