/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            pre: {
              backgroundColor: '#f6f8fa',
              padding: '16px',
              borderRadius: '6px',
              overflowX: 'auto',
            },
            code: {
              backgroundColor: '#f6f8fa',
              padding: '0.2em 0.4em',
              borderRadius: '3px',
              fontSize: '85%',
            },
          },
        },
        dark: {
          css: {
            pre: {
              backgroundColor: '#1e1e1e',
            },
            code: {
              backgroundColor: '#1e1e1e',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 