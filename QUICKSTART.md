# 🚀 Quick Start Guide - Priyatosh Portfolio

Your professional portfolio site is ready! Here's everything you need to get started.

## 📁 What's Been Created

```
my-site/
├── app/
│   ├── page.tsx          # Main site content (Hero, About, Services, Skills, Contact)
│   ├── layout.tsx        # Site layout with metadata
│   └── globals.css       # Global styles and animations
├── public/               # Static assets
├── README.md             # Project overview
├── DEPLOY.md             # Deployment instructions
├── FEATURES.md           # Complete feature list
├── start.sh              # Quick start script
└── vercel.json           # Vercel configuration
```

## 🎯 Three Ways to Start

### Option 1: Quick Start Script
```bash
cd my-site
./start.sh
```

### Option 2: NPM Commands
```bash
cd my-site
npm run dev
```

### Option 3: Manual Setup
```bash
cd my-site
npm install
npm run dev
```

Then open **http://localhost:3000** in your browser!

## 🌐 Deploy to Vercel (5 Minutes)

### Easiest Method:
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Import this repository
5. Click "Deploy"
6. Done! Your site is live 🎉

### CLI Method:
```bash
npm i -g vercel
cd my-site
vercel
```

## ✏️ Customize Your Site

### 1. Update Contact Information
Edit `app/page.tsx` - Search for these and update:

```typescript
// Email link (line ~275)
href="mailto:priyatosh@example.com"

// LinkedIn (line ~282)
href="https://linkedin.com/in/your-profile"

// GitHub (line ~289)
href="https://github.com/your-username"

// Twitter (line ~296)
href="https://twitter.com/your-handle"
```

### 2. Modify About Section
Edit the about text in `app/page.tsx` (around line 148)

### 3. Update Services
Modify the `services` array in `app/page.tsx` (line 21)

### 4. Change Skills
Edit the `skills` array in `app/page.tsx` (line 55)

### 5. Adjust Colors
Modify gradient colors in `app/page.tsx`:
- Current: `from-cyan-400 to-blue-500`
- Change to your preferred colors

## 🎨 Design Features

✅ **Dark Theme** - Professional quant/AI aesthetic
✅ **Animated Gradients** - Cyan, blue, and purple
✅ **Smooth Scrolling** - Single-page navigation
✅ **Responsive** - Works on all devices
✅ **Fast** - Optimized for performance
✅ **SEO Ready** - Proper metadata configured

## 📊 Sections Included

1. **Hero** - Bold introduction with your name
2. **About** - Professional bio
3. **Services** - 6 service offerings
4. **Skills** - 24+ technical skills
5. **Contact** - Email and social links
6. **Footer** - Copyright notice

## 🛠️ Tech Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- TypeScript
- Vercel-ready

## 📝 Next Steps

1. ✅ **Run locally** - Test the site
2. ✅ **Customize content** - Add your info
3. ✅ **Update links** - Social media URLs
4. ✅ **Deploy to Vercel** - Go live!
5. 🎯 **Add custom domain** (optional)
6. 🎯 **Add analytics** (optional)
7. 🎯 **Add more sections** (projects, blog, etc.)

## 💡 Pro Tips

- The site works perfectly without any code changes
- Just update the text content to match your info
- All builds are production-ready
- Vercel provides free hosting with SSL
- Automatic deployments on git push

## 📚 Documentation

- **README.md** - Project overview and setup
- **DEPLOY.md** - Detailed deployment guide
- **FEATURES.md** - Complete feature list
- **This file** - Quick start guide

## 🆘 Troubleshooting

**Port already in use?**
```bash
# Kill the process or use a different port
npm run dev -- -p 3001
```

**Build errors?**
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

**Deployment issues?**
- Check Vercel documentation
- Ensure all files are committed
- Verify Node.js version compatibility

## 🎉 You're Ready!

Your professional portfolio site is complete and ready to deploy. The site showcases your expertise in quantitative analysis and AI engineering with a modern, professional design.

**Need help?** Check the other documentation files or reach out!

---

Made with ⚡ by Next.js | Ready for 🚀 Vercel
