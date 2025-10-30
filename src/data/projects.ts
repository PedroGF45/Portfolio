const projects = [
  {
    id: 'planet-1',
    title: 'Galactic-ML',
    description: 'A project that predicts star formation regions using deep learning and satellite data.',
    repoUrl: 'https://github.com/PedroGF45/Galactic-ML',
    demoUrl: '',
    importance: 1,
    color: '#9bd1ff',
    image: '/images/galactic-ml.svg',
    tech: ['PyTorch', 'CNN', 'Satellite ETL']
  },
  {
    id: 'planet-2',
    title: 'StarMap-Vis',
    description: 'Interactive visualization of star catalogs with clustering and filtering for exploration.',
    repoUrl: 'https://github.com/PedroGF45/StarMap-Vis',
    demoUrl: '',
    importance: 0.9,
    color: '#ffd9a6',
    image: '/images/starmap-vis.svg',
    tech: ['React', 'D3', 'WebGL']
  },
  {
    id: 'planet-3',
    title: 'AstroPipeline',
    description: 'Data pipeline and ETL for ingesting satellite telemetry and preparing features for ML.',
    repoUrl: 'https://github.com/PedroGF45/AstroPipeline',
    demoUrl: '',
    importance: 0.8,
    color: '#c3ffa8',
    image: '/images/astropipeline.svg',
    tech: ['Airflow', 'Postgres', 'PySpark']
  }
]

export default projects
