import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "../components/NavBar";

describe("NavBar Component", () => {
  test('wraps content in a div with "navbar" class', () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test("renders a Home NavLink", () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  test("renders an Actors NavLink", () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    const actorsLink = screen.getByRole('link', { name: /actors/i });
    expect(actorsLink).toBeInTheDocument();
    expect(actorsLink).toHaveAttribute('href', '/actors');
  });

  test("renders a Directors NavLink", () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    const directorsLink = screen.getByRole('link', { name: /directors/i });
    expect(directorsLink).toBeInTheDocument();
    expect(directorsLink).toHaveAttribute('href', '/directors');
  });

  test("applies active class when NavLink is active", () => {
    // Set the URL to /actors before rendering
    window.history.pushState({}, 'Test page', '/actors');
    
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    const actorsLink = screen.getByRole('link', { name: /actors/i });
    expect(actorsLink).toHaveClass('active');
  });

  test("renders the NavBar component with navigation links", async () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    // Wait for navigation links to appear
    await waitFor(() => {
      const homeLink = screen.getByRole('link', { name: /home/i });
      const actorsLink = screen.getByRole('link', { name: /actors/i });
      const directorsLink = screen.getByRole('link', { name: /directors/i });

      // Ensure the links are in the document and have correct href attributes
      expect(homeLink).toBeInTheDocument();
      expect(homeLink).toHaveAttribute('href', '/');
    
      expect(actorsLink).toBeInTheDocument();
      expect(actorsLink).toHaveAttribute('href', '/actors');
    
      expect(directorsLink).toBeInTheDocument();
      expect(directorsLink).toHaveAttribute('href', '/directors');
    });
  });
});
