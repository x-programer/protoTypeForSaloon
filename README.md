# Luxe Salon Website

A modern, premium salon website featuring glassmorphism design, dark mode support, and responsive layouts. Built with vanilla HTML, CSS, and JavaScript for optimal performance.

## ✨ Features

- **🎨 Modern Design**: Sleek glassmorphism UI with premium aesthetics
- **🌓 Dark Mode**: Toggle between light and dark themes with persistent preferences
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **🎬 Video Hero**: Eye-catching video background on the homepage
- **🎯 Service Catalog**: Dynamic services page with filtering and sorting
- **📝 Booking Form**: Integrated contact and appointment booking
- **⚡ Smooth Animations**: Scroll-based animations and transitions
- **🎪 Team Gallery**: Showcase your stylists with interactive cards
- **♿ Accessible**: Semantic HTML and ARIA labels for screen readers

## 🛠️ Technologies Used

- **HTML5**: Semantic markup with schema.org structured data
- **CSS3**: Custom properties, flexbox, grid, and animations
- **JavaScript**: Vanilla JS for interactivity and dynamic content
- **Google Fonts**: Playfair Display and Lato typography
- **Pexels Videos**: High-quality stock video content

## 📁 Project Structure

```
salon_website/
├── index.html              # Main homepage
├── services.html           # Services catalog page
├── style.css              # Complete stylesheet
├── script.js              # JavaScript functionality
├── antigravity.json       # Deployment configuration
├── assets/                # Images and media files
│   └── images/
│       ├── hero-bg.png
│       ├── about-img.png
│       └── gallery-*.png
└── README.md              # This file
```

## 🚀 Getting Started

### Local Development

1. **Clone or download the project**
   ```bash
   git clone <your-repo-url>
   cd salon_website
   ```

2. **Open with Live Server**
   - If using VS Code, install the "Live Server" extension
   - Right-click on `index.html` and select "Open with Live Server"
   
   OR

3. **Use Python HTTP Server**
   ```bash
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000`

4. **Direct File Access**
   - Simply open `index.html` in your web browser
   - Note: Some features work best with a local server

### Configuration

The website uses `antigravity.json` for deployment configuration:

```json
{
    "hosting": {
        "public": ".",
        "cleanUrls": true
    }
}
```

- `cleanUrls: true` - Enables clean URLs without `.html` extensions when deployed

## 🎯 Key Features Explained

### Dark Mode
- Toggle between light and dark themes using the sun/moon icon
- Preference is saved to localStorage
- Automatically adjusts all colors and backgrounds

### Services Page
- **Dynamic Loading**: Services loaded from JSON data
- **Filtering**: Filter by service category (Color, Styling, Cuts, etc.)
- **Sorting**: Sort by price or duration
- **Modal Details**: Click any service for full details and booking

### Scroll Animations
- Elements fade in as they enter the viewport
- Smooth transitions on scroll
- Classes: `.animate-on-scroll`, `.fade-up`, `.zoom-in`

### Mobile Navigation
- Hamburger menu for small screens
- Sticky bottom navigation bar with quick actions
- Touch-optimized interface

## 📋 Customization Guide

### Update Salon Information

1. **Business Details** (`index.html` line 22-53):
   ```javascript
   {
     "name": "Luxe Salon",
     "telephone": "9617581181",
     "address": { ... }
   }
   ```

2. **Services** (`script.js` - services array):
   - Add/edit services in the `services` array
   - Include: name, category, price, duration, description, image

3. **Team Members** (`index.html` gallery section):
   - Update images in `assets/images/`
   - Modify gallery cards with new names and roles

### Styling Customization

Key CSS variables in `style.css`:

```css
:root {
  --primary-color: hsl(30, 8%, 20%);
  --accent-gold: hsl(40, 60%, 70%);
  --text-dark: hsl(0, 0%, 15%);
  /* ... more variables */
}
```

## 🌐 Deployment

### Deploy to Google Antigravity

1. Ensure `antigravity.json` is configured
2. Deploy using the Antigravity CLI or dashboard
3. Your site will be live with clean URLs enabled

### Deploy to Other Hosts

- **Netlify**: Drag and drop the entire folder
- **Vercel**: Connect your Git repository
- **GitHub Pages**: Push to a repository and enable Pages

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Color Palette

- **Primary**: `#3a3633` (Dark Brown)
- **Accent**: `#d4b896` (Gold)
- **Light**: `#f9f9f9` (Off White)
- **Dark Mode Background**: `#1a1a1a`

## 📞 Contact Information

**Luxe Salon**
- 📍 123 Luxury Lane, New York, NY 10012
- 📞 9617581181
- 📧 hello@luxesalon.com
- 🕒 Tue-Sat: 10am - 7pm

## 📄 License

This project is created for Luxe Salon. All rights reserved © 2025.

## 🙏 Credits

- **Fonts**: [Google Fonts](https://fonts.google.com/)
- **Videos**: [Pexels](https://www.pexels.com/)
- **Icons**: Inline SVG icons

---

**Built with ❤️ for Luxe Salon**
