import './globals.css'
import ThreeBackground from '../components/ThreeBackground'

export const metadata = {
  title: 'Todo App & URL Parser',
  description: 'A Next.js app with Todo management and URL parsing tools',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative">
        <div className="relative z-10">
          {children}
        </div>
        <ThreeBackground />
      </body>
    </html>
  )
}
