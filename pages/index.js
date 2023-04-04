import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import SettingsModal from '@/components/SettingsModal'
import Prompt from '@/components/Prompt'
import Chat from '@/components/Chat'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <>
      <Head>
        <title>DuelingGPTs</title>
        <meta name="description" content="ChatGPT vs ChatGPT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>
      <main>
        <SettingsModal></SettingsModal>
        <div className='flex flex-col h-screen w-screen bg-chatgpt-grey-dark'>
          <Navbar></Navbar>
          <Chat></Chat>
          <div className='flex flex-col gap-2 mt-auto z-10'>
            <Prompt></Prompt>
            <Footer></Footer>
          </div>
        </div>
      </main>
    </>
  )
}
