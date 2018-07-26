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
  _reset,
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
    ${!inline && _grow && _reset ? `
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
  inline: PropTypes.bool,
  gutter: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.string)]),
}

FlexChild.defaultProps = {
  className: null,
  _grow: false,
  _reset: false,
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
  itemsCenter,
  fullHeight,
  container,
  gutter,
}) => {
  const StyledFlex = styled.div`
    display: flex;
    align-content: flex-start;
    flex-direction: ${inline ? 'row' : 'column'};
    flex-wrap: ${wrap && inline ? 'wrap' : 'nowrap'};
    ${itemsCenter ? 'align-items: center;' : ''}
    ${fullHeight ? 'min-height: 100%;' : ''}
    ${container ? `
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
  itemsCenter: PropTypes.bool,
  fullHeight: PropTypes.bool,
  container: PropTypes.bool,
  gutter: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.string)]),
}

Flex.defaultProps = {
  className: null,
  inline: false,
  wrap: false,
  itemsCenter: false,
  fullHeight: false,
  container: false,
  gutter: '0px',
}

export default Flex
