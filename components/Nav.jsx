"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"

const Nav = () => {

  const [isUserLoggedIn] = useState(true)
  const [providers, setProviders] = useState(null)

  useEffect(() => {
    (async () => {
      const res = await getProviders()
      setProviders(res)
    })()
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image 
        src="/assets/images/logo.svg"
        alt="Promptopia Logo"
        width={30}
        height={30}
         />
         <p className="logo_text">Promptopia</p>
      </Link>
      {/* Desktop Navigation */}
      { isUserLoggedIn ? (
        <div className="flex gap-3 md:gap-5">
          <Link href='/create-prompt' className="black_btn">
            Create Post
          </Link>
          <button type="button" onClick={signOut} className="outline_btn">
            Sign Out
          </button>
          <Link href='/profile'>
            <Image
            src='/assets/images/logo.svg'
            width={37}
            height={37}
            className="rounded-full"
            alt="profile"
             />
          </Link>
        </div>
      ) : (
        <>
          { providers && Object.values(providers).map((provider) => {
            <button 
            type="button"
            key={provider.name}
            onClick={() => {
              signIn(provider.id)
            }}
            className="black_btn">
              Sign In
            </button>
          }) }
        </>
      )}

      { /* Mobile Navigation */ }
      { isUserLoggedIn ? (
        <div className="sm:hidden flex relative">

        </div>
      ) : (<></>) }

      <div></div>
    </nav>
  )
}

export default Nav