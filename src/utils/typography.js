import Typography from "typography"

const typography = new Typography({
  googleFonts: [

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
