# Project Brief: jpostal

## Overview
**jpostal** is a modern JavaScript/TypeScript library for converting Japanese postal codes to addresses. It's a fork of the original [jposta](https://github.com/nickichi/jposta) with additional functionality.

## Core Purpose
Provide a self-hosted, dependency-free solution for Japanese postal code lookup that:
- Works without external API calls
- Supports both browser (dynamic import) and Node.js environments
- Returns structured address data (prefecture, city code, city, area)

## Key Features
- ES6/Promise-based API with TypeScript support
- No external dependencies
- Self-hosted data files (100 JSON chunks)
- Dynamic import for browser optimization
- ESM and CJS compatibility

### API Functions
- `getAddress(zipCode)` - Convert postal code to address (with cityCode)
- `getPrefs()` - Get list of all 47 prefectures as `{key, name}` objects
- `getCitiesByPref(prefIndex)` - Get cities for a prefecture with city codes
- `configureJposta(config)` - Configure custom data host

## Target Users
- Japanese web applications needing postal code lookup
- Developers who want self-hosted solutions (no external API dependency)
- React, Next.js, Vite, and Node.js projects

## Package Info
- **Name**: jpostal (npm)
- **Version**: 0.3.17
- **License**: MIT
- **Repository**: https://github.com/xtieume/jposta
- **Original**: https://github.com/nickichi/jposta
