export const formatIDR = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// Convert USD to IDR (approximate rate)
export const USDtoIDR = (usd) => {
  const rate = 15500 // Approximate USD to IDR rate
  return Math.round(usd * rate)
}
