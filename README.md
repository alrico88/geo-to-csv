# Geo to CSV

Geo to CSV is an open-source web tool for converting GeoJSON and KML files into CSV format. The tool allows you to easily extract feature properties and geometries, which are represented in Well-Known Text (WKT) format, or as latitude and longitude for point features.

## Features
- **GeoJSON to CSV**: Convert GeoJSON files to CSV, including feature properties and geometries as WKT.
- **GeoJSON Points to CSV**: Extract only point features from GeoJSON files, with latitude and longitude columns.
- **KML to CSV**: Convert KML files to CSV, including feature properties and geometries as WKT.
- **Flattening Nested Properties**: Automatically flattens nested properties for easier analysis and CSV compatibility.

## Built with

- [Nuxt](https://nuxt.com)
- [@tmcw/togeojson](https://www.npmjs.com/package/@tmcw/togeojson)
- [PapaParse](https://www.npmjs.com/package/papaparse)

## Setup

Make sure to install the dependencies:

```bash
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
pnpm run dev
```

## Production

Build the application for production:

```bash
pnpm run build
```

Locally preview production build:

```bash
pnpm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
