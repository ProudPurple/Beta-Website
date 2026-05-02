# Cambridge Beta Club — Official Chapter Website

The official website for the Cambridge Beta Club chapter. Built and maintained by the chapter webmaster to keep members, advisors, and prospective members informed about events, news, and club resources.

🌐 **Live site:** [cambridgebeta-chi.vercel.app](https://cambridgebeta-chi.vercel.app)

---

## About

This is a web application built for our school's Beta Club chapter. It serves as the central hub for chapter information including announcements, event details, officer listings, and member resources. The backend is powered by Supabase, allowing dynamic content to be managed without redeploying the site.

## Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev) | UI framework |
| [Vite](https://vitejs.dev) | Build tool & dev server |
| [React Router DOM](https://reactrouter.com) | Client-side routing |
| [Supabase](https://supabase.com) | Backend, database & authentication |
| [Vercel](https://vercel.com) | Hosting & deployment |

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/ProudPurple/Beta-Website.git
cd Beta-Website

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root of the project and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> These values can be found in your Supabase project under **Settings → API**.

### Running Locally

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

The output will be in the `dist/` folder.

## Project Structure

```
Beta-Website/
├── public/          # Static assets (favicon, images)
├── src/
│   ├── components/  # Reusable UI components
│   ├── pages/       # Route-level page components
│   ├── App.jsx      # Root component with routing
│   └── main.jsx     # App entry point
├── index.html
├── vite.config.js
└── vercel.json      # Vercel SPA rewrite rules
```

## Deployment

This site is deployed on Vercel and configured to handle client-side routing via `vercel.json`. Any push to the `master` branch automatically triggers a new deployment.

To deploy your own instance, connect the repository to a Vercel project and add the environment variables above in the Vercel dashboard under **Settings → Environment Variables**.

## Contributing

This repository is maintained by the chapter webmaster. If you're a chapter officer and need content updated (events, announcements, officer info), please reach out directly rather than submitting a pull request.

If you're a future webmaster taking over this project, make sure you have access to:
- This GitHub repository
- The Vercel project
- The Supabase project

## License

This project is maintained for the exclusive use of the Cambridge Beta Club chapter and is not intended for redistribution.
