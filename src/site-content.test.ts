import { describe, expect, it } from "vitest";
import { siteConfig } from "./config";
import { industries } from "./data";
import { routes } from "./router";

describe("public site content", () => {
  it("keeps public pricing aligned", () => {
    expect(siteConfig.pricing).toEqual({ store: "199", chain: "999" });
  });

  it("has one static route for every public page", () => {
    const paths = routes.map((route) => route.path).filter((path) => !path.includes(":pathMatch"));

    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).toHaveLength(13);
    expect(paths.filter((path) => path.startsWith("/solutions/"))).toEqual(
      industries.map((industry) => `/solutions/${industry.slug}`),
    );
  });
});
