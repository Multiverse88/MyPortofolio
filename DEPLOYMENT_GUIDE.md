# 🚀 Deployment Guide - Mobile-Optimized Portfolio

## 📋 Pre-Deployment Checklist

### ✅ Performance Verification
```bash
# 1. Build the project
npm run build

# 2. Test performance locally
npm run lighthouse

# 3. Analyze bundle size
npm run analyze

# 4. Run mobile performance test
npm run perf:mobile
```

### ✅ Environment Setup
- [ ] Environment variables configured
- [ ] Image assets optimized
- [ ] Performance budget verified
- [ ] Mobile testing completed
- [ ] SEO metadata updated

---

## 🌐 Vercel Deployment (Recommended)

### Step 1: Repository Setup
```bash
# Initialize git repository
git init
git add .
git commit -m "Mobile-optimized portfolio ready for deployment"
git branch -M main

# Push to GitHub
git remote add origin https://github.com/yourusername/portfolio-nextjs.git
git push -u origin main
```

### Step 2: Vercel Configuration
1. Visit [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from GitHub
4. Select your portfolio repository

### Step 3: Environment Variables
```bash
# Add in Vercel dashboard
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

### Step 4: Build Settings
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

### Step 5: Performance Configuration
Create `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/_next/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "functions": {
    "app/page.tsx": {
      "maxDuration": 10
    }
  }
}
```

---

## 🐳 Docker Deployment (Alternative)

### Dockerfile
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build with optimizations
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Docker Commands
```bash
# Build image
docker build -t portfolio-mobile .

# Run container
docker run -p 3000:3000 portfolio-mobile

# Deploy to cloud
docker tag portfolio-mobile your-registry/portfolio:latest
docker push your-registry/portfolio:latest
```

---

## ☁️ AWS Deployment

### AWS Amplify
```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize project
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
```

### Amplify Configuration
```json
{
  "version": 1,
  "frontend": {
    "phases": {
      "preBuild": {
        "commands": [
          "npm install"
        ]
      },
      "build": {
        "commands": [
          "npm run build"
        ]
      }
    },
    "artifacts": {
      "baseDirectory": ".next",
      "files": ["**/*"]
    },
    "cache": {
      "paths": ["node_modules/**/*", ".next/cache/**/*"]
    }
  }
}
```

---

## 📊 Post-Deployment Monitoring

### Performance Monitoring
```bash
# Monitor after deployment
lighthouse https://your-domain.com --output=json
lighthouse https://your-domain.com --form-factor=mobile

# Set up monitoring alerts
curl -X POST "https://api.web.dev/measure" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://your-domain.com"}'
```

### Core Web Vitals Tracking
```javascript
// Add to your site
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to your analytics service
  gtag('event', metric.name, {
    event_category: 'Web Vitals',
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    event_label: metric.id,
  });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

---

## 🔧 Custom Domain Setup

### Vercel Custom Domain
1. Go to Vercel dashboard
2. Select your project
3. Go to "Domains" tab
4. Add your custom domain
5. Configure DNS records

### DNS Configuration
```
Type: A
Name: @
Value: 76.76.19.19

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## 📈 SEO & Analytics Setup

### Google Analytics 4
```javascript
// Add to layout.tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_TRACKING_ID}');
  `}
</Script>
```

### Search Console Setup
1. Verify ownership with HTML file
2. Submit sitemap: `https://your-domain.com/sitemap.xml`
3. Monitor Core Web Vitals
4. Check mobile usability

---

## 🚨 Troubleshooting

### Common Build Issues
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules
rm -rf node_modules
npm install

# Check for type errors
npm run build
```

### Performance Issues
```bash
# Analyze bundle
npm run analyze

# Check lighthouse score
lighthouse https://your-domain.com

# Monitor real user metrics
curl https://your-domain.com/api/vitals
```

### Memory Issues
```json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
  }
}
```

---

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] Code committed and pushed
- [ ] Environment variables set
- [ ] Performance tests passed
- [ ] Mobile testing completed
- [ ] Images optimized
- [ ] SEO metadata updated

### During Deployment
- [ ] Build successful
- [ ] No console errors
- [ ] All routes accessible
- [ ] Images loading correctly
- [ ] Mobile performance verified

### Post-Deployment
- [ ] Domain configured
- [ ] SSL certificate active
- [ ] Analytics tracking
- [ ] Search console setup
- [ ] Performance monitoring
- [ ] Error tracking enabled

---

## 🎯 Performance Targets

### Lighthouse Scores (Mobile)
- **Performance**: > 90
- **Accessibility**: > 95
- **Best Practices**: > 95
- **SEO**: > 95

### Core Web Vitals
- **LCP**: < 2.5 seconds
- **FID**: < 100 milliseconds
- **CLS**: < 0.1

### Bundle Size
- **First Load JS**: < 250 kB
- **Page Size**: < 1.5 MB
- **Image Optimization**: WebP/AVIF

---

## 🔒 Security Considerations

### Headers Configuration
```javascript
// next.config.ts
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  }
];
```

### Environment Security
- Use environment variables for sensitive data
- Enable HTTPS only
- Implement CSP headers
- Regular dependency updates

---

## 📞 Support & Maintenance

### Regular Tasks
- **Weekly**: Performance monitoring
- **Monthly**: Dependency updates
- **Quarterly**: Full audit and optimization

### Monitoring Tools
- Google PageSpeed Insights
- GTmetrix
- WebPageTest
- Vercel Analytics

### Emergency Contacts
- Hosting provider support
- Domain registrar support
- CDN support (if applicable)

---

## 🎉 Success Metrics

### Performance KPIs
- Load time < 2.5s on mobile
- Lighthouse score > 90
- Zero console errors
- 100% uptime

### User Experience KPIs
- Bounce rate < 40%
- Average session duration > 2 minutes
- Mobile traffic conversion
- User satisfaction scores

---

**🚀 Your mobile-optimized portfolio is now ready for the world!**

For support, refer to:
- [Mobile Optimization Guide](./MOBILE_OPTIMIZATION_GUIDE.md)
- [Optimization Summary](./OPTIMIZATION_SUMMARY.md)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)

**Happy deploying! 🎯📱**