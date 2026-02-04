// This is where we can implement common validation functions for good implementation

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