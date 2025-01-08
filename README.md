# Interactive 3D Grid

An interactive 3D visualization built with Three.js that creates a responsive grid of planes reacting to mouse movement.

## Features

- Responsive 3D grid of planes
- Mouse-based interaction
- Smooth rotation animations
- Anti-aliased rendering

## Technical Details

The project uses:
- Three.js for 3D rendering
- Planes arranged in a 24x29 grid
- Mouse position tracking for interactive effects
- Smooth interpolation for rotations

## Setup

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

## Structure

- `main.js` - Main application code
- Grid configuration:
  - 24 rows × 29 columns
  - 0.5 unit gap between planes
  - Individual plane size: 1×2 units

## Performance

The animation system uses:
- Normalized device coordinates for mouse tracking
- World space coordinate conversion
- Smooth rotation interpolation (0.1 factor)
