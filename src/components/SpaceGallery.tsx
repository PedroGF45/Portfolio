import projects from '../data/projects'

export default function SpaceGallery() {
  return (
    <section className="relative">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-semibold mb-4 space-heading">Explore projects</h2>
        <p className="mb-6 text-text-300">Scroll through selected work and explore the projects below.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p) => (
            <article
              key={p.id}
              className="card-bg p-7 shadow-lg transition-transform duration-200 rounded-xl hover:shadow-2xl hover:-translate-y-1.5 focus-within:ring-2 focus-within:ring-accent-400"
              style={{ transition: 'transform 0.18s cubic-bezier(.4,2,.6,1)' }}
              
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.025)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <div className="flex items-start gap-5">
                <div className="w-20 h-14 bg-space-800 rounded flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {p.image ? <img src={p.image} alt={`${p.title} screenshot`} className="max-h-12" /> : <div className="text-xs">No image</div>}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-accent-400 mb-1">{p.title}</h3>
                  <p className="text-base text-text-200 mb-2">{p.description}</p>
                  <div className="mt-3 flex gap-3">
                    <a className="text-sm text-accent-500 hover:underline" href={p.repoUrl} target="_blank" rel="noreferrer">Repo</a>
                    {p.demoUrl && <a className="text-sm text-accent-400 hover:underline" href={p.demoUrl} target="_blank" rel="noreferrer">Demo</a>}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-text-300">Want to connect objects to full case studies or interactive demos? I can wire that up.</div>
      </div>
    </section>
  )
}
