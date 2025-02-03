
import { describe, test, expect } from "vitest";
import { greet } from "../src/index";

describe("greet function", () => {
  test("should return a greeting", () => {
    expect(greet("Alice")).toBe("Hello, Alice!");
  });
});
