interface LevelBadgeProps {
    level: "beginner" | "intermediate" | "advanced";
}

const levelConfig = {
    beginner: {
        label: "Beginner",
        className: "level-badge-beginner",
    },
    intermediate: {
        label: "Intermediate",
        className: "level-badge-intermediate",
    },
    advanced: {
        label: "Advanced",
        className: "level-badge-advanced",
    },
};

export function LevelBadge({ level }: LevelBadgeProps) {
    const config = levelConfig[level];

    return (
        <span className={`level-badge ${config.className}`}>
            {config.label}
        </span>
    );
}
