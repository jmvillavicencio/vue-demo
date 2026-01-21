# Vue Demo

A modern Vue 3 application with Vuetify, TypeScript, and Pug templates featuring authentication integration with a NestJS microservices backend.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Vue 3 | Frontend framework |
| Vuetify 3 | Material Design component library |
| Vite | Build tool and dev server |
| TypeScript | Type safety |
| Pug | Template engine |
| Pinia | State management |
| Vue Router | Client-side routing |
| Vitest | Unit testing |
| Docker | Containerization |

## Features

- **Dark Theme** - Custom dark theme with profile-style design
- **Authentication** - Full auth flow with email/password, Google OAuth, and Apple Sign In
- **Responsive** - Mobile-friendly layouts
- **Type Safe** - Full TypeScript coverage
- **Unit Tests** - Component tests with Vitest

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with profile-style landing |
| `/login` | Sign in with email/password or social providers |
| `/register` | Create account with email or social providers |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Docker (optional)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at http://localhost:5173

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
# API Configuration
VITE_API_URL=http://localhost:3000

# Google OAuth (from Google Cloud Console)
VITE_GOOGLE_CLIENT_ID=your-google-client-id

# Apple Sign In (from Apple Developer Portal)
VITE_APPLE_CLIENT_ID=your-apple-client-id
VITE_APPLE_REDIRECT_URI=http://localhost:8080
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run test` | Run unit tests |
| `npm run test:coverage` | Run tests with coverage |
| `npm run lint` | Lint and fix files |

## Docker

### Build and Run

```bash
# Using docker-compose
docker-compose up --build

# Or using docker directly
docker build -t vue-demo .
docker run -p 8080:80 vue-demo
```

The app will be available at http://localhost:8080

### Stop Container

```bash
docker-compose down
```

## Project Structure

```
vue-demo/
├── src/
│   ├── components/        # Reusable Vue components
│   │   ├── LoginForm.vue
│   │   ├── RegisterForm.vue
│   │   ├── ProfileBadge.vue
│   │   ├── TechBadge.vue
│   │   ├── SocialButton.vue
│   │   └── SocialLoginButton.vue
│   ├── views/             # Page components
│   │   ├── HomeView.vue
│   │   ├── LoginView.vue
│   │   └── RegisterView.vue
│   ├── stores/            # Pinia stores
│   │   └── auth.ts
│   ├── services/          # API and external services
│   │   ├── api.ts
│   │   ├── google-auth.ts
│   │   └── apple-auth.ts
│   ├── plugins/           # Vue plugins
│   │   └── vuetify.ts
│   ├── router/            # Vue Router config
│   │   └── index.ts
│   ├── types/             # TypeScript types
│   │   ├── index.ts
│   │   └── auth.ts
│   ├── App.vue
│   └── main.ts
├── tests/
│   ├── unit/              # Unit tests
│   └── setup.ts           # Test configuration
├── public/                # Static assets
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── vite.config.ts
├── vitest.config.ts
├── tsconfig.json
└── package.json
```

## API Integration

This app integrates with the [NestJS Microservices Demo](https://github.com/jmvillavicencio/nestjs-microservices-demo) backend.

### Auth Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register with email/password |
| POST | `/api/auth/login` | Login with email/password |
| POST | `/api/auth/google` | Google OAuth authentication |
| POST | `/api/auth/apple` | Apple Sign In authentication |
| POST | `/api/auth/refresh` | Refresh access token |
| POST | `/api/auth/logout` | Logout and revoke token |
| GET | `/api/auth/me` | Get current user profile |

## Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Run tests with coverage
npm run test:coverage
```

## Theme Customization

The dark theme is configured in `src/plugins/vuetify.ts`:

```typescript
const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#05122A',
    surface: '#0d1b3e',
    primary: '#42b883',
    // ...
  },
}
```

## License

MIT
