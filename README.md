# The 1v1 Fox Carnival

Registration website for the Super Animal Royale event.

## Structure

- `index.html`: English registration page at the root
- `en/`: English registration route
- `fr/`: French registration route
- `css/style.css`: shared stylesheet
- `js/registration.js`: language menu and form submission
- `api/register.js`: Vercel serverless endpoint for Discord registrations
- `assets/language.svg`: language selector icon (to be added)

## Vercel setup

1. Import this repository into Vercel.
2. Add an Environment Variable named `DISCORD_WEBHOOK`.
3. Set its value to the Discord webhook URL. Keep it out of the repository and frontend code.
4. Deploy the project.

The form sends a POST request to `/api/register`. Each valid registration is sent as a separate Discord embed.

The API requires Node.js with global `fetch` support. Form submission requires the deployed API and the `DISCORD_WEBHOOK` environment variable.