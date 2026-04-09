import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'About Todo & URL Tools - Developer Tools Suite',
  description: 'Learn about Todo & URL Tools - a comprehensive suite of free developer tools including task management, JSON formatting, Base64 encoding, color palette generation, URL parsing, and rich text editing.',
  keywords: [
    'about todo tools',
    'developer tools suite',
    'web development tools',
    'productivity tools',
    'free online tools',
    'task management',
    'json tools',
    'base64 tools',
    'color tools',
    'url tools',
    'text editor',
    'about page',
    'tool suite'
  ],
  openGraph: {
    title: 'About Todo & URL Tools - Developer Tools Suite',
    description: 'Learn about Todo & URL Tools - a comprehensive suite of free developer tools including task management, JSON formatting, Base64 encoding, color palette generation, URL parsing, and rich text editing.',
    url: 'https://todo-url-tools.vercel.app/about',
    images: [
      {
        url: '/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'About Todo & URL Tools',
      },
    ],
  },
  twitter: {
    title: 'About Todo & URL Tools - Developer Tools Suite',
    description: 'Learn about Todo & URL Tools - a comprehensive suite of free developer tools including task management, JSON formatting, Base64 encoding, color palette generation, URL parsing, and rich text editing.',
    images: ['/og-about.jpg'],
  },
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">About Todo & URL Tools</h1>
            
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  Todo & URL Tools is designed to be your All-in-One productivity suite. 
                  We combine powerful task management with advanced URL parsing capabilities 
                  to help developers and professionals work more efficiently.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium text-gray-700">📝 Rich Text Editor</h3>
                    <p className="text-gray-600">
                      Professional text editing with formatting options, 
                      headers, lists, and media support.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium text-gray-700">🔗 URL Parser</h3>
                    <p className="text-gray-600">
                      Advanced URL analysis with protocol detection, 
                      parameter extraction, and encoding/decoding tools.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium text-gray-700">📋 Todo Manager</h3>
                    <p className="text-gray-600">
                      Complete task management with CRUD operations, 
                      status tracking, and local storage.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium text-gray-700">🎨 3D Background</h3>
                    <p className="text-gray-600">
                      Beautiful animated Three.js background with 
                      interactive objects and smooth cursor following.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Technology Stack</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Frontend</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Next.js 14 with App Router</li>
                      <li>• React 18 with modern hooks</li>
                      <li>• Tailwind CSS for styling</li>
                      <li>• Three.js for 3D animations</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Storage</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• LocalStorage for todos</li>
                      <li>• Client-side processing</li>
                      <li>• No server dependencies</li>
                      <li>• Privacy-first approach</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
