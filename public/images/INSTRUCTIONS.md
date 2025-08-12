# Cara Menyimpan Foto Profil

## Langkah-langkah:

1. **Simpan foto attachment** sebagai `ainan-profile.jpg` di folder:
   ```
   d:\Portofolio\portfolio-nextjs\public\images\ainan-profile.jpg
   ```

2. **Format yang direkomendasikan:**
   - Format: JPG atau PNG
   - Ukuran: 400x400 pixels (square/persegi)
   - File size: < 500KB untuk optimasi loading
   - Quality: 80-90% untuk balance antara kualitas dan size

3. **Optimasi foto** (opsional):
   - Crop menjadi square format
   - Resize ke 400x400px
   - Compress untuk web optimization

4. **Test hasil:**
   - Refresh browser di http://localhost:3003
   - Foto akan muncul otomatis menggantikan placeholder "AI"

## Current Implementation:

- ✅ Hero section: Foto dengan border putih dan status online indicator
- ✅ About section: Foto dengan 3D hover effect
- ✅ Fallback system: Menampilkan "AI" jika foto gagal load
- ✅ Loading state: Animated loading saat foto sedang dimuat
- ✅ Responsive: Optimal di semua ukuran layar

## Komponen yang menggunakan foto:

1. `Hero.tsx` - Character card dengan foto profesional
2. `About.tsx` - Profile card dengan foto dan info
3. `ProfileImage.tsx` - Reusable component untuk konsistensi

Setelah foto disimpan, portfolio akan memiliki sentuhan personal yang kuat! 🎉
