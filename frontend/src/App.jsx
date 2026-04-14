import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Show, SignInButton, SignOutButton, SignUpButton, UserButton } from '@clerk/react'

function App() {
  return (
    <>
    <h1>Welcome to the app</h1>
      <header>
        <Show when="signed-out">
          <SignInButton/>
          <SignUpButton />
        </Show>
        <Show when="signed-in">
          <SignOutButton/>
          <UserButton />
        </Show>
      </header>
    </>
  )
}

export default App