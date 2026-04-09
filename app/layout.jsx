import './globals.css'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Todo App & URL Parser',
  description: 'A Next.js app with Todo management and URL parsing tools',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        {children}
      <Footer />
      </body>
    </html>
  )
}
