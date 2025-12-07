# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MacBook Pro landing page built with React, Vite, Three.js, and GSAP animations. Features an interactive 3D product viewer with dynamic model switching and color customization.

## Development Commands

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## Architecture

### Core Technology Stack
- **React 19.2.0** - UI framework
- **Vite** - Build tool and dev server
- **Three.js + React Three Fiber** - 3D rendering
- **@react-three/drei** - Three.js helpers (OrbitControls, PresentationControls, useGLTF, useTexture)
- **GSAP 3.13** - Animations and ScrollTrigger
- **Zustand 5.0** - Global state management
- **Tailwind CSS 4.1** - Styling
- **react-responsive** - Media queries

### State Management Pattern
Zustand store (`src/store/index.js`) manages 3D model configuration:
- `color`: Current MacBook color (#2e2c2e dark or #adb5bd space gray)
- `scale`: Current model size (0.06 for 14", 0.08 for 16")
- Actions: `setColor`, `setScale`, `reset`

### 3D Model System
- **Two separate models**: MacbookModel14 and MacbookModel16 (both in `src/components/models/`)
- **Model switching**: `ModelSwitcher.jsx` handles fade/slide transitions between models using GSAP
  - When scale changes, triggers fade animations (opacity) and position offsets (x-axis)
  - Uses `useGSAP` hook for animation lifecycle
  - Both models wrapped in `PresentationControls` for user interaction
- **Color application**: Each model's `useEffect` traverses the scene graph and applies color to meshes
  - Exception list in `constants/noChangeParts` prevents coloring specific parts (screen, keyboard, etc.)
  - Uses Three.js `Color` class for material updates
- **Screen texture**: Applied to specific mesh geometry using `meshBasicMaterial`
- **GLTF models**: Located in `/public/models/` (14" and 16" variants)
  - Generated with `gltfjsx` CLI tool
  - Pre-transformed for optimization

### Component Structure
```
App.jsx (root)
├── Navbar
├── Hero
├── ProductViewer
│   ├── Color controls (Space Gray / Dark)
│   ├── Size controls (14" / 16")
│   └── Canvas (Three.js)
│       ├── StudioLights
│       └── ModelSwitcher
│           ├── MacbookModel16 (in PresentationControls)
│           └── MacbookModel14 (in PresentationControls)
└── Showcase
```

### Animation Patterns
- **GSAP Registration**: `gsap.registerPlugin(ScrollTrigger)` in App.jsx
- **Model transitions**: GSAP animations for fade and position changes in ModelSwitcher
- **Scroll-based animations**: ScrollTrigger used for reveal effects (see Showcase component)
- **useGSAP hook**: Preferred over raw useEffect for GSAP animations

### Responsive Design
- Uses `react-responsive` for breakpoint detection (`useMediaQuery`)
- Mobile adjustments: Reduced scale values for 3D models on screens < 1024px
- Tailwind responsive classes (md:, lg: prefixes)

### Constants Organization
All static data in `src/constants/index.js`:
- `navLinks`: Navigation menu items
- `noChangeParts`: Object IDs that shouldn't change color
- `performanceImages`: Image gallery data
- `features`: AI feature cards with icons, text, and positioning
- `featureSequence`: Video sequence data for animations

### Asset Structure
```
public/
├── models/           # GLTF 3D models (14", 16" MacBook)
├── videos/           # Video backgrounds and features
├── fonts/            # Custom typography (SF Pro variants)
├── *.png, *.svg     # Icons and images
└── screen.png       # MacBook display texture
```

## Working with 3D Models

### Adding/Updating Models
1. Place GLTF files in `/public/models/`
2. Generate component with: `npx gltfjsx model-name.glb -T`
3. Apply Zustand color state via useEffect traversal
4. Add texture mapping for screen using `useTexture` hook
5. Update `noChangeParts` constant if needed

### Model Switching Logic
- Scale values act as identifiers (0.06 = 14", 0.08 = 16")
- Both models always rendered, visibility controlled by GSAP opacity
- Position offset prevents z-fighting during transitions
- `ANIMATION_DURATION` and `OFFSET_DISTANCE` constants control timing/spacing

## File Path Requirements

**CRITICAL**: Always use complete Windows absolute paths for file operations:
- Format: `C:\Users\piero\Desktop\Proyectos\apple-landing\macbook-landing\src\file.jsx`
- Never use: `/mnt/c/...` or relative paths
- Applies to Read, Write, Edit tools

## Code Style
- React functional components with hooks
- Named exports for utilities, default exports for components
- GSAP animations use `useGSAP` hook for cleanup
- Tailwind utility classes with `clsx` for conditional styling
- Three.js objects use lowercase refs (e.g., `smallMacbookRef`)