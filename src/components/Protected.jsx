import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Protected({ children, userType }) {
  const navigate = useNavigate();

  if (userType !== "admin") {
    return <>
        <h2 className='text-2xl font-bold text-center mt-10'>Access Denied</h2>
        <p className='text-center mt-4'>You do not have permission to view this page.</p>
        <div className='flex justify-center mt-6'>
            <button onClick={() => navigate('/')} className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'>Go to Home</button>
        </div>
    </>
  }

  return <>{children}</>
}
