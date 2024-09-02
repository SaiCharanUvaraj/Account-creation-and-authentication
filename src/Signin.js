import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Signin() 
{
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const [data, setData] = useState(null);
    const [msg, setMsg] = useState("");
    const navigate=useNavigate();
    useEffect(()=>{
        let url = 'http://localhost:3500/users';
        const getData= async (url) => {
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
        getData(url);
    },[]);

    const handleSubmit= (e) =>
    {
        e.preventDefault();
        if(userName===""||password==="")
        {
            setMsg("This Username and Password is not incorrect.");
        }
        else
        {
            const toFind={id:userName,password:password};
            const isThere = data.find((item) => item.id === toFind.id && item.password === toFind.password);
            if(isThere!==undefined)
            {
                const data={id:"1",account:userName};
                const url = 'http://localhost:3500/signedIn/1';
                const postData = async(url,data) =>{
                    try
                    {
                        const response = await axios.patch(url,data);
                        console.log("Signed in successfully into your account "+response.data.account);
                    }
                    catch(error)
                    {
                        console.log(error);
                    }
                }
                postData(url,data);
                navigate('/profile');
                setMsg("");
            }
            else
            {
                setMsg("Your Username and Password is incorrect");
            }
        }
    }

    return (
        <div className='bg-[#27374D] sm:w-4/6 md:w-1/2 lg:w-2/6 rounded-xl p-5 w-5/6 '>
            <p className='text-3xl font-bold text-[#DDE6ED] bg-transparent text-center mb-2'>Sign In</p>
            <hr className='mb-10'/>
            <form className='grid place-items-center mb-5' autoComplete='on'>
                <input name='username' className='w-4/5 bg-[#DDE6ED] rounded-md p-1.5 focus:scale-105 mb-5 transition-all duration-300' type='text' required placeholder='User Name' onChange={(e) => {setUserName(e.target.value)}} value={userName} autoComplete='on'/>
                <input name='password' className='w-4/5 bg-[#DDE6ED] rounded-md p-1.5 focus:scale-105 mb-10 transition-all duration-300' type='password' required placeholder='Password' onChange={(e) => {setPassword(e.target.value)}} value={password} autoComplete='on'/>
                <div className='flex items-center justify-center'> 
                    <button className='bg-[#9DB2BF] p-1 px-2 text-lg hover:scale-105 active:scale-95 transition-all duration-300 rounded-md' onClick={handleSubmit} type='submit'> Sign In</button> 
                </div>   
                <p className='text-lg text-red-700 py-1'>{msg}</p>
            </form>
            <p className='text-center text-[#DDE6ED]'>Did'nt have an account?</p>
            <div className='flex items-center justify-center'> 
                <Link to='/signup'>
                <button className='bg-transparent text-[#DDE6ED] p-1 px-2 text-lg hover:underline active:text-black transition-all duration-300 rounded-md' type='button'> Sign Up</button> 
                </Link>
            </div>
        </div>
    );
}
export default Signin;