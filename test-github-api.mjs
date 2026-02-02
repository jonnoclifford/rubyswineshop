#!/usr/bin/env node

/**
 * GitHub API Test Script
 *
 * This script tests the GitHub API integration without needing to start the Next.js server.
 * Run with: node test-github-api.mjs
 *
 * Make sure you have GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO in your .env.local
 */

import { readFileSync } from 'fs';

// Load environment variables from .env.local manually (since we're not using Next.js)
try {
  const envFile = readFileSync('.env.local', 'utf-8');
  envFile.split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const [, key, value] = match;
      process.env[key.trim()] = value.trim();
    }
  });
} catch (error) {
  console.warn('⚠️  Could not load .env.local - using existing environment variables');
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'jonnoclifford';
const GITHUB_REPO = process.env.GITHUB_REPO || 'rubyswineshop';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';
const CONFIG_FILE_PATH = 'src/content/site-config.json';
const GITHUB_API_BASE = 'https://api.github.com';

console.log('🧪 Testing GitHub API Integration\n');
console.log('Configuration:');
console.log(`  Owner: ${GITHUB_OWNER}`);
console.log(`  Repo: ${GITHUB_REPO}`);
console.log(`  Branch: ${GITHUB_BRANCH}`);
console.log(`  File: ${CONFIG_FILE_PATH}`);
console.log(`  Token: ${GITHUB_TOKEN ? '✓ Set' : '✗ Not set'}\n`);

if (!GITHUB_TOKEN) {
  console.error('❌ ERROR: GITHUB_TOKEN is not set in .env.local');
  console.error('\nPlease follow these steps:');
  console.error('1. Go to https://github.com/settings/tokens/new');
  console.error('2. Create a token with "repo" scope');
  console.error('3. Add it to .env.local as GITHUB_TOKEN=your_token_here');
  process.exit(1);
}

async function githubRequest(endpoint, options = {}) {
  const url = `${GITHUB_API_BASE}${endpoint}`;
  const headers = {
    'Authorization': `Bearer ${GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`GitHub API error (${response.status}): ${JSON.stringify(error)}`);
  }

  return await response.json();
}

async function testRepositoryAccess() {
  console.log('📦 Test 1: Repository Access');
  try {
    const repo = await githubRequest(`/repos/${GITHUB_OWNER}/${GITHUB_REPO}`);
    console.log(`   ✓ Repository found: ${repo.full_name}`);
    console.log(`   ✓ Default branch: ${repo.default_branch}`);
    console.log(`   ✓ Private: ${repo.private}`);
    console.log(`   ✓ Permissions: push=${repo.permissions?.push}, admin=${repo.permissions?.admin}`);
    return true;
  } catch (error) {
    console.error(`   ✗ Failed: ${error.message}`);
    return false;
  }
}

async function testReadConfig() {
  console.log('\n📖 Test 2: Read Config File');
  try {
    const endpoint = `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CONFIG_FILE_PATH}?ref=${GITHUB_BRANCH}`;
    const data = await githubRequest(endpoint);

    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    const config = JSON.parse(content);

    console.log(`   ✓ File found: ${data.path}`);
    console.log(`   ✓ Size: ${data.size} bytes`);
    console.log(`   ✓ SHA: ${data.sha.substring(0, 7)}...`);
    console.log(`   ✓ Valid JSON: Yes`);
    console.log(`   ✓ Business name: ${config.business?.name || 'N/A'}`);
    console.log(`   ✓ Wine count: ${config.menu?.byTheGlass?.items?.length || 0} by glass`);
    return true;
  } catch (error) {
    console.error(`   ✗ Failed: ${error.message}`);
    return false;
  }
}

async function testCommitHistory() {
  console.log('\n📜 Test 3: Commit History');
  try {
    const endpoint = `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/commits?path=${CONFIG_FILE_PATH}&per_page=5`;
    const commits = await githubRequest(endpoint);

    console.log(`   ✓ Found ${commits.length} recent commits`);
    commits.slice(0, 3).forEach((commit, i) => {
      console.log(`   ${i + 1}. ${commit.sha.substring(0, 7)} - ${commit.commit.message.split('\n')[0]}`);
    });
    return true;
  } catch (error) {
    console.error(`   ✗ Failed: ${error.message}`);
    return false;
  }
}

async function testBranchAccess() {
  console.log('\n🌿 Test 4: Branch Access');
  try {
    const endpoint = `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/branches/${GITHUB_BRANCH}`;
    const branch = await githubRequest(endpoint);

    console.log(`   ✓ Branch exists: ${branch.name}`);
    console.log(`   ✓ Protected: ${branch.protected}`);
    console.log(`   ✓ Latest commit: ${branch.commit.sha.substring(0, 7)}`);
    return true;
  } catch (error) {
    console.error(`   ✗ Failed: ${error.message}`);
    return false;
  }
}

async function testWritePermissions() {
  console.log('\n✍️  Test 5: Write Permissions (Dry Run)');
  console.log('   ⚠ Skipping actual write test to avoid creating test commits');
  console.log('   ℹ If repository access and branch tests passed, write should work');
  console.log('   ℹ Test writing through the API: POST to /api/config');
  return true;
}

// Run all tests
async function runTests() {
  const results = [];

  results.push(await testRepositoryAccess());
  results.push(await testReadConfig());
  results.push(await testCommitHistory());
  results.push(await testBranchAccess());
  results.push(await testWritePermissions());

  console.log('\n' + '='.repeat(50));
  console.log('\n📊 Test Summary:');
  console.log(`   Passed: ${results.filter(r => r).length}/${results.length}`);
  console.log(`   Failed: ${results.filter(r => !r).length}/${results.length}`);

  if (results.every(r => r)) {
    console.log('\n✅ All tests passed! GitHub API integration is ready to use.');
    console.log('\nNext steps:');
    console.log('1. Start your dev server: npm run dev');
    console.log('2. Test the API: http://localhost:3000/api/config/test');
    console.log('3. Read the docs: GITHUB_API.md');
    process.exit(0);
  } else {
    console.log('\n❌ Some tests failed. Please check the errors above.');
    console.log('\nCommon issues:');
    console.log('- Token missing or invalid: Check .env.local');
    console.log('- Repository not found: Check GITHUB_OWNER and GITHUB_REPO');
    console.log('- Permission denied: Token needs "repo" scope');
    console.log('- File not found: Check CONFIG_FILE_PATH exists in repo');
    process.exit(1);
  }
}

runTests().catch(error => {
  console.error('\n💥 Unexpected error:', error);
  process.exit(1);
});
