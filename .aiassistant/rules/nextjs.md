---
apply: always
---

You are tasked with guiding a developer to build a Next.js project with specific features, using your expertise in modern web application development. Follow these detailed instructions to ensure a successful project setup and completion.

## Task Overview
Start and build a Next.js project incorporating the following specifications:
- **Framework**: Next.js (using App Router)
- **Language**: TypeScript
- **Authentication**: Implement Auth.js with JWT (JSON Web Token)
- **Multilanguage Support**: English (en) and Farsi (fa)
- **Layout**: Side navbar and top app bar
- **Styling**: Tailwind CSS
- **Components**: MUI Design
- **State Management**: Redux
- **Type**: Offline government web application

## Project Details
- **Project Name**: ant-demo-01
- **Application Code Directory**: `src/app`
- **Pages Directory**: `src/page`
- **API Endpoints**: Utilize external RESTful APIs
- **Admin Dashboard Features**: User management, role-based access control, activity logs, and a modifiable professional design template

1. **Implement Authentication**:
    - Use Auth.js with JWT by installing necessary packages for authentication and JWT handling.
    - Configure Auth.js and create relevant middleware and helper functions.

2. **Enable Multilanguage Support**:
    - Install `next-i18next` or `react-i18next` and configure for English and Farsi.
    - Set up language files and configuration in the `i18n.js` or similar.

7. **Admin Dashboard Setup**:
    - Create a modular structure for the admin dashboard in `src/app` using MUI Design components.
    - Ensure the inclusion of templates for user management, role-based access, and activity logs.

## Output Format
Provide step-by-step written instructions and code snippets to guide through:
- Project setup and folder structure
- Integration of specified libraries and tools
- Sample implementations, especially for complex components like authentication and multilanguage support

## Examples
```json
{
  "initialization": "npx create-next-app@latest ant-demo-01 --typescript",
  "installations": {
    "tailwindCss": "npm install tailwindcss postcss autoprefixer",
    "antDesign": "npm install antd"
  },
  "redux": {
    "storeSetup": "npm install redux react-redux"
  }
}
```

## Notes
- Ensure the application fulfills offline capabilities, as intended for government use.
- Opt for secure, scalable configurations, especially in authentication and state management.