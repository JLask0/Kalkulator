import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from './pages/Register';
import axios from 'axios';

jest.mock('axios');

test('renders registration form', () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );

  // Ensure that form elements are rendered
  expect(screen.getByText(/Rejestracja/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/imie/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/nazwisko/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Hasło/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Akceptuję warunki/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Utwórz konto/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Mam już konto/i })).toBeInTheDocument();
});

test('handles form submission', async () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );

  // Mock the axios post request to prevent actual API calls
  axios.post.mockResolvedValue({ data: { success: true } });

  // Fill in the form
  fireEvent.change(screen.getByPlaceholderText(/imie/i), { target: { value: 'John' } });
  fireEvent.change(screen.getByPlaceholderText(/nazwisko/i), { target: { value: 'Doe' } });
  fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'john.doe@example.com' } });
  fireEvent.change(screen.getByPlaceholderText(/Hasło/i), { target: { value: 'Password1!' } });
  fireEvent.click(screen.getByLabelText(/Akceptuję warunki/i));

  // Submit the form
  fireEvent.click(screen.getByRole('button', { name: /Utwórz konto/i }));

  // Wait for the form submission to complete
  await waitFor(() => expect(axios.post).toHaveBeenCalled());
});

// Add more tests as needed
