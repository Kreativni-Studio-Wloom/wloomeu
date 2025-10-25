import { useState } from 'react'

export default function Inquiry() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.target)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      subject: formData.get('subject'),
      message: formData.get('message')
    }

    try {
      const response = await fetch('http://localhost:3001/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()
      
      if (result.success) {
        setSent(true)
      } else {
        setError('Chyba při odesílání emailu. Zkuste to prosím znovu.')
      }
    } catch (err) {
      setError('Chyba při odesílání emailu. Zkuste to prosím znovu.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 max-w-2xl">
      <h2 className="text-xl mb-2">Poslat poptávku</h2>
      <p className="text-green-500 mb-4">Vyplň formulář a doručíme ho na info@wloom.eu</p>
      {!sent ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block mb-1 text-green-500">Jméno</label>
            <input required name="name" className="w-full bg-black/60 border border-green-700/50 px-3 py-2 outline-none focus:ring-1 focus:ring-green-600" />
          </div>
          <div>
            <label className="block mb-1 text-green-500">Email</label>
            <input required type="email" name="email" className="w-full bg-black/60 border border-green-700/50 px-3 py-2 outline-none focus:ring-1 focus:ring-green-600" />
          </div>
          <div>
            <label className="block mb-1 text-green-500">Telefon</label>
            <input name="phone" className="w-full bg-black/60 border border-green-700/50 px-3 py-2 outline-none focus:ring-1 focus:ring-green-600" />
          </div>
          <div>
            <label className="block mb-1 text-green-500">Předmět</label>
            <input name="subject" className="w-full bg-black/60 border border-green-700/50 px-3 py-2 outline-none focus:ring-1 focus:ring-green-600" />
          </div>
          <div>
            <label className="block mb-1 text-green-500">Zpráva</label>
            <textarea required name="message" rows="6" className="w-full bg-black/60 border border-green-700/50 px-3 py-2 outline-none focus:ring-1 focus:ring-green-600"></textarea>
          </div>
          {error && <div className="text-red-400">{error}</div>}
          <div className="flex gap-3">
            <button 
              disabled={loading}
              className="px-3 py-2 border border-green-700/50 hover:bg-green-700/10 disabled:opacity-50" 
              type="submit"
            >
              {loading ? 'Odesílám...' : 'Odeslat'}
            </button>
            <button 
              disabled={loading}
              className="px-3 py-2 border border-green-700/50 hover:bg-green-700/10 disabled:opacity-50" 
              type="reset"
            >
              Reset
            </button>
          </div>
        </form>
      ) : (
        <div className="text-green-500">Děkujeme, zpráva byla odeslána.</div>
      )}
      <div className="mt-4 text-sm text-green-600">
        Odesláním souhlasíš se zpracováním údajů pro účely zpětné reakce.
      </div>
    </div>
  )
}


