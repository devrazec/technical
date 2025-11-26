# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This repository contains two independent technical exercises demonstrating different programming challenges:

- **exercise-1**: Flask-based log file traffic analyzer (Python)
- **exercise-2**: Array-based multiplication calculator using only addition (Next.js/React)

Each exercise is self-contained with its own dependencies, tests, and development workflow.

## Exercise #1: Log File Traffic Analyzer

**Technology**: Python 3.x, Flask, pytest

### Architecture

- **src/app.py**: Main Flask application with three core functions:
  - `table_log()`: Parses semicolon-separated log file, converts timestamps, maps HTTP status codes, returns all entries
  - `report_log()`: Filters for STATUS="OK" only, aggregates by IP, calculates percentages, returns sorted results
  - Flask routes: `/` (web UI), `/api/report` (aggregated data), `/api/table` (raw data), `/api/csv_report`, `/api/json_report` (downloads)

- **src/generate_log.py**: Utility to generate sample log files for testing

- **Log file location**: `exercise-1/src/logfiles/requests.log`
  - Format: `TIMESTAMP;BYTES;STATUS;REMOTE_ADDR` (semicolon-separated)
  - First line is header (skipped during parsing)

- **Reports folder**: `exercise-1/src/reports/` - Auto-generated CSV/JSON reports saved here

- **Templates**: `exercise-1/src/templates/` - Flask HTML templates
- **Static assets**: `exercise-1/src/static/` - CSS, images

### Development Workflow

```bash
# Initial setup
cd exercise-1
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt

# For existing projects
source venv/bin/activate
pip3 install -r requirements.txt

# Run application (http://127.0.0.1:5000/)
python3 src/app.py

# Generate sample log file
python3 src/generate_log.py

# Testing
python3 -m pytest -v                    # All tests
python3 -m pytest tests/test_app.py -v  # Specific test file

# Code quality
black .                                 # Auto-format
flake8 src/app.py                       # Lint specific file
```

### Testing Notes

- Tests use `pytest` with `tmp_path` fixtures and `unittest.mock.patch`
- Mock log files created in temp directories to avoid affecting real data
- Test files: `tests/test_app.py` (core functions), `tests/test_endpoint.py` (Flask routes)

## Exercise #2: Array-Based Multiplication

**Technology**: Next.js 15, React 19, Tailwind CSS 4, Jest

### Architecture

- **src/context/GlobalContext.js**: Global state management (not Redux/Zustand, custom React Context)
  - Three arrays (6 positions each): `array1`, `array2`, `array3`
  - Three input fields: `input1`, `input2`, `input3`
  - All state lifted to context for cross-component access

- **src/utils/tests.js**: Core utility functions (pure functions, no side effects)
  - `multiplyBigInt(a, b)`: Multiplies using recursive addition only (no `*` operator), handles BigInt for large numbers (e.g., 100!)
  - `addToArrays()`: Validates inputs, adds to first empty slot, auto-sorts
  - `sortNumbers(arr)`: Sorts filled values, keeps empties at end
  - `intValidation()`: Ensures input contains only digits [0-9]
  - `cleanAll()`: Resets all arrays and inputs to initial state

- **Component structure**:
  - `src/app/page.js`: Main page composition (Header + Content + Footer)
  - `src/components/Header.js`: Title/description
  - `src/components/Content.js`: Main UI with input fields and array display
  - `src/components/Footer.js`: Footer information

### Key Constraints

- **Input validation**: Only integers [0-9], no decimals, negatives, or symbols
- **Array behavior**:
  - Fixed 6 positions
  - New numbers fill first empty slot
  - Numbers auto-sort ascending, empties stay at end
  - Scientific notation appears in UI for 15-16+ digit numbers
- **Multiplication**: Uses only addition (`+`), capable of calculating 100!

### Development Workflow

```bash
cd exercise-2

# Install dependencies
npm install

# Development
npm run dev                              # Start dev server (http://localhost:3000)
npm run build                            # Production build
npm run start                            # Run from .next/ build folder

# Code quality
npm run lint                             # ESLint (Next.js rules)
npm run format                           # Prettier formatting

# Testing
npm run test                             # All tests
npm run test -- __tests__/content.test.js  # Component tests only
npm run test -- __tests__/utils.test.js    # Utility function tests only
```

### Testing Notes

- Uses Jest with `@testing-library/react` and `@testing-library/jest-dom`
- Configured with `@swc/jest` for fast transpilation (no Babel used at runtime)
- `__tests__/utils.test.js`: Pure function tests (multiplication, validation, sorting)
- `__tests__/content.test.js`: Component rendering, user interactions, state updates
- `jest.setup.js`: Configures test environment

## Project Structure Pattern

Both exercises follow a similar organizational pattern:
- Source code in `src/` or `exercise-N/src/`
- Tests in separate `tests/` or `__tests__/` directories
- Configuration files at project root
- No shared dependencies between exercises

## Important Technical Details

### Exercise #1 Specifics
- STATUS filtering: Only "OK" (HTTP 200) entries included in CSV/JSON reports
- HTTP codes mapped via `STATUS_MAP` dictionary in app.py
- Percentage calculations: Both request count and bytes percentages included
- Sorting: Reports sorted by request count DESC

### Exercise #2 Specifics
- Client-side only (no API routes)
- Uses `'use client'` directive for context provider
- BigInt multiplication algorithm: Recursive addition with bitwise optimization (`q % 2n` check)
- Result truncation: Output limited to 100 characters if longer
- Arrays always maintain exactly 6 positions (filled values + empty strings)
