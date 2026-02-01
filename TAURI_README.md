# Tauri Desktop App Setup

This project has been configured to build as a desktop application using Tauri.

## 📦 What's Included

- **Tauri Configuration**: `src-tauri/tauri.conf.json`
- **Rust Backend**: `src-tauri/src/main.rs` and `src-tauri/src/lib.rs`
- **App Icons**: `src-tauri/icons/` (default icons included)
- **GitHub Actions**: `.github/workflows/build-desktop.yml` (automated builds)

## 🚀 Local Development

### Prerequisites

Before you can build the desktop app locally, you need:

1. **Rust** - Install from https://rustup.rs
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

2. **Platform-specific dependencies**:
   - **macOS**: Xcode Command Line Tools
     ```bash
     xcode-select --install
     ```
   - **Windows**: Visual Studio Build Tools 2022
   - **Linux**: See [Tauri prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites)

### Running in Development Mode

```bash
npm run tauri:dev
```

This will:
1. Start the React development server (port 3000)
2. Launch the Tauri desktop window
3. Enable hot-reload for both frontend and backend changes

### Building Production App

```bash
npm run tauri:build
```

This creates production-ready installers in:
- **Windows**: `src-tauri/target/release/bundle/msi/*.msi` and `src-tauri/target/release/bundle/nsis/*.exe`
- **macOS**: `src-tauri/target/release/bundle/dmg/*.dmg`

## 🤖 Automated Builds (GitHub Actions)

The project includes GitHub Actions workflows that automatically build desktop apps for Windows and macOS.

### Triggering Builds

Builds are triggered on:
- Push to `main` or `dev` branches
- Creating tags starting with `v` (e.g., `v1.0.0`)
- Manual workflow dispatch

### Downloading Built Apps

1. Go to your repository's **Actions** tab
2. Select a completed workflow run
3. Download the artifacts or check the **Releases** page

## ⚙️ Configuration

### App Settings

Edit `src-tauri/tauri.conf.json` to customize:

- **Product Name**: `"productName": "Connected Commerce"`
- **Version**: `"version": "0.1.0"`
- **Identifier**: `"identifier": "com.ey.connectedcommerce"`
- **Window Size**: `"width": 1920, "height": 1080`
- **Bundle Targets**: `["msi", "nsis", "dmg", "app"]`

### Custom Icons

Replace the default icons in `src-tauri/icons/` with your branded icons:
- `icon.ico` - Windows
- `icon.icns` - macOS
- `icon.png` - Base icon (1024x1024 recommended)
- Various PNG sizes (32x32, 128x128, etc.)

Use tools like:
- https://icon.kitchen
- https://www.iconifier.net

## 📝 Notes

- **First build** takes 10-15 minutes due to Rust compilation
- **Subsequent builds** are faster with caching
- The app uses the same React codebase as the web version
- Frontend builds to `build/` directory (Create React App default)
- Consider code signing for production distribution

## 🔧 Troubleshooting

### Build Errors

1. **Rust not found**: Make sure Rust is installed and in your PATH
2. **Missing dependencies**: Install platform-specific prerequisites
3. **Port 3000 in use**: Stop other processes using port 3000

### Development Issues

1. **Hot reload not working**: Restart `npm run tauri:dev`
2. **Window not opening**: Check console for errors in `src-tauri/src/main.rs`

## 📚 Resources

- [Tauri Documentation](https://tauri.app/)
- [Tauri API Reference](https://tauri.app/v1/api/js/)
- [Rust Documentation](https://doc.rust-lang.org/)

## 🎯 File Structure

```
connected-commerce/
├── src/                          # React source code
├── build/                        # React build output
├── src-tauri/
│   ├── Cargo.toml               # Rust dependencies
│   ├── tauri.conf.json          # Tauri configuration
│   ├── src/
│   │   ├── main.rs              # Rust entry point
│   │   └── lib.rs               # Rust library
│   ├── icons/                   # App icons
│   └── target/                  # Build output
├── .github/
│   └── workflows/
│       └── build-desktop.yml    # CI/CD workflow
└── package.json                 # Node dependencies & scripts
```
