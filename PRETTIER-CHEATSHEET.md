# Prettier Cheat Sheet

## What Prettier Does

Prettier automatically formats code so spacing, indentation, quotes, line breaks, wrapping, and indentation remain consistent across your project.

Supported by this project:

- HTML
- CSS
- JavaScript
- TypeScript
- JSON
- Markdown
- YAML
- XML (via Red Hat XML extension or Prettier XML plugin)

---

# Format a File in VSCodium

Keyboard shortcut:

```text
Shift + Alt + F
```

or

```text
Right Click → Format Document
```

---

# Format on Save

Enabled globally in VSCodium:

```json
"editor.formatOnSave": true
```

---

# Format One File

```bash
npx prettier --write compound-circle.html
```

Example:

```bash
npx prettier --write css/styles.css
```

---

# Format Multiple Files

```bash
npx prettier --write compound-circle.html css/styles.css js/main.js
```

---

# Format the Entire Project

```bash
npx prettier --write .
```

---

# Check Formatting Only

Does not modify files.

Entire project:

```bash
npx prettier --check .
```

Single file:

```bash
npx prettier --check compound-circle.html
```

---

# Verify Prettier Installation

```bash
npx prettier --version
```

---

# Common Errors

## Unexpected closing tag

Example:

```text
Unexpected closing tag "section"
```

Usually means:

- extra `</div>`
- extra `</section>`
- missing opening tag
- invalid HTML nesting
- copied code into the wrong location

Print the problem area:

```bash
sed -n '120,170p' compound-circle.html
```

---

# XML Formatting

Install the XML plugin:

```bash
npm install --save-dev @prettier/plugin-xml
```

Or configure VSCodium to use the Red Hat XML formatter:

```json
"[xml]": {
    "editor.defaultFormatter": "redhat.vscode-xml"
}
```

---

# Project Configuration

Formatting rules live in:

```text
.prettierrc
```

Global VSCodium settings live in:

```text
~/.config/VSCodium/User/settings.json
```

---

# Install Project Dependencies

```bash
npm install
```

---

# .gitignore

Always ignore:

```gitignore
node_modules/
```

---

# Typical Workflow

```bash
git pull

npm install

npx prettier --write .

git status

git add .

git commit -m "Format project with Prettier"

git push
```

---

# Useful Git Commands

```bash
git status
```

```bash
git diff
```

```bash
git log --oneline -10
```

---

# Useful Prettier Commands

```bash
npx prettier --version
```

```bash
npx prettier --check .
```

```bash
npx prettier --write .
```

```bash
npx prettier --write *.html
```

```bash
npx prettier --write css/**/*.css
```

```bash
npx prettier --write js/**/*.js
```

---

# Notes

- Prettier formats code—it does **not** fix invalid HTML.
- If formatting fails, check the error line first.
- Run `npx prettier --check .` before committing if you want to verify formatting.
- Keep project-specific formatting rules in `.prettierrc`.
- Keep editor behavior (format on save, default formatter, XML formatter, etc.) in VSCodium's global `settings.json`.
