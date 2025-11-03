const projects = [
  {
    id: 'cd-project',
    title: 'GPU-Accelerated ML Pipeline',
  description: 'RAPIDS-powered data science pipeline with PCA, UMAP, ensemble methods, and interactive Django dashboard.',
    repoUrl: 'https://github.com/StunFlyy/CD_Project',
    demoUrl: '',
    date: '2025',
    importance: 1,
    color: '#ffd9a6',
    image: '',
    images: [
      '/images/cd_project/_pairplot.png',
      '/images/cd_project/_boxplot.png',
      '/images/cd_project/_all_violin.png',
      '/images/cd_project/umap_components.png',
      '/images/cd_project/train_dendrogram.png',
      '/images/cd_project/train_analysis_pca_to_2d_color_cluster_labels.png',
      '/images/cd_project/training_time_comparison_20250526_135351.png',
      '/images/cd_project/test_rmse_20250524_010205.png',
      '/images/cd_project/test_accuracy_20250525_202120.png',
      '/images/cd_project/pca_component_importance.png',
      '/images/cd_project/mean_cv_training_time_20250525_174805.png',
      '/images/cd_project/mean_cv_sensitivity_20250526_135351.png',
      '/images/cd_project/mean_cv_rmse_20250524_010205.png',
      '/images/cd_project/mean_cv_accuracy_20250526_135351.png',
      '/images/cd_project/feature_importance.png',
      '/images/cd_project/dashboard_plot_correlation_matrix.png'
    ],
    tech: ['Python', 'Rapids', 'PyTorch']
  },
  {
    id: 'space-simulator',
    title: 'N-Body Physics Simulator',
  description: 'C++23 space simulator with Newtonian gravity and Velocity Verlet integration for celestial mechanics.',
    repoUrl: 'https://github.com/PedroGF45/space-simulator',
    demoUrl: '',
    date: '2025',
    importance: 0.7,
    color: '#c3ffa8',
    image: '',
    images: [
      '/images/space_simulator/simulation_output.png'
    ],
    tech: ['C++', 'CMake']
  },
  {
    id: 'maze-rl',
    title: 'Deep Q-Learning Maze Solver',
  description: 'RL agent using neural networks and experience replay to solve custom maze environments.',
    repoUrl: 'https://github.com/PedroGF45/maze-rl',
    demoUrl: '',
    date: '2025',
    importance: 0.9,
    color: '#cbd5ff',
    image: '',
    images: [
      '/images/maze_rl/plot_reward.png',
      '/images/maze_rl/plot_bar.png',
      '/images/maze_rl/game_example.png',
      '/images/maze_rl/console_example.png'
    ],
    tech: ['Python', 'PyTorch']
  },
  {
    id: 'rpe-tracker',
    title: 'Sports Training Analytics Platform',
  description: 'Full-stack RPE tracking with JWT authentication, MongoDB backend, and React dashboard.',
    repoUrl: 'https://github.com/PedroGF45/RPE-tracker',
    demoUrl: '',
    date: '2024',
    importance: 0.6,
    color: '#ffd1e8',
    image: '',
    images: [
      '/images/rpe_tracker/login.png',
      '/images/rpe_tracker/dashboard.png'
    ],
    tech: ['React', 'Node.js', 'JavaScript']
  },
  {
    id: 'game-analysis-app',
    title: 'Real-Time Football Analytics',
  description: 'Cross-platform Flutter app for live match tracking with interactive charts and statistics.',
    repoUrl: 'https://github.com/PedroGF45/Game-Analysis-App',
    demoUrl: '',
    date: '2024',
    importance: 0.7,
    color: '#e8ffd1',
  image: '',
  images: [], // No images for this project
    tech: ['Flutter', 'Dart']
  },
  {
    id: 'signature-project',
    title: 'Signature Recognition Pipeline',
  description: 'ML pipeline for signature verification with data augmentation and TensorFlow training.',
    repoUrl: 'https://github.com/PedroGF45/Signature-Project',
    demoUrl: '',
    date: '2023',
    importance: 0.85,
    color: '#d1fff0',
  image: '',
  images: [], // No images for this project
    tech: ['Python', 'TensorFlow']
  },
  {
    id: 'cotterpillar-wordpress',
    title: 'Cotterpillar (freelance)',
  description: 'Frontend implementation for an e-commerce site (Shopify/WordPress) completed as freelance work.',
    repoUrl: '',
    demoUrl: 'https://www.cotterpillar.com/?srsltid=AfmBOopp7u5E6kXeSAvu7uG4_vcNcSwrWBVizOcbJ8DDGjCsfegOea2Z',
    date: '2023',
    importance: 0.8,
    color: '#9bd1ff',
  image: '',
  images: [], // No images for this project
    tech: ['WordPress', 'PHP', 'HTML', 'CSS', 'JavaScript']
  }
]

export default projects
