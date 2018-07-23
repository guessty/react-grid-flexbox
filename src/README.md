# Flex Global Component

* This Flex component is a gobally available component meaning it does not require importing to use (`<Flex />`).
* It uses _flex.scss under the hood to position itself and its children using flex-box and default spacing.
* The component was designed to use _flex.scss in a consistant way so that the flex-box principals are enforced, and flex-box layout cannot be corrupted by additional classNames or by using non 'section' type (div, span html tags as children.


## Core Principals

1. _flex.scss classes (.flex & .flex-child--xxx) should not be mixed with any other custom classes.

* Under the hood _flex uses margins and padding to control spacing.

* Enforcing this principal is important because any custom classes could potentially override these spacing classes and cause things to break. This is especially noticable when trying to create responsive designs.

2. Direct children of .flex elements should be valid 'section' type html elements (div and span).

* This really follows on from principal 1) as html elements such as h1 or p usually come with margin styles which again can cause things to break.


## Examples 
* Examples 1, 2 & 3 all produce the same dom output

### Example 1

JSX:
```
<div className="example">
  <Flex gutters wrap>
    <div flexSizes={ ['xs-1-2', 'sm-1-3'] }>
      <h1 className="example__header">Example Header</h1>
    </div>
    <div flexSizes={ ['xs-1-2', 'sm-1-3'] }>
      <p className="example__paragraph">Example Paragraph</p>
    </div>
  </Flex>
</div>
```

DOM Output:
```
<div class="example">
  <div class="flex flex--gutters flex--inline flex--wrap">
    <div class="flex-child--xs-1-2 flex-child--sm-1-3">
      <h1 class="example__header">Example Header</h1>
    </div>
    <div class="flex-child--xs-1-2 flex-child--sm-1-3">
      <p class="example__paragraph">Example Paragraph</p>
    </div>
  </div>
</div>
```

The above example shows a simple approach in which properties are passed to both the Flex component and its children.
Direct children of a Flex component have additional props enabled to control the layout of these elements.
Supported props can be found in the FlexChild component of Flex.jsx.


### Example 2

JSX :
```
<Flex gutters inline wrap className="example">
  <div flexSizes={ ['xs-1-2', 'sm-1-3'] }>
    <h1 className="example__header">Example Header</h1>
  </div>
  <div flexSizes={ ['xs-1-2', 'sm-1-3'] }>
    <p className="example__paragraph">Example Paragraph</p>
  </div>
</Flex>
```

DOM Output:
```
<div class="example">
  <div class="flex flex--gutters flex--inline flex--wrap">
    <div class="flex-child--xs-1-2 flex-child--sm-1-3">
      <h1 class="example__header">Example Header</h1>
    </div>
    <div class="flex-child--xs-1-2 flex-child--sm-1-3">
      <p class="example__paragraph">Example Paragraph</p>
    </div>
  </div>
</div>
```

In this example the 'example' className has been applied to the Flex component.
You can see from the resulting dom output is the same as in Example 1 and that an additional wrapping div element has created with this className.
This wrapping div is created in order to adhere to Principal 1.


### Example 3

JSX :
```
<Flex gutters inline wrap className="example">
  <h1 flexSizes={ ['xs-1-2', 'sm-1-3'] } className="example__header">Example Header</h1>
  <p flexSizes={ ['xs-1-2', 'sm-1-3'] } className="example__paragraph">Example Paragraph</p>
</Flex>
```

DOM Output:
```
<div class="example">
  <div class="flex flex--gutters flex--inline flex--wrap">
    <div class="flex-child--xs-1-2 flex-child--sm-1-3">
      <h1 class="example__header">Example Header</h1>
    </div>
    <div class="flex-child--xs-1-2 flex-child--sm-1-3">
      <p class="example__paragraph">Example Paragraph</p>
    </div>
  </div>
</div>
```

In this example you can see how the written JSX is a lot more condensed yet the dom output is the same as in Examples 1 & 2.
In this example Flex recognises that although its direct children do have flexProps, they do not adhere to Princical 2, and because of this the child elements are also wrapped in a div.


### Example 4

JSX :
```
<Flex gutters className="example">
  <Flex inline wrap className="example__section">
    <h1 flexSizes={ ['xs-1-2', 'sm-1-3'] } className="example__header">Example Header 1</h1>
    <p flexSizes={ ['xs-1-2', 'sm-1-3'] } className="example__paragraph">Example Paragraph 1</p>
  </Flex>
  <Flex inline wrap className="example__section">
    <h1 flexSizes={ ['xs-1-2', 'sm-1-3'] } className="example__header">Example Header 2</h1>
    <p flexSizes={ ['xs-1-2', 'sm-1-3'] } className="example__paragraph">Example Paragraph 2</p>
  </Flex>
</Flex>
```

DOM Output:
```
<div class="example">
  <div class="flex flex--gutters">
    <div>
      <div class="example__section">
        <div class="flex flex--inline flex--wrap">
          <div class="flex-child--xs-1-2 flex-child--sm-1-3">
            <h1 class="example__header">Example Header 1</h1>
          </div>
          <div class="flex-child--xs-1-2 flex-child--sm-1-3">
            <p class="example__paragraph">Example Paragraph 1</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="example__section">
        <div class="flex flex--inline flex--wrap">
          <div class="flex-child--xs-1-2 flex-child--sm-1-3">
            <h1 class="example__header">Example Header 2</h1>
          </div>
          <div class="flex-child--xs-1-2 flex-child--sm-1-3">
            <p class="example__paragraph">Example Paragraph 2</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

In this example you can see how you can even use Components as flex-children
