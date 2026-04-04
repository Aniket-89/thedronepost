import { formatDate, calculateReadingTime, cn } from "@/lib/utils";

describe("Utils suite", () => {
  describe("formatDate", () => {
    it("formats a standard ISO string correctly", () => {
      const dateString = "2025-03-25T10:00:00Z";
      // Node.js locale output for en-IN results in '25 Mar 2025'
      expect(formatDate(dateString)).toMatch(/25 Mar 2025/i);
    });
  });

  describe("calculateReadingTime", () => {
    it("calculates words accurately", () => {
      // 200 words = 1 minute
      const shortText = Array(150).fill("word").join(" ");
      expect(calculateReadingTime(shortText)).toBe(1);

      const longText = Array(450).fill("word").join(" ");
      expect(calculateReadingTime(longText)).toBe(3);
    });

    it("evaluates a minimum of 1 minute", () => {
      expect(calculateReadingTime("short")).toBe(1);
    });
  });

  describe("cn", () => {
    it("merges dynamic classes correctly and filters out nulls", () => {
      const condition = false;
      const valid = true;
      expect(cn("base-class", condition && "hidden", valid && "flex", null, undefined)).toBe(
        "base-class flex"
      );
    });
  });
});
