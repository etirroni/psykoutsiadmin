import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { Fredericka_the_Great } from 'next/font/google'
 
const roboto = Fredericka_the_Great({
  weight: '400',
  subsets: ['latin'],
})

export default function App({
  Component, pageProps: { session, ...pageProps }
}) {
  return (
    <main className={roboto.className}>
    <SessionProvider session={session}>
      <Component {...pageProps}/>
    </SessionProvider>
    </main>
  )
}