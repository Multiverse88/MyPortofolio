# Upload Foto untuk Deployment

Untuk memastikan foto muncul di Vercel deployment, ikuti langkah berikut:

## Opsi 1: Commit foto ke repository (Recommended)

1. **Simpan foto** di folder:
   ```
   d:\Portofolio\portfolio-nextjs\public\images\ainan-profile.jpg
   ```

2. **Add dan commit** foto ke git:
   ```bash
   git add public/images/ainan-profile.jpg
   git commit -m "Add profile photo"
   git push
   ```

3. **Deploy ulang** di Vercel (otomatis setelah push)

## Opsi 2: Gunakan GitHub Avatar URL

Update komponen untuk menggunakan GitHub avatar:
```tsx
<ProfileImage 
  imageUrl="https://github.com/Multiverse88.png"
  size="medium" 
/>
```

## Opsi 3: Upload ke Cloudinary/ImageKit

1. Upload foto ke image CDN
2. Dapatkan URL public
3. Update imageUrl prop

## Current Implementation

ProfileImage component sekarang mendukung:
- ✅ Multiple image sources (fallback chain)
- ✅ GitHub avatar sebagai backup
- ✅ SVG fallback jika semua gagal
- ✅ Automatic error handling dengan next source

## Fallback Chain:
1. Custom imageUrl (jika ada)
2. Local file (/images/ainan-profile.jpg)
3. GitHub avatar (https://github.com/Multiverse88.png)
4. SVG placeholder dengan inisial "AI"

Foto akan selalu muncul di deployment! 🎉
