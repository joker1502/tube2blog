import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import type { Components } from "react-markdown"

function headingId(text: string): string {
  const content = typeof text === "string" ? text : ""
  return content.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

const components: Components = {
  h2: ({ children }) => {
    const id = headingId(String(children))
    return <h2 id={id} className="mt-10 mb-4 text-2xl font-bold scroll-mt-20">{children}</h2>
  },
  h3: ({ children }) => {
    const id = headingId(String(children))
    return <h3 id={id} className="mt-6 mb-3 text-lg font-semibold scroll-mt-20">{children}</h3>
  },
  p: ({ children }) => <p className="mb-4 leading-relaxed text-muted-foreground">{children}</p>,
  ul: ({ children }) => <ul className="mb-4 list-disc pl-6 space-y-1.5 text-muted-foreground">{children}</ul>,
  ol: ({ children }) => <ol className="mb-4 list-decimal pl-6 space-y-1.5 text-muted-foreground">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  a: ({ href, children }) => (
    <a href={href} className="text-brand underline underline-offset-2 hover:text-brand-hover">{children}</a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-4 border-brand/30 pl-4 italic text-muted-foreground">{children}</blockquote>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-hidden rounded-xl border">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="border-b bg-muted/50">{children}</thead>,
  th: ({ children }) => <th className="p-3 text-left font-medium">{children}</th>,
  td: ({ children }) => <td className="p-3 text-muted-foreground">{children}</td>,
  code: ({ children }) => (
    <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono text-foreground">{children}</code>
  ),
}

export function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  )
}
