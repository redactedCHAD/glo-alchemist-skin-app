import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../page';

// Mock the recommendations module
jest.mock('@/data/recommendations', () => ({
  getRecommendation: jest.fn((concern: string) => {
    const mockRecommendations: { [key: string]: { title: string; desc: string } } = {
      acne: {
        title: 'Acne Healing Facials',
        desc: 'Mock acne treatment description'
      },
      wrinkles: {
        title: 'Anti-Aging Facial Treatments',
        desc: 'Mock anti-aging treatment description'
      }
    };
    return mockRecommendations[concern] || null;
  })
}));

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the main heading and form', () => {
    render(<Home />);
    
    expect(screen.getByText('Glo Alchemist Skin Analysis')).toBeInTheDocument();
    expect(screen.getByText('Answer a few quick questions and receive tailored skin care recommendations from our specialists.')).toBeInTheDocument();
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('displays all required form fields', () => {
    render(<Home />);
    
    expect(screen.getByLabelText(/Your Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Skin Type/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Primary Concern/)).toBeInTheDocument();
  });

  it('displays optional form fields', () => {
    render(<Home />);
    
    expect(screen.getByLabelText(/What do you want to achieve/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Current Routine/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Special Conditions/)).toBeInTheDocument();
  });

  it('shows validation errors for empty required fields', async () => {
    const user = userEvent.setup();
    render(<Home />);
    
    const submitButton = screen.getByRole('button', { name: /Get My Recommendations/ });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Please select your skin type')).toBeInTheDocument();
      expect(screen.getByText('Please select your primary concern')).toBeInTheDocument();
    });
  });

  it('shows email validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<Home />);
    
    const emailInput = screen.getByLabelText(/Your Email/);
    await user.type(emailInput, 'invalid-email');
    
    const submitButton = screen.getByRole('button', { name: /Get My Recommendations/ });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });
  });

  it('submits form successfully with valid data', async () => {
    const user = userEvent.setup();
    render(<Home />);
    
    // Fill out the form
    await user.type(screen.getByLabelText(/Your Name/), 'John Doe');
    await user.type(screen.getByLabelText(/Your Email/), 'john@example.com');
    await user.selectOptions(screen.getByLabelText(/Your Skin Type/), 'oily');
    await user.selectOptions(screen.getByLabelText(/Primary Concern/), 'acne');
    
    const submitButton = screen.getByRole('button', { name: /Get My Recommendations/ });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Acne Healing Facials')).toBeInTheDocument();
      expect(screen.getByText('Mock acne treatment description')).toBeInTheDocument();
      expect(screen.getByText('Book Free Consult')).toBeInTheDocument();
    });
  });

  it('clears validation errors when user starts typing', async () => {
    const user = userEvent.setup();
    render(<Home />);
    
    // Trigger validation errors
    const submitButton = screen.getByRole('button', { name: /Get My Recommendations/ });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });
    
    // Start typing in name field
    const nameInput = screen.getByLabelText(/Your Name/);
    await user.type(nameInput, 'J');
    
    await waitFor(() => {
      expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
    });
  });

  it('shows loading state during form submission', async () => {
    const user = userEvent.setup();
    render(<Home />);
    
    // Fill out the form
    await user.type(screen.getByLabelText(/Your Name/), 'John Doe');
    await user.type(screen.getByLabelText(/Your Email/), 'john@example.com');
    await user.selectOptions(screen.getByLabelText(/Your Skin Type/), 'oily');
    await user.selectOptions(screen.getByLabelText(/Primary Concern/), 'acne');
    
    const submitButton = screen.getByRole('button', { name: /Get My Recommendations/ });
    await user.click(submitButton);
    
    // Check for loading state
    expect(screen.getByText('Processing...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });
});