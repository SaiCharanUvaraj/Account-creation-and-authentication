import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Signup() 
{
    const [userName,setUserName]=React.useState("");
    const [password,setPassword]=React.useState("");
    const [rePassword,setRePassword]=React.useState("");
    const [msg,setMsg]=React.useState("");
    const navigate=useNavigate();

    const url = 'http://localhost:3500/users';
    const [data, setData] = useState(null);
    useEffect(()=>{
        const getData= async () => {
            try
            {
                const response= await axios.get(url);
                setData(response.data);
            }
            catch(error)
            {
                console.log(error);
            }
        }
        getData();
    },[]);

    const handleSubmit= (e) =>
    {
        e.preventDefault();
        if(userName===""||password==="")
        {
            setMsg("This Username and Password is not accepted.");
        }
        else if(rePassword!==password)
        {
            setMsg("Confirm and recheck your password");
        }
        else
        {
            const toFind={id:userName,password:password};
            const isThere = data.find(item => item.id === toFind.id && item.password === toFind.password);
            if(isThere===undefined)
            {
                const data=toFind;
                const postData = async(url,data) =>{
                    try
                    {
                        const response = await axios.post(url,data);
                        console.log("Your account "+response.data.id+" was created successfully.");
                    }
                    catch(error)
                    {
                        console.log(error);
                    }
                }
                postData(url,data);
                navigate('/signin')
                setMsg("");
            }
            else
            {
                setMsg("This Username and Password is already registered");
            }
        }
    }
    return (
        <div className='bg-[#27374D] sm:w-4/6 md:w-1/2 lg:w-2/6 rounded-xl p-5 w-5/6 '>
            <p className='text-3xl font-bold text-[#DDE6ED] bg-transparent text-center mb-2'>Sign Up</p>
            <hr className='mb-10'/>
            <form className='grid place-items-center mb-5'>
                <input name='username' className='w-4/5 bg-[#DDE6ED] rounded-md p-1.5 focus:scale-105 mb-5 transition-all duration-300' type='text' required placeholder='Your User Name' onChange={(e) => {setUserName(e.target.value)}} value={userName} autoComplete='on'/>
                <input name='password' className='w-4/5 bg-[#DDE6ED] rounded-md p-1.5 focus:scale-105 mb-5 transition-all duration-300' type='password' required placeholder='Your Password' onChange={(e) => {setPassword(e.target.value)}} value={password} autoComplete='on'/>
                <input name='password' className='w-4/5 bg-[#DDE6ED] rounded-md p-1.5 focus:scale-105 mb-10 transition-all duration-300' type='password' required placeholder='Confirm your Password' onChange={(e) => {setRePassword(e.target.value)}} value={rePassword} autoComplete='on'/>
                <div className='flex items-center justify-center'> 
                    <button className='bg-[#9DB2BF] relative-dropdown p-1 px-2 text-lg hover:scale-105 active:scale-95 transition-all duration-300 rounded-md' onClick={handleSubmit} type='submit'> Sign Up</button> 
                </div>   
                <p className='text-lg text-red-700 py-1'>{msg}</p>
            </form>
            <p className='text-center text-[#DDE6ED]'>Already have an account?</p>
            <div className='flex items-center justify-center'> 
                <Link to='/signin'>
                    <button className='bg-transparent text-[#DDE6ED] p-1 px-2 text-lg hover:underline active:text-black transition-all duration-300 rounded-md' type='button'> Sign In</button> 
                </Link>
            </div>
        </div>
    );
}
export default Signup;