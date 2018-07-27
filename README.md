# react-grid-flexbox
A couple of simple React components that implement CSS Grid and FlexBox to create powerful layouts.

## Install
```
npm i --save react-grid-flexbox
```

## Peer Dependencies
```
react prop-types style-components
```

## Motivation
The CSS Grid and FlexBox APIs are brilliant and can work beaufifully together to create just about any layout you can think of.
The number of different API options can however make them a little tricky to work with and when throw in things like different vendor prefixs, gutters and resposive design you've got something quite complicated in your hands.

This package aims to make it easier for developers to unlock the power of Grid and FlexBox by introducing two components (`<Grid />` & `<Flex />`) with simple APIs, but under the hood enforce a consistant design pattern.


## How To Use

```jsx
import React from 'react';
import { Grid, Flex } from 'react-grid-flexbox';

export default () => (
  <Grid
    rows="50px auto"
    columns="1fr 1fr 1fr"
    areas={`
      "header header header"
      "sidebar content content"
    `}
    gutter="20px"
    container
  >
    <Flex _area="header" inline>
      <a href="#">Link One</a>
      <a href="#">Link Two</a>
      <a href="#">Link Three</a>
    </Flex>
    <Flex _area="sidebar">
      <a href="#">Link Four</a>
      <a href="#">Link Five</a>
      <a href="#">Link Six</a>
    </Flex>
    <Flex _area="content">
      <h1>Content Area</h1>
      <p>This is the main content section</p>
    </Flex>
  </Grid>
);
```

## Props

### Grid
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **Main Props** | | | |
| **areas** *(required)* |  <code>String &#124; Object (`breakpoints`)</code>  |  | Used to define the 'named' areas of the grid in which child elements can be placed |
| **columnWidth** *(optional)* |  <code>String &#124; Object (`breakpoints`)</code>  | `auto` | Used to specify the width of the grid columns |
| **rowHeight** *(optional)* |  <code>String &#124; Object (`breakpoints`)</code>  | `auto` | Used to specify the height of the grid rows |
| **gutter** *(optional)* |  <code>String &#124; Object (`breakpoints`)</code>  |  | Used to add the gutter between the child elements |
| **incEgdeGutter** *(optional)* |  <code>Boolean</code>  | `false` | Gives the grid padding around the edge. Padding is equal to gutter value |
| **className** *(optional)* |  <code>String</code>  |  | If present, the grid will be wrapped in an extra div with the supplied className |
| **children** *(optional)* | <code>ReactChildren</code>  |  | Grid content |
|----|----|-------|-----------|
| **Child Props** | | | |
| **_area** *(required)* |  <code>String &#124; Object (`breakpoints`)</code>  |  | Used to place the child in a grid area |

### Flex
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **Main Props** | | | |
| **inline** *(optional)* | <code>Boolean</code> | `false` | Child elements by default are stacked vertically on top of one another. Setting this option will allow child elements to flow inline |
| **wrap** *(optional)* | <code>Boolean</code> | `false` | This option only works when `inline={true}` and will allow child elements to wrap to a new line |
| **gutter** *(optional)* |  <code>String &#124; Object (`breakpoints`)</code>  |  | Used to add the gutter between the child elements |
| **incEgdeGutter** *(optional)* |  <code>Boolean</code>  | `false` | Gives the Flex padding around the edge. Padding is equal to gutter value |
| **className** *(optional)* |  <code>String</code>  |  | If present, the grid will be wrapped in an extra div with the supplied className |
| **children** *(optional)* | <code>ReactChildren</code>  |  | Flex content |
|----|----|-------|-----------|
| **Child Props** | | | |
| **_basis** *(optional)* |  <code>String &#124; Object (`breakpoints`)</code>  | | Only works in when `inline={true}` and will set the width of the child element |
| **_grow** *(optional)* |  <code>Boolean</code>  | `false` | Will cause child element to grow to fill any available space |
| **_scroll** *(optional)* |  <code>Boolean</code>  | `false` | Will add scrolling to child element |


