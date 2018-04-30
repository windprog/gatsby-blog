import rehypeReact from 'rehype-react';
import React from 'react';
import Counter from './MarkdownComponents/demo';
import jsrunIframe from './MarkdownComponents/jsrun';

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    'interactive-counter': Counter,
    jsrun: jsrunIframe
  }
}).Compiler;

export default renderAst;
