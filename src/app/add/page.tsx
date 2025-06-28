'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function AddAnimal() {
  /* ───── form state ───── */
  const [name, setName]           = useState('')
  const [species, setSpecies]     = useState('')
  const [rescueDate, setRescueDate] = useState('')
  const [status, setStatus]       = useState('')
  const [location, setLocation]   = useState('')
  const [notes, setNotes]         = useState('')
  const [file, setFile]           = useState<File | null>(null)
  const [loading, setLoading]     = useState(false)

  /* ───── submit ───── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !file) return alert('Name and photo are required.')
    setLoading(true)

    const ext      = file.name.split('.').pop()
    const fileName = `${Date.now()}.${ext}`

    const { error: upErr } = await supabase
      .storage.from('animal-photos').upload(fileName, file)

    if (upErr) {
      console.error(upErr); alert('Image upload failed.'); return setLoading(false)
    }

    const { error: dbErr } = await supabase.from('animals').insert({
      name,
      species: species   || null,
      rescue_date: rescueDate || null,
      status:  status    || null,
      location: location || null,
      notes:    notes    || null,
      photo_path: fileName,
    })

    if (dbErr) { console.error(dbErr); alert('Insert failed.') }
    else       { window.location.href = '/' }

    setLoading(false)
  }

  /* ───── ui ───── */
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-emerald-50 to-teal-100 py-14 px-4">
      <div className="mx-auto w-full max-w-lg rounded-3xl bg-white/75 backdrop-blur-md shadow-2xl ring-1 ring-black/5">
        <header className="border-b border-black/10 px-8 py-6">
          <h1 className="text-2xl font-extrabold text-gray-800">Add Rescued Animal</h1>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5 px-8 py-8">

          {/** NAME */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full rounded-md border border-gray-300 bg-white/60
                         px-3 py-2 text-sm text-gray-900 shadow-sm
                         focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300"
            />
          </div>

          {/** SPECIES */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Species</label>
            <input
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              className="block w-full rounded-md border border-gray-300 bg-white/60
                         px-3 py-2 text-sm text-gray-900 shadow-sm
                         focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300"
            />
          </div>

          {/** RESCUE DATE */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Rescue Date</label>
            <input
              type="date"
              value={rescueDate}
              onChange={(e) => setRescueDate(e.target.value)}
              className="block w-full rounded-md border border-gray-300 bg-white/60
                         px-3 py-2 text-sm text-gray-900 shadow-sm
                         focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300"
            />
          </div>

          {/** STATUS */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
            <input
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="In Care / Adopted"
              className="block w-full rounded-md border border-gray-300 bg-white/60
                         px-3 py-2 text-sm text-gray-900 shadow-sm
                         focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300"
            />
          </div>

          {/** LOCATION */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Location</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="block w-full rounded-md border border-gray-300 bg-white/60
                         px-3 py-2 text-sm text-gray-900 shadow-sm
                         focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300"
            />
          </div>

          {/** NOTES */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="block w-full rounded-md border border-gray-300 bg-white/60
                         px-3 py-2 text-sm text-gray-900 shadow-sm
                         focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300"
            />
          </div>

          {/** PHOTO */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Photo <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="file:mr-4 file:rounded-full file:border-0
                         file:bg-emerald-600 file:px-4 file:py-2
                         file:text-sm file:font-semibold file:text-white
                         hover:file:bg-emerald-700"
            />
          </div>

          {/** SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-md bg-emerald-600
                       px-4 py-2 font-semibold text-white shadow-lg transition
                       hover:bg-emerald-700 disabled:opacity-60"
          >
            {loading ? 'Saving…' : 'Save Animal'}
          </button>
        </form>
      </div>
    </div>
  )
}
