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

const StyledGridItem = styled<IStyledGridProps, any>('div')`
  display: grid;
  ${(p: any) => composeCSSMedia('grid-template-columns', p.templateColumns, 'auto')}
  ${(p: any) => composeCSSMedia('grid-template-rows', p.templateRows, 'auto')}
  ${(p: any) => composeCSSMedia('grid-template-areas', p.templateAreas)}
  ${(p: any) => composeCSSMedia('grid-gap', p.gutter, '0px')}
  ${(p: any) => p.incGutterEdges ? (p: any) => composeCSSMedia('padding', p.gutter) : ''}
`

export default StyledGridItem