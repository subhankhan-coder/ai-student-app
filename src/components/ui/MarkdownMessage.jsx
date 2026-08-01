import ReactMarkdown from "react-markdown";
import { C } from "../../utils/theme";

const components = {
  p: ({ children }) => <p style={{ margin: "0 0 8px" }}>{children}</p>,
  h1: ({ children }) => <h4 className="asc-display" style={{ fontSize: 16, fontWeight: 600, margin: "10px 0 6px" }}>{children}</h4>,
  h2: ({ children }) => <h4 className="asc-display" style={{ fontSize: 15, fontWeight: 600, margin: "10px 0 6px" }}>{children}</h4>,
  h3: ({ children }) => <h4 style={{ fontSize: 13.5, fontWeight: 700, margin: "8px 0 4px" }}>{children}</h4>,
  ul: ({ children }) => <ul style={{ margin: "4px 0 8px", paddingLeft: 18 }}>{children}</ul>,
  ol: ({ children }) => <ol style={{ margin: "4px 0 8px", paddingLeft: 18 }}>{children}</ol>,
  li: ({ children }) => <li style={{ marginBottom: 3 }}>{children}</li>,
  code: ({ inline, children }) =>
    inline ? (
      <code className="asc-mono" style={{ background: "rgba(0,0,0,0.08)", padding: "1px 5px", borderRadius: 4, fontSize: "0.92em" }}>{children}</code>
    ) : (
      <pre className="asc-mono" style={{ background: C.navyDeep, color: "#E7ECF3", padding: 12, borderRadius: 8, overflowX: "auto", fontSize: 12, margin: "6px 0" }}><code>{children}</code></pre>
    ),
  strong: ({ children }) => <strong>{children}</strong>,
  a: ({ children, href }) => <a href={href} target="_blank" rel="noreferrer" style={{ color: C.amberDeep }}>{children}</a>,
};

export function MarkdownMessage({ text }) {
  return <div style={{ fontSize: 13.5, lineHeight: 1.6 }}><ReactMarkdown components={components}>{text}</ReactMarkdown></div>;
}
