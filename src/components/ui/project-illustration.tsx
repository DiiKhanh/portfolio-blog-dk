"use client";

/**
 * SVG illustrations for each project – abstract, modern showcase visuals
 * that represent the project's domain without needing real screenshots.
 */

function NeuralParkingIllustration() {
    return (
        <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
                <linearGradient id="np-grad1" x1="0" y1="0" x2="800" y2="400">
                    <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.08" />
                </linearGradient>
                <linearGradient id="np-grad2" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#00D9FF" />
                    <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
            </defs>
            {/* Background */}
            <rect width="800" height="400" fill="url(#np-grad1)" />
            {/* Grid pattern */}
            {Array.from({ length: 8 }).map((_, i) => (
                <line key={`v${i}`} x1={100 * (i + 1)} y1="0" x2={100 * (i + 1)} y2="400" stroke="#00D9FF" strokeOpacity="0.06" strokeWidth="1" />
            ))}
            {Array.from({ length: 4 }).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={100 * (i + 1)} x2="800" y2={100 * (i + 1)} stroke="#00D9FF" strokeOpacity="0.06" strokeWidth="1" />
            ))}
            {/* Camera/AI eye icon */}
            <circle cx="400" cy="170" r="60" stroke="url(#np-grad2)" strokeWidth="3" fill="none" strokeOpacity="0.6" />
            <circle cx="400" cy="170" r="40" stroke="url(#np-grad2)" strokeWidth="2" fill="none" strokeOpacity="0.4" />
            <circle cx="400" cy="170" r="18" fill="#00D9FF" fillOpacity="0.2" />
            <circle cx="400" cy="170" r="8" fill="#00D9FF" fillOpacity="0.5" />
            {/* Scanning lines */}
            <line x1="330" y1="170" x2="260" y2="120" stroke="#00D9FF" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="4 4" />
            <line x1="470" y1="170" x2="540" y2="120" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="4 4" />
            <line x1="330" y1="170" x2="260" y2="220" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="4 4" />
            <line x1="470" y1="170" x2="540" y2="220" stroke="#00D9FF" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="4 4" />
            {/* License plate mockup */}
            <rect x="310" y="270" width="180" height="50" rx="8" fill="#111827" stroke="#00D9FF" strokeWidth="1.5" strokeOpacity="0.4" />
            <text x="400" y="302" textAnchor="middle" fill="#00D9FF" fontSize="18" fontFamily="monospace" fontWeight="600" opacity="0.8">51A-123.45</text>
            {/* Parking slots */}
            {[180, 260, 340, 420, 500, 580].map((x, i) => (
                <g key={`slot${i}`}>
                    <rect x={x} y="350" width="60" height="30" rx="4" fill={i < 3 ? "#10B981" : "#00D9FF"} fillOpacity={i < 3 ? "0.15" : "0.08"} stroke={i < 3 ? "#10B981" : "#00D9FF"} strokeWidth="1" strokeOpacity="0.3" />
                    <circle cx={x + 30} cy={365} r={4} fill={i < 3 ? "#10B981" : "#334155"} fillOpacity={i < 3 ? "0.6" : "0.3"} />
                </g>
            ))}
            {/* Neural network nodes */}
            {[[200, 100], [600, 100], [200, 240], [600, 240], [150, 170], [650, 170]].map(([cx, cy], i) => (
                <circle key={`node${i}`} cx={cx} cy={cy} r="4" fill="#00D9FF" fillOpacity="0.3" />
            ))}
        </svg>
    );
}

function TaskManagementIllustration() {
    return (
        <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
                <linearGradient id="tm-grad1" x1="0" y1="0" x2="800" y2="400">
                    <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.08" />
                </linearGradient>
                <linearGradient id="tm-grad2" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#0EA5E9" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
            </defs>
            <rect width="800" height="400" fill="url(#tm-grad1)" />
            {/* Map-like road path */}
            <path d="M100 300 Q250 200 400 250 Q550 300 700 180" stroke="url(#tm-grad2)" strokeWidth="3" fill="none" strokeOpacity="0.3" strokeLinecap="round" />
            <path d="M100 300 Q250 200 400 250 Q550 300 700 180" stroke="url(#tm-grad2)" strokeWidth="1" fill="none" strokeOpacity="0.15" strokeDasharray="8 6" />
            {/* Route markers */}
            {[[140, 280], [300, 220], [400, 250], [550, 270], [670, 195]].map(([cx, cy], i) => (
                <g key={`marker${i}`}>
                    <circle cx={cx} cy={cy} r="12" fill={i === 0 ? "#0EA5E9" : i === 4 ? "#8B5CF6" : "#111827"} fillOpacity={i === 0 || i === 4 ? "0.3" : "1"} stroke={i === 0 ? "#0EA5E9" : i === 4 ? "#8B5CF6" : "#0EA5E9"} strokeWidth="2" strokeOpacity="0.5" />
                    <text x={cx} y={cy + 4} textAnchor="middle" fill={i === 0 ? "#0EA5E9" : i === 4 ? "#8B5CF6" : "#0EA5E9"} fontSize="10" fontWeight="600" opacity="0.8">{i + 1}</text>
                </g>
            ))}
            {/* Task cards floating */}
            <g opacity="0.9">
                <rect x="180" y="60" width="160" height="80" rx="12" fill="#111827" stroke="#0EA5E9" strokeWidth="1" strokeOpacity="0.3" />
                <rect x="196" y="78" width="80" height="6" rx="3" fill="#0EA5E9" fillOpacity="0.4" />
                <rect x="196" y="92" width="120" height="4" rx="2" fill="#64748B" fillOpacity="0.3" />
                <rect x="196" y="104" width="100" height="4" rx="2" fill="#64748B" fillOpacity="0.2" />
                <circle cx="316" cy="118" r="8" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.5" />
                <path d="M312 118 L315 121 L321 115" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" />
            </g>
            <g opacity="0.7">
                <rect x="460" y="80" width="160" height="80" rx="12" fill="#111827" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.3" />
                <rect x="476" y="98" width="90" height="6" rx="3" fill="#8B5CF6" fillOpacity="0.4" />
                <rect x="476" y="112" width="110" height="4" rx="2" fill="#64748B" fillOpacity="0.3" />
                <rect x="476" y="124" width="80" height="4" rx="2" fill="#64748B" fillOpacity="0.2" />
                <circle cx="596" cy="138" r="8" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="1.5" strokeOpacity="0.5" />
            </g>
            {/* Activity feed pulse */}
            <circle cx="400" cy="340" r="6" fill="#0EA5E9" fillOpacity="0.5" />
            <circle cx="400" cy="340" r="14" fill="none" stroke="#0EA5E9" strokeWidth="1" strokeOpacity="0.2" />
            <circle cx="400" cy="340" r="24" fill="none" stroke="#0EA5E9" strokeWidth="1" strokeOpacity="0.1" />
        </svg>
    );
}

function HousingPortalIllustration() {
    return (
        <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
                <linearGradient id="hp-grad1" x1="0" y1="0" x2="800" y2="400">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.06" />
                </linearGradient>
                <linearGradient id="hp-grad2" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#0EA5E9" />
                </linearGradient>
            </defs>
            <rect width="800" height="400" fill="url(#hp-grad1)" />
            {/* Dashboard mockup - main panel */}
            <rect x="120" y="50" width="560" height="300" rx="16" fill="#111827" stroke="#10B981" strokeWidth="1" strokeOpacity="0.2" />
            {/* Sidebar */}
            <rect x="120" y="50" width="140" height="300" rx="16" fill="#0D1117" stroke="#10B981" strokeWidth="1" strokeOpacity="0.1" />
            <rect x="136" y="80" width="108" height="8" rx="4" fill="#10B981" fillOpacity="0.2" />
            {[110, 135, 160, 185, 210].map((y, i) => (
                <g key={`nav${i}`}>
                    <rect x="136" y={y} width={i === 0 ? "100" : "80"} height="6" rx="3" fill={i === 0 ? "#10B981" : "#64748B"} fillOpacity={i === 0 ? "0.4" : "0.15"} />
                </g>
            ))}
            {/* Table header */}
            <rect x="280" y="70" width="380" height="30" rx="0" fill="#0D1117" fillOpacity="0.5" />
            {[290, 370, 460, 560].map((x, i) => (
                <rect key={`th${i}`} x={x} y="80" width={i === 3 ? "50" : "60"} height="6" rx="3" fill="#10B981" fillOpacity="0.25" />
            ))}
            {/* Table rows */}
            {[0, 1, 2, 3, 4, 5].map((row) => (
                <g key={`row${row}`}>
                    <line x1="280" y1={115 + row * 38} x2="660" y2={115 + row * 38} stroke="#1E293B" strokeWidth="1" />
                    {[290, 370, 460].map((x, col) => (
                        <rect key={`cell${row}${col}`} x={x} y={122 + row * 38} width={50 + ((row * 7 + col * 13) % 30)} height="5" rx="2.5" fill="#64748B" fillOpacity="0.2" />
                    ))}
                    {/* Status badge */}
                    <rect x="560" y={118 + row * 38} width="50" height="16" rx="8" fill={row < 2 ? "#10B981" : row < 4 ? "#F59E0B" : "#EF4444"} fillOpacity="0.15" />
                    <rect x="568" y={124 + row * 38} width="34" height="4" rx="2" fill={row < 2 ? "#10B981" : row < 4 ? "#F59E0B" : "#EF4444"} fillOpacity="0.4" />
                </g>
            ))}
            {/* RBAC icon */}
            <g transform="translate(700, 180)">
                <circle r="30" fill="#111827" stroke="url(#hp-grad2)" strokeWidth="1.5" strokeOpacity="0.3" />
                <path d="M0 -12 L0 -4 C0 6 -8 12 0 16 C8 12 0 6 0 -4Z" fill="#10B981" fillOpacity="0.25" stroke="#10B981" strokeWidth="1.5" strokeOpacity="0.5" />
                <rect x="-4" y="-2" width="8" height="6" rx="1" fill="none" stroke="#10B981" strokeWidth="1.2" strokeOpacity="0.6" />
                <circle cx="0" cy="1" r="1.5" fill="#10B981" fillOpacity="0.6" />
            </g>
        </svg>
    );
}

function GenZPlatformIllustration() {
    return (
        <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
                <linearGradient id="gz-grad1" x1="0" y1="0" x2="800" y2="400">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#EC4899" stopOpacity="0.08" />
                </linearGradient>
                <linearGradient id="gz-grad2" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
            </defs>
            <rect width="800" height="400" fill="url(#gz-grad1)" />
            {/* Browser window */}
            <rect x="140" y="40" width="520" height="320" rx="16" fill="#111827" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.2" />
            {/* Browser dots */}
            <circle cx="168" cy="62" r="5" fill="#EF4444" fillOpacity="0.4" />
            <circle cx="186" cy="62" r="5" fill="#F59E0B" fillOpacity="0.4" />
            <circle cx="204" cy="62" r="5" fill="#10B981" fillOpacity="0.4" />
            <rect x="240" y="56" width="300" height="12" rx="6" fill="#0D1117" />
            {/* Content cards - skill cards */}
            {[[170, 100, 150, 110], [340, 100, 150, 110], [510, 100, 130, 110]].map(([x, y, w, h], i) => (
                <g key={`card${i}`}>
                    <rect x={x} y={y} width={w} height={h} rx="12" fill="#1E293B" stroke={["#8B5CF6", "#EC4899", "#0EA5E9"][i]} strokeWidth="1" strokeOpacity="0.2" />
                    {/* Skill icon placeholder */}
                    <circle cx={x + 30} cy={y + 30} r="14" fill={["#8B5CF6", "#EC4899", "#0EA5E9"][i]} fillOpacity="0.15" />
                    <rect x={x + 16} y={y + 55} width={w - 32} height="6" rx="3" fill="#E0E0FF" fillOpacity="0.15" />
                    <rect x={x + 16} y={y + 68} width={w - 50} height="4" rx="2" fill="#64748B" fillOpacity="0.15" />
                    {/* Progress bar */}
                    <rect x={x + 16} y={y + 85} width={w - 32} height="6" rx="3" fill="#1E293B" />
                    <rect x={x + 16} y={y + 85} width={(w - 32) * [0.7, 0.5, 0.85][i]} height="6" rx="3" fill={["#8B5CF6", "#EC4899", "#0EA5E9"][i]} fillOpacity="0.5" />
                </g>
            ))}
            {/* Bottom section - activity/content area */}
            <rect x="170" y="230" width="460" height="100" rx="12" fill="#1E293B" stroke="#8B5CF6" strokeWidth="0.5" strokeOpacity="0.15" />
            <rect x="190" y="250" width="120" height="6" rx="3" fill="#8B5CF6" fillOpacity="0.3" />
            <rect x="190" y="266" width="400" height="4" rx="2" fill="#64748B" fillOpacity="0.15" />
            <rect x="190" y="280" width="350" height="4" rx="2" fill="#64748B" fillOpacity="0.1" />
            <rect x="190" y="294" width="380" height="4" rx="2" fill="#64748B" fillOpacity="0.1" />
            {/* Floating elements */}
            <circle cx="710" cy="120" r="20" fill="#8B5CF6" fillOpacity="0.1" stroke="#8B5CF6" strokeWidth="1" strokeOpacity="0.2" />
            <circle cx="710" cy="120" r="8" fill="#8B5CF6" fillOpacity="0.2" />
            <circle cx="100" cy="280" r="15" fill="#EC4899" fillOpacity="0.1" stroke="#EC4899" strokeWidth="1" strokeOpacity="0.2" />
        </svg>
    );
}

const illustrationMap: Record<string, React.FC> = {
    "neural-parking": NeuralParkingIllustration,
    "taseven": TaskManagementIllustration,
    "housing-service-portal": HousingPortalIllustration,
    "genz-skills-platform": GenZPlatformIllustration,
};

function DefaultIllustration() {
    return (
        <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
                <linearGradient id="df-grad" x1="0" y1="0" x2="800" y2="400">
                    <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
                </linearGradient>
            </defs>
            <rect width="800" height="400" fill="url(#df-grad)" />
            <circle cx="400" cy="200" r="60" stroke="#00D9FF" strokeWidth="2" fill="none" strokeOpacity="0.2" />
            <circle cx="400" cy="200" r="30" stroke="#10B981" strokeWidth="2" fill="none" strokeOpacity="0.2" />
            <circle cx="400" cy="200" r="8" fill="#00D9FF" fillOpacity="0.3" />
        </svg>
    );
}

interface ProjectIllustrationProps {
    slug: string;
    className?: string;
}

export function ProjectIllustration({ slug, className = "" }: ProjectIllustrationProps) {
    const Illustration = illustrationMap[slug] ?? DefaultIllustration;
    return (
        <div className={`${className}`}>
            <Illustration />
        </div>
    );
}
