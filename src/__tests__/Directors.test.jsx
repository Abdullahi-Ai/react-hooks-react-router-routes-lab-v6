import "@testing-library/jest-dom";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen, within } from "@testing-library/react";
import routes from "../routes";

// Test data matching the actual rendered content
const directors = [
  {
    name: "Christopher Nolan",
    movies: ["Inception", "The Dark Knight", "Dunkirk"],
  },
  {
    name: "Quentin Tarantino",
    movies: ["Pulp Fiction", "Kill Bill", "Django Unchained"],
  },
];

const setup = () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ["/directors"],
    initialIndex: 0
  });
  return render(<RouterProvider router={router} />);
};

test("renders without any errors", () => {
  const errorSpy = vi.spyOn(global.console, "error");
  setup();
  expect(errorSpy).not.toHaveBeenCalled();
  errorSpy.mockRestore();
});

test("renders 'Directors Page' inside of an <h1>", async () => {
  setup();
  const h1 = await screen.findByRole('heading', { 
    name: /Directors Page/,
    level: 1
  });
  expect(h1).toBeInTheDocument();
});

test("renders each director's name in an <h2>", async () => {
  setup();
  for (const director of directors) {
    const heading = await screen.findByRole('heading', { 
      name: director.name,
      level: 2
    });
    expect(heading).toBeInTheDocument();
    expect(heading.closest('article')).toBeInTheDocument();
  }
});

test("renders each movie in a list item within the director's article", async () => {
  setup();
  for (const director of directors) {
    // Find the director's <h2>
    const heading = await screen.findByRole('heading', { 
      name: director.name,
      level: 2
    });

    // Get the article containing this heading
    const article = heading.closest("article");
    expect(article).toBeInTheDocument();

    // Use within() to scope search inside the article
    const utils = within(article);
    for (const movie of director.movies) {
      const li = utils.getByText(movie);
      expect(li).toBeInTheDocument();
      expect(li.tagName).toBe("LI");
    }
  }
});

test("renders the navigation bar with all links", async () => {
  setup();

  const nav = await screen.findByRole('navigation');
  expect(nav).toBeInTheDocument();

  const homeLink = await screen.findByRole('link', { name: /home/i });
  const actorsLink = await screen.findByRole('link', { name: /actors/i });
  const directorsLink = await screen.findByRole('link', { name: /directors/i });

  expect(homeLink).toBeInTheDocument();
  expect(actorsLink).toBeInTheDocument();
  expect(directorsLink).toBeInTheDocument();

  expect(homeLink).toHaveAttribute('href', '/');
  expect(actorsLink).toHaveAttribute('href', '/actors');
  expect(directorsLink).toHaveAttribute('href', '/directors');
});
