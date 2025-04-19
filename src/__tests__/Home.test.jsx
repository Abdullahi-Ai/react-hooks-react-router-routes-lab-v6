import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import routes from "../routes";

const router = createMemoryRouter(routes);

describe("Home Page", () => {
  test("renders 'Home Page' inside of an <h1 />", () => {
    render(<RouterProvider router={router} />);
    const h1 = screen.getByText(/Home Page/);
    expect(h1).toBeInTheDocument();
    expect(h1.tagName).toBe("H1");
  });

  test("displays a list of movie titles", async () => {
    render(<RouterProvider router={router} />);
    const titleList = await screen.findAllByRole("heading", { level: 2 });
    expect(titleList.length).toBeGreaterThan(2);
    expect(titleList[0].tagName).toBe("H2");
    expect(titleList[0].textContent).toBe("Doctor Strange");
  });

  test("displays links for each associated movie", async () => {
    render(<RouterProvider router={router} />);
    const linkList = await screen.findAllByRole("link", { name: /View Info/ });
    expect(linkList.length).toBeGreaterThan(2);
    expect(linkList[0]).toHaveAttribute("href", "/movie/1");
  });

  test("renders the <NavBar /> component", () => {
    render(<RouterProvider router={router} />);
    
    // Option 1: If your NavBar has a navigation role
    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
    
    // OR Option 2: If your NavBar has a specific test id
    // const nav = screen.getByTestId("navbar");
    // expect(nav).toBeInTheDocument();
    
    // OR Option 3: If you need to query by class (not recommended)
    // const nav = screen.getByRole("navigation");
    // expect(nav).toHaveClass("navbar");
  });
});