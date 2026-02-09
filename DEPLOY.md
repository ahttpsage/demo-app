# Deployment Guide

## Deploy to Vercel (Recommended)

### Method 1: Using Vercel Dashboard

1. **Push to Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your Git repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"
   - Your site will be live in minutes!

### Method 2: Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd my-site
   vercel
   ```

3. **Follow the prompts:**
   - Link to existing project or create new one
   - Confirm settings
   - Deploy!

### Method 3: Deploy with Git Integration

```bash
vercel --prod
```

## Environment Variables (if needed)

If you add any API keys or secrets later:

1. In Vercel Dashboard: Settings → Environment Variables
2. Or via CLI:
   ```bash
   vercel env add
   ```

## Custom Domain

1. Go to your project on Vercel
2. Settings → Domains
3. Add your custom domain
4. Follow DNS configuration instructions

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## Post-Deployment

- Your site URL will be: `https://your-project-name.vercel.app`
- Automatic HTTPS enabled
- Global CDN for fast performance
- Automatic deployments on git push

## Customization Tips

1. **Update Contact Info:** Edit email and social links in `app/page.tsx`
2. **Add Projects:** Add a projects section with your portfolio work
3. **Add Blog:** Create `/app/blog` folder for blog posts
4. **Analytics:** Add Vercel Analytics or Google Analytics
5. **SEO:** Update metadata in `app/layout.tsx`

## Performance

The site is optimized for:
- ✅ Perfect Lighthouse scores
- ✅ Fast page loads
- ✅ SEO friendly
- ✅ Mobile responsive
- ✅ Accessibility compliant

## Support

For issues or questions:
- Next.js Docs: https://nextjs.org/docs
- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
