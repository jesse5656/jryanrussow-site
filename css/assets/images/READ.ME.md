The fix: Prefix Convention

The messages follow a convention called Conventional Commits:

Prefix Meaning
fix: Bug fix
feat: New feature added
style: CSS/visual changes
refactor: Code restructured, no behavior change
docs: Documentation only

# List workspace files tracked by git

git ls-files > file-tree.txt

`tree` is a command-line utility that recursively lists the contents of a directory in a tree-like format.

**Basic usage:**

```bash
tree
```

**Common flags:**

```bash
tree -a                  # Show hidden files
tree -d                  # Directories only
tree -L 2                # Limit depth to 2 levels
tree -f                  # Show full path
tree -o output.txt       # Save output to a file
tree -I 'node_modules'   # Ignore a directory
tree --dirsfirst         # List directories before files
```

**Combined examples:**

```bash
tree -L 2 --dirsfirst
tree -a -I '.git|node_modules' -o tree.txt
```

**Example output:**

```
.
├── src
│   ├── index.js
│   └── utils.js
├── package.json
└── README.md
```
