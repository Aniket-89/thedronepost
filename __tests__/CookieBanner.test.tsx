import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { CookieBanner } from "@/components/layout/CookieBanner";

describe("CookieBanner", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("does not render immediately, drops in after 1500ms", async () => {
    render(<CookieBanner />);
    expect(screen.queryByText("Cookie Settings")).not.toBeInTheDocument();
    
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    
    await waitFor(() => {
      expect(screen.getByText("Cookie Settings")).toBeInTheDocument();
    });
  });

  it("sets localStorage to accepted when Accept All is clicked", async () => {
    render(<CookieBanner />);
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    
    const acceptBtn = await screen.findByText("Accept All");
    fireEvent.click(acceptBtn);
    
    expect(localStorage.getItem("td_cookie_consent")).toBe("accepted");
    expect(screen.queryByText("Cookie Settings")).not.toBeInTheDocument();
  });

  it("sets localStorage to declined when Decline is clicked", async () => {
    render(<CookieBanner />);
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    
    const declineBtn = await screen.findByText("Decline");
    fireEvent.click(declineBtn);
    
    expect(localStorage.getItem("td_cookie_consent")).toBe("declined");
    expect(screen.queryByText("Cookie Settings")).not.toBeInTheDocument();
  });

  it("does not render at all if consent already exists", () => {
    localStorage.setItem("td_cookie_consent", "accepted");
    render(<CookieBanner />);
    
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    
    expect(screen.queryByText("Cookie Settings")).not.toBeInTheDocument();
  });
});
