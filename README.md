# jpostal
[![npm version](https://badge.fury.io/js/jpostal.svg)](https://badge.fury.io/js/jpostal)
[![npm downloads](https://img.shields.io/npm/dm/jpostal.svg)](https://www.npmjs.com/package/jpostal)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

This package is a fork of [jposta](https://github.com/nickichi/jposta) with additional functionality. The main differences are:
- Addition of the `getPrefs()` function to get a list of Japanese prefectures
- Addition of the `getCitiesByPref()` function to get cities by prefecture index with city codes
- Enhanced `Address` type with `cityCode` field for more precise city identification

Modern library for Japanese postal code to address.
日本語の補足は最下部にあります。



## Features
⚡ Simple usage with compatibility for modern frameworks <br />
⚡ ES6 / Promise based / Typescript ready <br />
⚡ No dependencies <br />
⚡ Self-hosted & dynamic import (no implicit API calls) <br />
⚡ 🆕 Get cities by prefecture with city codes <br />
⚡ 🆕 Enhanced address data with city codes <br />
⚡ Complete coverage of all 47 prefectures <br />
⚡ 100+ data chunks for efficient loading

## Installation
```bash
$ npm install jpostal
```

## Usage
```javascript
import { getAddress, getPrefs, getCitiesByPref } from 'jpostal';

// pass zip code as string
const address = await getAddress('1000001');
console.log(address);
// { pref: "東京都", prefNum: 13, cityCode: 101, city: "千代田区", area: "千代田" }

// also you can pass zip code with hyphen
const address2 = await getAddress('100-0003');
console.log(address2);
// { pref: "東京都", prefNum: 13, cityCode: 101, city: "千代田区", area: "皇居外苑" }

// get list of prefectures
const prefs = getPrefs();
console.log(prefs);
// ["北海道", "青森県", "岩手県", ...]

// get cities by prefecture (NEW!)
const tokyoCities = await getCitiesByPref(13); // 13 = Tokyo
console.log(tokyoCities);
// [
//   { key: 101, name: "千代田区" },
//   { key: 102, name: "中央区" },
//   { key: 103, name: "港区" },
//   { key: 104, name: "新宿区" },
//   { key: 105, name: "文京区" },
//   ...
// ]

// get cities by prefecture index (1-47)
const hokkaidoCities = await getCitiesByPref(1); // 1 = Hokkaido
console.log(hokkaidoCities);
// [
//   { key: 101, name: "札幌市中央区" },
//   { key: 102, name: "札幌市北区" },
//   { key: 103, name: "札幌市東区" },
//   ...
// ]
```

### 🆕 getCitiesByPref Function

The `getCitiesByPref(prefIndex)` function returns an array of cities for a given prefecture:

```javascript
const cities = await getCitiesByPref(prefIndex);
```

**Parameters:**
- `prefIndex` (number): Prefecture index (1-47, where 1=北海道, 13=東京都, 27=大阪府, etc.)

**Returns:**
- `Promise<City[]>`: Array of city objects with `key` and `name` properties

**City Object Structure:**
```typescript
interface City {
  key: number;    // 3-digit city code (101-999)
  name: string;   // City name in Japanese
}
```

**Example Usage:**
```javascript
// Get all cities in Tokyo
const tokyoCities = await getCitiesByPref(13);
console.log(`Tokyo has ${tokyoCities.length} cities`);

// Find specific city by code
const chiyodaWard = tokyoCities.find(city => city.key === 101);
console.log(chiyodaWard.name); // "千代田区"

// Cities are sorted by city code
const sortedCities = await getCitiesByPref(13);
console.log(sortedCities[0]); // { key: 101, name: "千代田区" }
console.log(sortedCities[1]); // { key: 102, name: "中央区" }
```

### Enhanced Address Type

The `Address` type now includes the `cityCode` field:

```typescript
interface Address {
  pref: string;      // Prefecture name (e.g., "東京都")
  prefNum: number;   // Prefecture number (1-47)
  cityCode: number;  // 🆕 3-digit city code (101-999)
  city: string;      // City name (e.g., "千代田区")
  area?: string;     // Area/neighborhood (optional)
}
```

**City Code Examples:**
- Tokyo (13): 101=千代田区, 102=中央区, 103=港区, 104=新宿区
- Osaka (27): 102=大阪市都島区, 103=大阪市福島区, 104=大阪市此花区
- Hokkaido (1): 101=札幌市中央区, 102=札幌市北区, 103=札幌市東区

### Error Handling

```javascript
// getCitiesByPref throws errors for invalid prefecture indices
try {
  await getCitiesByPref(0); // Invalid (must be 1-47)
} catch (error) {
  console.error(error.message); // "Prefecture index must be an integer between 1 and 47: 0"
}

// getAddress throws errors for invalid postal code formats
try {
  await getAddress('invalid'); // Invalid format
} catch (error) {
  console.error(error.message); // "Zip code must be 7 or 8 characters: invalid"
}

// getAddress returns null for non-existent postal codes
const address = await getAddress('9999999');
console.log(address); // null
```

### Complete Type Definitions

```typescript
// Enhanced Address type with cityCode
interface Address {
  pref: string;      // Prefecture name (e.g., "東京都")
  prefNum: number;   // Prefecture number (1-47)
  cityCode: number;  // 3-digit city code (101-999)
  city: string;      // City name (e.g., "千代田区")
  area?: string;     // Area/neighborhood (optional)
}

// City object for getCitiesByPref
interface City {
  key: number;    // 3-digit city code (101-999)
  name: string;   // City name in Japanese
}

// Configuration options (if needed)
interface JpostaConfig {
  host: string;   // Custom host for JSON data files
}
```

## Dynamic Import (Browser)
jposta needs to host the data file on your project.

```bash
# Your project build
$ npm run build

> vite-react-jposta@0.0.0 build
> tsc && vite build

vite v5.2.13 building for production...
✓ 136 modules transformed.
dist/index.html                         0.46 kB │ gzip:  0.30 kB
dist/assets/react-CHdo91hT.svg          4.13 kB │ gzip:  2.05 kB
dist/assets/index-DiwrgTda.css          1.39 kB │ gzip:  0.72 kB
dist/assets/z11-nic1O4vt-B_L_y_VH.js    2.29 kB │ gzip:  0.95 kB
dist/assets/z96-Br2qdTMP-DG7Gpu3V.js   80.14 kB │ gzip: 27.45 kB
...(many files)
dist/assets/z50-BWUSdQBW-BJcxw7Xg.js   87.66 kB │ gzip: 29.14 kB
dist/assets/z60-34YubQWJ-DwuyaedM.js  101.50 kB │ gzip: 29.97 kB
dist/assets/index-D0vWSNxA.js         152.48 kB │ gzip: 49.62 kB
✓ built in 2.16s
```

...and then you can import the data file dynamically.

```javascript
const result1 = await getAddress('1000001');
// then import the data file named like z10.js
const result2 = await getAddress('2100002');
// then import the data file named like z21.js
const result3 = await getAddress('1000003');
// then return data without additional import
```

## Compatibility
ESM & CJS compatible.
ESM is recommended.

## Configuration
WIP

## Data Update
To update the postal code data from Japan Post:

1. Update the CSV file:
```bash
npm run update-csv
```
This script will download the latest CSV file from Japan Post.

2. Parse the CSV data into JSON files:
```bash
npm run parse-csv
```
This script will:
- Create the `zips` directory if it doesn't exist
- Remove old files in the `zips` directory
- Parse the CSV file into JSON files
- Copy the generated JSON files to the `lib/zips` directory

The generated JSON files will have the following format:
- `z10.json`, `z11.json`, etc. (corresponding to the first two digits of the postal code)
- Each JSON file contains address data corresponding to the postal codes

## Samples
- Vite + React + jposta ([source code](https://github.com/nickichi/vite-react-jposta)):
https://nickichi.github.io/vite-react-jposta/
- Next.js(webpack) + jposta ([source code](https://github.com/nickichi/nextjs-jposta)): https://nickichi.github.io/nextjs-jposta/
- Node.js + Express + jposta: https://github.com/nickichi/node-express-jposta

## License
see [LICENSE](./LICENSE)

---

## 補足
- 郵便番号と住所は、[日本郵便株式会社の郵便番号データ](https://www.post.japanpost.jp/zipcode/download.html)を利用しています
- このライブラリは self-hosted な郵便番号検索を提供するために作成されました。外部APIを使用せず、バックエンドも不要です。ただし、ホストするアセットが100増えます。
- クライアントサイドでのDynamic Importを利用したくない場合は、サーバサイド（Node.js）に導入することで、簡単に郵便番号APIを構築できます(Samples参照)。