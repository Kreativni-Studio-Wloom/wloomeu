import { contact } from '../data/projects'

export default function Contact() {
  return (
    <div className="h-[60vh] sm:h-[65vh] md:h-[76vh] flex items-start">
      <div className="p-3 sm:p-4 space-y-3 w-full">
        <h2 className="text-xl">{contact.company} — {contact.domain}</h2>
        <div className="text-green-500">Portfolio</div>
        <div className="grid sm:grid-cols-2 gap-3 max-w-2xl">
          <div className="space-y-1">
            <div className="text-green-500">Email</div>
            <a href={`mailto:${contact.email}`} className="underline">{contact.email}</a>
          </div>
          <div className="space-y-1">
            <div className="text-green-500">Telefony</div>
            <div className="flex flex-col">
              {contact.phones.map(p => (
                <a key={p.number} href={`tel:${p.number.replace(/\s/g,'')}`} className="underline">{p.label} — {p.number}</a>
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-green-500">IČO</div>
            <div>{contact.ico}</div>
          </div>
        </div>
        
      </div>
    </div>
  )
}


