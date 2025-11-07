# PDF Certificate Support

Komponen Certificates sekarang mendukung kedua format:

## Format yang Didukung:

### 1. Image Certificates (type: 'image')
- Mendukung gambar dari URL eksternal atau lokal
- Format: JPG, PNG, WebP
- Fallback ke SVG placeholder jika gambar gagal dimuat

### 2. PDF Certificates (type: 'pdf')
- Mendukung file PDF lokal atau eksternal
- Menampilkan preview dengan ikon PDF
- Tombol "View PDF" untuk membuka file
- Tombol "Verify" untuk validasi

## Cara Menambahkan Certificate:

### Untuk Image Certificate:
```typescript
{
  id: 1,
  title: 'Certificate Title',
  issuer: 'Institution Name',
  date: 'Month Year',
  description: 'Description of the certificate...',
  image: 'https://example.com/certificate.jpg', // URL gambar
  fallbackImage: '/certificates/fallback.svg', // SVG fallback
  verificationUrl: 'https://verify.example.com',
  skills: ['Skill 1', 'Skill 2'],
  type: 'image'
}
```

### Untuk PDF Certificate:
```typescript
{
  id: 2,
  title: 'PDF Certificate Title',
  issuer: 'Institution Name',
  date: 'Month Year',
  description: 'Description of the certificate...',
  pdfUrl: '/certificates/pdf/certificate.pdf', // Path ke PDF
  fallbackImage: '/certificates/fallback.svg', // SVG placeholder
  verificationUrl: 'https://verify.example.com',
  skills: ['Skill 1', 'Skill 2'],
  type: 'pdf'
}
```

## Struktur Folder:
```
public/
├── certificates/
│   ├── pdf/                    # Folder untuk file PDF
│   │   ├── certificate1.pdf
│   │   └── certificate2.pdf
│   ├── placeholder1.svg        # SVG placeholders
│   └── placeholder2.svg
```

## Fitur:
- ✅ Dual button system (View PDF + Verify)
- ✅ Visual PDF indicator dengan ikon
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Error handling
- ✅ Accessibility support
- ✅ Dark mode compatible

## Note:
Pastikan file PDF sudah ditempatkan di folder `public/certificates/pdf/` sebelum deployment.
