
const Register = () => {
    const handleRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)
    }
    return (
        <div>
            <div className="mx-auto md:w-1/2">
                <h2 className="text-2xl">Please Register</h2>
                <form onSubmit={handleRegister} className="bg-white shadow-2xl rounded-lg p-10">
                    <p class="label-text">Email</p>
                    <br />
                    <input className="w-3/4 mb-3 py-3 px-4 rounded-full border border-[#111111c9]" placeholder="Email Address" type="email" name="email" id="" />
                    <br />
                    <p class="label-text">Password</p>
                    <br />
                    <input className="w-3/4 mb-3 py-3 px-4 rounded-full border border-[#111111c9]" placeholder="password" type="password" name="password" id="" />
                    <br />
                    <input className="btn mt-4 bg-blue-400 w-3/4" type="submit" value="register" />
                </form>
            </div>
            
        </div>
    );
};

export default Register;