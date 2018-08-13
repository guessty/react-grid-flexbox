import * as React from 'react'
//
import GridItem from './GridItem'
import StyledGrid from './StyledGrid'

interface IGridProps {
  children: any
  className?: string
  templateRows?: string | object
  templateColumns?: string | object
  templateAreas?: string | object
  gutter?: string | object
  incGutterEdges?: boolean
}

interface IGridChildProps {
  _gridArea?: string | object
}

const Grid = (props: IGridProps) => {
  const gridChildren = React.Children.map(props.children, (child: React.ReactElement<IGridChildProps>) => {
    // Wrap any children in a div to prevent potential css flex layout overrides.
    if (child) {

      const gridChildProps: any = {
        '_gridArea': child.props._gridArea 
       }

      const childPropsWithoutFlexProps: any = {...child.props}

      Object.keys(gridChildProps).forEach((key) => {
        delete childPropsWithoutFlexProps[key]
      })

      const wrapped = React.createElement('div', gridChildProps, child.props ? {
        ...child,
        props: childPropsWithoutFlexProps,
      } : child)
    
      return (
        <GridItem
          children={wrapped.props.children}
          _gridArea={wrapped.props._gridArea}
        />
      )
    }
    return null
  })

  const jsx = () => (
    <StyledGrid
      templateRows={props.templateRows}
      templateColumns={props.templateColumns}
      templateAreas={props.templateAreas}
      gutter={props.gutter}
      incGutterEdges={props.incGutterEdges}
    >
      { gridChildren }
    </StyledGrid>
  )

  return (props.className) ? (
    <div className={props.className}>
      {jsx()}
    </div>
  ) : jsx()
}

export default Grid
