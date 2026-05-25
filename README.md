# Verterbank

A collaborative multilingual Yiddish dictionary built as a full-stack learning and product project.

## What is Verterbank

**Verterbank** means “word bank” in Yiddish — from **ווערטער** (*verter*, “words”) and **באַנק** (*bank*, “bank”).

Verterbank is a full-stack dictionary application for Yiddish, built with React, TypeScript, NestJS, Prisma and PostgreSQL.

The project explores how a modern collaborative dictionary can model real lexical complexity:
multiple meanings, parts of speech, inflected forms, translations, examples, usage labels, and future editorial workflows.

## Why this project exists
Verterbank started as a way to combine language learning, Yiddish lexicography, and modern full-stack development.
The long-term goal is to create a useful, community-friendly dictionary platform while also exploring clean architecture, API design, data modeling, frontend UX, testing, and developer tooling.

## Current Status
Verterbank is currently in active development.

## Features
Implemented so far:
- Headwords and lexemes
- Senses / meanings
- Translations
- Examples
- Basic grammatical metadata
- Frontend display for dictionary entries
- API backed by NestJS, Prisma and PostgreSQL

Planned:
- Improved search
- Bulk creation APIs
- More detailed noun and verb metadata
- User roles and contribution workflow
- Review / publishing process
- Better Yiddish normalization and transliteration support

## Tech Stack
### Frontend
- React
- TypeScript
- Vite
- SCSS Modules

### Backend
- NestJS
- Prisma
- PostgreSQL
- Docker

### Tooling
- pnpm workspaces
- ESLint
- GitHub Projects
- Conventional commits / semantic versioning planned

## Domain Model
Verterbank is built around the following core entities:

- **Headword** — the dictionary entry in Yiddish script
- **Lexeme** — a lexical unit under a headword, including part of speech and grammatical metadata
- **Sense** — a specific meaning of a lexeme
- **Translation** — translations of a sense into other languages
- **Example** — usage examples
- **Form** — inflected or related forms

This allows the project to support cases where one written form has multiple meanings or parts of speech.

## Repository structure
- `apps/`
  - `api/` NestJS API
  - `web/` React Frontend
- `packages/` — Shared libraries and configuration (not yet implemented)

## Local Development
### Requirements

- Node.js
- pnpm
- Docker
- PostgreSQL via Docker
### Install dependencies
```bash
pnpm install
```

### Start the development envrionment
```bash
pnpm start:dev
```
This command starts the required Docker services and runs both the API and the frontend development servers.

## Scripts

| Command | Description |
|---|---|
| `pnpm start:dev` | Starts the database container and runs both the API and the web app in development mode |
| `pnpm docker:up` | Starts the PostgreSQL database container |
| `pnpm docker:down` | Stops and removes the Docker services |
| `pnpm dev:api` | Starts the NestJS API in development mode |
| `pnpm dev:web` | Starts the React frontend development server |
| `pnpm lint` | Runs ESLint across the repository |
| `pnpm lint:fix` | Runs ESLint and automatically fixes fixable issues |
| `pnpm format` | Formats the repository with Prettier |
| `pnpm format:check` | Checks formatting without modifying files |
| `pnpm prepare` | Initializes Husky Git hooks |


## Roadmap
- Improved dictionary search
- Add automated tests
- Search by normalized Yiddish forms
- Possible search by YIVO transliteration
- Bulk creation endpoints for nested resources
- More complete noun metadata
- More complete verb metadata, including past auxiliary and conjugation forms
- Usage labels
- Contribution and review workflow
- User roles and permissions
- Better seed data for testing realistic dictionary entries
- Automated semantic versioning
- CI improvements

## License

License to be decided.

