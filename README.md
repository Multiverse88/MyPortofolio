# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, Framer Motion, and Tailwind CSS.

## Features

- ✨ **Modern Design** - Clean and professional UI/UX
- 🎭 **Smooth Animations** - Beautiful animations with Framer Motion
- 📱 **Fully Responsive** - Works perfectly on all devices
- ⚡ **Fast Performance** - Optimized with Next.js
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🔧 **TypeScript** - Type-safe development
- 📧 **Contact Form** - Functional contact form
- 🚀 **Easy Deployment** - Ready to deploy on Vercel

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Responsive:** React Responsive
- **Deployment:** Vercel

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio-nextjs.git
   cd portfolio-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Open [http://localhost:3000](http://localhost:3000) to see the result.

## Customization

### Personal Information
Update your personal information in the following components:
- `src/components/Hero.tsx` - Name, title, bio
- `src/components/About.tsx` - About section, skills
- `src/components/Contact.tsx` - Contact information
- `src/components/Footer.tsx` - Footer information

### Projects
Update your projects in `src/components/Projects.tsx`:
- Add your project details
- Replace placeholder images
- Update GitHub and live demo URLs

### Skills
Update your skills in `src/components/About.tsx`:
- Modify the skills array
- Adjust skill levels (1-100)
- Add/remove skill categories

### Contact Form
The contact form is ready to use but needs backend integration:
- Update the form submission logic in `src/components/Contact.tsx`
- Integrate with your preferred email service (EmailJS, Nodemailer, etc.)

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and deploy

3. **Custom Domain (Optional)**
   - Add your custom domain in Vercel dashboard
   - Update DNS settings

## Project Structure

```
portfolio-nextjs/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   └── Projects.tsx
│   └── types/
│       └── index.ts
├── public/
├── package.json
└── README.md
```

## License

This project is licensed under the MIT License.

---

Made with ❤️ and Next.js
