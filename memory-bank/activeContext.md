# Active Context: jpostal

## Current State
The project is **stable and published** on npm as `jpostal` v0.3.17.

## Recent Changes (Latest First)
1. **getPrefs() Enhanced**: Now returns `Pref[]` with `{key, name}` objects instead of `string[]`
2. **getCitiesByPref() Added**: New function to get cities by prefecture index (1-47)
3. **Address Type Enhanced**: Added `cityCode` field for precise city identification
4. **New Types**: Added `City` and `Pref` type definitions
5. **Data Format Updated**: JSON now stores `[prefNum, cityCode, city, area]`

## Current Focus
Memory Bank updated to reflect latest codebase state.

## Active Decisions
- City codes use 3-digit format (e.g., 101, 102)
- `getPrefs()` returns zero-padded keys ("01"-"47")
- `getCitiesByPref()` accepts both number and string input

## Open Questions
- Configuration feature marked as "WIP" in README

## Branch Info
- Current branch: `bolides`
- Tracking: `mewsoft/bolides`

## Next Steps
Awaiting user direction for new features or improvements.

## Notes
- All 47 prefecture tests passing
- Comprehensive test coverage for various postal codes
- Data includes cityCode for all entries
