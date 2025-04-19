import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import routes from "../routes";  // Adjust this import to match your actual file location

const actors = [
  {
    name: "Benedict Cumberbatch",
    movies: ["Doctor Strange", "The Imitation Game", "Black Mass"],
  },
  {
    name: "Justin Timberlake",
    movies: ["Trolls", "Friends with Benefits", "The Social Network"],
  },
  {
    name: "Anna Kendrick",
    movies: ["Pitch Perfect", "Into The Wood"],
  },
  {
    name: "Tom Cruise",
    movies: [
      "Jack Reacher: Never Go Back",
      "Mission Impossible 4",
      "War of the Worlds",
    ],
  },
];

// Create router once and reuse it
const setup = (initialEntries = ['/actors']) => {
  const router = createMemoryRouter(routes, {
    initialEntries,
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

test("renders 'Actors Page' inside of the <h1 />", () => {
  setup();
  const h1 = screen.getByText(/Actors Page/);
  expect(h1).toBeInTheDocument();
  expect(h1.tagName).toBe("H1");
});

test("renders each actor's name", async () => {
  setup();
  for (const actor of actors) {
    await waitFor(() => {
      expect(screen.getByText(actor.name)).toBeInTheDocument();
    });
  }
});

test("renders a <li /> for each movie", async () => {
  setup();
  for (const actor of actors) {
    for (const movie of actor.movies) {
      await waitFor(() => {
        const li = screen.getByText(movie);
        expect(li).toBeInTheDocument();
        expect(li.tagName).toBe("LI");
      });
    }
  }
});

test("renders the <NavBar /> component", async () => {
  setup();
  const nav = await screen.findByTestId("navbar");
  expect(nav).toBeInTheDocument();
});
