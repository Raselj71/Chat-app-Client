"use client"
import Link from "next/link"
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { httpAxios } from "@/helper/httpaxios";
import { useRouter } from "next/navigation";


export default function Page(){

       const router=useRouter()

      const [user, setUser]=useState<{name:any,email:any,phone:any, password:any}>({
        name:"",
        email:"",
        phone:"",
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

        console.log(user)
      
       
       
         try {
             if(user.email.trim()===""){
            toast.warning("Email is required")
            return
        }else if(user.name.trim()===""){
            toast.warning("Name is required");
            return
        }else if(user.phone.trim()===""){
            toast.warning("PHone is required");
            return
        }
        else if(user.password.trim()===""){
            toast.warning("Password is required")
            return
        }
        const response=await httpAxios.post("/user/signup",user)
         console.log(response)
        if(response.data.status){
             toast.success("Account Created Successfully")
             router.push('/')
           
        }else{
             toast.warning(response.data.message)
        }
       

         } catch (error) {
            
     
            // toast.error(error.response.data.message);
           
            
            
         }
    }



    return  <main className="w-[100vw] h-[100vh] items-center flex items-center justify-center gap-10">
      <section>
         <h1 className="text-5xl font-bold">vivechat</h1>
          <h2 className="mt-6">vivechat helps you to connect and share <br></br> with the people in your life</h2>
      </section>

      <section>
          <div className="p-10 bg-white rounded-md">
                <form onSubmit={handleSumbit}>

                      <div>
                    <input className="border-2 rounded-md text-black outline-none w-[20rem] h-[3rem] px-2" type="text" name="name" placeholder="name" value={user.name} onChange={handleInputChange}/>
                   </div>
                   <div>
                    <input className="border-2 rounded-md text-black outline-none w-[20rem] h-[3rem] px-2 mt-4" type="text" name="email" placeholder="Email" value={user.email} onChange={handleInputChange} />
                   </div>
                 
                   <div>
                    <input className="border-2 rounded-md text-black outline-none w-[20rem] h-[3rem] px-2 mt-4" type="text" name="phone" placeholder="phone" value={user.phone} onChange={handleInputChange} />
                   </div>
                    <div>
                    <input className="border-2 rounded-md text-black outline-none w-[20rem] h-[3rem] px-2 mt-4" type="password" name="password" placeholder="password" value={user.password} onChange={handleInputChange}/>
                   </div>

                   <button className="border-2 rounded-md text-white bg-[#427D9D] w-[20rem] h-[3rem] px-2 mt-4" type="submit">Signup</button>
                </form>

             
                 <button className="border-2 rounded-md text-white bg-[#c63434] w-[20rem] h-[3rem] px-2 mt-4 item"> <Link href="/">Already have an account!</Link> </button>
             
          </div>
      </section>
      <ToastContainer/>
   </main>
}