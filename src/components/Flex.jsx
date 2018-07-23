import React from 'react';
import PropTypes from 'prop-types';

const classNames = (classHash) => Object.keys(classHash).reduce((classString, key) => {
  return classHash[key] ? `${classString} ${key}` : classString;
}, '');

const FlexChild = ({
  className,
  children,
  _grow,
  _reset,
  _scroll,
  _inlineSizes,
}) => {
  const inlineSizeClasses = {};
  _inlineSizes.forEach((size) => {
    inlineSizeClasses[`flex-child--${ size }`] = true;
  });

  const childClasses = classNames(Object.assign({}, {
    'flex-child--grow': _grow,
    'flex-child--reset': _reset,
    'flex-child--scroll': _scroll,
  }, inlineSizeClasses));

  const renderChildWithClassName = () => {
    return (className) ? (
      <div className={ className }>
        { children }
      </div>
    ) : children;
  };

  return (flexReset || flexScroll) ? (
    <div className={ childClasses }>
      <div>
        {renderChildWithClassName()}
      </div>
    </div>
  ) : (
    <div className={ childClasses }>
      {renderChildWithClassName()}
    </div>
  );
};

FlexChild.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  _grow: PropTypes.bool,
  _reset: PropTypes.bool,
  _scroll: PropTypes.bool,
  _inlineSizes: PropTypes.array,
};

FlexChild.defaultProps = {
  className: null,
  _grow: false,
  _reset: false,
  _scroll: false,
  _inlineSizes: [],
};


class Flex extends React.PureComponent {
  render() {
    const flexClasses = classNames({
      'flex': true,
      'flex--inline': this.props.inline,
      'flex--wrap': this.props.wrap,
      'flex--items-center': this.props.itemsCenter,
      'flex--full-height': this.props.fullHeight,
      'flex--container': this.props.container,
      'flex--gutters-half': this.props.guttersHalf,
      'flex--gutters': this.props.gutters,
      'flex--gutters-2x': this.props.gutters2x,
      'flex--gutters-3x': this.props.gutters3x,
      'flex--gutters-4x': this.props.gutters4x,
      'flex--gutters-5x': this.props.gutters5x,
    });

    const flexChildren = React.Children.map(this.props.children, (child) => {
      // Wrap any children in a div to prevent potential css flex layout overrides.
      if (child) {
        const flexChildProps = Object.keys(FlexChild.defaultProps).reduce((props, key) => {
          if (key !== 'className') {
            props[key] = child.props[key];
          }
          return props;
        }, {});

        const childPropsWithoutFlexProps = Object.assign({}, child.props);

        Object.keys(flexChildProps).forEach((key) => {
          delete childPropsWithoutFlexProps[key];
        });

        const wrapped = React.createElement('div', flexChildProps, Object.assign({}, child, {
          props: childPropsWithoutFlexProps,
        }));

        return <FlexChild { ...wrapped.props } />;
      }
      return (child) ? (<FlexChild { ...child.props } />) : null;
    });

    return (this.props.className) ? (
      <div className={ this.props.className }>
        <div className={ flexClasses }>
          { flexChildren }
        </div>
      </div>
    ) : (
      <div className={ flexClasses }>
        { flexChildren }
      </div>
    );
  }
}

Flex.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  className: PropTypes.string,
  inline: PropTypes.bool,
  wrap: PropTypes.bool,
  itemsCenter: PropTypes.bool,
  fullHeight: PropTypes.bool,
  container: PropTypes.bool,
  gutters: PropTypes.bool,
  guttersHalf: PropTypes.bool,
  gutters2x: PropTypes.bool,
  gutters3x: PropTypes.bool,
  gutters4x: PropTypes.bool,
  gutters5x: PropTypes.bool,
};

Flex.defaultProps = {
  className: null,
  inline: false,
  wrap: false,
  itemsCenter: false,
  fullHeight: false,
  container: false,
  gutters: false,
  guttersHalf: false,
  gutters2x: false,
  gutters3x: false,
  gutters4x: false,
  gutters5x: false,
};

export default Flex;
