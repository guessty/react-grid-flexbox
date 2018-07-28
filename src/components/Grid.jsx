import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
//
import { composeCSSMedia } from './../helpers'


const GridChild = ({
  children,
  _gridArea,
}) => {
  const StyledGridChild = styled.div`
    ${composeCSSMedia('grid-area', _gridArea, 'auto')}
  `

  return (
    <StyledGridChild>
      { children }
    </StyledGridChild>
  )
}

GridChild.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  _gridArea: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.string)]).isRequired,
}

const Grid = ({
  className,
  children,
  templateRows,
  templateColumns,
  templateAreas,
  gutter,
  incGutterEdges,
}) => {
  const StyledGrid = styled.div`
    display: grid;
    ${composeCSSMedia('grid-template-columns', templateColumns, 'auto')}
    ${composeCSSMedia('grid-template-rows', templateRows, 'auto')}
    ${composeCSSMedia('grid-template-areas', templateAreas)}
    ${composeCSSMedia('grid-gap', gutter)}
    ${incGutterEdges ? composeCSSMedia('padding', gutter) : ''}
  `

  const gridChildren = React.Children.map(children, (child) => {
    if (child) {
      const gridChildProps = {
       '_gridArea': child.props._gridArea 
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
  templateColumns: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.string)]),
  templateRows: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.string)]),
  templateAreas: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.string)]).isRequired,
  gutter: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.string)]),
  incGutterEdges: PropTypes.bool,
}

Grid.defaultProps = {
  className: null,
  templateColumns: 'auto',
  templateRows: 'auto',
  gutter: '0px',
  incGutterEdges: false,
}

export default Grid
