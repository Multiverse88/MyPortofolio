import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const alt = 'Ainan Bahrul Ihsan - Full Stack Developer'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          backgroundImage: 'linear-gradient(135deg, #9ECAD6 0%, #58A0C8 50%, #113F67 100%)',
        }}
      >
        <div
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'flex',
            fontSize: 64,
            fontWeight: 900,
            textAlign: 'center',
            color: 'white',
            lineHeight: 1.2,
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          Ainan Bahrul Ihsan
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: 'white',
            marginTop: 20,
            textAlign: 'center',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
          }}
        >
          Full Stack Developer & Cloud Computing Specialist
        </div>
        <div
          style={{
            fontSize: 24,
            color: 'rgba(255,255,255,0.9)',
            marginTop: 20,
            textAlign: 'center',
          }}
        >
          Next.js • React • Node.js • Google Cloud Platform
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
