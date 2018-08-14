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

const StyledFlexItem = styled<IStyledFlexItemProps, any>('div')`${
  (p: any) => `
    ${composeCSSMedia('padding', p.gutterSize, null, (value) => `calc(${value} / 2)`)}
    ${p._flexGrow ? 'flex-grow: 1;' : ''}
    ${p._flexBasis ? composeCSSMedia('flex-basis', p._flexBasis, 'auto') : ''}
    ${p._flexGrow ? 'flex-grow: 1;' : ''}
    ${p._flexScroll ? `
      > * {
        ${composeCSSMedia('max-width', p.gutterSize, '0px', (value) => `calc(100% - ${value})`)}
        ${composeCSSMedia('max-heigth', p.gutterSize, '0px', (value) => `calc(100% - ${value})`)}
        overflow: auto;
      }
    ` : ''}
    ${p._flexReset ? `
      position: relative;
      > * {
        position: absolute;
        ${composeCSSMedia('min-width', p.gutterSize, '100%', (value) => `calc(100% - ${value})`)}
        ${composeCSSMedia('min-height', p.gutterSize, '100%', (value) => `calc(100% - ${value})`)}
      }
    ` : ''}
  `
}`
export default StyledFlexItem
