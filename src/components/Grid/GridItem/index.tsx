import * as React from 'react'
//
import StyledGridItem from './StyledGridItem'

interface IGridItemProps {
  children: any
  _gridArea: string | object
}

const GridItem = (props: IGridItemProps) => (
  <StyledGridItem _gridArea={props._gridArea}>
    { props.children }
  </StyledGridItem>
)

export default GridItem
