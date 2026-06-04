const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

function getWebChatId() {
  let id = localStorage.getItem('crm_chat_session')
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36)
    localStorage.setItem('crm_chat_session', id)
  }
  return id
}

export async function sendToGemini(_history, userMessage) {
  const res = await fetch(`${API_BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userMessage, chatId: getWebChatId() }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `Server error ${res.status}`)
  }
  const { reply } = await res.json()
  return reply
}
