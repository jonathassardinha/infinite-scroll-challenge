import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

declare global {
  interface Window {
    IntersectionObserver: typeof IntersectionObserver;
    fetch: typeof fetch;
  }
}

// Mock IntersectionObserver globally for tests
globalThis.IntersectionObserver = class {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
} as unknown as typeof IntersectionObserver;
