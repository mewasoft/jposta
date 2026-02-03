# System Patterns: jpostal

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                       jpostal Library                            │
├─────────────────────────────────────────────────────────────────┤
│ getAddress │ getPrefs │ getCitiesByPref │ configureJposta       │
├─────────────────────────────────────────────────────────────────┤
│                    fetchJson(chunk)                              │
│              (dynamic import based on prefix)                    │
├─────────────────────────────────────────────────────────────────┤
│       z00.json │ z01.json │ ... │ z99.json (100 files)          │
└─────────────────────────────────────────────────────────────────┘
```

## Data Chunking Strategy
- Postal codes grouped by first 2 digits (00-99)
- Each chunk is a separate JSON file: `z{prefix}.json`
- Only required chunks are loaded on demand
- Format: `{ "zipcode": [prefNum, cityCode, city, area] }`

## Key Design Patterns

### 1. Dynamic Import Pattern
```typescript
const fetchJson = async (chunk: string) => {
  if (currentConfig.host !== "") {
    return await import(`${currentConfig.host}/z${chunk}.json`);
  }
  return await import(`./zips/z${chunk}.json`);
};
```

### 2. Input Normalization
- Accepts 7-digit (`1000001`) or hyphenated (`100-0001`) format
- Strips hyphen for internal lookup
- Validates format before processing

### 3. Prefecture Mapping
- Static array of 47 prefectures
- Prefecture number (1-47) stored in data
- `getPrefs()` returns `{key, name}` objects with zero-padded keys

### 4. City Aggregation Pattern
- `getCitiesByPref()` scans all 100 chunks
- Uses Map to deduplicate cities by cityCode
- Returns sorted array of `{key, name}` objects

## File Structure
```
lib/
├── index.ts      # Re-exports from jposta.ts
├── jposta.ts     # Main library code (types + functions)
└── zips/         # 100 JSON data files (z00-z99)

data/
├── utf_ken_all.csv  # Source CSV from Japan Post
├── parse.ts         # CSV to JSON converter
└── update.sh        # Download latest CSV

dist/              # Built output (ESM + CJS)
```

## Build System
- **Vite**: Library build with ESM and CJS output
- **vite-plugin-dts**: TypeScript declaration generation
- **Biome**: Linting and formatting
- **Vitest**: Unit testing
