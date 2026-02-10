export type Project = {
  slug: string;
  title: string;
  tag?: string;
  context?: string;
  role?: string;
  description: string;
  longDescription: string;
  highlights: string[];
  tech: string[];
  image: string;
  github?: string;
  demo?: string;
  span?: string;
};

export const projects: Project[] = [
  {
    slug: "neural-parking",
    title: "Neural Parking",
    tag: "Graduation Thesis • Computer Vision",
    context: "UIT – VNUHCM capstone project",
    role: "Full-stack engineer owning backend, mobile app & deployment",
    description:
      "Smart parking management system that uses license-plate recognition and sensors to keep track of free slots in real time.",
    longDescription:
      "Neural Parking replaces manual, error-prone parking checks with a computer-vision-driven system. Cameras capture license plates at the gate, YOLOv8 detects and recognizes them, and a Golang-based backend coordinates slot availability, billing logic and audit trails. Operators use a React Native app to see real-time capacity, resolve incidents and search vehicle history, while infrastructure is packaged with Docker and routed via Nginx for reproducible deployments.",
    highlights: [
      "Designed Golang APIs to orchestrate license-plate recognition, slot status and billing rules",
      "Built operator-facing React Native app for live capacity view and incident resolution",
      "Implemented YOLOv8 inference pipeline via Flask service and integrated with main backend",
      "Containerized services with Docker and configured Nginx for routing and static assets",
    ],
    tech: ["Golang API", "React Native", "Flask", "YOLOv8", "Docker", "Nginx"],
    image: "/project-neural-parking.jpg",
    github: "",
    demo: "",
    span: "span-2",
  },
  {
    slug: "taseven",
    title: "Taseven",
    tag: "Team Lead • Real-time Operations",
    context: "Student product, 4-person team",
    role: "Led product scope, mobile app and real-time features",
    description:
      "Task management and real-time event tracking app for field teams with routes on Google Maps and a live activity feed.",
    longDescription:
      "Taseven helps field teams and managers stay aligned. Managers can plan routes on a map, assign tasks to on-site staff and monitor updates through a unified activity feed. I focused on the mobile experience: designing flows for check-ins, status updates and geolocation tracking, then implementing them with React Native, Express and MongoDB. Firebase powers low-latency sync and notifications so that changes feel instant across devices.",
    highlights: [
      "Co-designed end-to-end flows for planning routes, assigning tasks and reviewing outcomes",
      "Implemented React Native app with location tracking and in-app task status updates",
      "Integrated Google Maps for route visualisation and Firebase for real-time event syncing",
      "Collaborated with teammates on API design, data modelling and release cadence",
    ],
    tech: ["React Native", "Express", "MongoDB", "Firebase", "Google Maps API"],
    image: "/project-taseven.jpg",
    github: "",
    demo: "",
    span: "",
  },
  {
    slug: "housing-service-portal",
    title: "Housing Service Management Portal",
    tag: "Production • Hinokiya Ecosystem",
    context: "TGL Solutions client project",
    role: "Frontend engineer for internal operations portal",
    description:
      "Admin portal for support staff to manage housing service requests, SLAs and multi-role access in the Hinokiya ecosystem.",
    longDescription:
      "The Housing Service Management Portal is used daily by support staff to manage repair requests, inspections and other housing services. I worked on building data-heavy screens that stay performant and readable under large workloads: list views with advanced filtering, search and pagination, plus detail views that mirror real-world processes. A key focus was designing RBAC-friendly UIs so each role only sees relevant queues, actions and sensitive information.",
    highlights: [
      "Implemented large data tables with filtering, search and pagination for thousands of records",
      "Designed role-aware views and actions aligned with the system's RBAC model",
      "Collaborated closely with backend team to refine REST API contracts and error handling",
      "Contributed UI patterns that were later reused across other internal tools",
    ],
    tech: ["React", "RBAC", "REST APIs", "Agile"],
    image: "/project-housing-portal.jpg",
    github: "",
    demo: "",
    span: "",
  },
  {
    slug: "genz-skills-platform",
    title: "Gen Z Skills Support Website",
    tag: "Product Internship • GEEK Up",
    context: "Real product for Gen Z learners",
    role: "Frontend intern in cross-functional squad",
    description:
      "Web platform that helps Gen Z explore skills, track progress and access curated content, with a separate admin experience.",
    longDescription:
      "During my internship at GEEK Up, I joined a product squad building a platform that supports Gen Z in exploring new skills. I implemented both admin and end-user flows using React, Refine and React Query: from list and detail views with complex filters to optimistic updates that keep the interface feeling fast. Working inside a mature product culture taught me how design systems, product discovery and engineering practices connect in real projects.",
    highlights: [
      "Delivered reusable UI blocks using React, Refine and React Query following the design system",
      "Implemented list/detail screens, filtering and optimistic updates for a smoother UX",
      "Worked closely with designers and PMs through Design Sprints and weekly releases",
      "Learned to trade off between ideal architecture and shipping value in short iterations",
    ],
    tech: ["React", "Refine", "React Query", "TypeScript"],
    image: "/project-genz.jpg",
    github: "",
    demo: "",
    span: "span-2",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

