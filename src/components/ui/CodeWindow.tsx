import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeWindowProps {
  filename: string;
  language: string;
  code: string;
}

export function CodeWindow({ filename, language, code }: CodeWindowProps) {
  return (
    <div className="code-window">
      <div className="window-header">
        <div className="window-controls">
          <div className="window-control control-close"></div>
          <div className="window-control control-minimize"></div>
          <div className="window-control control-maximize"></div>
        </div>
        <div className="window-title">
          <div className="file-icon">PY</div>
          <span>{filename}</span>
        </div>
      </div>
      <div className="code-content">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: 0,
            background: 'transparent',
            fontSize: '14px',
            lineHeight: '1.6',
          }}
          showLineNumbers={true}
          lineNumberStyle={{
            color: '#666',
            paddingRight: '1em',
            minWidth: '2em'
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
} 