module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      gridColumn: {
        'span-custom-1': '1',
        'span-custom-2': '2',
        'span-custom-3': '3',
        'span-custom-4': '4',
        'span-custom-5': '5',
        'span-custom-6': '6',
        'span-custom-7': '7',
      },
      width: {
        icon: '40px',
        imageLg: 'calc(100% - 50px)',
      },
      minWidth: {
        card: '300px',
      },
      maxWidth: {
        card: '300px',
        container: '1300px',
        modal: '800px',
        cardMd: '400px',
      },
      minHeight: {
        card: '250px',
      },
      maxHeight: {
        card: '250px',
        imageLg: 'calc(100% - 50px)',
        note: '600px',
      },
      height: {
        carouselImage: '700px',
      },
    },
  },
  plugins: [],
}
