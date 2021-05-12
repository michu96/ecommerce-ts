import React, { useState } from 'react'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      <form>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          required
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          required
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <button type="submit">Login</button>
      </form>
      )
    </>
  )
}
