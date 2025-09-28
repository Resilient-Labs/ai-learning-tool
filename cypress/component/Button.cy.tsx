import React from "react";
import { Button } from "../../components/ui/Button";

describe("Button Component", () => {
  // Test component structure (semantic correctness)
  describe("Component Structure", () => {
    it("should render as a button element", () => {
      cy.mount(<Button>Element test</Button>);

      cy.get("button").should("have.prop", "tagName", "BUTTON");
    });

    it("should be interactive by default", () => {
      cy.mount(<Button>Interactive test</Button>);

      cy.get("button").should("not.be.disabled").should("be.visible");
    });
  });

  // Test basic rendering and children
  describe("Rendering and Children", () => {
    it("should render with text content", () => {
      cy.mount(<Button>Click me</Button>);

      cy.get("button").should("exist").should("have.text", "Click me");
    });

    it("should render with JSX children", () => {
      cy.mount(
        <Button>
          <span data-testid="icon">🚀</span>
          <span>Launch</span>
        </Button>
      );

      cy.get("button").should("exist");
      cy.get('[data-testid="icon"]').should("contain.text", "🚀");
      cy.get("button").should("contain.text", "Launch");
    });

    it("should handle dynamic text content", () => {
      const dynamicText = "Dynamic Button Text";
      cy.mount(<Button>{dynamicText}</Button>);

      cy.get("button").should("contain.text", dynamicText);
    });
  });

  // Test that variants work without breaking functionality
  describe("Variants", () => {
    it("should render all variants without errors", () => {
      cy.mount(
        <div>
          <Button variant="default" data-testid="default">
            Default
          </Button>
          <Button variant="outline" data-testid="outline">
            Outline
          </Button>
          <Button variant="ghost" data-testid="ghost">
            Ghost
          </Button>
        </div>
      );

      // All should exist and be clickable
      cy.get('[data-testid="default"]').should("exist").should("be.visible");
      cy.get('[data-testid="outline"]').should("exist").should("be.visible");
      cy.get('[data-testid="ghost"]').should("exist").should("be.visible");
    });
  });

  // Test that sizes work without breaking functionality
  describe("Sizes", () => {
    it("should render all sizes without errors", () => {
      cy.mount(
        <div>
          <Button size="sm" data-testid="small">
            Small
          </Button>
          <Button size="md" data-testid="medium">
            Medium
          </Button>
          <Button size="lg" data-testid="large">
            Large
          </Button>
        </div>
      );

      // All should exist and be clickable
      cy.get('[data-testid="small"]').should("exist").should("be.visible");
      cy.get('[data-testid="medium"]').should("exist").should("be.visible");
      cy.get('[data-testid="large"]').should("exist").should("be.visible");
    });

    it("should accept size prop without breaking", () => {
      cy.mount(<Button size="lg">Large button</Button>);
      cy.get("button").should("contain.text", "Large button");
    });
  });

  // Test button types (this affects form behavior)
  describe("Button Types", () => {
    it("should default to button type", () => {
      cy.mount(<Button>Default Type</Button>);
      cy.get("button").should("have.attr", "type", "button");
    });

    it("should accept different button types", () => {
      cy.mount(<Button type="submit">Submit</Button>);
      cy.get("button").should("have.attr", "type", "submit");

      cy.mount(<Button type="reset">Reset</Button>);
      cy.get("button").should("have.attr", "type", "reset");
    });
  });

  // Test click functionality (core behavior)
  describe("Click Handling", () => {
    it("should call onClick handler when clicked", () => {
      const onClickSpy = cy.stub().as("onClickSpy");
      cy.mount(<Button onClick={onClickSpy}>Click me</Button>);

      cy.get("button").click();
      cy.get("@onClickSpy").should("have.been.calledOnce");
    });

    it("should work without onClick handler", () => {
      cy.mount(<Button>Click me</Button>);

      // Should not throw error when clicked
      cy.get("button").click();
      cy.get("button").should("exist"); // Still exists after click
    });

    it("should handle multiple clicks", () => {
      const onClickSpy = cy.stub().as("onClickSpy");
      cy.mount(<Button onClick={onClickSpy}>Click me</Button>);

      cy.get("button").click().click().click();
      cy.get("@onClickSpy").should("have.been.calledThrice");
    });
  });

  // Test custom className (developer experience)
  describe("Custom Styling", () => {
    it("should accept custom className", () => {
      const customClass = "my-custom-class";
      cy.mount(<Button className={customClass}>Custom</Button>);

      cy.get("button").should("have.class", customClass);
    });

    it("should work with empty className", () => {
      cy.mount(<Button className="">Empty Class</Button>);

      cy.get("button").should("exist").should("contain.text", "Empty Class");
    });
  });
});
