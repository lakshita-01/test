# 🚀 Bluestock IPO Platform

A modern, professional IPO investment platform built with React and Material-UI. Discover, analyze, and invest in the most promising Initial Public Offerings with comprehensive tools and real-time updates.

![Bluestock IPO Platform](https://via.placeholder.com/800x400/1976d2/ffffff?text=Bluestock+IPO+Platform)

## ✨ Features

### 🎯 Core Features
- **IPO Discovery**: Browse and search through available IPOs with advanced filtering
- **Real-time Updates**: Get instant notifications about IPO status changes
- **Detailed Analysis**: Comprehensive IPO information and expert insights
- **Secure Applications**: Bank-grade security for IPO applications
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Professional UI**: Clean, modern interface with Material-UI components

### 🔧 Technical Features
- **React 19**: Latest React with hooks and modern patterns
- **Material-UI v7**: Professional component library with theming
- **React Router v7**: Client-side routing with lazy loading
- **Context API**: Global state management
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Performance Optimized**: Code splitting, memoization, and lazy loading
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Error Boundaries**: Graceful error handling and recovery

## 🛠️ Technology Stack

### Frontend
- **React 19.1.0** - Modern React with latest features
- **Material-UI 7.2.0** - Professional component library
- **React Router 7.6.3** - Client-side routing
- **Emotion** - CSS-in-JS styling solution
- **Date-fns** - Modern date utility library

### Development Tools
- **React Scripts 5.0.1** - Build toolchain
- **Testing Library** - Comprehensive testing utilities
- **Web Vitals** - Performance monitoring

## 🚀 Quick Start

### Prerequisites
- Node.js 16.0 or higher
- npm 7.0 or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bluestock-ipo-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

### Development
```bash
npm start          # Start development server
npm test           # Run tests in watch mode
npm run build      # Build for production
```

### Code Quality
```bash
npm run lint       # Check code quality
npm run format     # Format code with Prettier
```

### Production
```bash
npm run build      # Create production build
npm run serve      # Serve production build locally
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Common/          # Shared components
│   ├── IPO/             # IPO-specific components
│   ├── Layout/          # Layout components
│   └── Admin/           # Admin components
├── pages/               # Page components
├── context/             # React Context providers
├── utils/               # Utility functions
├── styles/              # Global styles
├── theme/               # Material-UI theme
└── assets/              # Static assets
```

## 🎨 Design System

### Color Palette
- **Primary**: #1976d2 (Bluestock Blue)
- **Secondary**: #f50057 (Accent Pink)
- **Success**: #4caf50 (Green)
- **Warning**: #ff9800 (Orange)
- **Error**: #f44336 (Red)

### Typography
- **Font Family**: Inter, Roboto, Helvetica, Arial
- **Headings**: 700-600 weight with proper hierarchy
- **Body Text**: 400-500 weight with optimal line height

### Components
- **Cards**: Rounded corners (16px) with subtle shadows
- **Buttons**: Modern styling with hover effects
- **Forms**: Clean inputs with proper validation
- **Navigation**: Responsive with active states

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_APP_NAME=Bluestock IPO
REACT_APP_VERSION=1.0.0
```

### Theme Customization
Modify `src/theme/theme.js` to customize:
- Colors and palette
- Typography settings
- Component overrides
- Breakpoints

## 📱 Responsive Design

The application is built with a mobile-first approach:

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px and above

All components are fully responsive with optimized layouts for each breakpoint.

## 🧪 Testing

### Running Tests
```bash
npm test                 # Interactive test runner
npm run test:coverage    # Generate coverage report
```

### Test Structure
- **Unit Tests**: Component and utility testing
- **Integration Tests**: Feature workflow testing
- **Accessibility Tests**: WCAG compliance testing

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy automatically on push

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style
- Use ESLint and Prettier configurations
- Follow React best practices
- Write meaningful commit messages
- Add tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- **Email**: support@bluestockipo.com
- **Phone**: +91 98765 43210
- **Documentation**: [Wiki](link-to-wiki)
- **Issues**: [GitHub Issues](link-to-issues)

## 🙏 Acknowledgments

- **Material-UI Team** - For the excellent component library
- **React Team** - For the amazing framework
- **Create React App** - For the build toolchain
- **Contributors** - For making this project better

---

**Made with ❤️ by the Bluestock Team**
