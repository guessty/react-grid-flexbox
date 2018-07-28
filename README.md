# react-grid-flexbox
A couple of simple React components that implement CSS Grid and FlexBox to create powerful layouts.

## Install
```
npm i --save react-grid-flexbox
```

## Peer Dependencies
```
react prop-types styled-components
```

## Motivation
The CSS Grid and FlexBox APIs are brilliant and can work beaufifully together to create just about any layout you can think of.
The number of different API options can however make them a little tricky to work with and when throw in things like different vendor prefixs, gutters and resposive design you've got something quite complicated in your hands.

This package aims to make it easier for developers to unlock the power of Grid and FlexBox by introducing two components (`<Grid />` & `<Flex />`) with simple APIs, but under the hood enforce a consistant design pattern.


## Props

### Grid
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **Main Props** | | | |
| **templateAreas** *(required)* |  <code>String &#124; Object (`breakpoints`)</code>  |  | Used to define the 'named' template areas of the grid in which child elements can be placed. Uses same format as CSS `grid-template-areas` |
| **templateColumns** *(optional)* |  <code>String &#124; Object (`breakpoints`)</code>  | `auto` | Used to specify the template width of the grid columns. Uses same format as CSS `grid-template-columns` |
| **templateRows** *(optional)* |  <code>String &#124; Object (`breakpoints`)</code>  | `auto` | Used to specify the template height of the grid rows. Uses same format as CSS `grid-template-rows` |
| **gutter** *(optional)* |  <code>String &#124; Object (`breakpoints`)</code>  |  | Used to add the gutter between the child elements. Uses same format as CSS `grid-gap`  |
| **incGutterEdges** *(optional)* |  <code>Boolean</code>  | `false` | Applies the gutter to the outer edges of the grid |
| **className** *(optional)* |  <code>String</code>  |  | If present, the grid will be wrapped in an extra div with the supplied className |
| **children** *(optional)* | <code>ReactChildren</code>  |  | Grid content |
|----|----|-------|-----------|
| **Child Props** | | | |
| **_gridArea** *(required)* |  <code>String &#124; Object (`breakpoints`)</code>  |  | Used to place the child in a grid area. |

### Flex
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **Main Props** | | | |
| **direction** *(optional)* | <code>String</code> | `column` | Sets the `flex-direction` of child elements. Refer to CSS `flex-direction` for available options |
| **wrap** *(optional)* | <code>Boolean</code> | `false` | This option only works when `direction="row"` and will allow child elements to wrap to a new line |
| **gutter** *(optional)* |  <code>String &#124; Object (`breakpoints`)</code>  |  | Used to add the gutter between the child elements |
| **incGutterEdges** *(optional)* |  <code>Boolean</code>  | `false` | Applies the gutter to the outer edges of the flex box |
| **className** *(optional)* |  <code>String</code>  |  | If present, the grid will be wrapped in an extra div with the supplied className |
| **children** *(optional)* | <code>ReactChildren</code>  |  | Flex content |
|----|----|-------|-----------|
| **Child Props** | | | |
| **_basis** *(optional)* |  <code>String &#124; Object (`breakpoints`)</code>  | | Only works in when `direction="row"` and will set the `flex-basis` of the child element |
| **_grow** *(optional)* |  <code>Boolean</code>  | `false` | Will cause child element to grow to fill any available space |
| **_scroll** *(optional)* |  <code>Boolean</code>  | `false` | Will add scrolling to child element |



## Examples

### 1) Simple Grid

```jsx
import React from 'react';
import { Grid, Flex } from 'react-grid-flexbox';

export default () => (
  <Grid
    templateRows="50px auto 100px"
    templateColumns="1fr 1fr 1fr"
    areas={`
      "header header header"
      "sidebar main main"
      "footer footer footer"
    `}
    gutter="20px"
    incGutterEdges
  >
    <div _gridArea="header">...Header Content</div>
    <div _gridArea="sidebar">...SideBar Content</div>
    <div _gridArea="main">...Main Content</div>
    <div _gridArea="footer">...Footer Content</div>
  </Grid>
);
```


### 2) Advanced Responsive Grid

```jsx
import React from 'react';
import { Grid, Flex } from 'react-grid-flexbox';

export default () => (
  <Grid
    templateRows={{
      tn: '50px 80px auto 100px',
      '600px': '80px 50px auto 100px',
      md: '50px auto 100px'
    }}
    templateColumns={{
      tn: '100%',
      md: '1fr 1fr 1fr'
    }}
    areas={{
      tn: `
        "header"
        "sidebar"
        "main"
        "footer"
      `,
      '600px': `
        "sidebar"
        "header"
        "main"
        "footer"
      `,
      md: `
        "header header header"
        "sidebar main main"
        "footer footer footer"
      `,
    }}
    gutter={{
      tn: '10px',
      '600px': '10px 20px',
      md: '20px',
    }}
    incGutterEdges
  >
    <div _gridArea="header">...Header Content</div>
    <div _gridArea="sidebar">...SideBar Content</div>
    <div _gridArea="main">...Main Content</div>
    <div _gridArea="footer">...Footer Content</div>
  </Grid>
);
```


### 3) Simple Flex

```jsx
import React from 'react';
import { Grid, Flex } from 'react-grid-flexbox';

export default () => (
  <Flex
    direction="row"
    gutter="20px"
    incGutterEdges
  >
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
  </Flex>
);
```


### 2) Combined Grid and Flex

```jsx
import React from 'react';
import { Grid, Flex } from 'react-grid-flexbox';

export default () => (
  <Grid
    templateRows={{
      tn: '50px auto 100px',
      md: '50px auto 100px'
    }}
    templateColumns={{
      tn: '100%',
      md: '1fr 1fr 1fr'
    }}
    templateAreas={{
      tn: `
        "header"
        "main"
        "footer"
      `,
      md: `
        "header header header"
        "sidebar main main"
        "footer footer footer"
      `,
    }}
    gutter="20px"
    incGutterEdges
  >
    <Flex _gridArea="header" direction="row">
      <a _flexBasis="25%" href="#">Link One</a>
      <a _flexBasis="25%" href="#">Link Two</a>
      <a _flexBasis="25%" href="#">Link Three</a>
      <a _flexBasis="25%" href="#">Link Four</a>
    </Flex>
    <Flex _gridArea={{ tn: 'auto', md: 'sidebar' }}>
      <button>Button One</button>
      <button>Button Two</button>
      <button>Button Three</button>
      <button>Button Four</button>
    </Flex>
    <Flex _gridArea="main" direction="row" wrap>
      <Flex
        _flexBasis={{
          tn: '100%',
          md: '50%'
        }}
        gutter="20px"
      >
        <h1>Title One</h1>
        <p>Paragraph One</p>
      </Flex>
      <Flex
        _flexBasis={{
          tn: '100%',
          md: '50%'
        }}
        gutter="20px"
      >
        <h1>Title Two</h1>
        <p>Paragraph Two</p>
      </Flex>
    </Flex>
    <Flex _gridArea="footer">...Footer Content</Flex>
  </Grid>
);
```