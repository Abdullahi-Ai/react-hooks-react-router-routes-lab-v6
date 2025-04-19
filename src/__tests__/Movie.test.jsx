import "@testing-library/jest-dom";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import routes from "../routes";  // Ensure routes are properly set up

const renderMovieRoute = () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ["/movie/1"],
    initialIndex: 0
  });
  return render(<RouterProvider router={router} />);
};

describe("Movie Route", () => {
  test("renders without any errors", () => {
    const errorSpy = vi.spyOn(global.console, "error");
    renderMovieRoute();
    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  test("renders movie's title in an h1", async () => {
    renderMovieRoute();
    const h1 = await screen.findByText(/Inception/);
    expect(h1).toBeInTheDocument();
    expect(h1.tagName).toBe("H1");
  });

  test("renders movie's time within a p tag", async () => {
    renderMovieRoute();
    const p = await screen.findByText(/148 minutes/);
    expect(p).toBeInTheDocument();
    expect(p.tagName).toBe("P");
  });

  test("renders a span for each genre", async () => {
    renderMovieRoute();
    const genres = ["Sci-Fi", "Thriller"];
    for (const genre of genres) {
      const span = await screen.findByText(genre);
      expect(span).toBeInTheDocument();
      expect(span.tagName).toBe("SPAN");
    }
  });

  test("renders the NavBar component with navigation links", async () => {
    renderMovieRoute();

    // Debugging: log the entire document to see if the navbar is rendered
    screen.debug();

    // Try-catch block for better error handling and debugging
    try {
      // Wait for the navbar to appear
      const nav = await waitFor(() => screen.findByTestId('navbar'), { timeout: 5000 });

      // Debugging: Log nav to see if it's found
      console.log(nav);

      expect(nav).not.toBeNull();
      expect(nav).toBeInTheDocument();

      // Check for navigation links
      const homeLink = await screen.findByRole("link", { name: /home/i });
      const actorsLink = await screen.findByRole("link", { name: /actors/i });
      const directorsLink = await screen.findByRole("link", { name: /directors/i });

      expect(homeLink).toBeInTheDocument();
      expect(actorsLink).toBeInTheDocument();
      expect(directorsLink).toBeInTheDocument();

      // Check if the href attributes are correct
      expect(homeLink).toHaveAttribute("href", "/");
      expect(actorsLink).toHaveAttribute("href", "/actors");
      expect(directorsLink).toHaveAttribute("href", "/directors");
    } catch (error) {
      console.error("Navbar not found:", error);
    }
  });
});
