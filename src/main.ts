import 'react'
import Grid from './components/Grid/index'
import GridItem from './components/Grid/GridItem/index'
import Flex from './components/Flex/index'
import FlexItem from './components/Flex/FlexItem/index'

declare module "react" {
  interface HTMLAttributes<T> extends React.DOMAttributes<T> {
    _gridArea?: string | object
    _flexBasis?: string | object
    _flexGrow?: boolean
    _flexScroll?: boolean
    _flexReset?: boolean
  }
}

export {
  Grid,
  GridItem,
  Flex,
  FlexItem,
}
