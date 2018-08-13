import styled from 'styled-components'
//
import { composeCSSMedia } from './../../../helpers'

interface IStyledGridItemProps {
  _gridArea: string | object
}

const StyledGridItem = styled<IStyledGridItemProps, any>('div')`
  ${(p: any) => composeCSSMedia('grid-area', p._gridArea, 'auto')}
`

export default StyledGridItem
