export function formatCurrencyVND(value: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(value)
}

export function formatDate(dateString: any) {
  if (!dateString) return ''

  const date = new Date(dateString)
  const now = new Date()
  const diffMs = (now as any) - (date as any)
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  if (diffSec < 60) return `${diffSec} seconds ago`
  if (diffMin < 60) return `${diffMin} minutes ago`
  if (diffHour < 24) return `${diffHour} hours ago`
  if (diffDay < 7) return `${diffDay} days ago`

  return date.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function formatMonth(dateString: any) {
  if (!dateString) return ''

  const date = new Date(dateString)
  return date.toLocaleString('vi-VN', {
    month: '2-digit',
    year: 'numeric'
  })
}
