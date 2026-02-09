# Playwright Tests

This project includes Playwright tests for all pages in the portfolio website.

## Running Tests

### Run all tests
```bash
npm run test
```

### Run tests in UI mode (recommended for development)
```bash
npm run test:ui
```

### Run tests with report
```bash
npm run test:report
```

### Run specific test file
```bash
npx playwright test tests/home-page.spec.ts
```

### Run tests in headed mode (browser visible)
```bash
npx playwright test --headed
```

## Available Test Files

- `tests/home-page.spec.ts` - Tests for the home page
- `tests/about-page.spec.ts` - Tests for the about page
- `tests/projects-page.spec.ts` - Tests for the projects page
- `tests/blog-page.spec.ts` - Tests for the blog page
- `tests/experience-page.spec.ts` - Tests for the experience page
- `tests/education-page.spec.ts` - Tests for the education page
- `tests/contact-page.spec.ts` - Tests for the contact page

## Test Structure

Each test file follows this structure:
1. Navigation to the specific page
2. Title verification
3. Content verification
4. Navigation tests between pages
5. Component interaction tests (if applicable)

Tests are organized by page and use Playwright's best practices for reliable testing.