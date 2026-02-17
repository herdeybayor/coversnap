# Contributing to CoverSnap

First off, thank you for considering contributing to CoverSnap! 🎉

Every contribution helps make this tool better for everyone. Whether you're fixing bugs, adding features, or improving documentation, your work is appreciated.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Coding Guidelines](#coding-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** (comes with Node.js)
- A modern browser with Canvas API support

### Development Setup

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/coversnap.git
cd coversnap

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev

# 5. Open http://localhost:5173 in your browser
```

## How to Contribute

### 🐛 Reporting Bugs

Found a bug? Please [open an issue](https://github.com/herdeybayor/coversnap/issues/new) with:

- A clear title and description
- Steps to reproduce the bug
- Expected vs actual behavior
- Screenshots if applicable
- Your browser and OS version

### 💡 Suggesting Features

Have an idea? [Open a feature request](https://github.com/herdeybayor/coversnap/issues/new) with:

- A clear description of the feature
- The problem it would solve
- Any mockups or examples (optional but helpful!)

### 📝 Improving Documentation

Documentation improvements are always welcome! This includes:

- Fixing typos and grammar
- Adding examples and clarifications
- Creating tutorials or guides
- Translating documentation

### 🔧 Submitting Code

1. **Find or create an issue** — Check existing issues or create a new one
2. **Fork the repo** — Create your own fork
3. **Create a branch** — Use a descriptive name like `feature/tablet-template` or `fix/export-quality`
4. **Make your changes** — Write clean, well-documented code
5. **Test your changes** — Make sure everything works
6. **Submit a Pull Request** — Fill out the PR template

## Coding Guidelines

### General

- Use **ES module** syntax (`import`/`export`)
- Prefer **const** over let; never use var
- Use **descriptive variable names**
- Add comments for complex logic

### React Components

- Use **functional components** with hooks
- Keep components **focused and small**
- Use **shadcn/ui** components when possible
- Follow the existing component patterns in `src/components/`

### Styling

- Use **Tailwind CSS** utility classes
- Follow the existing **dark theme** conventions
- Use **CSS variables** defined in `src/index.css` for theme values
- Keep class strings readable — break onto multiple lines if needed

### Canvas Rendering (`src/lib/renderer.js`)

- All drawing functions should accept a **config object**
- Use the existing helper functions (`roundRect`, `roundRectTop`, etc.)
- Add new colors to `ACCENT_COLORS` and `BACKGROUND_PALETTES` objects
- New templates should follow the pattern:
  1. Add a draw function (e.g., `drawMyTemplate`)
  2. Register it in the `TEMPLATES` object
  3. Provide default accent and background colors

## Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <short description>

[optional longer description]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code style changes (formatting, etc.) |
| `refactor` | Code refactoring |
| `test` | Adding or updating tests |
| `chore` | Maintenance tasks |

### Examples

```
feat: add tablet template variant
fix: export button not working on Safari
docs: add usage examples to README
style: format renderer.js with prettier
refactor: extract color palette into separate module
```

## Pull Request Process

1. **Update documentation** — If your change affects usage, update the README
2. **Test thoroughly** — Verify all templates still render correctly
3. **Keep PRs focused** — One feature or fix per PR
4. **Fill out the PR description** — Explain what you changed and why
5. **Be responsive** — Address review feedback promptly

### PR Checklist

- [ ] My code follows the project's coding guidelines
- [ ] I have tested my changes in a browser
- [ ] All existing templates still render correctly
- [ ] I have updated documentation if needed
- [ ] My commit messages follow the conventional commits format

---

Thank you for contributing! Every bit of help makes CoverSnap better. 🙏
