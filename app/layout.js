import './globals.css'

export const metadata = {
  title: 'Todo App & URL Parser',
  description: 'A Next.js app with Todo management and URL parsing tools',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
