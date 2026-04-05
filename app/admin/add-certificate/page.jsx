"use client"
import React, { useState } from 'react'
import {  collection, addDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'






const Page = () => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    certificateNum: '',
    initialRegistration: '',
    dateOfIssue: '',
    dateOfExpiry: '',
    recertificationDue: '',
    country: '',
    standard: '',
    organization: '',
    address: '',
    scope: '',
    status: 'valid',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const docRef = await addDoc(collection(db, 'certificates'), {
        ...formData,
        createdAt: new Date().toISOString(),
      })
      setMessage(`Certificate added successfully! ID: ${docRef.id}`)
      setFormData({
        certificateNum: '',
        initialRegistration: '',
        dateOfIssue: '',
        dateOfExpiry: '',
        recertificationDue: '',
        country: '',
        standard: '',
        organization: '',
        address: '',
        scope: '',
        status: 'valid',
      })
    } catch (error) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div>
        <h2 className='text-3xl font-bold text-center'>Hi! You can add certificate here.</h2>
      </div>

      {message && (
        <div className={`mt-4 p-3 rounded text-sm ${message.startsWith('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      <div className='mt-6 w-[900px] flex justify-center certificate-form'>
        <form onSubmit={submitHandler} className='certificate-form w-[400px] p-8 border rounded flex flex-col gap-4'>

          <label>Certificate Number</label>
          <input name="certificateNum" value={formData.certificateNum} onChange={handleChange} type="text" placeholder='TSP/PK/ED' required />

          <label>Date of Initial Registration</label>
          <input name="initialRegistration" value={formData.initialRegistration} onChange={handleChange} type="date" required />

          <label>Date of Issue</label>
          <input name="dateOfIssue" value={formData.dateOfIssue} onChange={handleChange} type="date" required />

          <label>Date of Expiry</label>
          <input name="dateOfExpiry" value={formData.dateOfExpiry} onChange={handleChange} type="date" required />

          <label>Recertification Due Date</label>
          <input name="recertificationDue" value={formData.recertificationDue} onChange={handleChange} type="date" required />

          <label>Country</label>
          <input name="country" value={formData.country} onChange={handleChange} type="text" placeholder='Pakistan' required />

          <label>Standard</label>
          <input name="standard" value={formData.standard} onChange={handleChange} type="text" placeholder='ISO 21001:2018' required />

          <label>Organization</label>
          <input name="organization" value={formData.organization} onChange={handleChange} type="text" placeholder='University of...' required />

          <label>Address</label>
          <input name="address" value={formData.address} onChange={handleChange} type="text" placeholder='Address' required />

          <label>Scope</label>
          <input name="scope" value={formData.scope} onChange={handleChange} type="text" placeholder='Providing...' required />

          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="valid">Valid</option>
            <option value="invalid">Invalid</option>
          </select>

          <button className='w-full text-white bg-[#1f1f58] p-2 mt-3' type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>

        </form>
      </div>
    </div>
  )
}

export default Page