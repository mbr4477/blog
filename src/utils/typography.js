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

// const typography = new Typography(Wordpress2016)
const typography = new Typography({
  googleFonts: [
    {
      name: 'Newsreader:ital',
      styles: [
        '400',
        '700',
      ]
    },
    {
      name: 'Newsreader',
      styles: [
        '400',
        '700',
      ]
    },
    {
      name: 'Playfair Display',
      styles: [
        '400',
        '700'
      ]
    }
  ],
  baseFontSize: "16px",
  baseLineHeight: 1.666,
  headerFontFamily: [
    "Playfair Display",
    "sans-serif",
  ],
  bodyFontFamily: ["Newsreader", "Times New Roman", "serif"],
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    'button': {
      fontFamily: 'Oxygen, sans-serif'
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
