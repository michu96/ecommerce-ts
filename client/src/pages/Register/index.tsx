import React, { useState } from 'react'

export const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

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
        <input
          type="password"
          name="password2"
          id="password2"
          value={password2}
          required
          placeholder="Repeat password"
          onChange={(e) => {
            setPassword2(e.target.value)
          }}
        />
        <button type="submit">Register</button>
      </form>
    </>
  )
}
