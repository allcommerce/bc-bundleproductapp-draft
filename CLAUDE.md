# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a new BC Bundle Product App project that is currently in the planning/design phase. The codebase contains only a DRAFT.md file with Vietnamese specifications for a bundle product management application.

## Project Requirements (from DRAFT.md)

The application should be a bundle products management system with the following features:

### Main Components
- **Bundle Products Management Page**: Display existing bundle products in table format with "Add New Bundle Product" button
- **Add/Edit Bundle Product Pages**: Interface for creating and editing bundle products

### Core Functionality
- Select a main product to create a bundle for
- Choose child products to include in the bundle (displayed in table format)
- Configure discount percentages for each product in the bundle
- Set minimum and maximum quantity limits for child products within bundles

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (requires live-server)
npm run dev

# Build project
npm run build

# Deploy to GitHub Pages
npm run publish

# Alternative deploy command
npm run deploy
```

## Development Status

**✅ IMPLEMENTED**: Basic bundle product management application with HTML, CSS, and JavaScript.

## Architecture

### Frontend Structure
- **index.html**: Single-page application with two main views
  - Bundle Products listing page with table display
  - Add/Edit Bundle Product form page
- **styles.css**: Complete styling with responsive design and modern UI
- **script.js**: Full JavaScript functionality for CRUD operations

### Key Features Implemented
- ✅ Bundle products management page with table listing
- ✅ Add new bundle product functionality  
- ✅ Edit existing bundle products
- ✅ Main product selection dropdown
- ✅ Child products table with dynamic row addition/removal
- ✅ Discount percentage configuration per product
- ✅ Min/max quantity limits for child products
- ✅ Form validation and error handling
- ✅ Responsive design for mobile devices

### Data Structure
The application uses localStorage simulation with sample data structure:
```javascript
{
  id: number,
  name: string,
  mainProduct: string,
  childProducts: [
    {
      name: string,
      discount: number,
      minQty: number,
      maxQty: number
    }
  ],
  createdDate: string
}
```

## File Structure

- `index.html` - Main application structure
- `styles.css` - Complete styling and responsive design
- `script.js` - Full application logic and functionality
- `package.json` - Project configuration and dependencies
- `DRAFT.md` - Original Vietnamese specifications
- `CLAUDE.md` - This documentation file