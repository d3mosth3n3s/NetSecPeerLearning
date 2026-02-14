// This is where we can implement common validation functions for good implementation

/**
 * Validate that a value is a non-empty string within a maximum length.
 * Returns the trimmed string on success or an error message on failure.
 */
export function validateStringInput(
  value: unknown,
  fieldName: string,
  maxLength: number = 50
): { valid: true; value: string } | { valid: false; error: string } {
  const blockedChars = /[<>"'&\/\\`|${}()\[\];:.,+=\-!@#%^*~]/

  if (value === null || value === undefined) {
    return { valid: false, error: `${fieldName} is required` }
  }

  if (typeof value !== 'string') {
    return { valid: false, error: `${fieldName} must be a string` }
  }

  const trimmed = value.trim()

  if (trimmed.length === 0) {
    return { valid: false, error: `${fieldName} must not be empty` }
  }

  if (trimmed.length > maxLength) {
    return { valid: false, error: `${fieldName} must not exceed ${maxLength} characters` }
  }

  if (blockedChars.test(trimmed)) {
    return { valid: false, error: `${fieldName} contains invalid characters. Only alphanumeric characters and spaces are allowed` }
  }

  return { valid: true, value: trimmed }
}

// Examples

// export function parseId(value: unknown): number | null {
//   if (value === null || value === undefined) {
//     return null
//   }
  
//   const num = typeof value === 'string' ? parseInt(value, 10) : Number(value)
  
//   // Must be a positive integer within safe range
//   if (isNaN(num) || !Number.isInteger(num) || num <= 0 || num > Number.MAX_SAFE_INTEGER) {
//     return null
//   }
  
//   return num
// }

// export function validateId(
//   value: unknown,
//   fieldName: string
// ): { valid: true; id: number } | { valid: false; error: string } {
//   const id = parseId(value)
  
//   if (id === null) {
//     return {
//       valid: false,
//       error: `${fieldName} must be a valid positive integer`
//     }
//   }
  
//   return { valid: true, id }
// }