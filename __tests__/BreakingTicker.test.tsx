import { render, screen } from "@testing-library/react";
import { BreakingTicker } from "@/components/layout/BreakingTicker";

describe("BreakingTicker", () => {
  it("does not render if there are no headlines", () => {
    const { container } = render(<BreakingTicker headlines={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("duplicates headlines to create an infinite stream illusion", () => {
    render(<BreakingTicker headlines={["Headline 1", "Headline 2"]} />);
    const items1 = screen.getAllByText("Headline 1");
    const items2 = screen.getAllByText("Headline 2");
    
    // Duplicate array length = 2 * original length
    expect(items1.length).toBe(2);
    expect(items2.length).toBe(2);
  });
});
