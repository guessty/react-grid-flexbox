
export const defaultBreakpoints: {
  [key: string]: string;
} = {
  tn: '0px', xs: '500px', sm: '768px', md: '992px',
  lg: '1200px', xl: '1440px', hg: '1920px',
}


export const composeCSSMedia = (
  cssProp: string,
  value: string | {
    [key: string]: string;
  },
  defaultValue?: string,
  parseValue = (_value: any) => _value
) => {
  if (typeof value === 'string') {
    return `${cssProp}: ${parseValue(value)};`
  } else if (value === Object(value)) {
    return Object.keys(value).reduce((mediaString, key) => (`
      ${mediaString}
      @media (min-width: ${defaultBreakpoints[key] ?
        defaultBreakpoints[key] : key
      }) {
        ${cssProp}: ${parseValue(value[key])};
      }
    `), '')
  }
  return defaultValue ? `${cssProp}: ${parseValue(defaultValue)};` : ''
}
