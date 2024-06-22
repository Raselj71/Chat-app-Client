import { useEffect, useState } from "react";
import Link from "next/link";
import jwt from 'jsonwebtoken';
import { httpAxios } from "@/helper/httpaxios";
import { Decipher } from "crypto";

function Sidenav() {
   const [user, setUser] = useState([]);
   const [token, setToken] = useState(""); 
   const[sender, setSender]=useState('');

   useEffect(() => {
     
     if (typeof window !== "undefined") {
       const storedToken = localStorage.getItem('token');
       setToken(storedToken);
     }
   }, []);

   useEffect(() => {
     if (token) {
       const fetchUsers = async () => {
         try {
           const response = await httpAxios.get('/user/alluser');
           const decode=jwt.decode(token, "rasel");
           console.log(decode)
           localStorage.setItem('id',decode.id);
          httpAxios.get(`http://localhost:5000/user/singleuser/${decode.id}`).
         then((response)=>{setSender(response.data.name)})
           const userdata=response.data.filter((data)=>{
             return data._id !=decode.id;
           })
           setUser(userdata);
           console.log(userdata)
         } catch (error) {
           console.error("Error fetching users:", error);
         }
       };

       fetchUsers();
     }
   }, [token]); 

  return (
    <section className="w-full h-full bg-secondary">
      <div className="bg-gray-800 border-b-2 p w-full text-center  text-4xl font-bold py-2">
        <p>{sender}</p>
      </div>
      <div className="overflow-y-hidden">
        {user && user.map((item, index) => (
           <li className="list-none   bg-primary m-2 mx-4  px-3 py-1 rounded-md hover:bg-gray-900" key={index}>
               <Link href={`/dashbord/${item._id}`}>
                <div>
                    <p>{item.name}</p>
                    <p>{item.phone}</p>
                </div>
               
               </Link>
           </li>
        ))}
      </div>
    </section>
  );
}

export default Sidenav;
