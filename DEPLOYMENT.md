# GitHub Pages Deployment Guide

This guide will help you deploy your portfolio website to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your computer
- Your portfolio files ready

## Step-by-Step Deployment

### 1. Create a New Repository on GitHub

1. Go to [GitHub](https://github.com) and sign in
2. Click the **+** icon in the top right corner
3. Select **New repository**
4. Name your repository (e.g., `portfolio` or `my-portfolio`)
5. Choose **Public** (required for free GitHub Pages)
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click **Create repository**

### 2. Initialize Git and Push Your Code

Open your terminal/command prompt in your project folder and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Portfolio website"

# Add your GitHub repository as remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** (top menu)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**

### 4. Wait for Deployment

- GitHub Pages will build your site (usually takes 1-2 minutes)
- You'll see a green checkmark when it's ready
- Your site will be available at: `https://YOUR_USERNAME.github.io/REPO_NAME/`

### 5. Update Meta Tags (Important!)

After deployment, update the Open Graph and Twitter Card URLs in `index.html`:

1. Open `index.html`
2. Find the meta tags section (around line 20-30)
3. Replace `yourusername.github.io` with your actual GitHub Pages URL
4. Update the image URLs to use your full GitHub Pages URL
5. Commit and push the changes:

```bash
git add index.html
git commit -m "Update meta tags with GitHub Pages URL"
git push
```

### 6. Custom Domain (Optional)

If you have a custom domain:

1. Create a file named `CNAME` in your repository root
2. Add your domain name (e.g., `www.yourname.com`)
3. Update your domain's DNS settings to point to GitHub Pages
4. See [GitHub Pages Custom Domain Guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

## Troubleshooting

### Site Not Loading

- Wait 5-10 minutes after enabling Pages
- Check repository Settings → Pages for any errors
- Ensure `index.html` is in the root directory

### Images Not Showing

- Verify all image paths are relative (start with `images/`)
- Check that images exist in the `images/` folder
- Clear browser cache (Ctrl+F5 or Cmd+Shift+R)

### Styles Not Loading

- Verify `css/styles.css` path is correct
- Check browser console for 404 errors
- Ensure file structure matches the paths in HTML

### Dark Mode Not Working

- Check browser console for JavaScript errors
- Verify `js/script.js` is loading correctly
- Test in different browsers

## Updating Your Site

After making changes:

```bash
git add .
git commit -m "Update portfolio content"
git push
```

Changes will be live in 1-2 minutes.

## Useful Commands

```bash
# Check repository status
git status

# View commit history
git log

# Pull latest changes (if working on multiple machines)
git pull

# View remote repository
git remote -v
```

## Need Help?

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Git Documentation](https://git-scm.com/doc)
- Check your repository's **Actions** tab for build logs

---

**Note**: Remember to update the meta tag URLs in `index.html` with your actual GitHub Pages URL after deployment!
