# React Webpack Scaffold CLI

A simple CLI tool to scaffold React + Webpack starter projects quickly for local development.

---

## Features

- Creates a new React + Webpack project in a folder you specify
- Automatically generates all config and starter files
- Installs dependencies using Yarn
- Great for local development and testing CLI scaffold scripts

---

## Setup and Use Locally

If you have cloned or copied this project folder (`react-webpack-scaffold-cli`), follow these steps to setup and use the CLI locally:

### 1. Install dependencies for the CLI tool

Open terminal and run:

```bash
yarn install
```

### 2. Make the CLI script executable

```bash
chmod +x cli.js
```

### 3. Link the CLI tool globally for local use

```bash
yarn link
```

This makes the command available globally on your system.

### 4. (Optional) Add Yarn global bin to your PATH if not already set

Add this to your shell config file (`~/.zshrc` or `~/.bashrc`):

```bash
export PATH="$PATH:$(yarn global bin)"
```

Reload your shell config:

```bash
source ~/.zshrc
```

### 5. Scaffold a new React project

Navigate to the folder where you want your project and run:

```bash
react-webpack-scaffold my-new-app
```

This will create a new folder `my-new-app` containing your scaffolded React + Webpack starter project and install dependencies.

### 6. Start your new React app

```bash
cd my-new-app
yarn start
```

Your React app will launch in your default browser.

---

## Notes

- This CLI tool is intended for **local development** and testing.
- You do **not** need to publish the package or login to npm for local usage.
- To distribute this CLI globally or via `yarn create`, publishing to npm with a `create-` prefixed package name is required.

---

## License

MIT License

Copyright (c) 2025 Harshali Khushal Chaudhari
