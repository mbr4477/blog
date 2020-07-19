import Typography from "typography"
import Wordpress2016 from "typography-theme-wordpress-2016"

Wordpress2016.overrideThemeStyles = () => {
  return {
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
  }
}

delete Wordpress2016.googleFonts

const bodyFont = 'Noto Sans' //'Source Sans Pro'
const headerFont = 'Playfair Display'
const subtitleFont = 'Roboto Mono'
// const typography = new Typography(Wordpress2016)
const typography = new Typography({
  googleFonts: [
    {
      name: bodyFont,
      styles: [
        '400',
        '700',
      ]
    },
    {
      name: headerFont,
      styles: [
        '400',
        '700'
      ]
    },
    {
      name: subtitleFont,
      styles: [
        '400',
        '700'
      ]
    }
  ],
  baseFontSize: "16px",
  baseLineHeight: 1.666,
  headerFontFamily: [
    headerFont,
    "serif",
  ],
  bodyFontFamily: [bodyFont, "sans"],
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    'button': {
      fontFamily: 'Oxygen, sans-serif'
    },
    '.index-article section': {
      fontFamily: subtitleFont,
    }
  })
})


// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
