import './globals.css'
import Head from "next/head";
import type { Metadata } from 'next'
import { Ubuntu} from 'next/font/google';
import NavB from "./components/navb/NavB";
import Client from "./components/Client"
import RegisterModel from "./components/models/RegisterModel"
import LoginModel from "./components/models/LoginModel"
import ToasterProvider from './providers/ToasterProvider';
import getCurrentUser from './actions/getCurrentUser';
import RentModel from './components/models/RentModel';
import SearchModel from "./components/models/SearchModel";

export const metadata: Metadata = {
  title: 'rentzy',
  description: 'Endless Rentless, Infinite Experiences',
}

const font = Ubuntu({
  subsets: ["latin"],
  weight: ['300']
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      {/* <Head>
        <link rel="icon" href="/images/rentzy2.png" type="image/png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head> */}
      <body className={font.className}>
        <Client>
          <ToasterProvider/>
          <SearchModel/>
          <RegisterModel />
          <LoginModel />
          <RentModel />
          <NavB currentUser= {currentUser}/>
        </Client>
        <div className='pb-20 pt-28'>
          {children}
        </div>
        
      </body>
    </html>
  )
}
