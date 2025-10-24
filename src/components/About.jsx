export default function About() {
  return (
    <div className="h-[60vh] sm:h-[65vh] md:h-[76vh] flex items-start">
      <div className="p-3 sm:p-4 w-full space-y-4 leading-relaxed">
        <h2 className="text-xl">O nás — Wloom</h2>
        <p className="text-green-500">Děláme věci rychle, čistě a bezpečně.</p>
        <p>
          Wloom je malý tým posedlý kvalitou kódu a výkonem. Milujeme terminály,
          monochromatickou estetiku a elegantní řešení složitých úloh. Od
          prototypu po produkci — navrhujeme a stavíme weby, aplikace i automatizace.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Design a vývoj na míru</li>
          <li>Optimalizace výkonu a Core Web Vitals</li>
          <li>Automatizace procesů a integrace API</li>
          <li>Bezpečnost a audit (CSP, XFO, headers)</li>
        </ul>
        <p>
          Máš nápad nebo problém k vyřešení? Otevři složku „Poslat poptávku“ a napiš nám.
        </p>
      </div>
    </div>
  )
}


