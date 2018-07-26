

export const composeCSSMedia = (
  cssProp,
  value,
  defaultValue,
  parseValue = (_value) => _value
) => {
  const defaultBreakpoints = {
    tn: '0px', xs: '500px', sm: '768px', md: '992px',
    lg: '1200px', xl: '1440px', hg: '1920px',
  }

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
