@echo off
:: This part writes the header and your snippet
echo # --- UPDATE COMMAND --- > file-tree.txt
echo # Run this script to refresh: .\generate-tree.bat >> file-tree.txt
echo # ---------------------- >> file-tree.txt
echo. >> file-tree.txt

:: This part adds the fresh tree structure
tree /f /a >> file-tree.txt

echo Tree Updated!