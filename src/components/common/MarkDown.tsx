import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import React, { memo } from 'react';

const CodeBlock = ({ className, children }: any) => {
  const [, language] = className ? className.toString().split('-') : [];
  return (
    <SyntaxHighlighter
      language={language}
      style={tomorrow}
      showLineNumbers={true}
      customStyle={{
        maxWidth: '50vw',
      }}>
      {children || ''}
    </SyntaxHighlighter>
  );
};

type MarkdownProps = {
  source: string;
};
const Markdown = ({ source }: MarkdownProps) => {
  return (
    <ReactMarkdown
      children={source}
      components={{ code: CodeBlock }}
      linkTarget="_blank"
      remarkPlugins={[gfm]}
    />
  );
};

export default memo(Markdown);
