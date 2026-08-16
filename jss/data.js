const COURSE = {
  "title": "CodeVent Node.js",
  "tagline": "Node.js from the runtime fundamentals to a complete REST API, built with Express and MongoDB.",
  "modules": [
    {
      "id": "m1",
      "title": "Node.js Foundations",
      "short": "Foundations",
      "description": "The Node.js runtime, modules, npm, and how Node differs from browser JavaScript.",
      "lessons": [
        {
          "id": "m1-l1",
          "title": "What Node.js Is",
          "concept": "Node.js is a runtime that executes JavaScript outside a browser, built on Chrome's V8 engine. It lets JavaScript run on a server, a command line, or any machine with Node installed.",
          "why": "Browsers restrict JavaScript from touching the file system, network ports, or the operating system directly. Node removes those restrictions, which is what makes server-side JavaScript possible.",
          "how": "A Node script is a plain .js file executed with the node command. There is no HTML page and no browser window involved.",
          "example": "A one-line script that prints text to the terminal instead of a webpage.",
          "code": {
            "javascript": "console.log(\"Node.js is running this file.\");"
          },
          "runNote": "Save this as hello.js and run it with: node hello.js. This does not run in a browser.",
          "practice": {
            "task": "Write a script that logs the current Node.js version using process.version.",
            "hint": "process is a global object available in Node, not in browsers.",
            "solution": "console.log(process.version);"
          },
          "miniTask": "Create a file called hello.js, run it with node hello.js, and confirm the output appears in your terminal."
        },
        {
          "id": "m1-l2",
          "title": "Modules and require",
          "concept": "Node splits code into modules, separate files that export functionality for other files to use. The CommonJS system uses require() to import and module.exports to export.",
          "why": "Splitting code into modules keeps files focused and reusable instead of one large script.",
          "how": "A file exports values by assigning to module.exports. Another file imports them with require(\"./path\").",
          "example": "A math module exporting one function, used from a separate file.",
          "code": {
            "javascript": "// math.js\nfunction add(a, b) {\n  return a + b;\n}\nmodule.exports = { add };\n\n// index.js\nconst math = require(\"./math\");\nconsole.log(math.add(2, 3));"
          },
          "runNote": "Save both files in the same folder and run: node index.js",
          "practice": {
            "task": "Create a module that exports a function subtract(a, b), then import and use it from another file.",
            "hint": "Export it the same way as add: module.exports = { subtract }.",
            "solution": "// subtract.js\nfunction subtract(a, b) {\n  return a - b;\n}\nmodule.exports = { subtract };"
          },
          "miniTask": "Split one existing script of yours into two files using require and module.exports."
        },
        {
          "id": "m1-l3",
          "title": "npm and package.json",
          "concept": "npm (Node Package Manager) installs third-party packages and manages project metadata through package.json, which lists dependencies, scripts, and project details.",
          "why": "Almost no real Node project is built entirely from scratch. npm gives access to a large ecosystem of reusable packages.",
          "how": "npm init creates a package.json. npm install <package> downloads a package into node_modules and records it as a dependency.",
          "example": "Initializing a project and installing a package.",
          "code": {
            "bash": "npm init -y\nnpm install express"
          },
          "runNote": "Run these commands in your project folder's terminal, not inside a .js file.",
          "practice": {
            "task": "Explain the difference between dependencies and devDependencies in package.json.",
            "hint": "One is needed to run the app; the other is only needed while developing it.",
            "solution": "dependencies are packages required for the application to run in production. devDependencies are packages only needed during development, such as testing tools, and are not required at runtime."
          },
          "miniTask": "Run npm init -y in an empty folder and open the generated package.json to see its structure."
        },
        {
          "id": "m1-l4",
          "title": "Running Scripts and Command Line Arguments",
          "concept": "Node scripts can read arguments passed on the command line through process.argv, an array containing the node executable path, the script path, and any following arguments.",
          "why": "Command line tools need to accept input without a graphical interface, and process.argv is how a Node script receives that input.",
          "how": "process.argv[0] is the node path, process.argv[1] is the script path, and process.argv[2] onward are the actual arguments passed.",
          "example": "A script that greets a name passed on the command line.",
          "code": {
            "javascript": "const name = process.argv[2];\nconsole.log(`Hello, ${name}`);"
          },
          "runNote": "Run with: node greet.js Jane",
          "practice": {
            "task": "Write a script that adds two numbers passed as command line arguments.",
            "hint": "process.argv values are strings, so convert them with Number() before adding.",
            "solution": "const a = Number(process.argv[2]);\nconst b = Number(process.argv[3]);\nconsole.log(a + b);"
          },
          "miniTask": "Run your greet.js script with three different names and confirm each one prints correctly."
        },
        {
          "id": "m1-l5",
          "title": "Node.js vs Browser JavaScript",
          "concept": "Node and the browser both run JavaScript, but expose different global objects. Node has no window or document; it has process, __dirname, and Node's built-in modules. The browser has no file system or require().",
          "why": "Code written for one environment often will not run unchanged in the other. Confusing the two is a common source of errors for beginners.",
          "how": "Check whether a piece of code depends on browser-only globals (window, document) or Node-only globals (process, require) before assuming it will run somewhere else.",
          "example": "document.querySelector works only in a browser; require(\"fs\") works only in Node.",
          "code": {
            "javascript": "console.log(typeof window);   // undefined in Node\nconsole.log(typeof process);  // object in Node"
          },
          "runNote": "Run this with node, then compare by pasting it into a browser console.",
          "practice": {
            "task": "Identify which environment each belongs to: document.getElementById, require(\"fs\"), fetch(), process.exit().",
            "hint": "document and fetch are browser features (fetch also exists in modern Node, but originated in the browser). require and process are Node-specific.",
            "solution": "document.getElementById: browser. require(\"fs\"): Node. fetch(): browser (also available in modern Node). process.exit(): Node."
          },
          "miniTask": "List three things Node.js can do that a browser script cannot."
        }
      ]
    },
    {
      "id": "m2",
      "title": "Core Node.js Modules",
      "short": "Core Modules",
      "description": "File system, path, OS, process, events, and streams.",
      "lessons": [
        {
          "id": "m2-l1",
          "title": "The File System Module (fs)",
          "concept": "The built-in fs module reads and writes files. Most methods come in an asynchronous form (non-blocking) and a synchronous form suffixed with Sync.",
          "why": "Reading and writing files is a basic requirement for scripts, servers, and command line tools.",
          "how": "fs.readFile(path, encoding, callback) reads asynchronously. fs.readFileSync(path, encoding) reads synchronously and returns the result directly.",
          "example": "Reading a text file's contents asynchronously.",
          "code": {
            "javascript": "const fs = require(\"fs\");\n\nfs.readFile(\"notes.txt\", \"utf8\", (err, data) => {\n  if (err) {\n    console.error(\"Error reading file:\", err.message);\n    return;\n  }\n  console.log(data);\n});"
          },
          "runNote": "Create a notes.txt file in the same folder first. Run with: node read.js",
          "practice": {
            "task": "Write a script that writes the text \"Course started\" to a file called log.txt using fs.writeFile.",
            "hint": "fs.writeFile takes (path, data, callback).",
            "solution": "const fs = require(\"fs\");\nfs.writeFile(\"log.txt\", \"Course started\", (err) => {\n  if (err) throw err;\n  console.log(\"Saved.\");\n});"
          },
          "miniTask": "Read a file synchronously with fs.readFileSync and log its contents."
        },
        {
          "id": "m2-l2",
          "title": "The Path Module",
          "concept": "The path module builds and inspects file paths in a way that works correctly across operating systems, which use different path separators.",
          "why": "Manually joining paths with string concatenation breaks on different operating systems. path.join handles this correctly everywhere.",
          "how": "path.join(...) combines path segments. path.basename() and path.extname() extract parts of a path.",
          "example": "Building a file path and extracting its extension.",
          "code": {
            "javascript": "const path = require(\"path\");\n\nconst filePath = path.join(\"data\", \"users\", \"list.json\");\nconsole.log(filePath);\nconsole.log(path.extname(filePath));"
          },
          "runNote": "Run with: node paths.js",
          "practice": {
            "task": "Use path.basename() to extract just the file name from \"/home/user/project/app.js\".",
            "hint": "path.basename(fullPath) returns the last segment of the path.",
            "solution": "const path = require(\"path\");\nconsole.log(path.basename(\"/home/user/project/app.js\")); // app.js"
          },
          "miniTask": "Use path.join to build a path from three folder names and one file name, then log it."
        },
        {
          "id": "m2-l3",
          "title": "OS and Process",
          "concept": "The os module reports information about the operating system, such as platform and memory. The process object represents the currently running Node process, including environment variables and exit control.",
          "why": "Scripts sometimes need to behave differently depending on the operating system, or need access to configuration through environment variables.",
          "how": "os.platform() returns the OS name. process.env holds environment variables. process.exit(code) ends the script with a given exit code.",
          "example": "Reading the operating system and an environment variable.",
          "code": {
            "javascript": "const os = require(\"os\");\n\nconsole.log(\"Platform:\", os.platform());\nconsole.log(\"Home directory:\", os.homedir());\nconsole.log(\"NODE_ENV:\", process.env.NODE_ENV);"
          },
          "runNote": "Run with: node system.js. NODE_ENV may print undefined if it is not set in your shell.",
          "practice": {
            "task": "Write a script that exits with code 1 if a required environment variable API_KEY is missing.",
            "hint": "Check process.env.API_KEY, and call process.exit(1) inside the missing case.",
            "solution": "if (!process.env.API_KEY) {\n  console.error(\"Missing API_KEY\");\n  process.exit(1);\n}"
          },
          "miniTask": "Log os.totalmem() and os.freemem() to see your system's memory."
        },
        {
          "id": "m2-l4",
          "title": "Events and EventEmitter",
          "concept": "Node's core design is event-driven. The EventEmitter class lets an object emit named events that other code can listen for and react to.",
          "why": "Many built-in Node objects, including HTTP servers and streams, are EventEmitters. Understanding this pattern is necessary to use them effectively.",
          "how": "Create an EventEmitter, call .on(\"eventName\", handler) to listen, and .emit(\"eventName\", data) to trigger it.",
          "example": "A simple emitter that announces when an order is placed.",
          "code": {
            "javascript": "const EventEmitter = require(\"events\");\n\nconst orderEvents = new EventEmitter();\n\norderEvents.on(\"placed\", (orderId) => {\n  console.log(\"Order placed:\", orderId);\n});\n\norderEvents.emit(\"placed\", 1042);"
          },
          "runNote": "Run with: node events.js",
          "practice": {
            "task": "Add a second listener to the same \"placed\" event that logs a shipping confirmation message.",
            "hint": "Call .on(\"placed\", ...) a second time with a different handler function.",
            "solution": "orderEvents.on(\"placed\", (orderId) => {\n  console.log(\"Preparing shipment for order\", orderId);\n});"
          },
          "miniTask": "Create your own EventEmitter with a custom event name and at least one listener."
        },
        {
          "id": "m2-l5",
          "title": "Streams Basics",
          "concept": "Streams process data piece by piece instead of loading it all into memory at once. Readable streams produce data, writable streams consume it.",
          "why": "Reading a large file with fs.readFile loads the entire file into memory. A stream processes it in small chunks, which scales to much larger files.",
          "how": "fs.createReadStream() and fs.createWriteStream() create file streams. .pipe() connects a readable stream directly to a writable one.",
          "example": "Copying a file using streams instead of reading it fully into memory first.",
          "code": {
            "javascript": "const fs = require(\"fs\");\n\nconst readStream = fs.createReadStream(\"input.txt\");\nconst writeStream = fs.createWriteStream(\"output.txt\");\n\nreadStream.pipe(writeStream);"
          },
          "runNote": "Create an input.txt file first. Run with: node copy.js",
          "practice": {
            "task": "Explain why streams are more memory-efficient than fs.readFile for very large files.",
            "hint": "Consider how much of the file exists in memory at any one moment with each approach.",
            "solution": "fs.readFile loads the entire file into memory before returning it. A stream processes the file in small chunks, so only a small portion is ever held in memory at once, regardless of the file's total size."
          },
          "miniTask": "Listen for the \"finish\" event on the write stream and log a completion message when the copy is done."
        }
      ]
    },
    {
      "id": "m3",
      "title": "Asynchronous Node.js",
      "short": "Async",
      "description": "Callbacks, Promises, async/await, the event loop, and error handling.",
      "lessons": [
        {
          "id": "m3-l1",
          "title": "Callbacks",
          "concept": "A callback is a function passed as an argument to be called later, typically once an asynchronous operation finishes. Node's older APIs use an error-first callback convention: callback(error, result).",
          "why": "Asynchronous operations, like reading a file or querying a database, take time. Callbacks let code continue running instead of blocking while waiting.",
          "how": "Check the error argument first. If it is not null, handle the error before using the result.",
          "example": "An error-first callback pattern for a file read.",
          "code": {
            "javascript": "const fs = require(\"fs\");\n\nfs.readFile(\"config.json\", \"utf8\", (err, data) => {\n  if (err) {\n    console.error(\"Failed to read config:\", err.message);\n    return;\n  }\n  console.log(\"Config loaded:\", data);\n});"
          },
          "runNote": "Create a config.json file first. Run with: node config.js",
          "practice": {
            "task": "Write a function loadUser(id, callback) that calls callback(null, {id}) immediately, following the error-first pattern.",
            "hint": "Even a synchronous-feeling function can follow the callback(error, result) shape.",
            "solution": "function loadUser(id, callback) {\n  callback(null, { id });\n}\nloadUser(7, (err, user) => console.log(user));"
          },
          "miniTask": "Rewrite one callback function you have written so the error is always checked first."
        },
        {
          "id": "m3-l2",
          "title": "Promises",
          "concept": "A Promise represents a value that will exist in the future, either resolved (success) or rejected (failure). Promises avoid deeply nested callbacks, sometimes called callback hell.",
          "why": "Chaining multiple async operations with callbacks nests code deeply and gets hard to read. Promises flatten this with .then() chains.",
          "how": "A function returns a Promise. Call .then(onSuccess) to handle the resolved value and .catch(onError) to handle rejection.",
          "example": "Using the Promise-based fs.promises API instead of callbacks.",
          "code": {
            "javascript": "const fs = require(\"fs/promises\");\n\nfs.readFile(\"config.json\", \"utf8\")\n  .then((data) => {\n    console.log(\"Config loaded:\", data);\n  })\n  .catch((err) => {\n    console.error(\"Failed to read config:\", err.message);\n  });"
          },
          "runNote": "Run with: node config-promise.js",
          "practice": {
            "task": "Chain a second .then() onto the example above that logs \"Done\" after the config is logged.",
            "hint": "Return a value or nothing from the first .then() and add another .then() after it.",
            "solution": "fs.readFile(\"config.json\", \"utf8\")\n  .then((data) => {\n    console.log(\"Config loaded:\", data);\n  })\n  .then(() => {\n    console.log(\"Done\");\n  })\n  .catch((err) => console.error(err.message));"
          },
          "miniTask": "Write a function that returns a Promise which resolves after 1 second using setTimeout."
        },
        {
          "id": "m3-l3",
          "title": "Async/Await",
          "concept": "async/await is syntax built on top of Promises that lets asynchronous code read like synchronous code. A function marked async always returns a Promise, and await pauses execution until a Promise resolves.",
          "why": "async/await removes .then() chains and makes error handling possible with ordinary try/catch.",
          "how": "Mark the function async, then use await before any Promise-returning call.",
          "example": "Rewriting the config-loading example using async/await.",
          "code": {
            "javascript": "const fs = require(\"fs/promises\");\n\nasync function loadConfig() {\n  try {\n    const data = await fs.readFile(\"config.json\", \"utf8\");\n    console.log(\"Config loaded:\", data);\n  } catch (err) {\n    console.error(\"Failed to read config:\", err.message);\n  }\n}\n\nloadConfig();"
          },
          "runNote": "Run with: node config-async.js",
          "practice": {
            "task": "Write an async function that awaits two file reads in sequence and logs both contents.",
            "hint": "Use two separate await fs.readFile(...) calls inside the same async function.",
            "solution": "async function loadTwo() {\n  const a = await fs.readFile(\"a.txt\", \"utf8\");\n  const b = await fs.readFile(\"b.txt\", \"utf8\");\n  console.log(a, b);\n}"
          },
          "miniTask": "Convert one Promise .then() chain you have written into an async/await version."
        },
        {
          "id": "m3-l4",
          "title": "The Event Loop",
          "concept": "The event loop is what allows Node, a single-threaded runtime, to handle many operations concurrently. It continuously checks a queue of pending callbacks and runs them once the current stack is clear.",
          "why": "Understanding the event loop explains why asynchronous code does not run in the exact order it appears on the page.",
          "how": "Synchronous code runs first, completely, before any queued callback (from I/O, timers, or Promises) is processed.",
          "example": "Demonstrating execution order between synchronous code, a Promise, and a timer.",
          "code": {
            "javascript": "console.log(\"1: synchronous\");\n\nsetTimeout(() => console.log(\"4: timer\"), 0);\n\nPromise.resolve().then(() => console.log(\"3: promise\"));\n\nconsole.log(\"2: synchronous\");"
          },
          "runNote": "Run with: node order.js and observe the output order is 1, 2, 3, 4.",
          "practice": {
            "task": "Predict the output order of the code example above before running it, then explain why Promise callbacks run before setTimeout callbacks.",
            "hint": "Promise callbacks (microtasks) run before timer callbacks (macrotasks), even with a 0ms delay.",
            "solution": "Output order: 1, 2, 3, 4. All synchronous code runs first (1 and 2). Then queued microtasks (the Promise) run before queued macrotasks (the timer), so 3 prints before 4."
          },
          "miniTask": "Add a second setTimeout with a 0ms delay and a second Promise.then() and predict the new order before running it."
        },
        {
          "id": "m3-l5",
          "title": "Error Handling in Async Code",
          "concept": "Unhandled errors in async code fail silently or crash the process differently than synchronous errors. try/catch works with async/await; .catch() works with Promise chains; error-first callbacks require manually checking the error argument.",
          "why": "An unhandled Promise rejection can crash a Node process in newer versions, so every async operation needs explicit error handling.",
          "how": "Wrap awaited calls in try/catch inside async functions, and never omit a .catch() on a Promise chain that is not awaited.",
          "example": "Handling an error from an async function that might fail, such as reading a missing file.",
          "code": {
            "javascript": "async function loadConfig() {\n  try {\n    const data = await fs.readFile(\"missing.json\", \"utf8\");\n    console.log(data);\n  } catch (err) {\n    console.error(\"Could not load config:\", err.message);\n  }\n}"
          },
          "runNote": "Run with: node error-handling.js. The file intentionally does not exist, so the catch block runs.",
          "practice": {
            "task": "Write an async function that calls loadConfig() and also has its own try/catch around the call.",
            "hint": "Even if loadConfig() already has its own try/catch, the caller can add one too for its own error handling.",
            "solution": "async function main() {\n  try {\n    await loadConfig();\n  } catch (err) {\n    console.error(\"main failed:\", err.message);\n  }\n}\nmain();"
          },
          "miniTask": "Deliberately trigger an error in an async function (like reading a nonexistent file) and confirm your catch block runs."
        }
      ]
    },
    {
      "id": "m4",
      "title": "Building Servers with Node",
      "short": "HTTP Servers",
      "description": "The built-in http module, requests, responses, routing, and JSON.",
      "lessons": [
        {
          "id": "m4-l1",
          "title": "The HTTP Module",
          "concept": "Node's built-in http module creates a web server without any external framework. http.createServer() takes a function that runs for every incoming request.",
          "why": "Every Node web framework, including Express, is built on top of this core module. Understanding it explains what a framework is actually doing underneath.",
          "how": "The handler function receives a request object and a response object. Call res.end() to send the response.",
          "example": "A minimal server that responds with plain text on every request.",
          "code": {
            "javascript": "const http = require(\"http\");\n\nconst server = http.createServer((req, res) => {\n  res.end(\"Hello from Node\");\n});\n\nserver.listen(3000, () => {\n  console.log(\"Server running on port 3000\");\n});"
          },
          "runNote": "Run with: node server.js, then open http://localhost:3000 in a browser.",
          "practice": {
            "task": "Modify the server to respond with the current server time instead of a fixed string.",
            "hint": "Use new Date().toString() inside the handler.",
            "solution": "const server = http.createServer((req, res) => {\n  res.end(new Date().toString());\n});"
          },
          "miniTask": "Change the port number to 4000 and confirm the server still works at the new address."
        },
        {
          "id": "m4-l2",
          "title": "Handling Requests and Responses",
          "concept": "The request object holds information about the incoming request, such as req.url and req.method. The response object controls what is sent back, including status code and headers.",
          "why": "A real server needs to inspect what was requested before deciding how to respond.",
          "how": "res.writeHead(statusCode, headers) sets the status and headers before calling res.end() with the body.",
          "example": "Returning a JSON response with the correct content type header.",
          "code": {
            "javascript": "const server = http.createServer((req, res) => {\n  res.writeHead(200, { \"Content-Type\": \"application/json\" });\n  res.end(JSON.stringify({ message: \"ok\", method: req.method }));\n});"
          },
          "runNote": "Run with: node server.js, then visit http://localhost:3000",
          "practice": {
            "task": "Return a 404 status with a JSON error body when req.url is not \"/\".",
            "hint": "Check req.url with an if statement before writing the response.",
            "solution": "if (req.url !== \"/\") {\n  res.writeHead(404, { \"Content-Type\": \"application/json\" });\n  res.end(JSON.stringify({ error: \"Not found\" }));\n  return;\n}"
          },
          "miniTask": "Log req.method and req.url to the console for every request your server receives."
        },
        {
          "id": "m4-l3",
          "title": "Basic Routing",
          "concept": "Routing decides which code runs for which URL path. Without a framework, this means manually checking req.url and req.method with conditionals.",
          "why": "A server needs to behave differently for different paths, such as /users versus /products.",
          "how": "Compare req.url and req.method inside the request handler, returning early after handling each case.",
          "example": "A server with two routes: a home page and an about page.",
          "code": {
            "javascript": "const server = http.createServer((req, res) => {\n  if (req.url === \"/\" && req.method === \"GET\") {\n    res.end(\"Home page\");\n  } else if (req.url === \"/about\" && req.method === \"GET\") {\n    res.end(\"About page\");\n  } else {\n    res.writeHead(404);\n    res.end(\"Not found\");\n  }\n});"
          },
          "runNote": "Run with: node server.js, then visit /, /about, and any other path.",
          "practice": {
            "task": "Add a third route, /contact, that responds with a contact message.",
            "hint": "Add another else if block checking req.url === \"/contact\".",
            "solution": "else if (req.url === \"/contact\" && req.method === \"GET\") {\n  res.end(\"Contact page\");\n}"
          },
          "miniTask": "Manually handling routes this way becomes repetitive quickly. Note what specifically feels repetitive about it before the next lesson."
        },
        {
          "id": "m4-l4",
          "title": "Serving JSON",
          "concept": "A JSON API server responds with structured data instead of HTML. The response body is a JSON string with the Content-Type header set to application/json.",
          "why": "Most modern web and mobile applications communicate with a backend through JSON APIs rather than full HTML pages.",
          "how": "Build a plain JavaScript object, convert it with JSON.stringify(), and send it with the correct content type header.",
          "example": "A server that returns a list of items as JSON.",
          "code": {
            "javascript": "const server = http.createServer((req, res) => {\n  const items = [\n    { id: 1, name: \"Notebook\" },\n    { id: 2, name: \"Pen\" }\n  ];\n  res.writeHead(200, { \"Content-Type\": \"application/json\" });\n  res.end(JSON.stringify(items));\n});"
          },
          "runNote": "Run with: node server.js, then visit http://localhost:3000 and view the raw JSON.",
          "practice": {
            "task": "Add an id property lookup: if the URL is /items/1, return only the matching item.",
            "hint": "Parse the id out of req.url, then use .find() on the items array.",
            "solution": "if (req.url.startsWith(\"/items/\")) {\n  const id = Number(req.url.split(\"/\")[2]);\n  const item = items.find((i) => i.id === id);\n  res.writeHead(200, { \"Content-Type\": \"application/json\" });\n  res.end(JSON.stringify(item || { error: \"Not found\" }));\n}"
          },
          "miniTask": "Change the items array to contain at least four objects with different properties."
        }
      ]
    },
    {
      "id": "m5",
      "title": "Express.js",
      "short": "Express",
      "description": "Routes, route parameters, middleware, static files, body parsing, and error handling.",
      "lessons": [
        {
          "id": "m5-l1",
          "title": "What Express Is and Setup",
          "concept": "Express is a minimal web framework built on top of Node's http module. It replaces manual routing and header management with a simpler, declarative API.",
          "why": "Express removes the repetitive routing code seen in the previous module, and adds features like middleware that would otherwise have to be built manually.",
          "how": "Install express with npm, create an app with express(), define routes on it, then call app.listen().",
          "example": "The minimal server from Module 4, rebuilt with Express.",
          "code": {
            "javascript": "const express = require(\"express\");\nconst app = express();\n\napp.get(\"/\", (req, res) => {\n  res.send(\"Hello from Express\");\n});\n\napp.listen(3000, () => {\n  console.log(\"Server running on port 3000\");\n});"
          },
          "runNote": "Install first with: npm install express. Run with: node server.js",
          "practice": {
            "task": "Add a second route, GET /about, that responds with a short string.",
            "hint": "Use app.get(\"/about\", (req, res) => { ... }).",
            "solution": "app.get(\"/about\", (req, res) => {\n  res.send(\"About this course\");\n});"
          },
          "miniTask": "Install Express in a new folder and get the minimal server above running."
        },
        {
          "id": "m5-l2",
          "title": "Routes and Route Parameters",
          "concept": "Express routes map an HTTP method and path to a handler function. Route parameters, written with a colon, capture dynamic segments of the URL into req.params.",
          "why": "Real applications need routes like /users/42, where 42 is a variable id, not a fixed path.",
          "how": "Define a parameter with a colon in the path, such as \"/users/:id\", then read it from req.params.id.",
          "example": "A route that returns a user based on an id in the URL.",
          "code": {
            "javascript": "app.get(\"/users/:id\", (req, res) => {\n  res.send(`User ID: ${req.params.id}`);\n});"
          },
          "runNote": "Run with: node server.js, then visit /users/42",
          "practice": {
            "task": "Add a route /products/:category/:id that logs both route parameters.",
            "hint": "A path can have more than one parameter; each becomes its own property on req.params.",
            "solution": "app.get(\"/products/:category/:id\", (req, res) => {\n  res.send(`Category: ${req.params.category}, ID: ${req.params.id}`);\n});"
          },
          "miniTask": "Create a route with two parameters and test it with different values in the browser."
        },
        {
          "id": "m5-l3",
          "title": "Middleware",
          "concept": "Middleware are functions that run between the request arriving and the final route handler responding. Each middleware receives (req, res, next) and calls next() to pass control forward.",
          "why": "Middleware handles cross-cutting concerns, like logging, authentication, or parsing request bodies, without repeating that logic in every route.",
          "how": "app.use(middlewareFunction) applies middleware to every request. Middleware can also be scoped to a specific route.",
          "example": "A simple logging middleware that runs before every route.",
          "code": {
            "javascript": "app.use((req, res, next) => {\n  console.log(`${req.method} ${req.url}`);\n  next();\n});\n\napp.get(\"/\", (req, res) => {\n  res.send(\"Home\");\n});"
          },
          "runNote": "Run with: node server.js, then make a few requests and watch the console log each one.",
          "practice": {
            "task": "Write a middleware that adds a custom header X-Powered-By-Course to every response.",
            "hint": "Use res.setHeader() inside the middleware, then call next().",
            "solution": "app.use((req, res, next) => {\n  res.setHeader(\"X-Powered-By-Course\", \"CodeVent\");\n  next();\n});"
          },
          "miniTask": "Add a second middleware after the first one and confirm both run in order for every request."
        },
        {
          "id": "m5-l4",
          "title": "Serving Static Files",
          "concept": "Express's built-in express.static() middleware serves files, like images, CSS, or HTML, directly from a folder without writing a route for each one.",
          "why": "Manually writing a route to serve every single file in a folder is impractical for real projects with many assets.",
          "how": "Call app.use(express.static(\"public\")) to serve every file inside a folder named public.",
          "example": "Serving a folder of static files.",
          "code": {
            "javascript": "app.use(express.static(\"public\"));"
          },
          "runNote": "Create a public folder with an index.html file inside it, then run: node server.js and visit http://localhost:3000",
          "practice": {
            "task": "Add a second static folder called assets, served at the same time as public.",
            "hint": "Call app.use(express.static(...)) a second time with a different folder name.",
            "solution": "app.use(express.static(\"public\"));\napp.use(express.static(\"assets\"));"
          },
          "miniTask": "Add an image file to your public folder and confirm it loads directly in the browser."
        },
        {
          "id": "m5-l5",
          "title": "Handling POST Data and Body Parsing",
          "concept": "Express includes express.json() middleware that parses an incoming JSON request body into a JavaScript object available at req.body.",
          "why": "POST and PUT requests commonly send data in the request body, which must be parsed before it can be used.",
          "how": "Add app.use(express.json()) once, near the top of the app, before any routes that need req.body.",
          "example": "A route that accepts a new user's name from a POST request body.",
          "code": {
            "javascript": "app.use(express.json());\n\napp.post(\"/users\", (req, res) => {\n  const name = req.body.name;\n  res.status(201).send(`Created user: ${name}`);\n});"
          },
          "runNote": "Test with a tool like curl: curl -X POST -H \"Content-Type: application/json\" -d \"{\\\"name\\\":\\\"Jane\\\"}\" http://localhost:3000/users",
          "practice": {
            "task": "Add validation: if req.body.name is missing, respond with a 400 status and an error message.",
            "hint": "Check if (!req.body.name) before proceeding.",
            "solution": "app.post(\"/users\", (req, res) => {\n  if (!req.body.name) {\n    return res.status(400).json({ error: \"name is required\" });\n  }\n  res.status(201).json({ name: req.body.name });\n});"
          },
          "miniTask": "Send a POST request with a missing name field and confirm your validation responds correctly."
        },
        {
          "id": "m5-l6",
          "title": "Error Handling Middleware",
          "concept": "Express has a special error-handling middleware signature with four parameters: (err, req, res, next). It catches errors passed to next(err) from anywhere in the app.",
          "why": "Without centralized error handling, every route needs its own try/catch and error response logic, which is repetitive and easy to get wrong.",
          "how": "Define error middleware last, after all routes. Call next(err) inside a route to forward an error to it.",
          "example": "A route that triggers an error, caught by a shared error handler.",
          "code": {
            "javascript": "app.get(\"/risky\", (req, res, next) => {\n  try {\n    throw new Error(\"Something went wrong\");\n  } catch (err) {\n    next(err);\n  }\n});\n\napp.use((err, req, res, next) => {\n  console.error(err.message);\n  res.status(500).json({ error: \"Internal server error\" });\n});"
          },
          "runNote": "Run with: node server.js, then visit /risky and check the JSON error response.",
          "practice": {
            "task": "Add a route /also-risky that also throws an error and confirm it is handled by the same error middleware.",
            "hint": "Reuse the same try/catch and next(err) pattern in the new route.",
            "solution": "app.get(\"/also-risky\", (req, res, next) => {\n  try {\n    throw new Error(\"Another failure\");\n  } catch (err) {\n    next(err);\n  }\n});"
          },
          "miniTask": "Confirm the error middleware runs for both routes without duplicating the error-handling code."
        }
      ]
    },
    {
      "id": "m6",
      "title": "Building REST APIs",
      "short": "REST APIs",
      "description": "REST conventions, CRUD endpoints, status codes, validation, and persistence.",
      "lessons": [
        {
          "id": "m6-l1",
          "title": "REST Principles",
          "concept": "REST is a convention for designing APIs around resources and HTTP methods. A resource, like a user or a product, is addressed by a URL, and the HTTP method (GET, POST, PUT, DELETE) describes the action.",
          "why": "Following REST conventions makes an API predictable to anyone familiar with the pattern, without needing custom documentation for every endpoint's behavior.",
          "how": "GET reads, POST creates, PUT or PATCH updates, DELETE removes. The resource name is a noun, not a verb, in the URL path.",
          "example": "A REST-style set of endpoints for a \"tasks\" resource.",
          "code": {
            "javascript": "// GET    /tasks       -> list all tasks\n// GET    /tasks/:id   -> get one task\n// POST   /tasks       -> create a task\n// PUT    /tasks/:id   -> update a task\n// DELETE /tasks/:id   -> delete a task"
          },
          "practice": {
            "task": "Design the REST endpoints for a \"comments\" resource that belongs to a \"posts\" resource.",
            "hint": "Nest the resource in the URL: /posts/:postId/comments.",
            "solution": "GET /posts/:postId/comments\nGET /posts/:postId/comments/:id\nPOST /posts/:postId/comments\nPUT /posts/:postId/comments/:id\nDELETE /posts/:postId/comments/:id"
          },
          "miniTask": "Write out the REST endpoints for one resource of your choice, covering all five standard operations."
        },
        {
          "id": "m6-l2",
          "title": "CRUD Endpoints in Express",
          "concept": "CRUD (Create, Read, Update, Delete) endpoints are the implementation of REST resource operations. In Express, each maps to app.post, app.get, app.put, and app.delete.",
          "why": "Most APIs are fundamentally CRUD operations on one or more resources, so this pattern covers the majority of real API code.",
          "how": "Store data in memory (an array, for a course example) and implement each operation against it.",
          "example": "A minimal in-memory CRUD API for tasks.",
          "code": {
            "javascript": "let tasks = [{ id: 1, title: \"Learn Node\" }];\n\napp.get(\"/tasks\", (req, res) => res.json(tasks));\n\napp.get(\"/tasks/:id\", (req, res) => {\n  const task = tasks.find((t) => t.id === Number(req.params.id));\n  if (!task) return res.status(404).json({ error: \"Not found\" });\n  res.json(task);\n});\n\napp.post(\"/tasks\", (req, res) => {\n  const task = { id: tasks.length + 1, title: req.body.title };\n  tasks.push(task);\n  res.status(201).json(task);\n});\n\napp.delete(\"/tasks/:id\", (req, res) => {\n  tasks = tasks.filter((t) => t.id !== Number(req.params.id));\n  res.status(204).end();\n});"
          },
          "runNote": "Requires app.use(express.json()) already added. Run with: node server.js",
          "practice": {
            "task": "Add a PUT /tasks/:id endpoint that updates a task's title.",
            "hint": "Find the task by id, then reassign its title property from req.body.title.",
            "solution": "app.put(\"/tasks/:id\", (req, res) => {\n  const task = tasks.find((t) => t.id === Number(req.params.id));\n  if (!task) return res.status(404).json({ error: \"Not found\" });\n  task.title = req.body.title;\n  res.json(task);\n});"
          },
          "miniTask": "Test all five endpoints (list, get one, create, update, delete) using curl or a tool like Postman."
        },
        {
          "id": "m6-l3",
          "title": "Status Codes and Responses",
          "concept": "HTTP status codes communicate the outcome of a request. 200 means success, 201 means a resource was created, 400 means the client sent bad input, 404 means not found, and 500 means a server error.",
          "why": "Returning 200 for every response, including errors, forces API consumers to inspect the response body just to know if something failed.",
          "how": "Call res.status(code) before .json() or .send() to set the correct status.",
          "example": "Returning different status codes for different outcomes.",
          "code": {
            "javascript": "app.get(\"/tasks/:id\", (req, res) => {\n  const task = tasks.find((t) => t.id === Number(req.params.id));\n  if (!task) {\n    return res.status(404).json({ error: \"Task not found\" });\n  }\n  res.status(200).json(task);\n});"
          },
          "practice": {
            "task": "Match each situation to a status code: resource created, invalid request body, resource not found, server crashed unexpectedly.",
            "hint": "201, 400, 404, 500 in some order.",
            "solution": "Resource created: 201. Invalid request body: 400. Resource not found: 404. Server crashed unexpectedly: 500."
          },
          "miniTask": "Review one endpoint you have written and confirm it returns the correct status code for both success and failure cases."
        },
        {
          "id": "m6-l4",
          "title": "Validating Input",
          "concept": "Input validation checks that request data meets expectations before it is used, rejecting malformed or missing data early with a clear error message.",
          "why": "Trusting client input without validation leads to crashes, corrupted data, or security issues.",
          "how": "Check required fields exist and have the correct type before proceeding with the rest of the route logic.",
          "example": "Validating a task creation request before adding it to the list.",
          "code": {
            "javascript": "app.post(\"/tasks\", (req, res) => {\n  const { title } = req.body;\n  if (!title || typeof title !== \"string\") {\n    return res.status(400).json({ error: \"title is required and must be a string\" });\n  }\n  const task = { id: tasks.length + 1, title };\n  tasks.push(task);\n  res.status(201).json(task);\n});"
          },
          "practice": {
            "task": "Add a check that rejects a title longer than 100 characters with a 400 response.",
            "hint": "Check title.length > 100 alongside the existing validation.",
            "solution": "if (!title || typeof title !== \"string\" || title.length > 100) {\n  return res.status(400).json({ error: \"Invalid title\" });\n}"
          },
          "miniTask": "Add validation to one of your existing POST or PUT routes that currently has none."
        },
        {
          "id": "m6-l5",
          "title": "Connecting Express to Data",
          "concept": "Real APIs read and write data from a persistent source, not an in-memory array that resets every time the server restarts. This can be a file, or more commonly, a database, covered in the next module.",
          "why": "In-memory data disappears on every server restart, which is fine for learning but not for a real application.",
          "how": "As an intermediate step before a database, data can be persisted to a JSON file with fs, read on startup and written on every change.",
          "example": "Loading tasks from a JSON file when the server starts.",
          "code": {
            "javascript": "const fs = require(\"fs\");\n\nlet tasks = JSON.parse(fs.readFileSync(\"tasks.json\", \"utf8\"));\n\nfunction saveTasks() {\n  fs.writeFileSync(\"tasks.json\", JSON.stringify(tasks, null, 2));\n}"
          },
          "runNote": "Create a tasks.json file containing [] before running the server.",
          "practice": {
            "task": "Call saveTasks() at the end of the POST /tasks route so new tasks persist to the file.",
            "hint": "Call saveTasks() right after tasks.push(task).",
            "solution": "app.post(\"/tasks\", (req, res) => {\n  const task = { id: tasks.length + 1, title: req.body.title };\n  tasks.push(task);\n  saveTasks();\n  res.status(201).json(task);\n});"
          },
          "miniTask": "Restart your server after creating a task and confirm the task is still there, loaded from the file."
        }
      ]
    },
    {
      "id": "m7",
      "title": "Databases with Node",
      "short": "Databases",
      "description": "Database connections, MongoDB, Mongoose schemas, models, and CRUD operations.",
      "lessons": [
        {
          "id": "m7-l1",
          "title": "What a Database Connection Is",
          "concept": "A database runs as a separate process, often on a different machine, and a Node application connects to it over a network protocol. The connection is typically opened once when the app starts and reused for every query.",
          "why": "Databases like MongoDB and PostgreSQL persist data reliably, support concurrent access, and scale beyond what a JSON file can handle.",
          "how": "A database driver or ODM library (like Mongoose for MongoDB) provides a connect() function that establishes this connection using a connection string.",
          "example": "The shape of a typical database connection string.",
          "code": {
            "javascript": "// mongodb://<username>:<password>@<host>:<port>/<database>\nconst MONGO_URI = \"mongodb://localhost:27017/tasks_app\";"
          },
          "practice": {
            "task": "Identify the four parts of a connection string: host, port, database name, and protocol.",
            "hint": "Break down mongodb://localhost:27017/tasks_app piece by piece.",
            "solution": "Protocol: mongodb://. Host: localhost. Port: 27017. Database name: tasks_app."
          },
          "miniTask": "Write out what a connection string would look like for a database called blog_app running locally."
        },
        {
          "id": "m7-l2",
          "title": "MongoDB and Mongoose Basics",
          "concept": "MongoDB stores data as JSON-like documents rather than rows and tables. Mongoose is an ODM (Object Data Modeling) library that adds schemas and validation on top of MongoDB from Node.",
          "why": "MongoDB's document model maps naturally onto JavaScript objects, which is why it pairs commonly with Node.",
          "how": "mongoose.connect(uri) opens the connection. Once connected, models built from schemas represent collections of documents.",
          "example": "Connecting to a local MongoDB instance with Mongoose.",
          "code": {
            "javascript": "const mongoose = require(\"mongoose\");\n\nmongoose.connect(\"mongodb://localhost:27017/tasks_app\")\n  .then(() => console.log(\"Connected to MongoDB\"))\n  .catch((err) => console.error(\"Connection failed:\", err.message));"
          },
          "runNote": "Install with: npm install mongoose. Requires a running MongoDB instance, local or hosted (such as MongoDB Atlas's free tier).",
          "practice": {
            "task": "Explain what happens in the code above if MongoDB is not running when the script starts.",
            "hint": "Look at what the .catch() block does.",
            "solution": "The connect() call's returned Promise rejects, so the .catch() block runs and logs the connection failure message instead of crashing the process silently."
          },
          "miniTask": "Install mongoose in a project and attempt to connect to a local or hosted MongoDB instance."
        },
        {
          "id": "m7-l3",
          "title": "Schemas and Models",
          "concept": "A Mongoose schema defines the shape and types of documents in a collection. A model, created from a schema, is the interface used to query and modify that collection.",
          "why": "Without a schema, MongoDB accepts any document shape, which makes bugs from inconsistent data easy to introduce. Schemas add structure and validation.",
          "how": "new mongoose.Schema({...}) defines fields and types. mongoose.model(\"Name\", schema) creates the model.",
          "example": "A schema and model for a task.",
          "code": {
            "javascript": "const taskSchema = new mongoose.Schema({\n  title: { type: String, required: true },\n  completed: { type: Boolean, default: false },\n  createdAt: { type: Date, default: Date.now }\n});\n\nconst Task = mongoose.model(\"Task\", taskSchema);"
          },
          "runNote": "This code needs an active mongoose.connect() call elsewhere in the app before it will work against a real database.",
          "practice": {
            "task": "Add a priority field to the schema that accepts only \"low\", \"medium\", or \"high\".",
            "hint": "Use the enum option: { type: String, enum: [\"low\", \"medium\", \"high\"] }.",
            "solution": "priority: { type: String, enum: [\"low\", \"medium\", \"high\"], default: \"medium\" }"
          },
          "miniTask": "Design a schema for a different resource, such as a blog post, with at least three fields."
        },
        {
          "id": "m7-l4",
          "title": "CRUD with Mongoose",
          "concept": "Mongoose models expose methods for each CRUD operation: .create(), .find(), .findById(), .findByIdAndUpdate(), and .findByIdAndDelete().",
          "why": "These methods replace manual array operations from the in-memory example with real, persistent database operations.",
          "how": "Each method returns a Promise, so they are used with async/await inside Express route handlers.",
          "example": "Express routes rewritten to use MongoDB through Mongoose instead of an in-memory array.",
          "code": {
            "javascript": "app.get(\"/tasks\", async (req, res) => {\n  const tasks = await Task.find();\n  res.json(tasks);\n});\n\napp.post(\"/tasks\", async (req, res) => {\n  const task = await Task.create({ title: req.body.title });\n  res.status(201).json(task);\n});\n\napp.delete(\"/tasks/:id\", async (req, res) => {\n  await Task.findByIdAndDelete(req.params.id);\n  res.status(204).end();\n});"
          },
          "runNote": "Requires an active MongoDB connection and the Task model from the previous lesson.",
          "practice": {
            "task": "Add a GET /tasks/:id route using Task.findById().",
            "hint": "Task.findById(req.params.id) returns a Promise resolving to the matching document or null.",
            "solution": "app.get(\"/tasks/:id\", async (req, res) => {\n  const task = await Task.findById(req.params.id);\n  if (!task) return res.status(404).json({ error: \"Not found\" });\n  res.json(task);\n});"
          },
          "miniTask": "Connect the CRUD API from Module 6 to a real MongoDB database using these Mongoose methods."
        }
      ]
    },
    {
      "id": "m8",
      "title": "Practical Projects",
      "short": "Projects",
      "description": "Four progressively harder projects: CLI tool, file-based API, MongoDB REST API, real-time chat.",
      "isProjectModule": true,
      "projects": [
        {
          "id": "m8-p1",
          "title": "Command Line Task Manager",
          "objective": "Build a command line tool that adds, lists, and completes tasks, storing them in a local JSON file.",
          "problem": "A user needs a simple way to track tasks from the terminal without a graphical interface or a server.",
          "requirements": [
            "Read commands and arguments from process.argv",
            "Support at least three commands: add, list, complete",
            "Persist tasks to a tasks.json file using fs",
            "Print a clear message after each command"
          ],
          "code": "const fs = require(\"fs\");\nconst path = \"tasks.json\";\n\nfunction loadTasks() {\n  if (!fs.existsSync(path)) return [];\n  return JSON.parse(fs.readFileSync(path, \"utf8\"));\n}\n\nfunction saveTasks(tasks) {\n  fs.writeFileSync(path, JSON.stringify(tasks, null, 2));\n}\n\nconst [,, command, ...args] = process.argv;\nconst tasks = loadTasks();\n\nif (command === \"add\") {\n  tasks.push({ title: args.join(\" \"), done: false });\n  saveTasks(tasks);\n  console.log(\"Task added.\");\n} else if (command === \"list\") {\n  tasks.forEach((t, i) => console.log(`${i}: [${t.done ? \"x\" : \" \"}] ${t.title}`));\n} else if (command === \"complete\") {\n  const index = Number(args[0]);\n  if (tasks[index]) {\n    tasks[index].done = true;\n    saveTasks(tasks);\n    console.log(\"Task marked complete.\");\n  }\n} else {\n  console.log(\"Usage: node tasks.js <add|list|complete> [args]\");\n}",
          "steps": [
            "Set up loadTasks() and saveTasks() using fs",
            "Parse the command and arguments from process.argv",
            "Implement the add command",
            "Implement the list command",
            "Implement the complete command"
          ],
          "expectedResult": "Running node tasks.js add \"Write notes\" followed by node tasks.js list shows the new task in the printed list.",
          "challenge": "Add a delete command that removes a task by its index."
        },
        {
          "id": "m8-p2",
          "title": "File-Based Notes API",
          "objective": "Build an Express API for creating and reading notes, persisted to a JSON file instead of a database.",
          "problem": "An application needs a simple backend for notes without setting up a full database yet.",
          "requirements": [
            "GET /notes returns all notes",
            "POST /notes creates a note with a title and body",
            "GET /notes/:id returns a single note",
            "DELETE /notes/:id removes a note",
            "Data persists to notes.json between server restarts"
          ],
          "code": "const express = require(\"express\");\nconst fs = require(\"fs\");\nconst app = express();\napp.use(express.json());\n\nfunction loadNotes() {\n  if (!fs.existsSync(\"notes.json\")) return [];\n  return JSON.parse(fs.readFileSync(\"notes.json\", \"utf8\"));\n}\nfunction saveNotes(notes) {\n  fs.writeFileSync(\"notes.json\", JSON.stringify(notes, null, 2));\n}\n\napp.get(\"/notes\", (req, res) => {\n  res.json(loadNotes());\n});\n\napp.post(\"/notes\", (req, res) => {\n  const notes = loadNotes();\n  const note = { id: notes.length + 1, title: req.body.title, body: req.body.body };\n  notes.push(note);\n  saveNotes(notes);\n  res.status(201).json(note);\n});\n\napp.listen(3000, () => console.log(\"Notes API running on port 3000\"));",
          "steps": [
            "Set up Express with express.json() middleware",
            "Build loadNotes() and saveNotes() helper functions",
            "Implement GET /notes and POST /notes",
            "Implement GET /notes/:id",
            "Implement DELETE /notes/:id",
            "Test every endpoint with curl or Postman"
          ],
          "expectedResult": "All four endpoints work correctly, and notes persist in notes.json after restarting the server.",
          "challenge": "Add a PUT /notes/:id endpoint that updates a note's title and body."
        },
        {
          "id": "m8-p3",
          "title": "Express REST API for a Blog",
          "objective": "Build a full CRUD REST API for blog posts, connected to MongoDB with Mongoose.",
          "problem": "A blog frontend needs a backend API to create, read, update, and delete posts, with real persistence.",
          "requirements": [
            "A Mongoose schema for a post with title, body, and createdAt fields",
            "GET /posts and GET /posts/:id",
            "POST /posts with input validation",
            "PUT /posts/:id and DELETE /posts/:id",
            "Correct status codes for every outcome"
          ],
          "code": "const postSchema = new mongoose.Schema({\n  title: { type: String, required: true },\n  body: { type: String, required: true },\n  createdAt: { type: Date, default: Date.now }\n});\nconst Post = mongoose.model(\"Post\", postSchema);\n\napp.post(\"/posts\", async (req, res) => {\n  const { title, body } = req.body;\n  if (!title || !body) {\n    return res.status(400).json({ error: \"title and body are required\" });\n  }\n  const post = await Post.create({ title, body });\n  res.status(201).json(post);\n});\n\napp.get(\"/posts\", async (req, res) => {\n  const posts = await Post.find().sort({ createdAt: -1 });\n  res.json(posts);\n});",
          "steps": [
            "Connect to MongoDB with Mongoose",
            "Define the Post schema and model",
            "Implement all five CRUD endpoints",
            "Add input validation to POST and PUT",
            "Test the full flow: create, list, update, delete a post"
          ],
          "expectedResult": "A working REST API where posts persist in MongoDB and every endpoint returns the correct status code.",
          "challenge": "Add a GET /posts?search=keyword query parameter that filters posts by title."
        },
        {
          "id": "m8-p4",
          "title": "Real-Time Chat with Socket.io",
          "objective": "Build a basic real-time chat server using Socket.io alongside Express.",
          "problem": "A chat application needs to push new messages to connected clients immediately, which a normal request/response cycle cannot do.",
          "requirements": [
            "An Express server with Socket.io attached",
            "Clients can connect and send a chat message event",
            "The server broadcasts received messages to all connected clients",
            "A basic static HTML page that connects and sends/receives messages"
          ],
          "code": "const express = require(\"express\");\nconst http = require(\"http\");\nconst { Server } = require(\"socket.io\");\n\nconst app = express();\nconst server = http.createServer(app);\nconst io = new Server(server);\n\napp.use(express.static(\"public\"));\n\nio.on(\"connection\", (socket) => {\n  console.log(\"A user connected\");\n\n  socket.on(\"chat message\", (msg) => {\n    io.emit(\"chat message\", msg);\n  });\n\n  socket.on(\"disconnect\", () => {\n    console.log(\"A user disconnected\");\n  });\n});\n\nserver.listen(3000, () => console.log(\"Chat server running on port 3000\"));",
          "steps": [
            "Install express and socket.io",
            "Set up an http server wrapping the Express app, required by Socket.io",
            "Handle the connection event and log new connections",
            "Handle a custom chat message event and broadcast it with io.emit",
            "Build a minimal HTML page in public/ that connects and sends messages"
          ],
          "expectedResult": "Opening the page in two browser tabs and sending a message in one shows it appear immediately in both.",
          "challenge": "Add usernames, so each broadcast message includes who sent it."
        }
      ]
    },
    {
      "id": "m9",
      "title": "Final Project",
      "short": "Capstone",
      "description": "Node.js Capstone Project.",
      "isCapstone": true,
      "capstone": {
        "id": "m9-capstone",
        "title": "Node.js Capstone Project",
        "objective": "Design and build a complete REST API with Express and MongoDB, combining routing, middleware, validation, and database persistence from every prior module.",
        "requirements": [
          "A clearly defined resource (tasks, posts, products, or a resource of your choice) with a Mongoose schema",
          "Full CRUD endpoints following REST conventions",
          "express.json() and at least one custom middleware, such as request logging",
          "Input validation on create and update endpoints",
          "Centralized error-handling middleware",
          "Correct HTTP status codes on every response",
          "A working connection to MongoDB, with data persisting across server restarts"
        ],
        "checklist": [
          "Server starts without errors and connects to MongoDB successfully",
          "All five REST operations work for the chosen resource",
          "Invalid input is rejected with a 400 status and a clear error message",
          "A request for a missing resource returns 404, not 200 with an empty body",
          "An unexpected server error is caught and returns 500, not a crashed process",
          "Data persists in MongoDB after restarting the server",
          "No hardcoded credentials or connection strings committed to version control",
          "Routes follow REST naming conventions (nouns, not verbs, in the path)",
          "Code is organized into readable, focused functions rather than one long file",
          "Every endpoint has been manually tested with curl or a tool like Postman"
        ]
      }
    }
  ]
};
