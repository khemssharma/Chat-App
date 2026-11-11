# Contributing to Chat-App

Thanks for your interest in improving **Chat-App**, a real-time chat application with end-to-end encryption, built on Socket.io, MongoDB, Express and React. Bug reports, fixes, docs and new features are all welcome.

**Stack:** Node.js · Express · Socket.io · MongoDB · React

## Ways to contribute

- 🐛 **Report a bug:** [open a bug report](https://github.com/khemssharma/Chat-App/issues/new?template=bug_report.yml)
- 💡 **Suggest a feature:** [open a feature request](https://github.com/khemssharma/Chat-App/issues/new?template=feature_request.yml)
- 📝 **Improve the docs:** typos, unclear steps and missing examples all count
- 🔧 **Fix an issue:** look for issues labelled `good first issue` or `help wanted`

For anything bigger than a small fix, please **open an issue first**, so we can agree on the approach before you spend time on it.

## Local setup

```bash
git clone https://github.com/<your-username>/Chat-App.git
cd Chat-App

# backend
cd backend
npm install
# create backend/.env (MongoDB URI, JWT secret, port)
npm run dev

# frontend (second terminal)
cd frontend
npm install
npm start
```

## Project layout

| Path | What lives there |
| --- | --- |
| `backend/` | Express + Socket.io server, MongoDB models |
| `frontend/` | React client, encryption on the client side |

## Making a change

1. **Fork** the repo and create a branch from `master`:
   ```bash
   git checkout -b feat/short-description   # or fix/…, docs/…, refactor/…
   ```
2. Make your change. Keep each PR focused on **one** thing.
3. Run the checks below.
4. Commit using [Conventional Commits](https://www.conventionalcommits.org/):
   ```
   feat: add rematch button
   fix: handle disconnect during game
   docs: clarify .env setup
   ```
5. Push to your fork and open a pull request against `master`. Fill in the PR template.

## Checks before you open a PR

```bash
(cd backend && npm test)      # backend tests
(cd frontend && npm run build)   # frontend must build
```

## Project-specific guidelines

- **Encryption is the core feature.** Messages must stay encrypted end to end: never log, store or send plaintext messages or private keys to the server.
- **Crypto changes** need a clear explanation in the PR of what changed and why it is still secure. Use well-known libraries; don't write your own crypto primitives.
- **Socket events:** if you add or rename an event, update both `backend/` and `frontend/` in the same PR.

## Code style

- Match the style of the code around your change.
- Use clear, descriptive names; avoid unexplained abbreviations.
- Remove debug logs and commented-out code before committing.
- Update the README if your change affects setup or usage.

## Reporting security issues

Please **don't open a public issue** for security vulnerabilities. Contact the maintainer privately through the [GitHub profile](https://github.com/khemssharma) with the details and steps to reproduce.

## Code of conduct

Be respectful and constructive. Harassment, personal attacks and spam aren't tolerated.

## License

By contributing, you agree that your contributions are licensed under the [MIT License](../LICENSE).
