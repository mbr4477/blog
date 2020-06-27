const scrollHandler = () => {
  const bar = document.querySelector('#header-bar')
  const padding = 10*(1 - Math.min(1., window.scrollY / 200.0)) + 10
  const fontSize = 0.25*(1 - Math.min(1., window.scrollY / 200.0)) + 1.25
  bar.style.paddingBottom = `${padding}px`
  bar.style.paddingTop = `${padding}px`
  bar.querySelector('h3').style.fontSize = `${fontSize}em`
  console.log(bar.querySelector('h3'))

  const progress = document.querySelector('#progress-bar')
  const percent = window.scrollY / (document.body.offsetHeight - window.innerHeight);
  progress.style.width = `${percent*100}vw`
}
document.onscroll = scrollHandler
