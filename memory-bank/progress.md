# Progress: jpostal

## What Works ✅

### Core Features
- [x] `getAddress(zipCode)` - Postal code to address lookup (with cityCode)
- [x] `getPrefs()` - Get all 47 prefectures as `{key, name}` objects
- [x] `getCitiesByPref(prefIndex)` - Get cities for any prefecture
- [x] `configureJposta()` - Configure custom host for data files
- [x] Hyphenated and non-hyphenated zip code formats
- [x] ESM and CJS module support
- [x] TypeScript type definitions (`Address`, `Pref`, `City`)

### Data Pipeline
- [x] CSV download from Japan Post (`update-csv`)
- [x] CSV to JSON parsing with cityCode (`parse-csv`)
- [x] 100 chunked JSON files (z00-z99)

### Build & Test
- [x] Vite library build
- [x] TypeScript compilation
- [x] Vitest test suite (comprehensive coverage)
- [x] Biome linting/formatting

### CI/CD
- [x] PR testing workflow
- [x] npm publish workflow
- [x] Data update workflow

## What's Left to Build 🚧

### Documentation
- [ ] Configuration documentation (marked WIP in README)
- [ ] API reference documentation

### Potential Enhancements
- [ ] Reverse lookup (address to postal code)
- [ ] Partial/fuzzy matching
- [ ] Caching strategy documentation
- [ ] Performance benchmarks
- [ ] Tests for `getCitiesByPref()` function

## Known Issues ⚠️
- None currently tracked

## Recent Commits
| Commit | Description |
|--------|-------------|
| 968c822 | Update getPrefs() |
| c77c6af | Update README with getCitiesByPref docs |
| 581402b | getCitiesByPref returns {key, name} objects |
| 96ac83b | Add getCitiesByPref function |
| ffa0463 | Updates version to 0.3.17 |

## Test Status
All tests passing:
- Error handling for invalid inputs
- Null return for non-existent postal codes
- Correct address lookup for all 47 prefectures
- Prefecture list validation
