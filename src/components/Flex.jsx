import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import './../sass/Flex.scss'

// const classNames = (classHash) => Object.keys(classHash).reduce((classString, key) => (classHash[key] ? `${classString} ${key}` : classString), '')

const defaultBreakpoints = {
  tn: '0px', xs: '500px', sm: '768px', md: '992px',
  lg: '1200px', xl: '1440px', hg: '1920px',
}

const mediaBasis = (basis) => {
  if (typeof basis === 'string') {
    return `flex-basis: ${basis};`
  } else if (basis === Object(basis)) {
    return Object.keys(basis).reduce((basisString, key) => (`
      ${basisString}
      @media (min-width: ${defaultBreakpoints[key] ?
        defaultBreakpoints[key] : key
      }) {
        flex-basis: ${basis[key]};
      }
    `), '')
  }
  return 'flex-basis: auto;'
}
  

const FlexChild = ({
  className,
  children,
  _grow,
  _basis,
  _reset,
  _scroll,
  cssSpacing,
  isInline,
  // _inlineSizes,
}) => {
  // const inlineSizeClasses = {}
  // _inlineSizes.forEach((size) => {
  //   inlineSizeClasses[`flex-child--${ size }`] = true
  // })

  // const childClasses = classNames(Object.assign({}, {
  //   'flex-child--grow': _grow,
  //   'flex-child--reset': _reset,
  //   'flex-child--scroll': _scroll,
  // }, inlineSizeClasses))

  const StyledFlexChild = styled.div`
    padding: ${cssSpacing};
    ${_grow ? 'flex-grow: 1;' : ''}
    ${_basis ? mediaBasis(_basis) : ''} 
    ${_scroll ? `
      > * {
        max-width: calc(100% - (${cssSpacing} * 2));
        max-height: calc(100% - (${cssSpacing} * 2));
        overflow: auto;
      }
    ` : ''}
    ${!isInline && _grow && _reset ? `
      position: relative;
      > * {
        position: absolute;
        width: calc(100% - (${cssSpacing} * 2));
        height: calc(100% - (${cssSpacing} * 2));
      }
    ` : ''}
  `

  const renderChildWithClassName = () => (className) ? (
    <div className={ className }>
      { children }
    </div>
  ) : children

  return (_reset || _scroll) ? (
    <StyledFlexChild>
      <div>
        {renderChildWithClassName()}
      </div>
    </StyledFlexChild>
  ) : (
    <StyledFlexChild>
      {renderChildWithClassName()}
    </StyledFlexChild>
  )
}

FlexChild.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  _grow: PropTypes.bool,
  _basis: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.string)]),
  _reset: PropTypes.bool,
  _scroll: PropTypes.bool,
  isInline: PropTypes.bool,
  cssSpacing: PropTypes.string,
  // _inlineSizes: PropTypes.array,
}

FlexChild.defaultProps = {
  className: null,
  _grow: false,
  _reset: false,
  _scroll: false,
  _basis: null,
  isInline: false,
  cssSpacing: '0px',
  // _inlineSizes: [],
}


class Flex extends React.PureComponent {
  render() {
    // const flexClasses = classNames({
    //   'flex': true,
    //   'flex--inline': this.props.inline,
    //   'flex--wrap': this.props.wrap,
    //   'flex--items-center': this.props.itemsCenter,
    //   'flex--full-height': this.props.fullHeight,
    //   'flex--container': this.props.container,
    //   'flex--gutters-half': this.props.guttersHalf,
    //   'flex--gutters': this.props.gutters,
    //   'flex--gutters-2x': this.props.gutters2x,
    //   'flex--gutters-3x': this.props.gutters3x,
    //   'flex--gutters-4x': this.props.gutters4x,
    //   'flex--gutters-5x': this.props.gutters5x,
    // })

    const cssSpacing = `${this.props.gutter / 2}${this.props.gutterUnits}`

    const StyledFlex = styled.div`
      display: flex;
      align-content: flex-start;
      flex-driection: ${this.props.inline ? 'row' : 'column'};
      flex-wrap: ${this.props.wrap && this.props.inline ? 'wrap' : 'no-wrap'};
      ${this.props.itemsCenter ? 'align-items: center;' : ''}
      ${this.props.fullHeight ? 'min-height: 100%;' : ''}
      ${this.props.container ? `
        margin: 0;
        padding ${cssSpacing}
      ` : `
        margin: -${cssSpacing}
      `}

      > * {
        max-width: 100%;
      }
    `

    const flexChildren = React.Children.map(this.props.children, (child) => {
      // Wrap any children in a div to prevent potential css flex layout overrides.
      if (child) {
        const flexChildProps = Object.keys(FlexChild.defaultProps).reduce((props, key) => {
          if (key !== 'className') {
            props[key] = child.props[key]
          }
          return props
        }, {})

        const childPropsWithoutFlexProps = Object.assign({}, child.props)

        Object.keys(flexChildProps).forEach((key) => {
          delete childPropsWithoutFlexProps[key]
        })

        const wrapped = React.createElement('div', flexChildProps, Object.assign({}, child, {
          props: childPropsWithoutFlexProps,
        }))

        return <FlexChild { ...wrapped.props } cssSpacing={cssSpacing} isInline={this.props.inline} />
      }
      return null
    })

    return (this.props.className) ? (
      <div className={ this.props.className }>
        <StyledFlex>
          { flexChildren }
        </StyledFlex>
      </div>
    ) : (
      <StyledFlex>
        { flexChildren }
      </StyledFlex>
    )
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
}

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
}

export default Flex
