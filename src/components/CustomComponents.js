import rehypeReact from 'rehype-react';
import React from 'react';
import Counter from './MarkdownComponents/demo';

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { "interactive-counter": Counter },
}).Compiler;

export default renderAst;
