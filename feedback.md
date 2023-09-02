### PROS
- All acceptance criteria are met
- Usage of form onsubmit and cleaning the form after the submission
- Nice broken down components

### CONS
- TypeScript is not used
- The answers for the questions are mostly replied with "adding a new dependency" instead of providing a technical solution
- No update on readme file
- Unit tests are all failing because of a misconfiguration, jest fails to parse files
- “lint” script is not working, ESLint cannot find the configuration file
- WebSocket implementation is too basic, no error handling, no clean up/teardown, no handling edge cases like connection close etc.
- No usage of page regions, apart from the form everything is simply div
- Deliberatively throwing JS errors on ISIN format check fails
- Code styling is not consistent