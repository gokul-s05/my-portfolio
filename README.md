# 🚀 Gokul's Portfolio Website

A modern, responsive portfolio website showcasing my skills in cybersecurity, front-end development, and mobile app creation. Built with React, TypeScript, and Tailwind CSS.

## ✨ Features

### 🎨 **Modern Design**
- **Responsive Layout** - Works perfectly on desktop, tablet, and mobile
- **Dark/Light Theme** - Toggle between themes with smooth transitions
- **Smooth Animations** - Framer Motion powered animations throughout
- **Gradient Effects** - Beautiful gradient text and backgrounds

### 📱 **Interactive Sections**
- **Hero Section** - Animated introduction with floating icons
- **About Me** - Professional background and skills overview
- **Skills & Expertise** - Visual skill bars with color-coded proficiency levels
- **Projects Portfolio** - Showcase of development and cybersecurity projects
- **Resume Section** - Professional experience and education
- **Contact Form** - EmailJS integration for reliable message delivery

### 🔧 **Technical Features**
- **Form Validation** - Comprehensive validation for all form fields
- **EmailJS Integration** - Secure and reliable email delivery system
- **Error Handling** - User-friendly error messages and loading states
- **Smooth Scrolling** - Navigation with active section highlighting
- **Mobile Navigation** - Responsive dropdown menu for mobile devices

## 🛠️ Technologies Used

### **Frontend**
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icon library
- **EmailJS** - Email delivery service

### **UI Components**
- **Shadcn/ui** - Modern, accessible component library
- **Radix UI** - Unstyled, accessible UI primitives
- **Class Variance Authority** - Type-safe component variants

### **Development Tools**
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📦 Installation

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn package manager

### **Setup Steps**

1. **Clone the repository**
   ```bash
   git clone https://github.com/gokul-s05/my-portfolio.git
   cd my-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure EmailJS**
   - Sign up for an [EmailJS account](https://www.emailjs.com/)
   - Create an email service
   - Create an email template
   - Note down your:
     - Service ID
     - Template ID
     - Public Key

4. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

5. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🚀 Usage

### **Development**
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### **Customization**

#### **Personal Information**
Update your personal details in `src/pages/Portfolio.tsx`:
- Name and title
- Contact information
- Skills and proficiency levels
- Project details and links
- Experience and education

#### **Styling**
- **Colors**: Modify `tailwind.config.ts` for custom color schemes
- **Animations**: Adjust Framer Motion animations in components
- **Layout**: Update CSS classes in components for layout changes

#### **Content**
- **Images**: Replace images in `src/assets/` with your own
- **Projects**: Update project data in the `projects` array
- **Skills**: Modify the `skills` array with your expertise

## 📁 Project Structure

```
my-portfolio/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Shadcn/ui components
│   │   ├── Navigation.tsx  # Navigation bar
│   │   ├── Footer.tsx      # Footer component
│   │   └── FloatingIcons.tsx # Animated background icons
│   ├── pages/
│   │   └── Portfolio.tsx   # Main portfolio page
│   ├── assets/             # Images and static files
│   ├── lib/                # Utility functions
│   └── hooks/              # Custom React hooks
├── public/                 # Public assets
├── index.html              # HTML template
└── package.json            # Dependencies and scripts
```

## 🎯 Key Features Explained

### **Skill Progress Bars**
- **Color-coded levels**: Red (1-34%), Yellow (35-69%), Green (70-100%)
- **Progressive colors**: Shows only colors up to skill level
- **Visual feedback**: Easy to understand proficiency at a glance

### **Contact Form Features**
- **EmailJS Integration**: Reliable email delivery system
- **Form Validation**: 
  - Required fields validation
  - Email format validation
  - Phone number validation
- **User Experience**:
  - Clear error messages
  - Loading states during submission
  - Success notifications
  - Form reset after successful submission

### **Responsive Design**
- **Mobile-first**: Optimized for all screen sizes
- **Touch-friendly**: Easy navigation on mobile devices
- **Performance**: Fast loading and smooth interactions

## 🔧 Configuration

### **EmailJS Setup**
1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Set up an email service (Gmail, Outlook, etc.)
3. Create an email template with variables:
   - `{{name}}` - Sender's name
   - `{{email}}` - Sender's email
   - `{{phone}}` - Sender's phone
   - `{{message}}` - Message content
4. Configure environment variables as described in Installation

### **Theme Customization**
- Modify `tailwind.config.ts` for custom colors
- Update CSS variables in `src/index.css`
- Adjust animation timings in Framer Motion components

## 📱 Mobile Optimization

- **Responsive navigation** with hamburger menu
- **Touch-friendly** buttons and interactions
- **Optimized images** for fast loading
- **Smooth scrolling** on mobile devices
- **Proper viewport** settings

## 🚀 Deployment

### **Vercel (Recommended)**
```bash
npm run build
# Deploy to Vercel with automatic builds
```

### **Netlify**
```bash
npm run build
# Deploy to Netlify with drag-and-drop
```

### **GitHub Pages**
```bash
npm run build
# Configure GitHub Actions for automatic deployment
```

## 📞 Contact

- **Email**: gokulsarav2005@gmail.com
- **GitHub**: [gokul-s05](https://github.com/gokul-s05)
- **LinkedIn**: [gokuls05](https://www.linkedin.com/in/gokuls05)


## 🙏 Acknowledgments

- **Shadcn/ui** for beautiful components
- **Framer Motion** for smooth animations
- **Tailwind CSS** for utility-first styling
- **Lucide React** for icons
- **EmailJS** for contact form functionality

---

**Built by Gokul** - A passionate tech enthusiast skilled in cybersecurity, front-end development, and mobile app creation.
