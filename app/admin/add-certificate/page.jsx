"use client"
import AddCertiForm from '@/components/AddCertiForm'
import React from 'react'


const page = () => {

  const submitHandler =(e)=>{
    e.preventDefault()

    
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
        
        <div>
            <h2 className='text-3xl font-bold text-center'>Hi! You can add certificate here.</h2>
        </div>

        <div className='mt-6  w-[900px] flex justify-center certificate-form'>
            <form onSubmit={submitHandler} className='certificate-form w-[400px] p-8 border rounded flex flex-col gap-4'>
              
              <label htmlFor="certificate">Certificate Number</label>
              <input type="text" placeholder='TSP/PK/ED'  />                      

              <label htmlFor="InitialRegistration">Date of Initial Registration</label>
              <input type="date" />

              <label>Date of Issue:</label>
              <input type="date" />

              <label>Date of Expiry:</label>
              <input type="date" />

              <label>Recertification Due Date:</label>
              <input type="date" />

              <label>Country:</label>
              <input type="text" placeholder='Pakistan'/>

              <label>Standard:</label>
              <input type="text" placeholder='ISO 21001:2018' />

              <label>Organization:</label>
              <input type="text" placeholder='University of...' />

              <label>Address:</label>
              <input type="text" placeholder='Address' />

              <label>Scope:</label>
              <input type="text" placeholder='Providing...' />

              <select name="status">
                <option value="valid">Valid</option>
                <option value="invalid">Invalid</option>
              </select>

              <button className='w-full text-white bg-[#1f1f58] p-2 mt-3' type="submit">
                Submit
              </button>

            </form>
        </div>
      
    </div>
  )
}

export default page