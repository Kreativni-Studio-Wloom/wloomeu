export default function Footer() {
  return (
    <footer className="mt-6 border-t border-green-700/40 py-4 bg-black/80">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
        <div>
          <span className="font-semibold">Wloom</span> — <a href="https://wloom.eu" target="_blank" rel="noopener noreferrer" className="underline">wloom.eu</a>
        </div>
        <div className="flex items-center gap-4">
          <a href="mailto:info@wloom.eu" className="underline">info@wloom.eu</a>
          <a href="tel:+420606020284" className="underline">+420 606 020 284</a>
          <a href="tel:+420601233000" className="underline">+420 601 233 000</a>
        </div>
      </div>
    </footer>
  )
}


