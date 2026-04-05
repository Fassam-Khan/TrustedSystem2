// admin/all-certificates/page.jsx

"use client"
import React, { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'

const Page = () => {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({})
  const [message, setMessage] = useState('')
  const [search, setSearch] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  // Fetch all certificates
  const fetchCertificates = async () => {
    setLoading(true)
    try {
      const snapshot = await getDocs(collection(db, 'certificates'))
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setCertificates(data)
    } catch (error) {
      setMessage('Error fetching certificates: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCertificates()
  }, [])

  // Delete
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'certificates', id))
      setCertificates(prev => prev.filter(c => c.id !== id))
      setMessage('Certificate deleted successfully.')
      setDeleteConfirm(null)
    } catch (error) {
      setMessage('Error deleting: ' + error.message)
    }
  }

  // Start editing
  const handleEdit = (cert) => {
    setEditingId(cert.id)
    setEditData({ ...cert })
  }

  // Save edit
  const handleSave = async () => {
    try {
      const { id, ...dataToUpdate } = editData
      await updateDoc(doc(db, 'certificates', editingId), dataToUpdate)
      setCertificates(prev =>
        prev.map(c => (c.id === editingId ? { ...editData, id: editingId } : c))
      )
      setMessage('Certificate updated successfully.')
      setEditingId(null)
    } catch (error) {
      setMessage('Error updating: ' + error.message)
    }
  }

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value })
  }

  const filtered = certificates.filter(c =>
    [c.certificateNum, c.organization, c.country, c.standard]
      .join(' ').toLowerCase().includes(search.toLowerCase())
  )

  const fields = [
    { key: 'certificateNum', label: 'Certificate No.' },
    { key: 'organization', label: 'Organization' },
    { key: 'country', label: 'Country' },
    { key: 'standard', label: 'Standard' },
    { key: 'dateOfIssue', label: 'Issue Date' },
    { key: 'dateOfExpiry', label: 'Expiry Date' },
    { key: 'initialRegistration', label: 'Initial Reg.' },
    { key: 'recertificationDue', label: 'Recert. Due' },
    { key: 'address', label: 'Address' },
    { key: 'scope', label: 'Scope' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#1f1f58]">All Certificates</h1>
            <p className="text-gray-500 text-sm mt-1">{certificates.length} total certificates</p>
          </div>
          <input
            type="text"
            placeholder="Search by org, country, cert no..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border px-4 py-2 rounded w-72 text-sm focus:outline-none focus:ring-2 focus:ring-[#1f1f58]"
          />
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-4 px-4 py-3 rounded text-sm ${message.startsWith('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
            <button className="ml-4 font-bold" onClick={() => setMessage('')}>✕</button>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="text-center py-20 text-gray-400 text-lg">Loading certificates...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-lg">No certificates found.</div>
        ) : (
          <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-[#1f1f58] text-white">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  {fields.map(f => (
                    <th key={f.key} className="px-4 py-3 text-left whitespace-nowrap">{f.label}</th>
                  ))}
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((cert, idx) => (
                  <tr key={cert.id} className={`border-t ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition`}>
                    <td className="px-4 py-3 text-gray-400">{idx + 1}</td>

                    {editingId === cert.id ? (
                      <>
                        {fields.map(f => (
                          <td key={f.key} className="px-2 py-2">
                            <input
                              name={f.key}
                              value={editData[f.key] || ''}
                              onChange={handleChange}
                              type={f.key.toLowerCase().includes('date') || f.key.toLowerCase().includes('due') || f.key.toLowerCase().includes('registration') ? 'date' : 'text'}
                              className="border rounded px-2 py-1 w-full text-xs focus:outline-none focus:ring-1 focus:ring-[#1f1f58]"
                            />
                          </td>
                        ))}
                        <td className="px-2 py-2">
                          <select
                            name="status"
                            value={editData.status || 'valid'}
                            onChange={handleChange}
                            className="border rounded px-2 py-1 text-xs focus:outline-none"
                          >
                            <option value="valid">Valid</option>
                            <option value="invalid">Invalid</option>
                          </select>
                        </td>
                        <td className="px-4 py-3 flex gap-2">
                          <button
                            onClick={handleSave}
                            className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                          >Save</button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-xs hover:bg-gray-400"
                          >Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        {fields.map(f => (
                          <td key={f.key} className="px-4 py-3 whitespace-nowrap text-gray-700 max-w-[150px] truncate">
                            {cert[f.key] || '—'}
                          </td>
                        ))}
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${cert.status === 'valid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                            {cert.status || 'valid'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(cert)}
                              className="bg-[#1f1f58] text-white px-3 py-1 rounded text-xs hover:bg-[#2d2d80]"
                            >Edit</button>
                            {deleteConfirm === cert.id ? (
                              <>
                                <button
                                  onClick={() => handleDelete(cert.id)}
                                  className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
                                >Confirm</button>
                                <button
                                  onClick={() => setDeleteConfirm(null)}
                                  className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-xs"
                                >No</button>
                              </>
                            ) : (
                              <button
                                onClick={() => setDeleteConfirm(cert.id)}
                                className="bg-red-100 text-red-600 px-3 py-1 rounded text-xs hover:bg-red-200"
                              >Delete</button>
                            )}
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page