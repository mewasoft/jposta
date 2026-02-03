# Tech Context: jpostal

## Technology Stack

### Core
- **Language**: TypeScript 5.4+
- **Module System**: ES Modules (with CJS compatibility)
- **Node Version**: See `.node-version` file

### Build Tools
- **Vite 5.2**: Library bundler
- **vite-plugin-dts**: Generate `.d.ts` files
- **tsc**: TypeScript compilation

### Development Tools
- **Biome 1.8**: Linting and formatting (replaces ESLint/Prettier)
- **Vitest 1.6**: Testing framework
- **tsx 4.15**: TypeScript execution for scripts

### Data Processing
- **csv-parse 5.5**: Parse Japan Post CSV data

## Package Configuration

### Entry Points
```json
{
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  }
}
```

### Scripts
| Command | Description |
|---------|-------------|
| `npm run build` | Build library (tsc + vite) |
| `npm run test` | Run tests with Vitest |
| `npm run update-csv` | Download latest CSV from Japan Post |
| `npm run parse-csv` | Convert CSV to JSON chunks |

## Exported Types
```typescript
export type Address = { pref, prefNum, cityCode, city, area? }
export type Pref = { key, name }
export type City = { key, name }
```

## Technical Constraints

1. **No Dependencies**: Zero runtime dependencies by design
2. **Bundle Size**: Data files (~100 JSON chunks) must be hosted
3. **Dynamic Import**: Browser usage requires proper bundler config
4. **Data Freshness**: Manual update needed for postal code changes

## Development Setup

```bash
npm install        # Install dependencies
npm run build      # Build library
npm run test       # Run tests
npm run update-csv # Download latest CSV
npm run parse-csv  # Convert CSV to JSON
```

## CI/CD (GitHub Actions)
- `pr-test.yml`: Run tests on pull requests
- `npm-publish.yml`: Publish to npm on release
- `update-data.yml`: Automated data updates
