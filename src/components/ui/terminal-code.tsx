"use client";

import { motion } from "framer-motion";

interface TerminalCodeProps {
  title?: string;
  lines: string[];
  className?: string;
}

export function TerminalCode({ title = "terminal", lines, className = "" }: TerminalCodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`code-terminal ${className}`}
    >
      <div className="terminal-header">
        <div className="terminal-dots">
          <div className="dot dot-red"></div>
          <div className="dot dot-yellow"></div>
          <div className="dot dot-green"></div>
        </div>
        <span className="text-xs text-foreground-muted">{title}</span>
        <div className="w-12"></div>
      </div>
      <div className="terminal-content">
        <pre>
          <code>
            {lines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {line}
              </motion.div>
            ))}
          </code>
        </pre>
      </div>
    </motion.div>
  );
}
