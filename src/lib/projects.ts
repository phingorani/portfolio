export interface Project {
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  githubUrl: string;
  demoUrl?: string;
  techStack?: { name: string; url: string }[];
  architecture?: string;
  readmeUrl?: string;
  objective?: string;
  overview?: string;
  process?: string;
  shortValueProposition?: string;
  longValueProposition?: string;
  reflection?: string;
  evidenceSections?: {
    imageSrc?: string;
    text: string;
  }[];
  category?: string;
  status?: 'live' | 'active' | 'stable';
  highlight?: string;
}

export const projects: Project[] = [
  {
    slug: 'k3s-cluster',
    title: 'K3s Cluster Infrastructure',
    description: 'Migrated 7 Proxmox LXCs to a production-grade 3-node Raspberry Pi 5 K3s cluster with Traefik ingress, Authelia 2FA, Prometheus monitoring, and automated GitOps deployments. Runs 12+ services across the homelab.',
    shortDescription: '3-node Pi 5 K3s cluster running 12+ services with Traefik, Authelia 2FA, and Prometheus monitoring.',
    githubUrl: 'https://github.com/phingorani/waffle-homelab',
    techStack: [
      { name: 'Kubernetes', url: 'https://kubernetes.io/' },
      { name: 'K3s', url: 'https://k3s.io/' },
      { name: 'Traefik', url: 'https://traefik.io/' },
      { name: 'Authelia', url: 'https://www.authelia.com/' },
      { name: 'Prometheus', url: 'https://prometheus.io/' },
      { name: 'ArgoCD', url: 'https://argoproj.github.io/cd/' },
      { name: 'Docker', url: 'https://www.docker.com/' },
      { name: 'Ansible', url: 'https://www.ansible.com/' },
    ],
    category: 'Infrastructure',
    status: 'live',
    highlight: '12+ services',
    objective: 'Replace fragile LXC-based infrastructure with a resilient, declarative Kubernetes cluster for the entire homelab.',
    overview: 'This project represents the backbone of the entire homelab. A 3-node Raspberry Pi 5 cluster running K3s orchestrates every service — from AI chatbots to threat visualization to home automation monitoring. Traefik handles ingress with automatic TLS, Authelia provides SSO with 2FA across all services, and Prometheus + Grafana deliver full observability.',
    shortValueProposition: 'Production-grade Kubernetes infrastructure running on commodity hardware, demonstrating enterprise patterns at homelab scale.',
    process: 'Audit existing LXCs → Design K3s architecture → Provision with Ansible → Migrate services one-by-one → Implement GitOps with ArgoCD → Add monitoring and alerting.',
    reflection: 'The migration from 7 individual LXCs to a unified K3s cluster dramatically simplified operations. Declarative manifests mean any service can be redeployed in seconds. The biggest lesson was that Kubernetes patterns scale down just as well as they scale up.',
  },
  {
    slug: 'llm-router',
    title: 'LLM Router',
    description: 'Semantic embedding-based model router for 6 LLM backends across 3 machines. Auto-routes requests to the best model using cosine similarity on route description embeddings. Includes health monitoring, automatic failover, and a dynamic model discovery API.',
    shortDescription: 'Semantic embedding router for 6 LLM backends with auto-routing, health monitoring, and failover.',
    githubUrl: 'https://github.com/phingorani/waffle-homelab',
    techStack: [
      { name: 'Python', url: 'https://www.python.org/' },
      { name: 'FastAPI', url: 'https://fastapi.tiangolo.com/' },
      { name: 'NumPy', url: 'https://numpy.org/' },
      { name: 'Sentence-Transformers', url: 'https://www.sbert.net/' },
      { name: 'Docker', url: 'https://www.docker.com/' },
      { name: 'vLLM', url: 'https://docs.vllm.ai/' },
    ],
    category: 'AI/ML',
    status: 'live',
    highlight: '6 backends',
    objective: 'Create a single OpenAI-compatible API endpoint that intelligently routes to the best available model.',
    overview: 'The LLM Router sits between all consumers (chatbot, hotel PMS, threat map) and the actual LLM backends. It computes embeddings for each model\'s description and matches incoming queries via cosine similarity. If the selected backend is unhealthy, it automatically fails over to the next best match.',
    shortValueProposition: 'Solves the multi-model orchestration problem — one API, many backends, smart routing.',
    process: 'Design routing algorithm → Implement FastAPI proxy → Add embedding-based selection → Build health monitoring → Deploy on DGX Spark.',
    reflection: 'The key insight was that route description embeddings provide surprisingly accurate model selection without any fine-tuning. The system handles 100% of LLM traffic across the homelab with zero manual intervention.',
  },
  {
    slug: 'threatmap',
    title: 'ThreatMap',
    description: 'Real-time global threat visualization using GDELT event data. Three LLM models validate events in parallel with structured reasoning, backed by Redis caching and PostgreSQL persistence. Features an interactive Leaflet map with satellite toggle, event filtering, and mobile-responsive design.',
    shortDescription: 'Real-time GDELT threat visualization with 3 LLM validation models, Redis caching, and interactive Leaflet map.',
    githubUrl: 'https://github.com/phingorani/waffle-threatmap',
    demoUrl: 'https://threats.pratikhingorani.com',
    techStack: [
      { name: 'Next.js', url: 'https://nextjs.org/' },
      { name: 'React', url: 'https://react.dev/' },
      { name: 'TypeScript', url: 'https://www.typescriptlang.org/' },
      { name: 'Leaflet', url: 'https://leafletjs.com/' },
      { name: 'PostgreSQL', url: 'https://www.postgresql.org/' },
      { name: 'Redis', url: 'https://redis.io/' },
      { name: 'Tailwind CSS', url: 'https://tailwindcss.com/' },
    ],
    category: 'Full Stack',
    status: 'live',
    highlight: '3 LLM validators',
    objective: 'Build a real-time threat intelligence dashboard that uses AI to validate and explain global events.',
    overview: 'ThreatMap ingests GDELT event data and plots threat events on an interactive world map. Each event is validated by three separate LLM models running in parallel — if the majority agree, the event is marked as confirmed. Users can filter by event type, severity, and date range. The reasoning from each model is displayed in a detailed modal.',
    shortValueProposition: 'Demonstrates multi-model AI consensus, real-time data processing, and complex geospatial visualization.',
    process: 'Design data pipeline → Build GDELT normalizer → Implement parallel LLM validation → Create Leaflet UI → Add Redis caching → Deploy on K3s.',
    reflection: 'Using three models in parallel for validation was a breakthrough — it dramatically reduced false positives compared to single-model approaches. Redis caching keeps the UI snappy even with thousands of events.',
  },
  {
    slug: 'ai-chatbot',
    title: 'AI Chatbot',
    description: 'Multi-model streaming chat interface with web search via SearXNG, image upload, extended thinking mode, conversation forking, per-session system prompts, and message editing. PostgreSQL backend with Authelia-based user tracking and session isolation.',
    shortDescription: 'Multi-model streaming chat with web search, image upload, thinking mode, and conversation forking.',
    githubUrl: 'https://github.com/phingorani/waffle-chatbot',
    demoUrl: 'https://chat.pratikhingorani.com',
    techStack: [
      { name: 'Next.js', url: 'https://nextjs.org/' },
      { name: 'React', url: 'https://react.dev/' },
      { name: 'TypeScript', url: 'https://www.typescriptlang.org/' },
      { name: 'PostgreSQL', url: 'https://www.postgresql.org/' },
      { name: 'SSE', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events' },
      { name: 'Tailwind CSS', url: 'https://tailwindcss.com/' },
    ],
    category: 'Full Stack',
    status: 'live',
    highlight: 'Multi-model',
    objective: 'Create a feature-rich chat interface that rivals commercial offerings while running entirely on homelab hardware.',
    overview: 'This chatbot connects to the LLM Router and provides a polished conversational UI. It supports streaming responses via SSE, web search integration through SearXNG, image upload with vision models, extended thinking mode with collapsible reasoning, and per-session system prompts. Conversations can be forked, exported, and searched.',
    shortValueProposition: 'A production-quality chat application demonstrating real-time streaming, multi-model routing, and advanced UX patterns.',
    process: 'Design streaming architecture → Build SSE chat API → Implement model picker → Add web search → Build conversation management → Migrate to PostgreSQL.',
    reflection: 'The conversation forking feature was the most interesting to build — it creates a tree-like exploration of different AI responses from the same point in a conversation. Migrating from SQLite to PostgreSQL unlocked multi-user support.',
  },
  {
    slug: 'dgx-spark-stack',
    title: 'DGX Spark AI Stack',
    description: 'Dual NVIDIA DGX Spark GB10 systems running GPT-OSS-120B (MXFP4/CUTLASS quantization) and Qwen3-Coder-Next 80B via vLLM. Combined 20 TOPS of dedicated AI compute for inference workloads across the homelab.',
    shortDescription: 'Dual DGX Spark GB10 systems running GPT-OSS-120B and Qwen3-Coder-Next 80B via vLLM.',
    githubUrl: 'https://github.com/phingorani/waffle-homelab',
    techStack: [
      { name: 'vLLM', url: 'https://docs.vllm.ai/' },
      { name: 'CUDA', url: 'https://developer.nvidia.com/cuda-toolkit' },
      { name: 'MXFP4', url: 'https://docs.vllm.ai/' },
      { name: 'Docker', url: 'https://www.docker.com/' },
      { name: 'NVIDIA GB10', url: 'https://www.nvidia.com/' },
    ],
    category: 'AI/ML',
    status: 'active',
    highlight: '120B params',
    objective: 'Run large language models locally with enterprise-grade performance for privacy-first AI inference.',
    overview: 'Two NVIDIA DGX Spark systems form the AI compute backbone. The first runs GPT-OSS-120B using MXFP4 quantization with CUTLASS kernels for maximum throughput. The second handles code-focused workloads with Qwen3-Coder-Next 80B. Both expose OpenAI-compatible APIs through the LLM Router.',
    shortValueProposition: 'Enterprise-grade AI inference on dedicated hardware — 120B parameter models running locally with full data privacy.',
    process: 'Evaluate hardware → Install vLLM → Optimize quantization (MXFP4) → Benchmark throughput → Integrate with router → Monitor with Prometheus.',
    reflection: 'MXFP4 quantization on the GB10 achieved near-FP16 quality at 3x the throughput. The key learning was that quantization strategy matters more than raw hardware for inference workloads.',
  },
  {
    slug: 'strix-halo-server',
    title: 'Strix Halo AI Server',
    description: 'MinisForum MS-S1 MAX with AMD Ryzen AI Max+ 395, 128GB LPDDR5 unified memory. Runs 4 concurrent LLM models via LM Studio at 51 tok/s on the iGPU with 96GB VRAM allocation. Also hosts the Proxmox hypervisor and K3s control plane.',
    shortDescription: 'AMD Ryzen AI Max+ 395 server with 128GB unified memory running 4 concurrent LLMs at 51 tok/s.',
    githubUrl: 'https://github.com/phingorani/waffle-homelab',
    techStack: [
      { name: 'AMD Ryzen AI', url: 'https://www.amd.com/' },
      { name: 'LM Studio', url: 'https://lmstudio.ai/' },
      { name: 'Proxmox', url: 'https://www.proxmox.com/' },
      { name: 'Vulkan', url: 'https://www.vulkan.org/' },
      { name: 'Docker', url: 'https://www.docker.com/' },
    ],
    category: 'Infrastructure',
    status: 'active',
    highlight: '128GB UMA',
    objective: 'Build a multi-purpose server that handles both virtualization and AI inference with massive unified memory.',
    overview: 'The Strix Halo server is the swiss-army-knife of the homelab. Its 128GB of unified memory means the iGPU gets 96GB of VRAM — enough to run multiple large models simultaneously. It runs Proxmox for VMs, the K3s control plane, and 4 LLM models through LM Studio, all concurrently.',
    shortValueProposition: 'Demonstrates that consumer AMD hardware with unified memory can rival dedicated AI accelerators for inference.',
    process: 'Select hardware → Install Proxmox → Configure UMA split (96GB GPU / 32GB system) → Install Vulkan drivers → Deploy LM Studio → Benchmark throughput.',
    reflection: 'The unified memory architecture was a game-changer — no PCIe bottleneck means models load instantly. 51 tok/s on 4 concurrent models is competitive with much more expensive setups.',
  },
  {
    slug: 'hotel-pms',
    title: 'Hotel PMS',
    description: 'Full-stack property management system with an AI copilot. FastAPI backend with tool-calling analytics, React frontend, PostgreSQL database. The AI copilot uses the LLM Router to answer natural language queries about bookings, revenue, and occupancy.',
    shortDescription: 'Property management system with AI copilot for natural language analytics and tool-calling.',
    githubUrl: 'https://github.com/phingorani/hotel-pms',
    techStack: [
      { name: 'FastAPI', url: 'https://fastapi.tiangolo.com/' },
      { name: 'React', url: 'https://react.dev/' },
      { name: 'PostgreSQL', url: 'https://www.postgresql.org/' },
      { name: 'Python', url: 'https://www.python.org/' },
      { name: 'Docker', url: 'https://www.docker.com/' },
      { name: 'K3s', url: 'https://k3s.io/' },
    ],
    category: 'Full Stack',
    status: 'active',
    highlight: 'AI copilot',
    objective: 'Build a modern PMS with AI-powered analytics that hotel managers can query in natural language.',
    overview: 'The Hotel PMS manages rooms, bookings, guests, and housekeeping. Its standout feature is the AI copilot — a chat interface where managers can ask questions like "What\'s our occupancy rate this month?" or "Which room types generate the most revenue?" The copilot uses tool-calling to query the database and generate visualizations.',
    shortValueProposition: 'Combines traditional CRUD operations with cutting-edge AI tool-calling for a next-generation management experience.',
    process: 'Design data model → Build FastAPI CRUD → Create React dashboard → Implement AI copilot with tool-calling → Deploy on K3s.',
    reflection: 'Tool-calling was the breakthrough feature — it lets the AI copilot execute actual database queries rather than hallucinating answers. The hotel domain proved ideal for demonstrating this pattern.',
  },
  {
    slug: 'home-automation',
    title: 'Home Automation',
    description: 'Home Assistant on Raspberry Pi with Shelly device integration, crash recovery automation, Prometheus/Grafana monitoring with a custom GPU exporter. Features a custom dashboard with full compute infrastructure overview across all homelab nodes.',
    shortDescription: 'Home Assistant with Shelly integration, Prometheus monitoring, and custom GPU exporter.',
    githubUrl: 'https://github.com/phingorani/waffle-homelab',
    techStack: [
      { name: 'Home Assistant', url: 'https://www.home-assistant.io/' },
      { name: 'Prometheus', url: 'https://prometheus.io/' },
      { name: 'Grafana', url: 'https://grafana.com/' },
      { name: 'Shelly', url: 'https://www.shelly.com/' },
      { name: 'MQTT', url: 'https://mqtt.org/' },
      { name: 'Docker', url: 'https://www.docker.com/' },
    ],
    category: 'Infrastructure',
    status: 'stable',
    highlight: 'Full observability',
    objective: 'Unify home automation and infrastructure monitoring into a single, resilient dashboard.',
    overview: 'Home Assistant manages all smart home devices (Shelly switches, sensors) while simultaneously serving as the monitoring hub for the entire homelab. A custom GPU exporter feeds AMD iGPU metrics to Prometheus, and Grafana dashboards visualize everything from room temperature to LLM inference throughput.',
    shortValueProposition: 'Bridges the gap between IoT home automation and infrastructure monitoring with a unified observability stack.',
    process: 'Install HA on Pi → Integrate Shelly devices → Build Prometheus exporters → Create Grafana dashboards → Add crash recovery automation.',
    reflection: 'The custom GPU exporter was the most technically interesting piece — parsing AMD ROCm metrics and exposing them as Prometheus gauges. Having all infrastructure metrics in one place made troubleshooting dramatically faster.',
  },
];
