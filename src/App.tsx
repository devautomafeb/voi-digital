// src/App.tsx
import React from "react";

const BRAND = {
  name: "VOI Digital",
  city: "Rio de Janeiro",
  whatsappNumber: "5522981132979", // <<< TROQUE SE PRECISAR (somente números com DDI)
  whatsappMessage:
    "Olá! Quero um orçamento para site, landing page ou sistema. Pode me ajudar?",
};

const BRAND_EMAIL = "contato@voidigital.com.br"; // <<< troque pelo seu email real quando tiver

function waLink() {
  const text = encodeURIComponent(BRAND.whatsappMessage);
  return `https://wa.me/${BRAND.whatsappNumber}?text=${text}`;
}

function buildBriefingMessage(data: {
  name: string;
  contact: string;
  service: string;
  budget: string;
  deadline: string;
  details: string;
}) {
  return (
    `Olá! Me chamo ${data.name}.\n` +
    `Contato: ${data.contact}\n` +
    `Serviço: ${data.service}\n` +
    `Orçamento (estimado): ${data.budget}\n` +
    `Prazo: ${data.deadline}\n\n` +
    `Detalhes:\n${data.details}`
  );
}

function mailtoLink(subject: string, body: string) {
  return `mailto:${BRAND_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
    {children}
  </span>
);

function Carousel({
  items,
}: {
  items: { title: string; desc: string; href?: string; tag?: string }[];
}) {
  const [index, setIndex] = React.useState(0);

  function prev() {
    setIndex((i) => (i - 1 + items.length) % items.length);
  }
  function next() {
    setIndex((i) => (i + 1) % items.length);
  }

  const current = items[index];

  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-900/30 p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-white/90">Destaques</div>
          <div className="text-xs text-white/60">
            {index + 1} de {items.length}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10"
            aria-label="Anterior"
            type="button"
          >
            ←
          </button>
          <button
            onClick={next}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10"
            aria-label="Próximo"
            type="button"
          >
            →
          </button>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-lg font-bold">{current.title}</div>
            <div className="mt-2 text-sm text-white/70">{current.desc}</div>
          </div>

          {current.tag ? (
            <span className="shrink-0 rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-200">
              {current.tag}
            </span>
          ) : null}
        </div>

        {current.href ? (
          <a
            href={current.href}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400"
          >
            Ver projeto
          </a>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={[
              "h-2.5 w-2.5 rounded-full border border-white/10 transition",
              i === index ? "bg-emerald-400" : "bg-white/10 hover:bg-white/20",
            ].join(" ")}
            aria-label={`Ir para item ${i + 1}`}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}

function ContactForm() {
  const [name, setName] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [service, setService] = React.useState("Landing Page de Conversão");
  const [budget, setBudget] = React.useState("Ainda não sei");
  const [deadline, setDeadline] = React.useState("Sem pressa");
  const [details, setDetails] = React.useState("");

  const message = buildBriefingMessage({
    name: name.trim() || "—",
    contact: contact.trim() || "—",
    service,
    budget,
    deadline,
    details: details.trim() || "—",
  });

  function openWhatsAppBriefing(e: React.FormEvent) {
    e.preventDefault();
    const text = encodeURIComponent(message);
    const url = `https://wa.me/${BRAND.whatsappNumber}?text=${text}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function openEmailBriefing() {
    const subject = `Orçamento — ${service}`;
    const url = mailtoLink(subject, message);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={openWhatsAppBriefing} className="mt-6 grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm text-white/70">Seu nome</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Bruno"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950/40 px-4 py-3 text-white outline-none transition focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20"
          />
        </div>

        <div>
          <label className="text-sm text-white/70">WhatsApp ou e-mail</label>
          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Ex: (22) 98113-2979 ou email@..."
            className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950/40 px-4 py-3 text-white outline-none transition focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="text-sm text-white/70">Serviço</label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950/40 px-4 py-3 text-white outline-none transition focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20"
          >
            <option>Landing Page de Conversão</option>
            <option>Site Institucional (até 3 páginas)</option>
            <option>Sistema Web (CRUD + Dashboard)</option>
            <option>App Android/iOS (React Native)</option>
            <option>Desktop macOS (sob escopo)</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-white/70">Orçamento</label>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950/40 px-4 py-3 text-white outline-none transition focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20"
          >
            <option>Ainda não sei</option>
            <option>Até R$ 1.000</option>
            <option>R$ 1.000 – R$ 3.000</option>
            <option>R$ 3.000 – R$ 7.000</option>
            <option>Acima de R$ 7.000</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-white/70">Prazo</label>
          <select
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950/40 px-4 py-3 text-white outline-none transition focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20"
          >
            <option>Sem pressa</option>
            <option>Até 7 dias</option>
            <option>Até 15 dias</option>
            <option>Até 30 dias</option>
            <option>Mais de 30 dias</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm text-white/70">Detalhes do projeto</label>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows={5}
          placeholder="Ex: quero uma landing para anúncios, com botão WhatsApp e formulário, seção de serviços e depoimentos..."
          className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-zinc-950/40 px-4 py-3 text-white outline-none transition focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:ring-offset-2 focus:ring-offset-zinc-950"
        >
          Enviar no WhatsApp (com briefing)
        </button>

        <button
          type="button"
          onClick={openEmailBriefing}
          className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white/90 transition hover:bg-white/10"
        >
          Enviar por e-mail
        </button>

        <button
          type="button"
          onClick={() => {
            setName("");
            setContact("");
            setService("Landing Page de Conversão");
            setBudget("Ainda não sei");
            setDeadline("Sem pressa");
            setDetails("");
          }}
          className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white/70 transition hover:bg-white/10"
        >
          Limpar
        </button>
      </div>

      <div className="text-xs text-white/50">
        Ao enviar, você já manda as informações principais — isso agiliza muito o
        orçamento.
      </div>
    </form>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* BG decor */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:24px_24px] opacity-30" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-zinc-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5">
              <span className="text-sm font-black tracking-tight text-emerald-300">
                VOI
              </span>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">{BRAND.name}</div>
              <div className="text-xs text-white/60">{BRAND.city}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#servicos"
              className="hidden rounded-xl px-3 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white md:inline-flex"
            >
              Serviços
            </a>
            <a
              href="#projetos"
              className="hidden rounded-xl px-3 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white md:inline-flex"
            >
              Projetos
            </a>
            <a
              href="#contato"
              className="hidden rounded-xl px-3 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white md:inline-flex"
            >
              Contato
            </a>

            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:ring-offset-2 focus:ring-offset-zinc-950"
            >
              Chamar no WhatsApp
            </a>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-4">
        {/* Hero */}
        <section className="py-14 md:py-20">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <div className="flex flex-wrap gap-2">
                <Pill>Landing pages</Pill>
                <Pill>Sistemas Web</Pill>
                <Pill>Apps</Pill>
                <Pill>Rápido + Profissional</Pill>
              </div>

              <h1 className="mt-6 text-4xl font-black tracking-tight md:text-5xl">
                Desenvolvimento de{" "}
                <span className="text-emerald-300">sites, apps e sistemas</span>{" "}
                com foco em conversão.
              </h1>

              <p className="mt-4 max-w-xl text-base text-white/70 md:text-lg">
                A VOI Digital cria experiências rápidas, responsivas e bonitas —
                do site de conversão ao sistema web sob medida.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:ring-offset-2 focus:ring-offset-zinc-950"
                >
                  Pedir orçamento no WhatsApp
                </a>

                <a
                  href="#contato"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white/90 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-zinc-950"
                >
                  Enviar briefing (formulário)
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 text-xs text-white/60">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  ⚡ Performance
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  📱 Mobile-first
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  🔒 Boas práticas
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  🚀 Deploy (Netlify/Vercel)
                </span>
              </div>
            </div>

            {/* Hero card */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-emerald-500/10 blur-2xl" />
              <div className="relative rounded-3xl border border-white/10 bg-zinc-900/60 p-6 shadow-2xl backdrop-blur">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-white/90">
                    Prévia do que entregamos
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                    7–14 dias (média)
                  </span>
                </div>

                <div className="mt-5 grid gap-3">
                  {[
                    {
                      title: "Landing de Conversão",
                      desc: "Anúncios + CTA + WhatsApp + Form",
                      tag: "Conversão",
                    },
                    {
                      title: "Site Institucional",
                      desc: "Presença profissional (até 3 páginas)",
                      tag: "Presença",
                    },
                    {
                      title: "Sistema Web",
                      desc: "Login, CRUD, dashboard, integrações",
                      tag: "Produto",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-semibold">{item.title}</div>
                          <div className="mt-1 text-sm text-white/70">
                            {item.desc}
                          </div>
                        </div>
                        <span className="shrink-0 rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-200">
                          {item.tag}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-zinc-950/40 p-4">
                  <div className="text-xs text-white/60">Stack</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["React", "TypeScript", "Tailwind", "Vite"].map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href="#contato"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white/90 transition hover:bg-white/10"
                >
                  Quero um projeto assim
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section id="servicos" className="py-12 md:py-16">
          <div>
            <h2 className="text-2xl font-extrabold md:text-3xl">Serviços</h2>
            <p className="mt-2 max-w-2xl text-white/70">
              Do site de conversão ao sistema completo. Eu monto o escopo, alinho
              prazos e entrego com qualidade e performance.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-zinc-900/40 p-6 shadow-lg backdrop-blur transition hover:bg-zinc-900/60">
              <h3 className="text-lg font-bold">Landing Page de Conversão</h3>
              <p className="mt-2 text-sm text-white/70">
                Perfeita para anúncios (Google/Meta), com CTA forte e foco em
                WhatsApp/formulário.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                {[
                  "1 página (alta conversão)",
                  "CTA WhatsApp + Formulário",
                  "SEO básico + Performance",
                  "Deploy (Netlify/Vercel)",
                ].map((it) => (
                  <li key={it} className="flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-900/40 p-6 shadow-lg backdrop-blur transition hover:bg-zinc-900/60">
              <h3 className="text-lg font-bold">Site Institucional</h3>
              <p className="mt-2 text-sm text-white/70">
                Para presença profissional: empresa, portfólio, serviços,
                localização, redes sociais.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                {["Até 3 páginas", "Responsivo", "Performance", "Deploy pronto"].map(
                  (it) => (
                    <li key={it} className="flex items-center gap-2">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      {it}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-900/40 p-6 shadow-lg backdrop-blur transition hover:bg-zinc-900/60">
              <h3 className="text-lg font-bold">Sistemas Web (CRUD + Dashboard)</h3>
              <p className="mt-2 text-sm text-white/70">
                Aplicações web com login, painel, banco de dados e integrações.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                {[
                  "Autenticação / Perfis",
                  "CRUD + Admin",
                  "Dashboard / Relatórios",
                  "Integrações (pagamento/WhatsApp/API)",
                ].map((it) => (
                  <li key={it} className="flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-900/40 p-6 shadow-lg backdrop-blur transition hover:bg-zinc-900/60">
              <h3 className="text-lg font-bold">
                Apps (Android + iOS + Desktop macOS)
              </h3>
              <p className="mt-2 text-sm text-white/70">
                Apps com telas reais, fluxo completo e publicação (dependendo do
                escopo).
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                {[
                  "App Android/iOS (React Native)",
                  "Desktop macOS (Electron/Tauri — sob escopo)",
                  "Integração com API/Sistema",
                  "Build + orientação de publicação",
                ].map((it) => (
                  <li key={it} className="flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
            <span className="font-semibold text-white/90">Dica:</span> Landing
            de conversão quase sempre converte mais do que “site grande”. Para
            anúncios, ela costuma ser o melhor custo/benefício.
          </div>
        </section>

        {/* Projetos + Carrossel */}
        <section id="projetos" className="py-12 md:py-16">
          <div className="rounded-3xl border border-white/10 bg-zinc-900/30 p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-2xl font-extrabold md:text-3xl">Projetos</h2>
                <p className="mt-2 max-w-2xl text-white/70">
                  Destaques em formato de carrossel + cards abaixo para preencher
                  com seus cases (prints e links).
                </p>
              </div>

              <div className="w-full md:max-w-md">
                <Carousel
                  items={[
                    {
                      title: "VOI Digital (site)",
                      desc: "Landing page rápida, moderna e focada em conversão (WhatsApp + CTA + formulário).",
                      tag: "Landing",
                    },
                    {
                      title: "MEDSAÚDE (site)",
                      desc: "Captação de leads com foco em atendimento via WhatsApp e rastreio de conversão.",
                      tag: "Leads",
                    },
                    {
                      title: "Sistema Web (exemplo)",
                      desc: "Painel com login, CRUD e dashboard (modelo de demonstração).",
                      tag: "Sistema",
                    },
                  ]}
                />
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {["Projeto 01", "Projeto 02", "Projeto 03"].map((p) => (
                <div
                  key={p}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
                >
                  <div className="text-sm font-semibold">{p}</div>
                  <div className="mt-2 text-sm text-white/70">
                    Card placeholder — depois a gente troca por casos reais (com
                    print e link).
                  </div>
                  <div className="mt-4 inline-flex rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-200">
                    Em breve
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contato (Formulário) */}
        <section id="contato" className="py-12 md:py-16">
          <div className="rounded-3xl border border-white/10 bg-zinc-900/40 p-8">
            <h2 className="text-2xl font-extrabold md:text-3xl">Contato</h2>
            <p className="mt-2 text-white/70">
              Preencha o briefing (leva 30s). Eu te respondo com um caminho claro:
              escopo + prazo + valor estimado.
            </p>

            <ContactForm />

            <div className="mt-6 text-sm text-white/60">
              Atendimento: seg–sáb • Resposta rápida
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10">
          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 md:flex-row">
            <div className="text-sm text-white/60">
              © {new Date().getFullYear()} {BRAND.name}. Todos os direitos
              reservados.
            </div>
            <div className="text-sm text-white/60">Feito com React + Tailwind</div>
          </div>
        </footer>
      </main>

      {/* Floating WhatsApp */}
      <a
        href={waLink()}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-zinc-950 shadow-2xl transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
        aria-label="Abrir WhatsApp"
      >
        WhatsApp
      </a>
    </div>
  );
}

export default App;
