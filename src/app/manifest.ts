import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ainan Bahrul Ihsan - Portfolio',
    short_name: 'Ainan Portfolio',
    description: 'Portfolio of Ainan Bahrul Ihsan - Full Stack Developer & Cloud Computing Specialist',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#113F67',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['portfolio', 'developer', 'technology'],
    lang: 'en',
    orientation: 'portrait-primary',
  }
}
