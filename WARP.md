# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**jpostal** is a TypeScript library for converting Japanese postal codes to addresses. It's a fork of jposta with added functionality (`getPrefs()`). The library is self-hosted and uses dynamic imports to load postal code data efficiently without external API calls.

## Commands

### Building
```bash
npm run build
```
Compiles TypeScript and builds the library using Vite. Outputs both ESM (`dist/index.js`) and CJS (`dist/index.cjs`) formats.

### Testing
```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npx vitest
```
Uses Vitest for testing. Tests are located in `tests/jposta.test.ts`.

### Linting
```bash
npx biome check .

# Auto-fix issues
npx biome check --apply .
```
Uses Biome for linting and formatting. Configuration in `biome.json`.

### Data Management
```bash
# Download latest postal code data from Japan Post
npm run update-csv

# Parse CSV data into JSON files (after updating CSV)
npm run parse-csv
```
These commands update the postal code database from Japan Post's official source. `update-csv` downloads the latest CSV, and `parse-csv` converts it into chunked JSON files (z00.json through z99.json) stored in `lib/zips/`.

## Architecture

### Core Design Pattern: Dynamic Import & Data Chunking

The library's key architectural feature is **chunk-based lazy loading** of postal code data:

1. **Data Organization**: Postal codes are split into ~100 JSON files (`lib/zips/z00.json` to `z99.json`) based on the first two digits of the postal code.

2. **Dynamic Loading**: When `getAddress()` is called:
   - Extracts the first 2 digits from the postal code (e.g., "100-0001" → "10")
   - Dynamically imports only the corresponding JSON chunk (`z10.json`)
   - Caches the chunk for subsequent lookups with the same prefix
   - Returns the address data from the chunk

3. **Build Output**: During build, Vite generates:
   - Main library files (`dist/index.js`, `dist/index.cjs`)
   - Hashed chunk files (e.g., `dist/z10-eXY0nnaQ.js`) for each postal code range
   - This enables efficient browser caching and on-demand loading

### File Structure

```
lib/
  index.ts          # Entry point, re-exports from jposta.ts
  jposta.ts         # Core logic: getAddress(), getPrefs(), configureJposta()
  zips/             # 100 JSON files (z00.json to z99.json) with postal code data
data/
  parse.ts          # Script to parse Japan Post CSV into chunked JSON files
  update.sh         # Script to download latest CSV from Japan Post
  utf_ken_all.csv   # Source CSV file from Japan Post (18MB)
tests/
  jposta.test.ts    # Test suite with comprehensive postal code validation
```

### Key Data Flow

1. **Data Ingestion** (npm run update-csv → npm run parse-csv):
   - Downloads `utf_ken_all.csv` from Japan Post
   - `parse.ts` reads CSV and groups by first 2 digits of postal code
   - Outputs 100 JSON files: `lib/zips/z{00-99}.json`
   - Each JSON format: `{ "postalCode": [prefNum, city, area] }`

2. **Runtime Lookup** (getAddress()):
   - User calls `getAddress("100-0001")`
   - Extracts prefix "10" → imports `./zips/z10.json`
   - Looks up "1000001" in the chunk
   - Returns `{ pref: "東京都", prefNum: 13, city: "千代田区", area: "千代田" }`

3. **Configuration**: `configureJposta({ host: "..." })` allows specifying a custom CDN/host for the JSON chunks in production environments.

### Type Definitions

```typescript
type Address = {
  pref: string;      // Prefecture name (e.g., "東京都")
  prefNum: number;   // Prefecture number (1-47)
  city: string;      // City/municipality
  area?: string;     // District/area (optional)
}
```

## Development Notes

- **TypeScript**: Strict mode enabled with `noUnusedLocals` and `noUnusedParameters`
- **Module System**: ESM-first with CJS compatibility via Vite build
- **Node Version**: Check `.node-version` for required Node.js version
- **Build Tool**: Vite with `vite-plugin-dts` for TypeScript declaration generation
- **Testing Framework**: Vitest (Jest-compatible API)
- **Code Quality**: Biome handles both linting and formatting (replaces ESLint + Prettier)

### Important Implementation Details

1. **Prefecture Array**: The `prefs` array in `lib/jposta.ts` is ordered by prefecture number (1-47). This is critical for the `prefNum → pref` lookup.

2. **CSV Parsing Logic** (`data/parse.ts`):
   - Removes parenthetical text from area names: `replace(/（.+）/g, "")`
   - Filters out generic areas like "以下に掲載がない場合"
   - Skips duplicate postal codes (keeps first occurrence)
   - Groups data by first 2 digits of postal code

3. **Error Handling**: 
   - Validates postal code format (7 digits or "XXX-XXXX")
   - Returns `null` for non-existent postal codes
   - Throws errors for invalid formats or corrupted data

4. **Build Process**: Vite's `lib` mode creates:
   - Library entry points (ESM/CJS)
   - Separate chunks for each z*.json import (with content hashing)
   - TypeScript declarations via `vite-plugin-dts`

### Testing Strategy

Tests cover:
- Invalid input validation (wrong format, wrong length)
- Non-existent postal codes (returns null)
- Representative postal codes from all 47 prefectures
- Prefecture list verification with `getPrefs()`
