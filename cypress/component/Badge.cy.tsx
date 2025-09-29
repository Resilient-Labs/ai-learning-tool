import React from "react";
import { Badge } from "../../components/ui/Badge";

describe("Badge Component", () => {
  // 1. Fundamental Structure
  describe("Component Structure", () => {
    it("should render as a span element", () => {
      cy.mount(<Badge>Test Badge</Badge>);

      cy.get("span").should("have.prop", "tagName", "SPAN");
    });

    it("should be visible by default", () => {
      cy.mount(<Badge>Visible Badge</Badge>);

      cy.get("span").should("be.visible");
    });
  });

  // 2. Rendering & Children
  describe("Rendering and Children", () => {
    it("should render with text content", () => {
      cy.mount(<Badge>Badge Text</Badge>);

      cy.get("span").should("exist").should("have.text", "Badge Text");
    });

    it("should render with JSX children", () => {
      cy.mount(
        <Badge>
          <span data-testid="icon">✓</span>
          <span>Success</span>
        </Badge>
      );

      cy.get("span").should("exist");
      cy.get('[data-testid="icon"]').should("contain.text", "✓");
      cy.get("span").should("contain.text", "Success");
    });

    it("should handle dynamic text content", () => {
      const dynamicText = "Dynamic Badge";
      cy.mount(<Badge>{dynamicText}</Badge>);

      cy.get("span").should("contain.text", dynamicText);
    });
  });

  // 3. Variants
  describe("Variants", () => {
    it("should render all variants without errors", () => {
      cy.mount(
        <div>
          <Badge variant="default" data-testid="default">
            Default
          </Badge>
          <Badge variant="secondary" data-testid="secondary">
            Secondary
          </Badge>
          <Badge variant="outline" data-testid="outline">
            Outline
          </Badge>
        </div>
      );

      // All should exist and be visible
      cy.get('[data-testid="default"]').should("exist").should("be.visible");
      cy.get('[data-testid="secondary"]').should("exist").should("be.visible");
      cy.get('[data-testid="outline"]').should("exist").should("be.visible");
    });

    it("should accept variant prop without breaking", () => {
      cy.mount(<Badge variant="secondary">Secondary works</Badge>);
      cy.get("span").should("contain.text", "Secondary works");

      cy.mount(<Badge variant="outline">Outline works</Badge>);
      cy.get("span").should("contain.text", "Outline works");
    });

    it("should default to 'default' variant when none specified", () => {
      cy.mount(<Badge>No variant specified</Badge>);

      cy.get("span").should("exist").should("be.visible");
    });
  });

  // 4. Custom Props Pass-Through
  describe("Custom Styling", () => {
    it("should accept custom className", () => {
      const customClass = "my-custom-badge-class";
      cy.mount(<Badge className={customClass}>Custom Badge</Badge>);

      cy.get("span").should("have.class", customClass);
    });

    it("should work with empty className", () => {
      cy.mount(<Badge className="">Empty Class</Badge>);

      cy.get("span").should("exist").should("contain.text", "Empty Class");
    });
  });

  // Integration: Prop combinations
  describe("Prop Combinations", () => {
    it("should handle all props together without breaking", () => {
      cy.mount(
        <Badge variant="outline" className="custom-badge">
          Complex Badge
        </Badge>
      );

      cy.get("span")
        .should("have.text", "Complex Badge")
        .should("have.class", "custom-badge")
        .should("be.visible");
    });
  });
});
