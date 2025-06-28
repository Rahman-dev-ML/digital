// src/app/layout.tsx
import './globals.css'

export const metadata = {
  title: 'Animal Library',
  description: 'Track your rescued animals',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
