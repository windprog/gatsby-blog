import React from 'react';
import Iframe from './Iframe';

export default class jsrunIframe extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const embedTypes = this.props.type || 'all';
    const src = `//jsrun.net/${this.props.id}/embedded/${embedTypes}/light/`;
    const height = this.props.height || '150px';

    return (
      <Iframe
        url={src}
        width="100%"
        height={height}
        display="initial"
        position="relative"
        allowFullScreen
      />
    );
  }
}
