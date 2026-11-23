import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import type { ImgHTMLAttributes } from "react";
import { afterEach, vi } from "vitest";

afterEach(() => cleanup());

type NextImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean;
  preload?: boolean;
  priority?: boolean;
};

vi.mock("next/image", () => ({
  default: ({ fill, preload, priority, ...props }: NextImageProps) => {
    void fill;
    void preload;
    void priority;
    return <img {...props} />;
  },
}));
