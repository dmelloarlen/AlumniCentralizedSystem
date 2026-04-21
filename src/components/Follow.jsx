import React from 'react'
import { useNavigate } from 'react-router-dom';

const sampleData = [
    {
        name: "John Doe",
        profilePicture: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
        name: "Jane Smith",
        profilePicture: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
        name: "Alice Johnson",
        profilePicture: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
        name: "Bob Wilson",
        profilePicture: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    }
]

export default function Follow() {

    const navigate = useNavigate();

  return (
    <div className='flex justify-center'>
        <div>
            {sampleData.map((data) =>(
                <div className='container w-sm lg:w-6xl my-10 p-2 flex gap-2 shadow-lg rounded-lg hover:scale-102 transition-transform duration-300 cursor-pointer' onClick={()=> navigate('/profile')}>
                <img src={data.profilePicture} alt="Alumni" className='h-15 w-15 rounded-full'/>
                <h4 className='text-md lg:text-2xl mt-4'>{data.name}</h4>
            </div>))}
        </div>
    </div>
  )
}
