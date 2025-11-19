# Device Sandbox

A modern React + Redux + Vite application for simulating and managing smart devices (lights, fans) with drag-and-drop, presets, and a beautiful UI.

## Features

- Drag and drop devices and presets onto the sandbox canvas
- Control device power, brightness, speed, and color
- Save and update device presets
- Responsive sidebar for device and preset management
- Toast notifications and modal dialogs
- Built with TypeScript, TailwindCSS, Redux Toolkit, and React DnD

[Live Site](https://device-sandbox.vercel.app/)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
	components/      # React components (Device, Fan, Light, Sidebar, etc.)
	constants/       # Static configuration (device templates, colors)
	helpers/         # Utility functions (axios base query)
	redux/           # Redux store, slices, and API logic
	types/           # TypeScript type definitions
	utils/           # Utility functions (animation, color conversion)
public/            # Static assets
```

## Environment Variables

Copy `.env.example` to `.env` and set your API base URL:

```
VITE_API_BASE_URL=your_api_url_here
```

## Technologies Used

- React 19
- Redux Toolkit
- TypeScript
- Vite
- TailwindCSS
- Axios
- React DnD
- Lucide Icons

## License

MIT

---
