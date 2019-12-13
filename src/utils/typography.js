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
      name: 'Playfair Display',
      styles: [
        '400',
      ]
    },
    {
      name: 'Montserrat',
      styles: [
        '700',
      ]
    },
    {
      name: 'Lora',
      styles: [
        '400'
      ]
    }
  ],
  baseFontSize: "18px",
  baseLineHeight: 1.666,
  headerFontFamily: [
    "Montserrat",
    "serif",
  ],
  bodyFontFamily: ["Lora", "Times New Roman", "serif"],
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    h1: {
      fontFamily: ['Playfair Display', 'sans-serif'].join(','),
      fontWeight: 400
    },
    'h2,h3,h4,h5': {
      fontWeight: 700
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
