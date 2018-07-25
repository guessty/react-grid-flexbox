import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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
  gutter,
  inline,
}) => {
  const StyledFlexChild = styled.div`
    padding: ${cssSpacing};
    ${_grow ? 'flex-grow: 1;' : ''}
    ${_basis ? mediaBasis(_basis) : ''} 
    ${_scroll ? `
      > * {
        max-width: calc(100% - ${gutter});
        max-height: calc(100% - ${gutter});
        overflow: auto;
      }
    ` : ''}
    ${!inline && _grow && _reset ? `
      position: relative;
      > * {
        position: absolute;
        width: calc(100% - ${gutter});
        height: calc(100% - ${gutter});
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
  gutter: PropTypes.string,
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
    flex-driection: ${inline ? 'row' : 'column'};
    flex-wrap: ${wrap && inline ? 'wrap' : 'no-wrap'};
    ${itemsCenter ? 'align-items: center;' : ''}
    ${fullHeight ? 'min-height: 100%;' : ''}
    ${container ? `
      margin: 0;
      padding: calc(${gutter} / 2);
    ` : `
      margin: calc(-${gutter} / 2);
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
  gutter: PropTypes.string,
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
