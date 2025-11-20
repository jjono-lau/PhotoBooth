# PhotoBooth

PhotoBooth is a modern, in-browser photo booth experience built with React and Vite. It delivers a premium user journey from a vibrant landing page to a fully-featured capture booth and a sophisticated post-processing editor.

## ✨ Features

### 📸 Photo Booth
- **Live Camera Preview**: High-performance mirrored camera feed with real-time filter application.
- **Custom Film Simulation**: Advanced SVG-based color grading engine that replicates authentic film aesthetics (exposure, contrast, vibrance, tint).
- **Smart Timer**: Configurable countdown with visual overlay for hands-free captures.
- **Classic Strip Layout**: Automatically arranges 4 photos into a nostalgic vertical strip format.
- **Filter Effects**: Real-time grain, vignette, and warmth overlays.

### 🎨 Creative Editor
- **Accordion-Style Interface**: Clean, collapsible "Photo Edit Dropdown" UI for a clutter-free editing experience.
- **Frame Customization**:
  - **Layouts**: Classic, bottom-heavy, or top-heavy styles.
  - **Spacing**: Fine-tune padding and borders.
  - **Colors**: 11+ curated palettes plus a custom color picker.
- **Advanced Typography**:
  - **Multi-line Support**: Add up to 3 lines of text for storytelling captions.
  - **Styling**: 15+ font families, adjustable weight, size, and italics.
  - **Colors**: Curated text colors or custom hex selection.
- **Mobile-First Preview**: Dedicated "Eye" button for mobile users to preview their strip in a distraction-free modal.

### 💾 Export & Share
- **High-Res Download**: Generates high-quality PNGs with all frames, text, and filters embedded.
- **Print Optimization**: Dimensions tuned for standard photo strip printing.
- **Client-Side Generation**: Fast and secure image creation using `html2canvas`.

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) + [React Router](https://reactrouter.com/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Export**: [html2canvas](https://html2canvas.hertzen.com/)

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start the development server (http://localhost:5173)
npm run dev

# Run the production build
npm run build

# Preview the production build locally
npm run preview
```

## 📂 Project Structure

```
src/
├── assets/                  # Static images and background assets
├── components/              # Reusable UI components
│   ├── CameraView.jsx       # Live camera preview wrapper
│   ├── FrameEditor.jsx      # Frame layout & color controls
│   ├── TextEditor.jsx       # Text content & style controls
│   ├── PhotoEditDropDown.jsx # Collapsible UI container
│   ├── StripPreviewModal.jsx # Mobile-optimized preview modal
│   ├── GlobalFilters.jsx    # SVG filter definitions
│   └── ...
├── pages/                   # Application routes
│   ├── Hero.jsx             # Landing page
│   ├── PhotoBoothPage.jsx   # Capture interface
│   └── PhotoEditPage.jsx    # Post-processing editor
├── utils/                   # Logic & Configuration
│   ├── cameraManager.js     # MediaStream handling
│   ├── photoFilters.js      # CSS & SVG filter configs
│   ├── frameFilters.js      # Frame presets
│   ├── frameTextOptions.js  # Font & color presets
│   └── ...
├── App.jsx                  # Route configuration
└── main.jsx                 # Entry point
```

## 🎨 Customization Guide

- **Filters**: Modify `src/utils/photoFilters.js` to tweak the film simulation values (exposure, contrast, etc.).
- **Fonts**: Add new Google Fonts in `index.html` and register them in `src/utils/frameTextOptions.js`.
- **Colors**: Extend the palette in `src/utils/frameFilters.js` to add new frame color combinations.
- **Layouts**: Adjust frame padding logic in `src/utils/frameFilters.js` to create new strip layouts.

## 📝 Development Notes

- **Camera Access**: Requires a secure context (HTTPS or localhost).
- **Performance**: SVG filters are optimized for real-time use but complex chains may impact low-end devices.
- **Responsiveness**: The UI is fully responsive, with specific optimizations for mobile editing (e.g., the preview modal).

---

Happy snapping! 🎞️
