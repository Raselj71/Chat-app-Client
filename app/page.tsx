"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { httpAxios } from "@/helper/httpaxios";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";


export default function Home() {
    const router=useRouter()

     const [user, setUser]=useState<{email:any,password:any}>({
       
        email:"",
        password:""
    })

      const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value}=e.target;
        setUser((state)=>({
            ...state,
            [name]:value
        }))
    }

    const handleSumbit= async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
       
       
         try {
             if(user.email.trim()===""){
            toast.warning("Email is required")
            return
        }
        else if(user.password.trim()===""){
            toast.warning("Password is required")
            return
        }
        const response=await httpAxios.post("/user/login",user)
         console.log(response)
         localStorage.setItem('token', response.data.token);
        if(response.data.status){
             toast.success("login Successfully")
             router.push('/dashbord')
          
        }else{
         toast.warning(response.data.message)
        }
       

         } catch (error) {
            
          
            // toast.error(error.response.data.message)
            
         }finally{
            // setLoading(false)
         }
    }


  return (
   <main className="w-[100vw] h-[100vh] items-center flex items-center justify-center gap-10">
      <section>
         <h1 className="text-5xl font-bold">vivechat</h1>
          <h2 className="mt-10">Connect with friends and the world <br /> arroud you on vivechat</h2>
      </section>

      <section>
          <div className="p-10 bg-white rounded-md">
                <form  onSubmit={handleSumbit}>
                   <div>
                    <input className="border-2 rounded-md text-black outline-none w-[20rem] h-[3rem] px-2" type="text" name="email" placeholder="Email" value={user.email}  onChange={handleInputChange}/>
                   </div>

                    <div>
                    <input className="border-2 rounded-md text-black outline-none w-[20rem] h-[3rem] px-2 mt-4" type="password" name="password" placeholder="password" value={user.password} onChange={handleInputChange}/>
                   </div>

                   <button className="border-2 rounded-md text-white bg-[#427D9D] w-[20rem] h-[3rem] px-2 mt-4" type="submit">Login</button>
                </form>

                <p className="text-black underline mt-4"> <Link href="/forget">Forget Password</Link> </p>
                 <button className="border-2 rounded-md text-white bg-[#c63434] w-[20rem] h-[3rem] px-2 mt-4 item"> <Link href="/signup">Create new Account!</Link> </button>
             
          </div>
      </section>
      <ToastContainer/>
   </main>
  );
}
