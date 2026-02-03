# Product Context: jpostal

## Problem Statement
Japanese web applications often need to auto-fill addresses from postal codes. Existing solutions typically:
- Require external API calls (latency, availability concerns)
- Need backend infrastructure
- Have dependencies that complicate projects

## Solution
jpostal provides a **self-hosted** postal code lookup that:
- Bundles data as JSON files
- Uses dynamic imports for efficient loading
- Works entirely client-side or server-side
- Has zero runtime dependencies

## User Experience Goals

### Developer Experience
1. **Simple API**: Just `await getAddress('1000001')` returns address object
2. **Flexible input**: Accepts `1000001` or `100-0001` format
3. **Type safety**: Full TypeScript definitions with `Address`, `City`, `Pref` types
4. **Framework agnostic**: Works with React, Vue, Next.js, vanilla JS
5. **City lookup**: Get all cities for any prefecture with `getCitiesByPref()`

### End User Experience
- Instant address lookup (no network latency after initial load)
- Reliable (no external service dependencies)
- Offline-capable once data is cached

## Data Source
- Official Japan Post postal code data
- CSV from: https://www.post.japanpost.jp/zipcode/download.html
- Updated via `npm run update-csv` and `npm run parse-csv`

## Type Definitions

```typescript
type Address = {
  pref: string;      // Prefecture name (e.g., "東京都")
  prefNum: number;   // Prefecture number (1-47)
  cityCode: number;  // City code (e.g., 101)
  city: string;      // City name (e.g., "千代田区")
  area?: string;     // Area/district (e.g., "千代田")
};

type Pref = {
  key: string;       // Zero-padded code ("01"-"47")
  name: string;      // Prefecture name
};

type City = {
  key: string;       // City code as string
  name: string;      // City name
};
```

## Supported Frameworks (with samples)
- Vite + React
- Next.js (webpack)
- Node.js + Express
