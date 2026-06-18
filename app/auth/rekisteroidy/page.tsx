'use client'

import { useState } from 'react'
import { createClient } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Rekisteroidy() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    role: 'customer'
                }
            }
        })

        if (error) {
            setError(error.message)
            setLoading(false)
            return
        }

        router.push('/auth/kirjaudu?viesti=tarkista-sahkoposti')
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Luo tili</h1>
                <p className="text-gray-500 mb-8">Liity Revive Loop -palveluun</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nimi
                        </label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
                            placeholder="Etunimi Sukunimi"
                            required
                        />
                    </div>

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
                            placeholder="Vähintään 6 merkkiä"
                            required
                            minLength={6}
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
                        {loading ? 'Luodaan tiliä...' : 'Luo tili'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Onko sinulla jo tili?{' '}
                    <Link href="/auth/kirjaudu" className="text-black font-medium hover:underline">
                        Kirjaudu sisään
                    </Link>
                </p>
            </div>
        </div>
    )
}