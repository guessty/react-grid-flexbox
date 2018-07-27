import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
//
import { composeCSSMedia } from './../helpers'


const FlexChild = ({
  className,
  children,
  _grow,
  _basis,
  _scroll,
  gutter,
  inline,
}) => {
  const StyledFlexChild = styled.div`
    ${composeCSSMedia('padding', gutter, null, (value) => `calc(${value} / 2)`)}
    ${_grow ? 'flex-grow: 1;' : ''}
    ${_basis ? composeCSSMedia('flex-basis', _basis, 'auto') : ''} 
    ${_scroll ? `
      > * {
        ${composeCSSMedia('max-width', gutter, '0px', (value) => `calc(100% - ${value})`)}
        ${composeCSSMedia('max-heigth', gutter, '0px', (value) => `calc(100% - ${value})`)}
        overflow: auto;
      }
    ` : ''}
    ${!inline && _grow ? `
      position: relative;
      > * {
        position: absolute;
        ${composeCSSMedia('width', gutter, '0px', (value) => `calc(100% - ${value})`)}
        ${composeCSSMedia('height', gutter, '0px', (value) => `calc(100% - ${value})`)}
      }
    ` : ''}
  `

  const renderChildWithClassName = () => (className) ? (
    <div className={ className }>
      { children }
    </div>
  ) : children

  return ((!inline && _grow) || _scroll) ? (
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
  _scroll: PropTypes.bool,
  inline: PropTypes.bool,
  gutter: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.string)]),
}

FlexChild.defaultProps = {
  className: null,
  _grow: false,
  _scroll: false,
  _basis: null,
  inline: false,
  gutter: '0px',
}


const Flex = ({
  className,
  children,
  inline,
  wrap,
  vAlign,
  hAlign,
  gutter,
  incEdgeGutter,
}) => {
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
      ${vAlign ? `${inline ? 'align-items' : 'justify-content'}: ${alignMap(vAlign)};` : ''}
      ${hAlign ? `${inline ? 'justify-content' : 'align-items'}: ${alignMap(hAlign)};` : ''}
    `
  }

  const StyledFlex = styled.div`
    display: flex;
    align-content: flex-start;
    flex-direction: ${inline ? 'row' : 'column'};
    flex-wrap: ${wrap && inline ? 'wrap' : 'nowrap'};
    ${composeAlignment(inline, vAlignContent, hAlignContent)}
    ${incEdgeGutter ? `
      margin: 0;
      ${composeCSSMedia('padding', gutter, null, (value) => `calc(${value} / 2)`)}
    ` : `
      ${composeCSSMedia('margin', gutter, null, (value) => `calc(-${value} / 2)`)}
    `}

    > * {
      max-width: 100%;
    }
  `

  const flexChildren = React.Children.map(children, (child) => {
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

      return <FlexChild { ...wrapped.props } gutter={gutter} isInline={inline} />
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
  inline: PropTypes.bool,
  wrap: PropTypes.bool,
  vAlign: PropTypes.string,
  hAlign: PropTypes.string,
  gutter: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.string)]),
  incEdgeGutter: PropTypes.bool,
}

Flex.defaultProps = {
  className: null,
  inline: false,
  wrap: false,
  vAlign: null,
  hAlign: null,
  gutter: '0px',
  incEdgeGutter: false,
}

export default Flex
