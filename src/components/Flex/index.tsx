import * as React from 'react'
//
import FlexItem from './FlexItem/index'
import StyledFlex from './StyledFlex'

interface IFlexProps {
  children?: any
  className?: string
  direction?: string
  vAlign?: string
  hAlign?: string
  gutter?: string | object
  full?: boolean
  wrap?: boolean
  incGutterEdges?: boolean
}

interface IFlexChildProps {
  children: any
  _flexBasis?: string | object
  ['data-flex-basis']?: string | object
  _flexGrow?: boolean
  ['data-flex-grow']?: boolean
  _flexScroll?: boolean
  ['data-flex-scroll']?: boolean
  _flexReset?: boolean
  ['data-flex-reset']?: boolean
}

interface IWrappedFlexChildProps {
  children?: any
  _flexBasis?: string | object
  _flexGrow?: boolean
  _flexScroll?: boolean
  _flexReset?: boolean
}

const keysToDelete = [
  '_flexBasis', 'data-flex-basis',
  '_flexGrow', 'data-flex-grow',
  '_flexScroll', 'data-flex-scroll',
  '_flexReset', 'data-flex-reset'
]

const Flex = (props: IFlexProps) => {
  const flexChildren = React.Children.map(props.children, (child: React.ReactElement<IFlexChildProps>) => {
    // Wrap any children in a div to prevent potential css flex layout overrides.
    if (child) {

      const type: any = child.type
      if (type === FlexItem) {
        return child
      }

      const wrappedFlexChildProps: IWrappedFlexChildProps = {
        '_flexBasis': child.props['data-flex-basis'] || child.props._flexBasis,
        '_flexGrow': child.props['data-flex-grow'] || child.props._flexGrow,
        '_flexScroll': child.props['data-flex-scroll'] || child.props._flexScroll,
        '_flexReset': child.props['data-flex-reset'] || child.props._flexReset,
      }

      const childPropsWithoutFlexProps: any = {...child.props}

      keysToDelete.forEach((key) => {
        delete childPropsWithoutFlexProps[key]
      })

      const wrapped = React.createElement('div', wrappedFlexChildProps, child.props ? {
        ...child,
        props: childPropsWithoutFlexProps,
      } : child)
    
      return (
        <FlexItem {...wrapped.props} gutterSize={props.gutter} />
      )
    }
    return null
  })

  const jsx = () => (
    <StyledFlex
      direction={props.direction ? props.direction : 'column'}
      isRow={props.direction === 'row' || props.direction === 'row-reverse'}
      vAlign={props.vAlign}
      hAlign={props.hAlign}
      gutter={props.gutter}
      full={props.full}
      wrap={props.wrap}
      incGutterEdges={props.incGutterEdges}
    >
      { flexChildren }
    </StyledFlex>
  )

  return (props.className) ? (
    <div className={props.className}>
      {jsx()}
    </div>
  ) : jsx()
}

export default Flex
