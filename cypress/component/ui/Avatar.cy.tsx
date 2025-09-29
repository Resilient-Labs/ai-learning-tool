import React from "react";
import { Avatar } from "../../../components/ui/Avatar";

describe("Avatar Component", () => {
  // 1. Fundamental Structure
  describe("Component Structure", () => {
    it("should render as a div element", () => {
      cy.mount(<Avatar name="John Doe" />);

      cy.get("div").should("have.prop", "tagName", "DIV");
    });

    it("should be visible by default", () => {
      cy.mount(<Avatar name="Jane Smith" />);

      cy.get("div").should("be.visible");
    });

    it("should contain a span for initials", () => {
      cy.mount(<Avatar name="Test User" />);

      cy.get("div").find("span").should("exist");
    });
  });

  // 2. Rendering & Children (Initials Logic)
  describe("Initials Generation", () => {
    it("should display initials from single name", () => {
      cy.mount(<Avatar name="John" />);

      cy.get("span").should("contain.text", "J");
    });

    it("should display initials from full name", () => {
      cy.mount(<Avatar name="John Doe" />);

      cy.get("span").should("contain.text", "JD");
    });

    it("should display initials from multiple names", () => {
      cy.mount(<Avatar name="John Michael Doe" />);

      cy.get("span").should("contain.text", "JM");
    });

    it("should handle lowercase names", () => {
      cy.mount(<Avatar name="jane doe" />);

      cy.get("span").should("contain.text", "JD");
    });

    it("should handle names with extra spaces", () => {
      cy.mount(<Avatar name="  John   Doe  " />);

      cy.get("span").should("contain.text", "JD");
    });

    it("should limit to 2 characters maximum", () => {
      cy.mount(<Avatar name="John Michael Robert Doe" />);

      cy.get("span").then(($span) => {
        expect($span.text().length).to.be.at.most(2);
      });
    });
  });

  // 3. Sizes
  describe("Sizes", () => {
    it("should render all sizes without errors", () => {
      cy.mount(
        <div>
          <Avatar name="Small User" size="sm" data-testid="small" />
          <Avatar name="Medium User" size="md" data-testid="medium" />
          <Avatar name="Large User" size="lg" data-testid="large" />
        </div>
      );

      // All should exist and be visible
      cy.get('[data-testid="small"]').should("exist").should("be.visible");
      cy.get('[data-testid="medium"]').should("exist").should("be.visible");
      cy.get('[data-testid="large"]').should("exist").should("be.visible");
    });

    it("should accept size prop without breaking", () => {
      cy.mount(<Avatar name="Test User" size="lg" />);
      cy.get("div").should("be.visible");
      cy.get("span").should("contain.text", "TU");
    });

    it("should default to medium size when none specified", () => {
      cy.mount(<Avatar name="Default Size" />);

      cy.get("div").should("exist").should("be.visible");
    });
  });

  // 4. Required Props
  describe("Required Props", () => {
    it("should require name prop", () => {
      cy.mount(<Avatar name="Required Name" />);

      cy.get("span").should("not.be.empty");
    });

    it("should handle dynamic name changes", () => {
      const TestWrapper = () => {
        const [name, setName] = React.useState("Initial Name");

        React.useEffect(() => {
          setTimeout(() => setName("Updated Name"), 100);
        }, []);

        return <Avatar name={name} />;
      };

      cy.mount(<TestWrapper />);

      cy.get("span").should("contain.text", "IN");
      cy.get("span").should("contain.text", "UN");
    });
  });

  // 5. Custom Props Pass-Through
  describe("Custom Styling", () => {
    it("should accept custom className", () => {
      const customClass = "my-custom-avatar-class";
      cy.mount(<Avatar name="Custom User" className={customClass} />);

      cy.get("div").should("have.class", customClass);
    });

    it("should work with empty className", () => {
      cy.mount(<Avatar name="Empty Class" className="" />);

      cy.get("div").should("exist");
      cy.get("span").should("contain.text", "EC");
    });
  });

  // Integration: Prop combinations
  describe("Prop Combinations", () => {
    it("should handle all props together without breaking", () => {
      cy.mount(
        <Avatar name="Complex User Name" size="lg" className="custom-avatar" />
      );

      cy.get("div").should("have.class", "custom-avatar").should("be.visible");

      cy.get("span").should("contain.text", "CU");
    });
  });
});
