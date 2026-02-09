import { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  // Setup code here if needed
  console.log('Setting up global test environment...');
}

export default globalSetup;