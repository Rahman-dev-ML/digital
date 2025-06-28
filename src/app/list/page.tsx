import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

type Animal = {
  id: string
  name: string
  species: string | null
  rescue_date: string | null
  status: string | null
  location: string | null
  notes: string | null
  photo_path: string | null
}

export default async function ListPage() {
  const { data: animals, error } = await supabase
    .from('animals')
    .select('*')
    .order('rescue_date', { ascending: false })

  if (error) {
    console.error(error)
    return (
      <main className="min-h-screen flex items-center justify-center bg-red-50">
        <p className="rounded bg-red-100 px-6 py-4 text-sm text-red-700 shadow">
          Error loading animals — please try again later.
        </p>
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-emerald-50 to-teal-100 py-14 px-4">
      <div className="mx-auto max-w-6xl">
        {/* header */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Your Rescued Animals
          </h1>
          <Link
            href="/"
            className="rounded-md bg-gray-800/90 px-4 py-2 text-sm font-semibold text-white
                       shadow hover:bg-gray-900"
          >
            ⬅ Back to menu
          </Link>
        </div>

        {animals?.length ? (
          <ul
            className="grid gap-8"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}
          >
            {animals.map((a) => (
              <li
                key={a.id}
                className="overflow-hidden rounded-2xl bg-white/80 backdrop-blur-lg
                           shadow-lg ring-1 ring-black/5 transition hover:shadow-2xl"
              >
                {/* photo */}
                {a.photo_path ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/animal-photos/${a.photo_path}`}
                    alt={a.name}
                    className="h-48 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-48 items-center justify-center bg-gray-200 text-gray-500">
                    No photo
                  </div>
                )}

                {/* details */}
                <div className="space-y-1 px-5 py-4 text-gray-800">
                  <h2 className="text-lg font-semibold">{a.name}</h2>
                  <p className="text-xs text-gray-600">
                    {a.species ?? 'Unknown'} •{' '}
                    {a.rescue_date
                      ? new Date(a.rescue_date).toLocaleDateString()
                      : 'No date'}
                  </p>
                  {a.status && <p className="text-xs">Status: {a.status}</p>}
                  {a.location && <p className="text-xs">Location: {a.location}</p>}
                  {a.notes && (
                    <p className="mt-1 line-clamp-3 text-xs text-gray-600">
                      {a.notes}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No animals yet — add one!</p>
        )}
      </div>
    </div>
  )
}
