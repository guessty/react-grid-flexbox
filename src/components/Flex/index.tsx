import * as React from 'react'
//
import FlexItem from './FlexItem'
import StyledFlex from './StyledFlex'

interface IFlexProps {
  children: any
  className?: string
  direction?: string
  vAlign?: string
  hAlign?: string
  gutter?: string | object
  full: boolean
  wrap: boolean
  incGutterEdges: boolean
}

interface IFlexChildProps {
  [key: string]: object;
}

interface IWrappedFlexChildProps {
  [key: string]: object;
}

const Flex = (props: IFlexProps) => {
  const flexChildren = React.Children.map(props.children, (child: React.ReactElement<IFlexChildProps>) => {
    // Wrap any children in a div to prevent potential css flex layout overrides.
    if (child) {
      const wrappedFlexChildProps = child.props ? Object.keys(child.props).reduce((props:IWrappedFlexChildProps, key) => {
        if (key !== 'className') {
          props[key] = child.props[key]
        }
        return props
      }, {}) : {}

      const childPropsWithoutFlexProps = {...child.props}

      Object.keys(wrappedFlexChildProps).forEach((key) => {
        delete childPropsWithoutFlexProps[key]
      })

      const wrapped: any = React.createElement('div', wrappedFlexChildProps, child.props ? {
        ...child,
        props: childPropsWithoutFlexProps,
      } : child)
    
      return (
        <FlexItem
          children={wrapped.props.children}
          gutterSize={wrapped.props.gutter}
          _flexBasis={wrapped.props._flexBasis}
          _flexGrow={wrapped.props._flexGrow}
          _flexScroll={wrapped.props._flexScroll}
          _flexReset={wrapped.props._flexReset}
        />
      )
    }
    return null
  })

  const jsx = () => (
    <StyledFlex
      direction={props.direction ? props.direction : 'column'}
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
