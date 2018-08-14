import * as React from 'react'
//
import GridItem from './GridItem/index'
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
  children: any
  _gridArea?: string | object
  ['data-grid-area']?: string | object
}

interface IWrappeedGridChildProps {
  children?: any
  _gridArea?: string | object
}

const keysToDelete = [
  '_gridArea', 'data-grid-area'
]

const Grid = (props: IGridProps) => {
  const gridChildren = React.Children.map(props.children, (child: React.ReactElement<IGridChildProps>) => {
    // Wrap any children in a div to prevent potential css flex layout overrides.
    if (child) {

      const type: any = child.type
      if (type === GridItem) {
        return child
      }

      const wrappedgGridChildProps: IWrappeedGridChildProps = {
        '_gridArea': child.props['data-grid-area'] || child.props._gridArea,
       }

      const childPropsWithoutFlexProps: any = {...child.props}

      keysToDelete.forEach((key) => {
        delete childPropsWithoutFlexProps[key]
      })

      const wrapped:any = React.createElement('div', wrappedgGridChildProps, child.props ? {
        ...child,
        props: childPropsWithoutFlexProps,
      } : child)
    
      return (
        <GridItem {...wrapped.props} />
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
