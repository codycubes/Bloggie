import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

export const ErrorHandling: React.FC = () => {
  return (
    <div className='text-center my-8 space-y-5'>
        <h2 className='font-bold text-4xl'>Error, page not found.</h2>
        <h2 className='pb-2'>Please go back to sign in.</h2>

        <Link to='/signin' className='bg-blue-500 text-white rounded-full px-3 py-2'></Link>
    </div>
  )
}