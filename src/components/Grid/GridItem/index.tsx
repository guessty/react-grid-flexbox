import * as React from 'react'
//
import StyledGridItem from './StyledGridItem'

interface IGridItemProps {
  children: any
  _gridArea: string | object
}

const GridItem = (props: IGridItemProps) => (
  <React.Fragment>
    <StyledGridItem _gridArea={props._gridArea}>
      { props.children }
    </StyledGridItem>
  </React.Fragment>
)

export default GridItem
