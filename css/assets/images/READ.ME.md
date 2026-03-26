🖼️ How to Get Raw Image Links on GitHub
For image files, GitHub does not provide a visible "Raw" button. To get the direct URL, use one of the following methods:

Option 1: Right-click the image preview and select "Copy image link."

Option 2: Right-click the image and select "Open image in new tab," then copy the URL from your browser's address bar.

[!TIP]
This link is essential when embedding images into your README.md or other documentation.

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