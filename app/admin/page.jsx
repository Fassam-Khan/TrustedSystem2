// app/admin/dashboard/page.jsx

"use client"
import React, { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'
import Link from 'next/link'

const Page = () => {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'certificates'))
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setCertificates(data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCertificates()
  }, [])

  const today = new Date()

  const total = certificates.length
  const valid = certificates.filter(c => c.status === 'valid').length
  const invalid = certificates.filter(c => c.status === 'invalid').length
  const expiringSoon = certificates.filter(c => {
    if (!c.dateOfExpiry) return false
    const expiry = new Date(c.dateOfExpiry)
    const diff = (expiry - today) / (1000 * 60 * 60 * 24)
    return diff > 0 && diff <= 30
  }).length
  const expired = certificates.filter(c => {
    if (!c.dateOfExpiry) return false
    return new Date(c.dateOfExpiry) < today
  }).length

  const recent = [...certificates]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)

  const stats = [
    { label: 'Total Certificates', value: total, color: 'bg-[#1f1f58]', text: 'text-white', icon: '📋' },
    { label: 'Valid', value: valid, color: 'bg-green-500', text: 'text-white', icon: '✅' },
    { label: 'Invalid', value: invalid, color: 'bg-red-500', text: 'text-white', icon: '❌' },
    { label: 'Expiring in 30 Days', value: expiringSoon, color: 'bg-yellow-400', text: 'text-gray-800', icon: '⚠️' },
    { label: 'Expired', value: expired, color: 'bg-gray-400', text: 'text-white', icon: '🕒' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6 w-full">
      <div className=" mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1f1f58]">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            {today.toLocaleDateString('en-PK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Stats Cards */}
        {loading ? (
          <div className="text-center py-20 text-gray-400 text-lg">Loading dashboard...</div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {stats.map((stat, idx) => (
                <div key={idx} className={`${stat.color} ${stat.text} rounded-xl p-5 shadow flex flex-col gap-1`}>
                  <span className="text-2xl">{stat.icon}</span>
                  <span className="text-3xl font-bold">{stat.value}</span>
                  <span className="text-xs font-medium opacity-90">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow p-6 border">
                <h2 className="text-lg font-bold text-[#1f1f58] mb-4">Quick Actions</h2>
                <div className="flex flex-col gap-3">
                  <Link href="/admin/add-certificate"
                    className="flex items-center gap-3 bg-[#1f1f58] text-white px-4 py-3 rounded-lg hover:bg-[#2d2d80] transition text-sm font-medium">
                    ➕ Add New Certificate
                  </Link>
                  <Link href="/admin/all-certificates"
                    className="flex items-center gap-3 bg-gray-100 text-[#1f1f58] px-4 py-3 rounded-lg hover:bg-gray-200 transition text-sm font-medium">
                    📋 View All Certificates
                  </Link>
                </div>
              </div>

              {/* Expiry Warning */}
              <div className="bg-white rounded-xl shadow p-6 border">
                <h2 className="text-lg font-bold text-[#1f1f58] mb-4">Expiry Alerts</h2>
                {expiringSoon === 0 && expired === 0 ? (
                  <p className="text-green-600 text-sm">✅ No expiry issues found.</p>
                ) : (
                  <div className="flex flex-col gap-2 text-sm">
                    {expiringSoon > 0 && (
                      <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 px-4 py-2 rounded-lg">
                        ⚠️ <strong>{expiringSoon}</strong> certificate(s) expiring within 30 days
                      </div>
                    )}
                    {expired > 0 && (
                      <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-2 rounded-lg">
                        🕒 <strong>{expired}</strong> certificate(s) already expired
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Recent Certificates Table */}
            <div className="bg-white rounded-xl shadow border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#1f1f58]">Recently Added</h2>
                <Link href="/admin/all-certificates" className="text-sm text-[#1f1f58] underline hover:opacity-70">
                  View All →
                </Link>
              </div>

              {recent.length === 0 ? (
                <p className="text-gray-400 text-sm">No certificates added yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100 text-gray-600">
                        <th className="px-4 py-2 text-left">Certificate No.</th>
                        <th className="px-4 py-2 text-left">Organization</th>
                        <th className="px-4 py-2 text-left">Country</th>
                        <th className="px-4 py-2 text-left">Expiry</th>
                        <th className="px-4 py-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recent.map((cert, idx) => (
                        <tr key={cert.id} className={`border-t ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                          <td className="px-4 py-2 font-medium text-[#1f1f58]">{cert.certificateNum || '—'}</td>
                          <td className="px-4 py-2 text-gray-700">{cert.organization || '—'}</td>
                          <td className="px-4 py-2 text-gray-700">{cert.country || '—'}</td>
                          <td className="px-4 py-2 text-gray-700">{cert.dateOfExpiry || '—'}</td>
                          <td className="px-4 py-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${cert.status === 'valid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                              {cert.status || 'valid'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Page