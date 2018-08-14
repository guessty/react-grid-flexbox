import styled from 'styled-components'
//
import { composeCSSMedia } from './../../helpers'

interface IStyledGridProps {
  templateRows?: string | object
  templateColumns?: string | object
  templateAreas: string | object
  gutter?: string | object
  incGutterEdges?: boolean
}

const StyledGridItem = styled<IStyledGridProps, any>('div')`${
  (p: any) => `
    display: grid;
    ${composeCSSMedia('grid-template-columns', p.templateColumns, 'auto')}
    ${composeCSSMedia('grid-template-rows', p.templateRows, 'auto')}
    ${composeCSSMedia('grid-template-areas', p.templateAreas)}
    ${composeCSSMedia('grid-gap', p.gutter, '0px')}
    ${p.incGutterEdges ? composeCSSMedia('padding', p.gutter) : ''}
  `
}`

export default StyledGridItem