import styled from 'styled-components'
//
import { composeCSSMedia } from './../../../helpers'

interface IStyledFlexItemProps {
  gutterSize: string | object
  _flexBasis: string | object
  _flexGrow: boolean
  _flexScroll: boolean
  _flexReset: boolean
}

const StyledFlexItem = styled<IStyledFlexItemProps, any>('div')`
  ${(p: any) => composeCSSMedia('padding', p.gutterSize, null, (value) => `calc(${value} / 2)`)}
  ${(p: any) => p._flexBasis ? `
    ${(p: any) => composeCSSMedia('flex-basis', p._flexBasis, 'auto')}
  ` : ''}
  ${(p: any) => p._flexGrow ? `
    flex-grow: 1;
  ` : ''}
  ${(p: any) => p._flexScroll ? `
    > * {
      ${(p: any) => composeCSSMedia('max-width', p.gutterSize, '0px', (value) => `calc(100% - ${value})`)}
      ${(p: any) => composeCSSMedia('max-heigth', p.gutterSize, '0px', (value) => `calc(100% - ${value})`)}
      overflow: auto;
    }
  ` : ''}
  ${(p: any) => p._flexReset ? `
    position: relative;
    > * {
      position: absolute;
      ${(p: any) => composeCSSMedia('min-width', p.gutterSize, '100%', (value) => `calc(100% - ${value})`)}
      ${(p: any) => composeCSSMedia('min-height', p.gutterSize, '100%', (value) => `calc(100% - ${value})`)}
    }
  ` : ''}
`
export default StyledFlexItem
