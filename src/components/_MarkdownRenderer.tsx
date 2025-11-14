import React from "react";

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
}) => {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code blocks
    if (line.startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre
          key={elements.length}
          className="bg-[#374528]/5 p-5 rounded-sm my-6 overflow-x-auto border border-[#374528]/10"
        >
          <code
            className="text-sm text-[#374528] leading-relaxed"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            {codeLines.join("\n")}
          </code>
        </pre>,
      );
      i++;
      continue;
    }

    // Display math ($$...$$)
    if (line.startsWith("$$") && line.endsWith("$$")) {
      const math = line.slice(2, -2);
      elements.push(
        <div key={elements.length} className="my-8 text-center">
          <div className="inline-block px-6 py-4 bg-[#374528]/5 rounded-sm">
            <span
              className="text-lg text-[#374528]"
              style={{ fontFamily: "Crimson Pro, serif", fontStyle: "italic" }}
            >
              {math}
            </span>
          </div>
        </div>,
      );
      i++;
      continue;
    }

    // Headers
    if (line.startsWith("# ")) {
      elements.push(
        <h1
          key={elements.length}
          className="text-5xl font-light mb-8 text-[#374528] mt-12 first:mt-0"
          // style={{ fontFamily: "Crimson Pro, serif" }}
        >
          {line.slice(2)}
        </h1>,
      );
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={elements.length}
          className="text-3xl font-light mb-6 text-[#374528] mt-12 border-b border-[#374528]/20 pb-3"
          // style={{ fontFamily: "Crimson Pro, serif" }}
        >
          {line.slice(3)}
        </h2>,
      );
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={elements.length}
          className="text-xl font-normal mb-4 text-[#374528] mt-8"
          // style={{ fontFamily: "Crimson Pro, serif" }}
        >
          {line.slice(4)}
        </h3>,
      );
      i++;
      continue;
    }

    // Horizontal rule
    if (line === "---") {
      elements.push(
        <hr key={elements.length} className="my-10 border-[#374528]/20" />,
      );
      i++;
      continue;
    }

    // List items
    if (line.startsWith("- ")) {
      elements.push(
        <li
          key={elements.length}
          className="ml-6 mb-2 text-[#374528]/90 leading-relaxed"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {parseInline(line.slice(2))}
        </li>,
      );
      i++;
      continue;
    }

    // Empty lines
    if (!line.trim()) {
      i++;
      continue;
    }

    // Regular paragraphs
    elements.push(
      <p
        key={elements.length}
        className="mb-4 leading-relaxed text-[#374528]/90"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {parseInline(line)}
      </p>,
    );
    i++;
  }

  return <>{elements}</>;
};

// Parse inline markdown (bold, italic, inline math)
export const parseInline = (text: string): React.ReactNode => {
  const parts: React.ReactNode[] = [];
  let current = "";
  let i = 0;

  while (i < text.length) {
    // Inline math $...$
    if (text[i] === "$" && text[i + 1] !== "$") {
      if (current) {
        parts.push(current);
        current = "";
      }
      i++;
      let math = "";
      while (i < text.length && text[i] !== "$") {
        math += text[i];
        i++;
      }
      parts.push(
        <span
          key={parts.length}
          className="italic text-[#374528]"
          style={{ fontFamily: "Crimson Pro, serif" }}
        >
          {math}
        </span>,
      );
      i++;
      continue;
    }

    // Bold **text**
    if (text[i] === "*" && text[i + 1] === "*") {
      if (current) {
        parts.push(current);
        current = "";
      }
      i += 2;
      let bold = "";
      while (i < text.length && !(text[i] === "*" && text[i + 1] === "*")) {
        bold += text[i];
        i++;
      }
      parts.push(
        <strong key={parts.length} className="font-medium text-[#374528]">
          {bold}
        </strong>,
      );
      i += 2;
      continue;
    }

    // Italic *text*
    if (text[i] === "*") {
      if (current) {
        parts.push(current);
        current = "";
      }
      i++;
      let italic = "";
      while (i < text.length && text[i] !== "*") {
        italic += text[i];
        i++;
      }
      parts.push(
        <em
          key={parts.length}
          className="italic text-[#374528]/80"
          style={{ fontFamily: "Crimson Pro, serif" }}
        >
          {italic}
        </em>,
      );
      i++;
      continue;
    }

    current += text[i];
    i++;
  }

  if (current) {
    parts.push(current);
  }

  return parts.length === 1 && typeof parts[0] === "string" ? parts[0] : parts;
};
