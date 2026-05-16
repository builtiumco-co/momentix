/**
 * MOMENTIX Auth Utilities
 * Implements validation rules from Phase 1 PRD Appendix A
 */

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

export const validatePassword = (password) => {
  const minLength = 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  
  const errors = []
  if (password.length < minLength) errors.push(`Minimum ${minLength} characters`)
  if (!hasUpperCase) errors.push('At least 1 uppercase letter')
  if (!hasLowerCase) errors.push('At least 1 lowercase letter')
  if (!hasNumber) errors.push('At least 1 number')
  if (!hasSpecialChar) errors.push('At least 1 special character')
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export const getAuthErrorMessage = (error) => {
  if (!error) return null
  
  // Mapping Supabase/Postgres errors to PRD Appendix B codes
  const message = error.message.toLowerCase()
  
  if (message.includes('invalid format')) return 'Invalid email format'
  if (message.includes('already registered') || message.includes('already exists')) return 'Email already exists'
  if (message.includes('invalid login credentials')) return 'Invalid credentials'
  if (message.includes('too many requests')) return 'Too many login attempts. Try again in 5 minutes.'
  
  return error.message
}
