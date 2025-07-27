# GloAlchemist Skin Analysis App

A responsive web application built with Next.js and TypeScript that provides personalized skincare treatment recommendations based on user questionnaire responses.

## Features

- **Interactive Questionnaire**: Collects user information including skin type, primary concerns, and personal details
- **Personalized Recommendations**: Provides tailored treatment suggestions based on user responses
- **Lead Generation**: Captures email addresses for follow-up marketing
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Accessibility Compliant**: WCAG 2.1 AA compliant with proper ARIA labels and keyboard navigation
- **SEO Optimized**: Includes meta tags, structured data, and performance optimizations

## Technology Stack

- **Framework**: Next.js 15.4.4 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Testing**: Jest with React Testing Library
- **Deployment**: Optimized for Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd glo-alchemist-skin-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with SEO meta tags
│   ├── page.tsx           # Main application page
│   ├── globals.css        # Global styles
│   └── __tests__/         # Page component tests
├── components/            # Reusable components
│   ├── ui/               # UI components
│   └── PerformanceOptimizer.tsx
├── data/                 # Data layer
│   ├── recommendations.ts # Treatment recommendations
│   └── __tests__/        # Data layer tests
└── types/                # TypeScript type definitions
    └── index.ts
```

## Key Components

### Form Validation
- Client-side validation for required fields
- Email format validation
- Real-time error clearing
- Accessible error messages

### Recommendation Engine
- Static recommendation matching based on user concerns
- Four treatment categories: Acne, Anti-Aging, Texture, Hair Removal
- Educational content for each recommendation

### Accessibility Features
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Skip to main content link

### Performance Optimizations
- Static generation ready
- Preloading of critical resources
- Optimized CSS with Tailwind
- Lazy loading where appropriate

## Testing

The application includes comprehensive tests covering:
- Form validation logic
- Recommendation matching
- User interaction flows
- Accessibility compliance
- Error handling

Run tests with:
```bash
npm test
```

## Deployment

The application is optimized for deployment on Vercel:

1. Connect your repository to Vercel
2. Configure environment variables if needed
3. Deploy automatically on push to main branch

## SEO Features

- Optimized meta tags and descriptions
- Structured data (JSON-LD) markup
- Open Graph and Twitter Card support
- Canonical URLs
- Performance optimizations for Core Web Vitals

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is proprietary to GloAlchemist.