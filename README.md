# PhotoBooth

PhotoBooth is an in-browser photo booth experience built with React and Vite. It provides a fun hero landing page, a full-featured booth with live camera preview, filter controls, countdown timers, and printable photo strips, plus a photo editor route for post-shot tweaks.

## Features

- Live mirrored camera preview with optional overlay filters and special effects.
- Timer controls for hands-free captures and a configurable countdown overlay.
- Photo strip layout showing the latest captures alongside a phone preview mockup.
- Retake and re-order controls that keep blank slots available until all photos are filled.
- Background artwork (pb1 on the landing page, pb3 inside the booth) that tiles to fill any viewport size.
- Navigation links between Hero (`/`), Booth (`/booth`), and Editor (`/edit`) pages.

## Tech Stack

- [React](https://react.dev/) + [React Router](https://reactrouter.com/)
- [Vite](https://vite.dev/) for bundling and dev server
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide React](https://lucide.dev/) icon set

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
├── assets/                # Static images such as pb1, pb2, pb3
├── components/            # CameraView, PhonePreview, TakePhoto, etc.
├── pages/                 # Hero, PhotoBoothPage, PhotoEditPage
├── utils/                 # Camera/timer/filter helpers
├── App.jsx                # Route definitions
└── main.jsx               # Vite/React entry point
```

## Customization Tips

- **Styling:** Tailwind classes live in `src/index.css`. Add component-level styles via `@layer components`.
- **Camera logic:** `src/utils/cameraManager.js` controls how streams are acquired and stopped; adjust permissions or constraints there.
- **Filters:** Extend `src/utils/photoFilters.js` to add new CSS filters or overlay effects.
- **Timer defaults:** Edit `src/utils/timerConfig.js` to change initial countdown durations.

## Development Notes

- The project assumes secure origins (HTTPS or localhost) for camera access.
- If you change background assets, import them inside the relevant page component and update the `backgroundImage` inline style.

Happy snapping! 🎞️
