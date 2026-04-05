"use client"
import React, { useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

const SearchCerti = () => {
  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [notFound, setNotFound] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()
    if (!searchValue.trim()) return

    setLoading(true)
    setResult(null)
    setNotFound(false)

    try {
      const q = query(
        collection(db, 'certificates'),
        where('certificateNum', '==', searchValue.trim())
      )
      const snapshot = await getDocs(q)

      if (snapshot.empty) {
        setNotFound(true)
      } else {
        const cert = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() }
        setResult(cert)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col items-center gap-4'>
      <form onSubmit={submitHandler} className='flex flex-col items-center gap-4'>
        <input
          type="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder='Enter Certificate / Report No.'
          className='pl-3 placeholder:text-lg placeholder:text-black placeholder:font-bold bg-white p-3 outline-none rounded-3xl w-[300px]'
        />
        <button
          type="submit"
          disabled={loading}
          className='bg-[#1f1f58] text-white px-6 py-2 rounded-3xl hover:bg-[#2d2d80] transition'
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* Not Found */}
      {notFound && (
        <p className='text-red-500 font-medium'>❌ No Certificate Found</p>
      )}

      {/* Result Card */}
      {result && (
        <div className='bg-white rounded-xl shadow-lg p-6 w-[500px] mt-4 border'>
          <h2 className='text-xl font-bold text-[#1f1f58] mb-4'>Certificate Details</h2>
          <div className='grid grid-cols-2 gap-3 text-sm'>
            <div>
              <p className='text-gray-400'>Certificate No.</p>
              <p className='font-semibold'>{result.certificateNum || '—'}</p>
            </div>
            <div>
              <p className='text-gray-400'>Organization</p>
              <p className='font-semibold'>{result.organization || '—'}</p>
            </div>
            <div>
              <p className='text-gray-400'>Country</p>
              <p className='font-semibold'>{result.country || '—'}</p>
            </div>
            <div>
              <p className='text-gray-400'>Standard</p>
              <p className='font-semibold'>{result.standard || '—'}</p>
            </div>
            <div>
              <p className='text-gray-400'>Date of Issue</p>
              <p className='font-semibold'>{result.dateOfIssue || '—'}</p>
            </div>
            <div>
              <p className='text-gray-400'>Date of Expiry</p>
              <p className='font-semibold'>{result.dateOfExpiry || '—'}</p>
            </div>
            <div>
              <p className='text-gray-400'>Initial Registration</p>
              <p className='font-semibold'>{result.initialRegistration || '—'}</p>
            </div>
            <div>
              <p className='text-gray-400'>Recertification Due</p>
              <p className='font-semibold'>{result.recertificationDue || '—'}</p>
            </div>
            <div className='col-span-2'>
              <p className='text-gray-400'>Address</p>
              <p className='font-semibold'>{result.address || '—'}</p>
            </div>
            <div className='col-span-2'>
              <p className='text-gray-400'>Scope</p>
              <p className='font-semibold'>{result.scope || '—'}</p>
            </div>
            <div className='col-span-2'>
              <p className='text-gray-400'>Status</p>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${result.status === 'valid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                {result.status?.toUpperCase() || 'VALID'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchCerti