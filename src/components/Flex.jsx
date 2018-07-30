import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
//
import { composeCSSMedia } from './../helpers'


const FlexChild = ({
  className,
  children,
  _flexBasis,
  _flexGrow,
  _flexReset,
  _flexScroll,
  gutterSize,
}) => {
  const StyledFlexChild = styled.div`
    ${composeCSSMedia('padding', gutterSize, null, (value) => `calc(${value} / 2)`)}
    ${_flexBasis ? `
      ${composeCSSMedia('flex-basis', _flexBasis, 'auto')}
    ` : ''}
    ${_flexGrow ? `
      flex-grow: 1;
    ` : ''}
    ${_flexScroll ? `
      > * {
        ${composeCSSMedia('max-width', gutterSize, '0px', (value) => `calc(100% - ${value})`)}
        ${composeCSSMedia('max-heigth', gutterSize, '0px', (value) => `calc(100% - ${value})`)}
        overflow: auto;
      }
    ` : ''}
    ${_flexReset ? `
      position: relative;
      > * {
        position: absolute;
        ${composeCSSMedia('min-width', gutterSize, '100%', (value) => `calc(100% - ${value})`)}
        ${composeCSSMedia('min-height', gutterSize, '100%', (value) => `calc(100% - ${value})`)}
      }
    ` : ''}
  `

  const renderChildWithClassName = () => (className) ? (
    <div className={ className }>
      { children }
    </div>
  ) : children

  return (_flexScroll || _flexReset) ? (
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
  _flexBasis: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.string)]),
  _flexGrow: PropTypes.bool,
  _flexScroll: PropTypes.bool,
  _flexReset: PropTypes.bool,
  gutterSize: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.string)]),
}

FlexChild.defaultProps = {
  className: null,
  _flexBasis: null,
  _flexGrow: false,
  _flexScroll: false,
  _flexReset: false,
  gutterSize: '0px',
}


const Flex = ({
  className,
  children,
  direction,
  full,
  wrap,
  vAlign,
  hAlign,
  gutter,
  incGutterEdges,
}) => {
  const isRow = direction === 'row' || direction === 'row-reverse'

  const composeAlignment = () => {
    const alignMap = {
      top: 'flex-start',
      bottom: 'flex-end',
      left: 'flex-start',
      right: 'flex-end',
      center: 'center',
      middle: 'center',
    }
    return `
      ${vAlign ? `${isRow ? 'align-items' : 'justify-content'}: ${alignMap(vAlign)};` : ''}
      ${hAlign ? `${isRow ? 'justify-content' : 'align-items'}: ${alignMap(hAlign)};` : ''}
    `
  }

  const StyledFlex = styled.div`
    display: flex;
    align-content: flex-start;
    ${direction ? `flex-direction: ${direction};` : ''}
    flex-wrap: ${wrap && isRow ? 'wrap' : 'nowrap'};
    ${composeAlignment()}
    ${incGutterEdges ? `
      margin: 0;
      ${composeCSSMedia('padding', gutter, null, (value) => `calc(${value} / 2)`)}
    ` : `
      ${composeCSSMedia('margin', gutter, null, (value) => `calc(-${value} / 2)`)}
    `}
    ${full ? `
      ${composeCSSMedia('min-width', gutter, '0px', (value) => `calc(100% + ${value})`)}
      ${composeCSSMedia('min-height', gutter, '0px', (value) => `calc(100% + ${value})`)}
    ` : ''}

    > * {
      max-width: 100%;
    }
  `

  const flexChildren = React.Children.map(children, (child) => {
    // Wrap any children in a div to prevent potential css flex layout overrides.
    if (child) {
      const flexChildProps = child.props ? Object.keys(FlexChild.defaultProps).reduce((props, key) => {
        if (key !== 'className') {
          props[key] = child.props[key]
        }
        return props
      }, {}) : {}

      const childPropsWithoutFlexProps = Object.assign({}, child.props)

      Object.keys(flexChildProps).forEach((key) => {
        delete childPropsWithoutFlexProps[key]
      })

      const wrapped = React.createElement('div', flexChildProps, child.props ? Object.assign({}, child, {
        props: childPropsWithoutFlexProps,
      }) : child)
    
      return <FlexChild { ...wrapped.props } gutterSize={gutter} />
    }
    return null
  })

  return (className) ? (
    <div className={ className }>
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

Flex.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  className: PropTypes.string,
  direction: PropTypes.string,
  full: PropTypes.bool,
  wrap: PropTypes.bool,
  vAlign: PropTypes.string,
  hAlign: PropTypes.string,
  gutter: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.string)]),
  incGutterEdges: PropTypes.bool,
}

Flex.defaultProps = {
  className: null,
  direction: 'column',
  full: false,
  wrap: false,
  vAlign: null,
  hAlign: null,
  gutter: '0px',
  incGutterEdges: false,
}

export default Flex
