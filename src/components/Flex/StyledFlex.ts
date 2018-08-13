import styled from 'styled-components'
//
import { composeCSSMedia } from './../../helpers'

interface IStyledFlexProps {
  direction?: string
  isRow?: boolean
  wrap?: boolean
  full?: boolean
  incGutterEdges?: boolean
  vAlign?: string
  hAlign?: string
}

const composeAlignment = (props: IStyledFlexProps) => {
  const alignMap: {
    [key: string]: string
  } = {
    top: 'flex-start',
    bottom: 'flex-end',
    left: 'flex-start',
    right: 'flex-end',
    center: 'center',
    middle: 'center',
  }
  return `
    ${props.vAlign ? `${props.isRow ? 'align-items' : 'justify-content'}: ${alignMap[props.vAlign]};` : ''}
    ${props.hAlign ? `${props.isRow ? 'justify-content' : 'align-items'}: ${alignMap[props.hAlign]};` : ''}
  `
}

const StyledFlex = styled<IStyledFlexProps, any>('div')`
  display: flex;
  align-content: flex-start;
  ${(p: any) => p.direction ? `flex-direction: ${(p: any) => p.direction};` : ''}
  flex-wrap: ${((p: any) => p.wrap) && ((p: any) => p.isRow) ? 'wrap' : 'nowrap'};
  ${(p: any) => composeAlignment(p)}
  ${(p: any) => p.incGutterEdges ? `
    margin: 0;
    ${(p: any) => composeCSSMedia('padding', p.gutter, null, (value) => `calc(${value} / 2)`)}
  ` : `
    ${(p: any) => composeCSSMedia('margin', p.gutter, null, (value) => `calc(-${value} / 2)`)}
  `}
  ${(p: any) => p.full ? `
    ${(p: any) => composeCSSMedia('min-width', p.gutter, '0px', (value) => `calc(100% + ${value})`)}
    ${(p: any) => composeCSSMedia('min-height', p.gutter, '0px', (value) => `calc(100% + ${value})`)}
  ` : ''}

  > * {
    max-width: 100%;
  }
`
export default StyledFlex
