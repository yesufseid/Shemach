import Providers from '../componets/providers'
import Navbar from '../componets/navbar'
import Footer from '../components/footer'

export default function RootLayout({children}) {
  return (
    <html>
        <body>
            <Providers>
            <div>
                <Navbar />
              {children}
              <Footer />
            </div>
            </Providers>
        </body>
    </html>
  )
} 