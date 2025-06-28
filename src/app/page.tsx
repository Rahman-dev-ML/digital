// src/app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [showSplash, setShowSplash] = useState(true)

  /* ───────── Switch off splash after 3 s ───────── */
  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 3000)
    return () => clearTimeout(t)
  }, [])

  const splashBg =
    'https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1200,q_60/lsci/db/PICTURES/CMS/279100/279100.jpg'
  const menuBg = '/cirus1.jpeg'       // lives in /public

  return (
    <div
      className={`
        relative flex min-h-screen w-full bg-no-repeat bg-center
        bg-contain sm:bg-cover transition-[background-image] duration-700
        ${showSplash
          ? 'items-center justify-center'
          : 'items-start md:items-center justify-center pt-[12vh] md:pt-0'}
      `}
      style={{ backgroundImage: `url(${showSplash ? splashBg : menuBg})` }}
    >
      {/* Dark overlay for readability (30 % instead of 40 %) */}
      <div className="pointer-events-none absolute inset-0 bg-black/30" />

      {showSplash ? (
        /* ───────── 3-second SPLASH ───────── */
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            Fizza
          </h1>
          <p className="mt-2 max-w-xs md:max-w-md text-lg md:text-2xl font-semibold text-white drop-shadow">
            Welcome to your digital library
          </p>
        </div>
      ) : (
        /* ───────── MENU ───────── */
        <div
          className={`
            relative z-10 flex w-full flex-col items-center space-y-8 px-4 text-center
            /* lift a little on desktop so cat stays visible */
            md:-translate-y-10
          `}
        >
          {/* Heading sits above kitty’s head on mobile */}
          <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            No Men Allowed
          </h1>

          <div className="flex flex-col gap-6 md:flex-row">
            <button
              onClick={() => router.push('/add')}
              className="rounded-full bg-gradient-to-br from-blue-500 to-indigo-600
                         px-8 py-3 text-lg font-semibold text-white shadow-xl
                         transition duration-200 hover:from-blue-600 hover:to-indigo-700
                         hover:scale-105"
            >
              Add rescued animal
            </button>

            <button
              onClick={() => router.push('/list')}
              className="rounded-full bg-gradient-to-br from-green-500 to-teal-600
                         px-8 py-3 text-lg font-semibold text-white shadow-xl
                         transition duration-200 hover:from-green-600 hover:to-teal-700
                         hover:scale-105"
            >
              View rescued animals
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
