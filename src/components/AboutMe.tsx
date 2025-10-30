
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import journeyTimeline from '../data/journeyTimeline';

const TimelineItem: React.FC<{ phase: any; i: number }> = ({ phase, i }) => {
  const isLeft = i % 2 === 0;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  return (
    <motion.li
      ref={ref}
      className="mb-16 flex flex-col md:flex-row items-center w-full relative"
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.12, type: 'spring', bounce: 0.18 }}
    >
      {/* Left content */}
      <div className={`hidden md:flex w-1/2 justify-end pr-12 ${isLeft ? '' : 'invisible'}`}>
        <div className="max-w-xs text-right">
          <div className="font-bold text-blue-300 text-base">{phase.starStage} <span className="text-xs text-blue-100">({phase.personalStage})</span></div>
          <div className="text-sm text-blue-100 mb-1">{phase.years}</div>
          <div className="text-base mb-1">{phase.description}</div>
          <div className="text-xs italic text-blue-200">{phase.comparison}</div>
        </div>
      </div>
      {/* Icon always centered on the line */}
      <div className="w-full md:w-auto flex justify-center items-center relative z-10">
        <div className="w-12 h-12 rounded-full bg-blue-900 border-2 border-blue-400 flex items-center justify-center shadow-lg z-10">
          <span className="text-2xl" title={phase.starStage}>
            {phase.starStage === 'Nebula' && '☁️'}
            {phase.starStage === 'Protostar' && '✨'}
            {phase.starStage === 'Main Sequence' && '⭐'}
            {phase.starStage === 'Stellar Evolution' && '🌠'}
            {phase.starStage === 'Red Giant' && '🔴'}
            {phase.starStage === 'Supernova' && '💥'}
          </span>
        </div>
      </div>
      {/* Right content */}
      <div className={`hidden md:flex w-1/2 justify-start pl-12 ${isLeft ? 'invisible' : ''}`}>
        <div className="max-w-xs text-left">
          <div className="font-bold text-blue-300 text-base">{phase.starStage} <span className="text-xs text-blue-100">({phase.personalStage})</span></div>
          <div className="text-sm text-blue-100 mb-1">{phase.years}</div>
          <div className="text-base mb-1">{phase.description}</div>
          <div className="text-xs italic text-blue-200">{phase.comparison}</div>
        </div>
      </div>
      {/* Mobile: content always below icon */}
      <div className="md:hidden w-full mt-2 flex flex-col items-center">
        <div className="font-bold text-blue-300 text-base text-center">{phase.starStage} <span className="text-xs text-blue-100">({phase.personalStage})</span></div>
        <div className="text-sm text-blue-100 mb-1">{phase.years}</div>
        <div className="text-base mb-1 text-center">{phase.description}</div>
        <div className="text-xs italic text-blue-200 text-center">{phase.comparison}</div>
      </div>
    </motion.li>
  );
};

const stack = [
  'Python',
  'PyTorch',
  'scikit-learn',
  'Pandas',
  'Spark',
  'SQL',
  'React',
  'TypeScript',
  'Three.js'
]

const AboutMe: React.FC = () => {
  // Section animation
  const [sectionRef, sectionInView] = useInView({ triggerOnce: true, threshold: 0.18 });
  // Tech stack animation
  const [stackRef, stackInView] = useInView({ triggerOnce: true, threshold: 0.18 });

  return (
    <motion.section
      ref={sectionRef}
      aria-labelledby="about-heading"
      className="py-12"
      style={{ textAlign: 'justify' }}
      initial={{ opacity: 0, y: 60 }}
      animate={sectionInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, type: 'spring', bounce: 0.18 }}
    >
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-400 shadow-lg bg-blue-900 flex items-center justify-center">
            {/* Replace src with your actual photo path when ready */}
            <img
              src="/images/placeholder-profile.png"
              alt="Pedro Brito profile"
              className="object-cover w-full h-full"
              style={{ filter: 'grayscale(0.2) blur(0.5px)' }}
            />
          </div>
        </div>
        <h2 id="about-heading" className="text-3xl font-semibold mb-4 space-heading">About me</h2>
        <p className="mb-4 opacity-85">I'm Pedro Brito — a developer, AI enthusiast, and lifelong learner with a unique journey from sports science to machine learning and software engineering. My path has blended teamwork, leadership, and a passion for technology, always inspired by the cosmos and the power of discovery.</p>

        {/* Timeline: my journey as a star's life */}
        <div className="mt-10 mb-12">
          <h3 className="text-xl font-semibold mb-6">Journey: Like the life of a star</h3>
          <div className="relative flex flex-col items-center">
            {/* Vertical line always centered and behind icons */}
            <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 h-full w-1 bg-blue-500/40 z-0" aria-hidden="true" />
            <ol className="relative z-10 w-full">
              {journeyTimeline.map((phase, i) => (
                <TimelineItem key={phase.id} phase={phase} i={i} />
              ))}
            </ol>
          </div>
        </div>

        {/* Download CV CTA between timeline and tech stack */}
        <div className="mt-10 mb-10 flex justify-center">
          <a
            href="/English_PedroBrito.pdf"
            download
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition-colors duration-200 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            style={{ transition: 'transform 0.18s cubic-bezier(.4,2,.6,1)' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Download full CV (PDF)
          </a>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">Tech stack</h3>
        <motion.div
          ref={stackRef}
          className="flex flex-wrap gap-3 items-center"
          initial="hidden"
          animate={stackInView ? 'visible' : 'hidden'}
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
            hidden: {},
          }}
        >
          {stack.map((s, idx) => {
            const slug = s.toLowerCase().replaceAll(/[^a-z0-9]/g, '');
            return (
              <motion.img
                key={s}
                src={`/logos/${slug}.svg`}
                alt={s}
                title={s}
                className="tech-logo"
                variants={{
                  hidden: { opacity: 0, scale: 0.7, y: 30 },
                  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, delay: idx * 0.05 } },
                }}
              />
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutMe;
