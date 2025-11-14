#!/usr/bin/env node
/**
 * Quick test script to verify the API is working
 * 
 * Usage:
 *   node test-api.js
 * 
 * Tests:
 * 1. Server health check
 * 2. Login with test credentials
 */

const https = require('https');
const http = require('http');

const API_URL = process.env.API_URL || 'http://localhost:3001';
const TEST_EMAIL = 'eleveun@ecoleplus.ci';
const TEST_PASSWORD = process.env.TEST_PASSWORD || 'testpassword123';

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;
    
    const req = client.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: JSON.parse(data)
          });
        } catch {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: data
          });
        }
      });
    });
    
    req.on('error', reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

async function testHealth() {
  console.log('\n🔍 Test 1: Server Health Check');
  console.log(`   URL: ${API_URL}/`);
  
  try {
    const response = await makeRequest(`${API_URL}/`);
    console.log(`   ✅ Status: ${response.status}`);
    console.log(`   📦 Response:`, response.body);
    return true;
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    return false;
  }
}

async function testLogin() {
  console.log('\n🔍 Test 2: Login Endpoint');
  console.log(`   URL: ${API_URL}/auth/login`);
  console.log(`   Email: ${TEST_EMAIL}`);
  
  const payload = JSON.stringify({
    email: TEST_EMAIL,
    password: TEST_PASSWORD
  });
  
  try {
    const response = await makeRequest(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: payload
    });
    
    console.log(`   📊 Status: ${response.status}`);
    
    if (response.status === 200) {
      console.log(`   ✅ Login successful!`);
      console.log(`   👤 User:`, response.body.user?.email || 'N/A');
      console.log(`   🔑 Token:`, response.body.accessToken ? 'Present' : 'Missing');
      return true;
    } else if (response.status === 401) {
      console.log(`   ⚠️  Status: 401 Unauthorized`);
      console.log(`   💡 Hint: Check if user exists and password is correct`);
      console.log(`   📦 Response:`, response.body);
      return false;
    } else {
      console.log(`   ❌ Unexpected status: ${response.status}`);
      console.log(`   📦 Response:`, response.body);
      return false;
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    console.log(`   💡 Hint: Check if server is running and URL is correct`);
    return false;
  }
}

async function runTests() {
  console.log('\n╔════════════════════════════════════════════╗');
  console.log('║   École Plus API - Quick Test Script    ║');
  console.log('╚════════════════════════════════════════════╝');
  console.log(`\n📍 Target API: ${API_URL}`);
  
  const healthOk = await testHealth();
  const loginOk = await testLogin();
  
  console.log('\n╔════════════════════════════════════════════╗');
  console.log('║              Test Summary                 ║');
  console.log('╚════════════════════════════════════════════╝');
  console.log(`   Health Check: ${healthOk ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   Login Test:   ${loginOk ? '✅ PASS' : '❌ FAIL'}`);
  console.log('');
  
  process.exit(healthOk && loginOk ? 0 : 1);
}

runTests();
