# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies

Open a terminal in this directory and run:

```bash
npm install
```

This will download all required packages (Vite, Vitest, etc.)

### 2. Start Development Server

```bash
npm run dev
```

The calculator will automatically open in your browser at `http://localhost:3000`

### 3. Try It Out!

- Click buttons or use keyboard to calculate
- Drag the calculator around the screen
- Press `Escape` to clear, `Backspace` to delete

## 📦 Build for Production

When you're ready to deploy:

```bash
npm run build
```

This creates a `dist/` folder with optimized files ready for deployment.

## 🌐 Deploy to Netlify

### Option 1: Drag & Drop (Easiest)

1. Run `npm run build`
2. Go to https://app.netlify.com/drop
3. Drag the `dist` folder onto the page
4. Done! 🎉

### Option 2: Git Integration (Recommended for updates)

1. Push your code to GitHub
2. Go to https://netlify.com
3. Click "New site from Git"
4. Connect your repository
5. Set build command: `npm run build`
6. Set publish directory: `dist`
7. Click "Deploy site"

### Option 3: Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

## 🧪 Run Tests

```bash
npm test
```

Or with a nice UI:

```bash
npm run test:ui
```

## 📁 Project Structure

```
calculator-project/
├── index.html                    # Main HTML
├── src/
│   ├── main.js                   # Entry point
│   ├── modules/
│   │   ├── Calculator.js         # Core logic (no DOM)
│   │   ├── CalculatorDisplay.js  # UI updates
│   │   ├── KeyboardHandler.js    # Keyboard input
│   │   └── DragHandler.js        # Dragging
│   ├── styles/
│   │   └── main.css              # All styles
│   └── tests/
│       └── Calculator.test.js    # Unit tests
├── package.json                  # Dependencies
├── vite.config.js                # Build config
└── netlify.toml                  # Deploy config
```

## 🎯 Key Features

✅ Modular code split into separate files
✅ Pure Calculator class (fully testable)
✅ Vite for fast development and optimized builds
✅ Comprehensive unit tests with Vitest
✅ Ready to deploy to Netlify, Vercel, or any static host
✅ Works without a build step in development
✅ Production build is optimized and minified

## 💡 Tips

- The calculator is draggable - click and drag anywhere on it
- All keyboard shortcuts work (0-9, +, -, *, /, Enter, Esc, Backspace)
- Tests cover all functionality - run them to verify everything works
- The `dist/` folder after build contains static files that work anywhere

## 🔧 Troubleshooting

**Port 3000 already in use?**
Vite will automatically try the next available port.

**Build not working?**
Try: `rm -rf node_modules && npm install`

**Tests failing?**
Make sure you're using Node.js 18 or higher.

## 📖 Need More Info?

Check out the full README.md for detailed documentation!
