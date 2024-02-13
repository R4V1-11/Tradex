import React,{useState} from "react";

const Login = () =>{
   const[email,Setemail] = useState('');
   const[password,Setpassword] = useState('');


const handleLogin = () =>{
    //need to put login logic here
    console.log("Login button is clicked");
}

return (
   <div>
        <h2>Login</h2>
        <form>
            <label>Email:</label>
            <input type = 'email' value={email} onChange={(e) => Setemail(e.target.value)} />


            <label>Password:</label>
            <input type = "password" value={password} onChange={(e)=>Setpassword(e.target.value)} />

            <button type = "button" onClick={handleLogin}>Login</button>
        </form>
    </div>
    
);

};
export default Login;