import React from "react";
import { StatsCard } from "../../components/ui/StatsCard";

describe("StatsCard Component", () => {
  // 1. Fundamental Structure
  describe("Component Structure", () => {
    it("should render as a div element", () => {
      cy.mount(
        <StatsCard
          title="Test Stat"
          value="100"
          icon={<span data-testid="test-icon">📊</span>}
        />
      );

      cy.get("div").should("have.prop", "tagName", "DIV");
    });

    it("should be visible by default", () => {
      cy.mount(
        <StatsCard title="Visible Stat" value={42} icon={<span>📈</span>} />
      );

      cy.get("div").should("be.visible");
    });
  });

  // 2. Rendering & Children (Required Content)
  describe("Content Rendering", () => {
    it("should display title text", () => {
      cy.mount(
        <StatsCard title="Total Users" value="1,234" icon={<span>👥</span>} />
      );

      cy.contains("Total Users").should("exist");
    });

    it("should display string values", () => {
      cy.mount(
        <StatsCard title="Revenue" value="$50,000" icon={<span>💰</span>} />
      );

      cy.contains("$50,000").should("exist");
    });

    it("should display numeric values", () => {
      cy.mount(
        <StatsCard
          title="Active Sessions"
          value={1234}
          icon={<span>🔥</span>}
        />
      );

      cy.contains("1234").should("exist");
    });

    it("should render icon content", () => {
      cy.mount(
        <StatsCard
          title="Downloads"
          value="500"
          icon={<span data-testid="download-icon">⬇️</span>}
        />
      );

      cy.get('[data-testid="download-icon"]')
        .should("exist")
        .should("contain.text", "⬇️");
    });

    it("should render JSX icons", () => {
      const CustomIcon = () => <div data-testid="custom-icon">Custom</div>;

      cy.mount(
        <StatsCard title="Custom Metric" value="999" icon={<CustomIcon />} />
      );

      cy.get('[data-testid="custom-icon"]')
        .should("exist")
        .should("contain.text", "Custom");
    });
  });

  // 3. Required Props
  describe("Required Props", () => {
    it("should handle all required props", () => {
      cy.mount(
        <StatsCard
          title="Required Test"
          value="Required Value"
          icon={<span>✅</span>}
        />
      );

      cy.contains("Required Test").should("exist");
      cy.contains("Required Value").should("exist");
      cy.contains("✅").should("exist");
    });

    it("should handle dynamic prop changes", () => {
      const TestWrapper = () => {
        const [value, setValue] = React.useState(100);

        React.useEffect(() => {
          setTimeout(() => setValue(200), 100);
        }, []);

        return (
          <StatsCard
            title="Dynamic Value"
            value={value}
            icon={<span>📊</span>}
          />
        );
      };

      cy.mount(<TestWrapper />);

      cy.contains("100").should("exist");
      cy.contains("200").should("exist");
    });
  });

  // 4. Optional Props
  describe("Optional Props", () => {
    it("should work without iconColor prop", () => {
      cy.mount(
        <StatsCard title="Default Color" value="123" icon={<span>🎨</span>} />
      );

      cy.get("div").should("be.visible");
      cy.contains("Default Color").should("exist");
    });

    it("should accept iconColor prop without breaking", () => {
      cy.mount(
        <StatsCard
          title="Custom Color"
          value="456"
          icon={<span>🌈</span>}
          iconColor="text-blue-600"
        />
      );

      cy.get("div").should("be.visible");
      cy.contains("Custom Color").should("exist");
    });
  });

  // 5. Custom Props Pass-Through
  describe("Custom Styling", () => {
    it("should accept custom className", () => {
      const customClass = "my-custom-stats-class";
      cy.mount(
        <StatsCard
          title="Custom Styled"
          value="789"
          icon={<span>✨</span>}
          className={customClass}
        />
      );

      cy.get("div").should("have.class", customClass);
    });

    it("should work with empty className", () => {
      cy.mount(
        <StatsCard
          title="Empty Class"
          value="000"
          icon={<span>🔄</span>}
          className=""
        />
      );

      cy.get("div").should("exist");
      cy.contains("Empty Class").should("exist");
    });
  });

  // Integration: Prop combinations
  describe("Prop Combinations", () => {
    it("should handle all props together without breaking", () => {
      cy.mount(
        <StatsCard
          title="Complete Example"
          value={9999}
          icon={<span data-testid="complete-icon">🚀</span>}
          iconColor="text-purple-600"
          className="custom-stats-card"
        />
      );

      cy.get("div")
        .should("have.class", "custom-stats-card")
        .should("be.visible");

      cy.contains("Complete Example").should("exist");
      cy.contains("9999").should("exist");
      cy.get('[data-testid="complete-icon"]').should("contain.text", "🚀");
    });

    it("should handle different value types in combination", () => {
      cy.mount(
        <div>
          <StatsCard
            title="String Value"
            value="$1,000"
            icon={<span>💵</span>}
            data-testid="string-card"
          />
          <StatsCard
            title="Number Value"
            value={42}
            icon={<span>🔢</span>}
            data-testid="number-card"
          />
        </div>
      );

      cy.contains("String Value").should("exist");
      cy.contains("$1,000").should("exist");
      cy.contains("Number Value").should("exist");
      cy.contains("42").should("exist");
    });
  });
});
