'use client'

import { useState } from 'react'
import { createClient } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Kirjaudu() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError('Väärä sähköposti tai salasana')
            setLoading(false)
            return
        }

        router.push('/')
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Kirjaudu sisään</h1>
                <p className="text-gray-500 mb-8">Tervetuloa takaisin</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Sähköposti
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="sinä@email.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Salasana
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="Salasanasi"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white rounded-lg px-4 py-3 font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors"
                    >
                        {loading ? 'Kirjaudutaan...' : 'Kirjaudu sisään'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Ei vielä tiliä?{' '}
                    <Link href="/auth/rekisteroidy" className="text-black font-medium hover:underline">
                        Luo tili
                    </Link>
                </p>
            </div>
        </div>
    )
}
