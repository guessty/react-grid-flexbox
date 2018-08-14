import * as React from 'react'
//
import StyledFlexItem from './StyledFlexItem'

interface IFlexItemProps {
  children?: any
  gutterSize?: string | object
  _flexBasis?: string | object
  _flexGrow?: boolean
  _flexScroll?: boolean
  _flexReset?: boolean
}

const FlexItem = (props: IFlexItemProps) => {
  const jsx = () => (props._flexScroll || props._flexReset) ? (
    <div>
      {props.children}
    </div>
  ) : props.children

  return (
    <StyledFlexItem
      gutterSize={props.gutterSize}
      _flexBasis={props._flexBasis}
      _flexGrow={props._flexGrow}
      _flexScroll={props._flexScroll}
      _flexReset={props._flexReset}
    >
      {jsx()}
    </StyledFlexItem>
  )
}

export default FlexItem