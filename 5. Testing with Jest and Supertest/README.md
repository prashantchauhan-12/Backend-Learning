# 🧪 Testing with Jest & Supertest

A revision guide for testing Express.js REST APIs using Jest and Supertest.

---

## 📦 Tech Stack

| Package | Role |
|---|---|
| `jest` | Test runner & assertion library |
| `supertest` | HTTP request testing for Express apps |
| `express-validator` | Request body validation middleware |

---

## 📁 Project Structure

```
5. Testing with Jest and Supertest/
├── src/
│   ├── app.js                          # Express app (no server.listen here)
│   ├── middlewares/
│   │   └── validation.middleware.js    # express-validator rules
│   └── test/
│       └── _app.test.js                # Jest + Supertest test file
├── server.js                           # Entry point (calls app.listen)
└── package.json
```

> **Key Pattern**: Keep `app.js` and `server.js` separate.  
> Tests import `app.js` directly — no port conflicts, no server needed.

---

## ⚙️ Setup

```bash
npm install
npm test        # run all tests
npm run dev     # start dev server with nodemon
```

---

## 🧠 Core Concepts

### 1. Jest Basics

```js
// describe() groups related tests
describe("GET /", () => {

  // it() or test() defines one test case
  it("should return 200 OK", async () => {

    // expect() makes assertions
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Hello, World!" });
  });
});
```

| Method | Purpose |
|---|---|
| `describe(name, fn)` | Group related tests |
| `it(name, fn)` | Define a single test |
| `expect(value)` | Start an assertion chain |
| `.toBe(val)` | Strict equality (`===`) |
| `.toEqual(val)` | Deep equality (for objects/arrays) |
| `.toBeTruthy()` | Checks value is truthy |
| `.toContain(val)` | Checks array/string contains value |

---

### 2. Supertest

```js
const request = require('supertest');
const app = require('../app'); // import Express app, NOT server.js

// GET request
const res = await request(app).get('/');

// POST request with body
const res = await request(app)
  .post('/register')
  .send({ username: 'john', email: 'john@example.com', password: '123456' });

// Access response
res.statusCode   // HTTP status code
res.body         // parsed JSON body
res.headers      // response headers
```

> ✅ `supertest` starts a temporary server internally — you never call `app.listen()`.

---

### 3. express-validator

```js
const { body, validationResult } = require('express-validator');

// Step 1: Define validation rules as an array of middleware
const registerUserValidationRules = [
  body("username")
    .isString().withMessage("username must be a string")
    .isLength({ min: 3, max: 20 }).withMessage("username must be between 3 and 20 characters"),

  body('email')
    .isEmail().withMessage("email must be a valid email"),

  body('password')
    .isLength({ min: 6 }).withMessage("password must be at least 6 characters"),

  validateResult   // ← always add this last
];

// Step 2: Check results in a middleware
const validateResult = (req, res, next) => {
  const errors = validationResult(req); // ← call express-validator's function
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
```

> ⚠️ **Common bugs to watch out for:**  
> - Calling `validateResult(req)` instead of `validationResult(req)` → infinite recursion  
> - Mismatched variable names (`error` vs `errors`) → `ReferenceError`  
> - Forgetting `express.json()` → `req.body` is `undefined`

---

### 4. Express App Setup (correct pattern)

```js
// app.js
const express = require('express');
const app = express();

app.use(express.json()); // ← REQUIRED to parse req.body

app.post('/register', registerUserValidationRules, (req, res) => {
  const { username, email, password } = req.body;
  res.status(200).json({ message: "User registered successfully" });
});

module.exports = app; // ← export app, don't call listen here
```

```js
// server.js
const app = require('./src/app');
app.listen(3000, () => console.log('Server running on port 3000'));
```

---

## ✅ Bugs Fixed in This Project

| File | Bug | Fix |
|---|---|---|
| `validation.middleware.js` | `validateResult` calling itself recursively | Changed to `validationResult(req)` |
| `validation.middleware.js` | `errors` referenced before declaration | Renamed `error` → `errors` |
| `app.js` | Missing `express.json()` | Added `app.use(express.json())` |

---

## 🧪 Running Tests

```bash
npm test
```

Expected output:
```
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
```

---

## 📝 Quick Reference

```js
// Full test file pattern
const request = require('supertest');
const app = require('../app');

describe("POST /register", () => {
  it("should return 200 with valid data", async () => {
    const res = await request(app)
      .post('/register')
      .send({ username: 'john', email: 'john@test.com', password: '123456' });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User registered successfully");
  });

  it("should return 400 with invalid data", async () => {
    const res = await request(app)
      .post('/register')
      .send({ username: 'jo', email: 'not-an-email', password: '123' });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
  });
});
```
