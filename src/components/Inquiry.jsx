import { useState } from 'react'

export default function Inquiry() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(null)

  return (
    <div className="p-4 max-w-2xl">
      <h2 className="text-xl mb-2">Poslat poptávku</h2>
      <p className="text-green-500 mb-4">Vyplň formulář a doručíme ho na info@wloom.eu</p>
      {!sent ? (
        <form
          action="https://formsubmit.co/info@wloom.eu"
          method="POST"
          onSubmit={() => { setError(null) }}
          className="space-y-3"
        >
          <input type="hidden" name="_subject" value="Poptávka z wloom.eu" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_autoresponse" value="Děkujeme za zprávu. Ozveme se co nejdříve." />
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
            <button className="px-3 py-2 border border-green-700/50 hover:bg-green-700/10" type="submit">Odeslat</button>
            <button className="px-3 py-2 border border-green-700/50 hover:bg-green-700/10" type="reset">Reset</button>
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


