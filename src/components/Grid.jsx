import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const defaultBreakpoints = {
  tn: '0px', xs: '500px', sm: '768px', md: '992px',
  lg: '1200px', xl: '1440px', hg: '1920px',
}

const mediaTemplate = (direction, template) => {
  if (typeof template === 'string') {
    return `grid-template-${direction}: ${template};`
  } else if (template === Object(template)) {
    return Object.keys(template).reduce((templateString, key) => (`
      ${templateString}
      @media (min-width: ${defaultBreakpoints[key] ?
        defaultBreakpoints[key] : key
      }) {
        grid-template-${direction}: ${template[key]};
      }
    `), '')
  }
  return `grid-template-${direction}: auto;`
}

const GridChild = ({
  children,
  _area,
}) => {
  const StyledGridChild = styled.div`
    grid-area: ${_area}
  `

  return (
    <StyledGridChild>
      { children }
    </StyledGridChild>
  )
}

GridChild.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  _area: PropTypes.string.isRequired,
}

const Grid = ({
  className,
  children,
  columns,
  rows,
  gutter
}) => {
  const StyledGrid = styled.div`
    display: grid;
    ${mediaTemplate('columns', columns)}
    ${mediaTemplate('rows', rows)}
    grid-gap: ${gutter};
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
  columns: PropTypes.string,
  rows: PropTypes.string,
  gutter: PropTypes.string,
}

Grid.defaultProps = {
  className: null,
  columns: 'auto',
  gutter: '0px',
}

export default Grid
