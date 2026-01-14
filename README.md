# Portfolio Website

A modern, responsive personal portfolio website showcasing my projects, skills, achievements, and educational background.

## 🌟 Features

- **Responsive Design**: Fully responsive layout that works on all devices (mobile, tablet, desktop)
- **Dark/Light Mode**: Toggle between dark and light themes with smooth transitions
- **Smooth Animations**: Fade-in, slide-in, and bounce animations for enhanced user experience
- **Interactive Sections**:
  - Hero section with introduction
  - Education timeline
  - Achievements gallery with multiple photos
  - Skills with animated progress bars
  - Projects with live demo and GitHub links
  - School activities
  - Certificates
  - Books read
- **Modal Image Viewer**: Click on images to view them in full-screen modal
- **Smooth Scrolling**: Navigation with smooth scrolling to sections
- **Accessibility**: ARIA labels, keyboard navigation, and semantic HTML

## 🚀 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern CSS with variables, flexbox, and grid
- **JavaScript (Vanilla)**: No frameworks, pure JavaScript for interactivity
- **Google Fonts**: Montserrat and Roboto for typography
- **Font Awesome**: Icons for UI elements

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles and animations
├── js/
│   └── script.js       # JavaScript functionality
├── images/             # All images and photos
│   ├── main_photo1.jpg
│   └── ...
└── README.md           # This file
```

## 🛠️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     ```

## 📝 Customization

### Update Personal Information

1. **Hero Section** (`index.html` line ~48-50):
   - Update name, location, and description

2. **Education Timeline** (`index.html` line ~60-100):
   - Update school names, years, and descriptions

3. **Contact Information** (`index.html` footer section):
   - Update email and social media links

4. **Images**:
   - Replace images in the `images/` folder with your own
   - Update image paths in `index.html` if needed

### Update Meta Tags

Edit the `<head>` section in `index.html` to update:
- Title and description
- Open Graph URLs (replace `yourusername.github.io` with your actual GitHub Pages URL)
- Social media preview images

### Add Your Projects

1. Update project cards in the Projects section
2. Add your project images to the `images/` folder
3. Update project links (Live Demo and GitHub)
4. Modify tech stack tags as needed

## 🌐 GitHub Pages Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial portfolio website"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select `main` branch
   - Select `/ (root)` folder
   - Click **Save**

3. **Access Your Site**
   - Your site will be available at: `https://yourusername.github.io/repository-name/`
   - It may take a few minutes to go live

## 🎨 Color Scheme

The website uses CSS variables for easy theme customization:

**Light Mode:**
- Primary Background: `#ffffff`
- Accent Color: `#007bff`
- Text: `#333333`

**Dark Mode:**
- Primary Background: `#121212`
- Accent Color: `#4a9eff`
- Text: `#e0e0e0`

Edit these in `css/styles.css` under `:root` and `[data-theme="dark"]`.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Future Enhancements

- [ ] Add blog section
- [ ] Implement contact form
- [ ] Add more interactive animations
- [ ] Integrate with GitHub API for dynamic project loading
- [ ] Add multi-language support

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Firaol Seboka**
- Location: Sebeta, Ethiopia
- Email: [Your Email]
- LinkedIn: [Your LinkedIn]
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- Google Fonts for typography
- Font Awesome for icons
- Inspiration from modern portfolio designs

---

⭐ If you like this project, please give it a star on GitHub!
