import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { validateEmail, validatePassword, getAuthErrorMessage } from '../utils/auth'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email, password, fullName) => {
    // PRD Validation
    if (!validateEmail(email)) throw new Error('Invalid email format')
    const passVal = validatePassword(password)
    if (!passVal.isValid) throw new Error(passVal.errors[0])

    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password, 
      options: { 
        data: { full_name: fullName } 
      } 
    })
    if (error) throw new Error(getAuthErrorMessage(error))
    return data
  }

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error(getAuthErrorMessage(error))
    return data
  }

  const signInWithGoogle = () =>
    supabase.auth.signInWithOAuth({ 
      provider: 'google', 
      options: { 
        redirectTo: `${window.location.origin}/dashboard` 
      } 
    })

  const signOut = () => supabase.auth.signOut()

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

