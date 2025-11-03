import projects from '../data/projects'
import { FaGithub } from 'react-icons/fa'
import React, { useState } from 'react'
import ImageGallery from './ImageGallery'

// Map tech names to logo paths (copied from AboutMe)
const fileMap: Record<string, string> = {
  python: '/logos/python.png',
  pytorch: '/logos/pytorch.svg',
  'scikit-learn': '/logos/scikit-learn.png',
  tensorflow: '/logos/tensorflow.png',
  rapids: '/logos/rapids.png',
  pandas: '/logos/pandas.svg',
  numpy: '/logos/numpy.svg',
  sql: '/logos/sql.svg',
  javascript: '/logos/javascript.png',
  nodejs: '/logos/nodejs.png',
  'node.js': '/logos/nodejs.png',
  node: '/logos/nodejs.png',
  cmake: '/logos/cmake.png',
  wordpress: '/logos/wordpress.png',
  html: '/logos/html.png',
  css: '/logos/css.png',
  flutter: '/logos/flutter.png',
  dart: '/logos/dart.png',
  react: '/logos/react.svg',
  typescript: '/logos/typescript.svg',
  php: '/logos/php.webp',
  'c++': '/logos/c++.png',
};

export default function SpaceGallery() {
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryImages, setGalleryImages] = useState<string[]>([])
  const [galleryCaptions, setGalleryCaptions] = useState<string[]>([])
  const [galleryIndex, setGalleryIndex] = useState(0)

  const openGallery = (images: string[], idx: number = 0, projectId?: string) => {
    setGalleryImages(images)
    setGalleryIndex(idx)
    // Generate captions based on project and image filename
    let captions: string[] = []
    if (projectId === 'space-simulator') {
      captions = ['Simulation Output: Celestial objects in motion']
    } else if (projectId === 'maze-rl') {
      captions = [
        'Training Progress: Score and Mean Score',
        'Win/Loss/Tie Bar Plot',
        'Maze Game Example (Pygame)',
        'Console Output Example'
      ]
    } else if (projectId === 'rpe-tracker') {
      captions = [
        'Login Page',
        'Home Dashboard'
      ]
    } else if (projectId === 'cd-project') {
      captions = [
        'Pairplot',
        'Boxplot',
        'All Violin Plots',
        'UMAP Components',
        'Train Dendrogram',
        'PCA to 2D Color Cluster Labels',
        'Training Time Comparison',
        'Test RMSE',
        'Test Accuracy',
        'PCA Component Importance',
        'Mean CV Training Time',
        'Mean CV Sensitivity',
        'Mean CV RMSE',
        'Mean CV Accuracy',
        'Feature Importance',
        'Correlation Matrix'
      ]
    } else {
      captions = images.map(() => '')
    }
    setGalleryCaptions(captions)
    setGalleryOpen(true)
  }
  const closeGallery = () => setGalleryOpen(false)

  return (
    <section className="relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 space-heading">Some of my projects</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {projects.map((p) => {
            const hasImages = p.images && p.images.length > 0
            // Only render image area if images exist
            let showImageArea = hasImages
            // Remove image canvas for these projects
            if (["game-analysis-app", "signature-project", "cotterpillar-wordpress"].includes(p.id)) {
              showImageArea = false
            }
              // If the card will use the right-side background image, we hide the
              // left thumbnail to avoid duplicate imagery. Otherwise render a
              // small thumbnail button on the left.
              const cardHasBg = showImageArea && hasImages && p.images?.[0]
              let imageEl = null
              if (showImageArea && !cardHasBg) {
                imageEl = (
                  <button
                    className="w-28 h-20 bg-space-800 rounded flex items-center justify-center overflow-hidden focus:outline-none focus:ring-2 focus:ring-accent-400 group"
                    onClick={() => openGallery(p.images, 0, p.id)}
                    aria-label={`View images for ${p.title}`}
                    tabIndex={0}
                    type="button"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.images[0]} alt={`${p.title} screenshot`} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200" />
                    {p.images.length > 1 && (
                      <span className="absolute bottom-1 right-2 bg-black bg-opacity-60 text-xs text-white px-2 py-0.5 rounded">+{p.images.length}</span>
                    )}
                  </button>
                )
              }

            const cardStyle: React.CSSProperties = cardHasBg ? ({ ['--card-bg-img' as any]: `url(${p.images[0]})` }) : {}

            return (
              <article
                key={p.id}
                className={`card-bg p-5 sm:p-7 shadow-lg transition-transform duration-200 rounded-xl hover:shadow-2xl hover:-translate-y-1.5 focus-within:ring-2 focus-within:ring-accent-400 project-card project-card--flex ${cardHasBg ? 'project-card--with-bg' : ''}`}
                style={{ ...(cardStyle as any), transition: 'transform 0.18s cubic-bezier(.4,2,.6,1)' }}
              >
                <div className={`flex flex-col h-full ${cardHasBg ? 'w-full sm:max-w-[66%]' : ''}`}>
                  <div className="flex items-start gap-3 sm:gap-5">
                    {imageEl}
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3">
                        <h3 className="text-base sm:text-lg font-bold text-accent-400 mb-2">{p.title}</h3>
                      </div>
                      <p className="text-sm sm:text-base text-text-200 mb-3 sm:mb-4 line-clamp-3">{p.description}</p>
                    </div>
                  </div>
                  
                  {/* Bottom section with actions, tech stack, and date - using flex for alignment */}
                  <div className="mt-auto flex items-center justify-between gap-3 sm:gap-4 flex-wrap">
                    <div className="flex gap-3 sm:gap-4 items-center flex-wrap">
                      {p.repoUrl && (
                        <a
                          className="repo-btn"
                          href={p.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Open ${p.title} repository on GitHub`}
                          title={`Open ${p.title} repository on GitHub`}
                        >
                          <FaGithub className="repo-icon" aria-hidden="true" />
                          <span className="sr-only">Repo</span>
                        </a>
                      )}
                      {p.demoUrl && (
                        <a className="text-xs sm:text-sm text-accent-400 hover:underline" href={p.demoUrl} target="_blank" rel="noreferrer">Demo</a>
                      )}
                    </div>
                    
                    {/* Tech icons and date in a flex container */}
                    <div className="flex items-center gap-2 sm:gap-3 ml-auto flex-shrink-0">
                      {Array.isArray(p.tech) && p.tech.length > 0 && (
                        <div className="flex gap-1.5 sm:gap-2 items-center" aria-hidden>
                          {p.tech.map((tech: string) => {
                            const slug = tech.toLowerCase()
                            const mapped = (fileMap as any)[slug]
                            const largeSet = new Set(['pytorch','rapids','react','nodejs','node','node.js','wordpress','php'])
                            const largeClass = largeSet.has(slug) ? 'project-tech-img--large' : ''
                            if (mapped) {
                              return (
                                <img key={tech} src={mapped} alt={tech} title={tech} className={`project-tech-img ${largeClass}`} />
                              )
                            }
                            return (
                              <span key={tech} className={`project-tech-placeholder project-tech-img ${largeClass}`} title={tech} aria-hidden>
                                {tech.slice(0,2).toUpperCase()}
                              </span>
                            )
                          })}
                        </div>
                      )}
                      
                      {/* Date aligned with tech icons */}
                      <div className="project-date-flex text-xs sm:text-sm" aria-hidden>
                        {p.date ? p.date : '—'}
                      </div>
                    </div>
                  </div>
                </div>

                {cardHasBg && (
                  <button
                    className="project-bg-btn" 
                    onClick={() => openGallery(p.images, 0, p.id)}
                    aria-label={`Open images for ${p.title}`}
                  >
                    <span className="sr-only">Open gallery</span>
                  </button>
                )}
              </article>
            )
          })}
        </div>

        <div className="mt-12 text-center text-sm text-text-300">Want to connect objects to full case studies or interactive demos? I can wire that up.</div>
      </div>
  <ImageGallery images={galleryImages} open={galleryOpen} onClose={closeGallery} initialIndex={galleryIndex} captions={galleryCaptions} />
    </section>
  )
}
