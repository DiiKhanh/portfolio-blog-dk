"use client";

import { motion } from "framer-motion";

interface TerminalCodeProps {
  title?: string;
  lines: string[];
  className?: string;
}

type TokenType =
  | "keyword"
  | "string"
  | "number"
  | "punctuation"
  | "identifier"
  | "whitespace"
  | "other";

interface Token {
  type: TokenType;
  value: string;
}

const keywordSet = new Set([
  "const",
  "let",
  "import",
  "from",
  "return",
  "export",
  "function",
  "async",
  "await",
  "type",
  "interface",
  "new",
]);

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < line.length) {
    const char = line[i];

    // Strings: '...' or "..."
    if (char === "'" || char === '"') {
      const quote = char;
      let j = i + 1;
      while (j < line.length && line[j] !== quote) {
        j++;
      }
      const value = line.slice(i, Math.min(j + 1, line.length));
      tokens.push({ type: "string", value });
      i = j + 1;
      continue;
    }

    // Whitespace
    if (/\s/.test(char)) {
      let j = i + 1;
      while (j < line.length && /\s/.test(line[j])) {
        j++;
      }
      tokens.push({ type: "whitespace", value: line.slice(i, j) });
      i = j;
      continue;
    }

    // Numbers
    if (/[0-9]/.test(char)) {
      let j = i + 1;
      while (j < line.length && /[0-9.]/.test(line[j])) {
        j++;
      }
      tokens.push({ type: "number", value: line.slice(i, j) });
      i = j;
      continue;
    }

    // Identifiers / keywords
    if (/[a-zA-Z_$]/.test(char)) {
      let j = i + 1;
      while (j < line.length && /[a-zA-Z0-9_$]/.test(line[j])) {
        j++;
      }
      const value = line.slice(i, j);
      const type: TokenType = keywordSet.has(value) ? "keyword" : "identifier";
      tokens.push({ type, value });
      i = j;
      continue;
    }

    // Punctuation / braces
    if (/[\{\}\[\]\(\)\.,:;]/.test(char)) {
      tokens.push({ type: "punctuation", value: char });
      i++;
      continue;
    }

    // Fallback: single char
    tokens.push({ type: "other", value: char });
    i++;
  }

  return tokens;
}

function getTokenClassName(type: TokenType): string {
  switch (type) {
    case "keyword":
      return "text-sky-400";
    case "string":
      return "text-emerald-400";
    case "number":
      return "text-amber-300";
    case "punctuation":
      return "text-foreground-muted";
    case "identifier":
      return "text-foreground";
    case "whitespace":
      return "";
    default:
      return "text-foreground";
  }
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
        <pre className="m-0 font-mono text-sm leading-6">
          <code className="flex flex-col gap-0.5">
            {lines.map((line, index) => {
              const tokens = tokenizeLine(line);
              const hasContent = tokens.length > 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                  className="flex items-center"
                >
                  <span className="inline-flex h-6 w-8 mr-4 items-center justify-end text-xs text-foreground-muted/60 select-none tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="inline-flex h-6 flex-1 items-center">
                    {hasContent
                      ? tokens.map((token, i) => (
                          <span key={i} className={getTokenClassName(token.type)}>
                            {token.value}
                          </span>
                        ))
                      : "\u00A0"}
                  </span>
                </motion.div>
              );
            })}
          </code>
        </pre>
      </div>
    </motion.div>
  );
}
