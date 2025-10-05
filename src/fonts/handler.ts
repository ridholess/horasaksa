import localFonts from 'next/font/local'

const gilroy = localFonts({
  src: [
    {
      path: '../fonts/Gilroy-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/Gilroy-Heavy.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../fonts/Gilroy-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/Gilroy-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Gilroy-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  preload: true,
})

export default gilroy
