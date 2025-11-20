# PhotoBooth

PhotoBooth is an in-browser photo booth experience built with React and Vite. It provides a fun hero landing page, a full-featured booth with live camera preview, filter controls, countdown timers, and printable photo strips, plus a photo editor route for post-shot tweaks.

## Features

### Photo Booth
- **Live Camera Preview**: Mirrored camera feed with real-time filter application
- **Custom Film Filters**: SVG-based color grading with adjustable exposure, contrast, vibrance, and tint
- **Timer Controls**: Configurable countdown with visual overlay for hands-free captures
- **Photo Strip Layout**: Classic 4-photo strip format with retake and reorder capabilities
- **Filter Effects**: Grain, vignette, and warmth overlays for authentic film aesthetics

### Frame Editor
- **Frame Layouts**: Choose from classic, bottom-heavy, or top-heavy frame styles
- **Adjustable Spacing**: Dynamic padding controls for custom frame sizing
- **Color Palettes**: 11+ curated color schemes plus custom color picker
- **Text Customization**: Add captions with 15+ font styles, adjustable size, weight, and color
- **Live Preview**: Real-time frame and text rendering

### Export & Download
- **High-Quality Export**: Download photo strips as PNG with embedded frames and text
- **Print-Ready**: Optimized dimensions for physical photo booth prints
- **Instant Download**: Client-side image generation with html2canvas

### Navigation
- Seamless routing between Hero (`/`), Booth (`/booth`), and Editor (`/edit`) pages
- Background artwork that adapts to any viewport size

## Tech Stack

- [React](https://react.dev/) + [React Router](https://reactrouter.com/)
- [Vite](https://vite.dev/) for bundling and dev server
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide React](https://lucide.dev/) icon set
- [html2canvas](https://html2canvas.hertzen.com/) for image export

## Getting Started

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

## Project Structure

```
src/
├── assets/                # Static images (pb1, pb2, pb3, pb4)
├── components/            # Reusable UI components
│   ├── CameraView.jsx     # Live camera preview
│   ├── FrameEditor.jsx    # Frame customization controls
│   ├── TextEditor.jsx     # Text styling controls
│   ├── GlobalFilters.jsx  # SVG filter definitions
│   ├── Download.jsx       # Export functionality
│   └── ...
├── pages/                 # Route pages
│   ├── Hero.jsx           # Landing page
│   ├── PhotoBoothPage.jsx # Camera & capture interface
│   └── PhotoEditPage.jsx  # Frame & text editor
├── utils/                 # Helper functions
│   ├── cameraManager.js   # Camera stream handling
│   ├── photoFilters.js    # Filter configurations
│   ├── frameFilters.js    # Frame layout & color options
│   ├── frameTextOptions.js # Font styles & colors
│   ├── captureFrame.js    # Photo capture logic
│   └── downloadPhoto.js   # Image export utilities
├── App.jsx                # Route definitions
└── main.jsx               # Vite/React entry point
```

## Customization Tips

- **Styling:** Tailwind classes live in `src/index.css`. Add component-level styles via `@layer components`.
- **Camera logic:** `src/utils/cameraManager.js` controls how streams are acquired and stopped; adjust permissions or constraints there.
- **Filters:** Extend `src/utils/photoFilters.js` to add new CSS filters or modify `src/components/GlobalFilters.jsx` for SVG-based color grading.
- **Frame Colors:** Add new palettes in `src/utils/frameFilters.js` with custom background, border, and shadow values.
- **Text Fonts:** Extend `src/utils/frameTextOptions.js` with Google Fonts or custom font families.
- **Timer defaults:** Edit `src/utils/timerConfig.js` to change initial countdown durations.

## Development Notes

- The project assumes secure origins (HTTPS or localhost) for camera access.
- If you change background assets, import them inside the relevant page component and update the `backgroundImage` inline style.

Happy snapping! 🎞️
