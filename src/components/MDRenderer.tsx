import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneLight,
  materialDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import Image from "next/image";
import { ReactNode } from "react";

interface CodeBlockProps {
  inline?: boolean;
  className?: string;
  children?: ReactNode;
  [key: string]: any;
}

export const CodeBlock = ({
  inline,
  className,
  children,
  ...props
}: CodeBlockProps) => {
  const match = /language-(\w+)/.exec(className || "");
  const codeString = String(children).replace(/\n$/, "");

  return !inline && match ? (
    // block code
    <div className="relative my-4 overflow-hidden rounded-sm flex flex-col bg-[#fafafa] dark:bg-[#2F2F2F]">
      {/* codeHeader */}
      <div className="flex items-center justify-between px-6 pt-2 bg-[#fafafa] dark:bg-[#2F2F2F]">
        {/* language */}
        <span className="text-sm font-sans text-neutral-700 dark:text-neutral-300">
          {match[1]}
        </span>
      </div>

      {/* code card */}
      <div className="rounded-sm overflow-hidden border-none max-w-[72vw] md:max-w-none">
        <div className="dark:hidden">
          <SyntaxHighlighter
            style={oneLight}
            language={match[1]}
            PreTag="div"
            wrapLongLines
            showLineNumbers
            codeTagProps={{
              style: {
                fontSize: "0.875rem",
                lineHeight: "1.375",
              },
            }}
            {...props}
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
        <div className="hidden dark:block">
          <SyntaxHighlighter
            style={materialDark}
            language={match[1]}
            PreTag="div"
            wrapLongLines
            showLineNumbers
            codeTagProps={{
              style: {
                fontSize: "0.875rem",
                lineHeight: "1.375",
              },
            }}
            {...props}
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  ) : (
    // inline code
    <code className="rounded px-1.5 py-0.5 wrap-break-word font-mono text-sm bg-[#f1f1f1] dark:bg-neutral-800 dark:text-neutral-200">
      {children}
    </code>
  );
};

interface ImageSettings {
  w: number | null;
  h: number | null;
  mt: number | null;
  mb: number | null;
  p: string | null;
}

/**
 * For now encode image properties inside alt text,
 * alt --> actual alt text or empty # w.W,h.H,p.C,mt.MT,mb.MB
 * #-> special symbol for splitting,
 * w.WIDTH_VALUE_INT, eg w.230
 * for position -> (C-enter/S-tart/E-nd)
 * mb, mt -> max 100
 * w, h max 678
 */
function getSettingsFromAlt(altText: string): ImageSettings {
  if (!altText) return { w: null, h: null, mt: null, mb: null, p: null };
  if ((altText.match(/#/g) || []).length !== 1)
    return { w: null, h: null, mt: null, mb: null, p: null };

  const settingsPart = altText.split("#")[1];
  const result: ImageSettings = {
    w: null,
    h: null,
    mt: null,
    mb: null,
    p: null,
  };

  // Match all settings with their values
  const regex = /(w|h|mt|mb)\.(\d+)|p\.([CSEcse])/g;
  let match;

  while ((match = regex.exec(settingsPart)) !== null) {
    const [_, key, value, pos] = match;

    if (key === "w" || key === "h") {
      const val = Math.min(parseInt(value), 678);
      if (!isNaN(val)) result[key] = val;
    } else if (key === "mt" || key === "mb") {
      const val = Math.min(parseInt(value), 100);
      if (!isNaN(val)) result[key] = val;
    } else if (pos) {
      result.p = pos.toUpperCase(); // Normalize to uppercase
    }
  }

  if (!result.p) return result;

  if (result.p.toLowerCase() === "c") {
    result.p = "center";
  } else if (result.p.toLowerCase() === "s") {
    result.p = "flex-start";
  } else if (result.p.toLowerCase() === "e") {
    result.p = "flex-end";
  } else {
    result.p = "center";
  }

  return result;
}

interface MarkdownImageProps {
  src?: string;
  alt?: string;
  [key: string]: any;
}

const MarkdownImage = (props: MarkdownImageProps) => {
  const { src, alt, ...rest } = props;

  if (!src || !alt) return null;

  const { w, h, mt, mb, p } = getSettingsFromAlt(alt);

  return (
    <div
      className="markdown-image-container-div relative cursor-zoom-in z-10 overflow-hidden flex items-center group"
      style={{
        justifyContent: p || "center",
        marginTop: mt ? `${mt}px` : "35px",
        marginBottom: mb ? `${mb}px` : "35px",
      }}
    >
      <Image
        className="relative object-contain transition-transform duration-300 border border-transparent group-hover:border-lime-300"
        style={{
          maxHeight: h ? `${h}px` : "468px",
          maxWidth: w ? `${w}px` : "468px",
        }}
        src={src}
        alt={alt}
        width={w || 468}
        height={h || 468}
        {...rest}
      />
    </div>
  );
};

interface MDPrevProps {
  content: string;
}

export function MarkdownRenderer({ content }: MDPrevProps) {
  return (
    <div className="w-full flex flex-col">
      <div id="export" className="sentient-regular w-full">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks, remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeKatex]}
          components={{
            img: MarkdownImage,

            hr: (props) => (
              <hr
                className="my-6 border-t border-neutral-200 dark:border-neutral-700"
                {...props}
              />
            ),

            code: CodeBlock,

            blockquote: ({ children }) => (
              <blockquote className="italic border-l-4 pl-4 py-1 my-3 border-gray-400 dark:border-neutral-600 bg-gray-100/0 text-gray-700 dark:text-neutral-300">
                {children}
              </blockquote>
            ),

            h1: ({ children }) => (
              <h1 className="mt-12 mb-6 leading-tight tracking-tight text-3xl md:text-4xl font-bold font-serif flex items-center gap-2 justify-start group text-neutral-900 dark:text-neutral-100">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="font-serif mt-10 mb-5 leading-tight tracking-tight text-2xl md:text-3xl font-bold flex items-center gap-2 justify-start group text-neutral-900 dark:text-neutral-100">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="font-serif mt-8 mb-4 leading-snug text-xl md:text-2xl font-bold flex items-center gap-2 justify-start group text-neutral-900 dark:text-neutral-100">
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="sentient-regular font-semibold mt-6 mb-3 leading-snug text-lg md:text-xl flex items-center gap-2 justify-start group text-neutral-900 dark:text-neutral-100">
                {children}
              </h4>
            ),
            h5: ({ children }) => (
              <h5 className="sentient-regular font-semibold mt-5 mb-3 leading-snug text-base md:text-lg text-neutral-900 dark:text-neutral-100">
                {children}
              </h5>
            ),
            h6: ({ children }) => (
              <h6 className="sentient-regular font-semibold mt-4 mb-2 uppercase tracking-wider text-base text-neutral-900 dark:text-neutral-100">
                {children}
              </h6>
            ),

            p: ({ children }) => (
              <p className="my-8 w-full text-base md:text-lg md:leading-[28px] text-neutral-700 dark:text-neutral-300">
                {children}
              </p>
            ),

            strong: ({ children }) => (
              <strong className="font-semibold sentient-bold text-neutral-700 dark:text-neutral-300">
                {children}
              </strong>
            ),

            em: ({ children }) => (
              <em className="italic text-neutral-700 dark:text-neutral-300 sentient-italic">
                {children}
              </em>
            ),

            a: ({ href, children }) => (
              <a
                href={href}
                className="underline font-medium sentient-regular transition-colors duration-200 text-lime-600 hover:text-lime-700 dark:text-lime-400 dark:hover:text-lime-300"
                target={href?.startsWith("http") ? "_blank" : "_self"}
                rel={href?.startsWith("http") ? "noopener noreferrer" : ""}
              >
                {children}
              </a>
            ),

            ul: ({ children }) => (
              <ul className="sentient-regular text-neutral-700 dark:text-neutral-300 list-disc pl-6 md:pl-8 my-3 md:my-4 space-y-1">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="sentient-regular text-neutral-700 dark:text-neutral-300 list-decimal pl-6 md:pl-8 my-3 md:my-4 space-y-1">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="sentient-regular text-neutral-700 dark:text-neutral-300 leading-snug md:leading-normal text-base md:text-lg">
                {children}
              </li>
            ),

            table: ({ children }) => (
              <div className="overflow-x-auto">
                <table className="border border-gray-400 dark:border-neutral-600 bg-white dark:bg-neutral-800 w-full text-neutral-900 dark:text-neutral-100">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-gray-200 dark:bg-neutral-700">
                {children}
              </thead>
            ),
            tbody: ({ children }) => (
              <tbody className="dark:bg-neutral-800">{children}</tbody>
            ),
            tr: ({ children }) => (
              <tr className="border border-gray-300 dark:border-neutral-600">
                {children}
              </tr>
            ),
            th: ({ children }) => (
              <th className="border sentient-bold border-gray-300 dark:border-neutral-600 px-4 py-2 bg-gray-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="border border-gray-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 px-4 py-2 dark:bg-neutral-800 sentient-regular">
                {children}
              </td>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
