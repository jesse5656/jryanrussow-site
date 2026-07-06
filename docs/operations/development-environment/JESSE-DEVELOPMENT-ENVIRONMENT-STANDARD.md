# Jesse's Development Environment Standard

Version: 1.0.0

Status:
Living Standard

Purpose:
Define the standard Linux development environment used across Jesse Russow's projects, including J Ryan Russow, MIDWESTGuard, Midwest24 Core, and the Systems Architect Discipline.

------------------------------------------------------------------------------

## Principle

A development machine should be rebuildable.

Tools should be installed intentionally.

Configuration should be documented.

No critical workflow should depend on memory alone.

------------------------------------------------------------------------------

## Core Toolchain

| Tool | Purpose | Install Method |
| --- | --- | --- |
| Git | Version control | apt |
| Python | Automation and scripting | apt |
| pipx | Isolated global Python CLI tools | apt |
| MkDocs | Documentation publishing | pipx |
| MkDocs Material | Professional documentation theme | pipx inject |
| VSCodium | Code editor | deb/app repository |
| Docker | Containers | Docker official repository |
| Docker Compose | Container orchestration | Docker plugin |
| Node.js | JavaScript tooling | nvm |
| npm | JavaScript package manager | nvm |
| GitHub CLI | GitHub workflow | apt or official repo |
| pre-commit | Repository quality gates | pipx |
| ruff | Python linting | pipx |
| black | Python formatting | pipx |

------------------------------------------------------------------------------

## Current Confirmed Tools

MkDocs installed through pipx:

mkdocs, version 1.6.1

Location:

/home/jesse/.local/share/pipx/venvs/mkdocs/

Python:

3.12

------------------------------------------------------------------------------

## Standard Install Pattern

Never use sudo pip install for global tools.

Use pipx for Python command-line tools.

Use virtual environments for project-specific Python dependencies.

Use nvm for Node.js.

Use Git for every serious project.

Use Markdown as the source format for documentation.

Use MkDocs Material for published documentation.

------------------------------------------------------------------------------

## Standard Project Workflow

1. Clone repository.

2. Check branch.

3. Pull latest changes.

4. Review status.

5. Make changes.

6. Run validation.

7. Commit intentionally.

8. Push.

9. Document decisions.

------------------------------------------------------------------------------

## Standard Git Safety Commands

git status --short

git branch --show-current

git fetch origin

git pull --ff-only origin main

git log --oneline --decorate -10

------------------------------------------------------------------------------

## Standard Documentation Stack

Source:
Markdown

Version control:
Git

Local preview:
MkDocs

Theme:
Material for MkDocs

Future deployment:
Cloudflare Pages or equivalent static hosting

------------------------------------------------------------------------------

## Standard MkDocs Commands

mkdocs serve

mkdocs build

mkdocs --version

------------------------------------------------------------------------------

## Core Rule

The repository is the source of truth.

The website, book, PDF, course, academy, and AI system are generated outputs.

