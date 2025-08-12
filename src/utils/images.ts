// Base64 encoded version of profile image
// This ensures the image is always available, even in deployment
export const profileImageBase64 = `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=`;

// Fallback profile image as SVG
export const profileImageSVG = `data:image/svg+xml;base64,${btoa(`
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#58A0C8;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#34699A;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="20" fill="url(#bg)"/>
  <text x="100" y="120" font-family="Arial, sans-serif" font-size="60" font-weight="bold" text-anchor="middle" fill="white">AI</text>
</svg>
`)}`;

// Professional avatar as backup
export const avatarImageBase64 = profileImageSVG;
