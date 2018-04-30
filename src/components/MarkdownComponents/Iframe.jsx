import React from 'react';

const Iframe = class extends React.Component {
  render() {
    const props = {
      ref: 'iframe',
      frameBorder: '0',
      src: this.props.url,
      target: '_parent',
      allowFullScreen: this.props.allowFullScreen || false,
      style: Object.assign(
        {},
        {
          position: this.props.position || 'absolute',
          display: this.props.display || 'block',
          height: this.props.height || '100%',
          width: this.props.width || '100%'
        },
        this.props.styles || {}
      ),
      height: this.props.height || '100%',
      name: this.props.name || '',
      width: this.props.width || '100%'
    };

    return React.createElement(
      'iframe',
      Object.assign(
        props,
        this.props.id ? { id: this.props.id } : {},
        this.props.className ? { className: this.props.className } : {}
      )
    );
  }
};
export default Iframe;
