import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
//
import { composeCSSMedia } from './../helpers'


const GridChild = ({
  children,
  _area,
}) => {
  const StyledGridChild = styled.div`
    ${composeCSSMedia('grid-area', _area, 'auto')}
  `

  return (
    <StyledGridChild>
      { children }
    </StyledGridChild>
  )
}

GridChild.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  _area: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.string)]).isRequired,
}

const Grid = ({
  className,
  children,
  columnWidth,
  rowHeight,
  areas,
  gutter,
  incEdgeGutter,
}) => {
  const StyledGrid = styled.div`
    display: grid;
    ${composeCSSMedia('grid-template-columns', columnWidth, 'auto')}
    ${composeCSSMedia('grid-template-rows', rowHeight, 'auto')}
    ${composeCSSMedia('grid-template-areas', areas)}
    ${composeCSSMedia('grid-gap', gutter)}
    ${incEdgeGutter ? composeCSSMedia('padding', gutter) : ''}
  `

  const gridChildren = React.Children.map(children, (child) => {
    if (child) {
      const gridChildProps = {
       '_area': child.props._area 
      }

      const childPropsWithoutGridProps = Object.assign({}, child.props)

      Object.keys(gridChildProps).forEach((key) => {
        delete childPropsWithoutGridProps[key]
      })

      const wrapped = React.createElement('div', gridChildProps, Object.assign({}, child, {
        props: childPropsWithoutGridProps,
      }))

      return <GridChild { ...wrapped.props } />
    }
    return null
  })
  return (className) ? (
    <div className={ className }>
      <StyledGrid>
        { gridChildren }
      </StyledGrid>
    </div>
  ) : (
    <StyledGrid>
      { gridChildren }
    </StyledGrid>
  )
}

Grid.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  className: PropTypes.string,
  columnWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.string)]),
  rowHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.string)]),
  areas: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.string)]).isRequired,
  gutter: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.string)]),
  incEdgeGutter: PropTypes.bool,
}

Grid.defaultProps = {
  className: null,
  columnWidth: 'auto',
  rowHeight: 'auto',
  gutter: '0px',
  incEdgeGutter: false,
}

export default Grid
