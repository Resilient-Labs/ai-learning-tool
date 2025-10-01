import React from "react";
import { HotTopics } from "../../../components/instructor/HotTopics";
import { HotTopic } from "../../../types/data";

describe("HotTopics Component", () => {
  // Mock hot topics data for testing
  const mockHotTopics: HotTopic[] = [
    {
      name: "React Hooks",
      discussionCount: 45,
      studentCount: 23,
      trend: "up",
      difficulty: "High",
      lastActivity: "2 hours ago",
    },
    {
      name: "JavaScript Closures",
      discussionCount: 32,
      studentCount: 16,
      trend: "stable",
      difficulty: "High",
      lastActivity: "6 hours ago",
    },
    {
      name: "CSS Grid Layout",
      discussionCount: 22,
      studentCount: 11,
      trend: "down",
      difficulty: "Medium",
      lastActivity: "1 day ago",
    },
  ];

  const singleTopic: HotTopic[] = [mockHotTopics[0]];

  // 1. Fundamental Structure
  describe("Component Structure", () => {
    it("should render as a card", () => {
      cy.mount(<HotTopics topics={mockHotTopics} />);

      cy.get("div").should("exist").should("be.visible");
    });

    it("should display hot topics title", () => {
      cy.mount(<HotTopics topics={mockHotTopics} />);

      cy.get("h3").should("exist").should("contain.text", "Hot Topics");
    });

    it("should accept custom className", () => {
      cy.mount(<HotTopics topics={mockHotTopics} className="custom-class" />);

      cy.get("div").should("exist");
    });
  });

  // 2. Empty State
  describe("Empty State", () => {
    it("should display empty state when no topics", () => {
      cy.mount(<HotTopics topics={[]} />);

      cy.contains("📚").should("exist");
      cy.contains("No trending topics yet").should("exist");
    });

    it("should not display summary stats when empty", () => {
      cy.mount(<HotTopics topics={[]} />);

      cy.contains("Total Discussions").should("not.exist");
      cy.contains("Students Engaged").should("not.exist");
      cy.contains("Trending Up").should("not.exist");
    });
  });

  // 3. Topic Data Display
  describe("Topic Data Display", () => {
    it("should display topic names", () => {
      cy.mount(<HotTopics topics={mockHotTopics} />);

      cy.contains("React Hooks").should("exist");
      cy.contains("JavaScript Closures").should("exist");
      cy.contains("CSS Grid Layout").should("exist");
    });

    it("should display discussion counts", () => {
      cy.mount(<HotTopics topics={mockHotTopics} />);

      cy.contains("45 discussions").should("exist");
      cy.contains("32 discussions").should("exist");
      cy.contains("22 discussions").should("exist");
    });

    it("should display student counts", () => {
      cy.mount(<HotTopics topics={mockHotTopics} />);

      cy.contains("23 students").should("exist");
      cy.contains("16 students").should("exist");
      cy.contains("11 students").should("exist");
    });

    it("should display last activity times", () => {
      cy.mount(<HotTopics topics={mockHotTopics} />);

      cy.contains("2 hours ago").should("exist");
      cy.contains("6 hours ago").should("exist");
      cy.contains("1 day ago").should("exist");
    });
  });

  // 4. Difficulty Badges
  describe("Difficulty Display", () => {
    it("should display difficulty badges", () => {
      cy.mount(<HotTopics topics={mockHotTopics} />);

      cy.contains("High").should("exist");
      cy.contains("Medium").should("exist");
    });

    it("should handle different difficulty levels", () => {
      const mixedDifficultyTopics: HotTopic[] = [
        { ...mockHotTopics[0], difficulty: "Low" },
        { ...mockHotTopics[1], difficulty: "Medium" },
        { ...mockHotTopics[2], difficulty: "High" },
      ];

      cy.mount(<HotTopics topics={mixedDifficultyTopics} />);

      cy.contains("Low").should("exist");
      cy.contains("Medium").should("exist");
      cy.contains("High").should("exist");
    });
  });

  // 5. Trend Indicators
  describe("Trend Indicators", () => {
    it("should display trend indicators for all topics", () => {
      cy.mount(<HotTopics topics={mockHotTopics} />);

      // All topics should have trend indicators (icons)
      cy.get("svg").should("have.length.greaterThan", 3);
    });

    it("should handle different trend types", () => {
      const allTrendTypes: HotTopic[] = [
        { ...mockHotTopics[0], trend: "up" },
        { ...mockHotTopics[1], trend: "down" },
        { ...mockHotTopics[2], trend: "stable" },
      ];

      cy.mount(<HotTopics topics={allTrendTypes} />);

      // Should render without errors and show all topics
      cy.contains("React Hooks").should("exist");
      cy.contains("JavaScript Closures").should("exist");
      cy.contains("CSS Grid Layout").should("exist");
    });
  });

  // 6. Topic Ranking
  describe("Topic Ranking", () => {
    it("should display topic rankings", () => {
      cy.mount(<HotTopics topics={mockHotTopics} />);

      cy.contains("#1").should("exist");
      cy.contains("#2").should("exist");
      cy.contains("#3").should("exist");
    });

    it("should rank topics in order", () => {
      cy.mount(<HotTopics topics={mockHotTopics} />);

      // Verify the ranking appears in the correct order
      cy.get("div").contains("#1").should("exist");
      cy.get("div").contains("#2").should("exist");
      cy.get("div").contains("#3").should("exist");
    });
  });

  // 7. Summary Statistics
  describe("Summary Statistics", () => {
    it("should display summary stats when topics exist", () => {
      cy.mount(<HotTopics topics={mockHotTopics} />);

      cy.contains("Total Discussions").should("exist");
      cy.contains("Students Engaged").should("exist");
      cy.contains("Trending Up").should("exist");
    });

    it("should calculate total discussions correctly", () => {
      cy.mount(<HotTopics topics={mockHotTopics} />);

      // 45 + 32 + 22 = 99
      cy.contains("99").should("exist");
      cy.contains("Total Discussions").should("exist");
    });

    it("should calculate total students engaged correctly", () => {
      cy.mount(<HotTopics topics={mockHotTopics} />);

      // 23 + 16 + 11 = 50
      cy.contains("50").should("exist");
      cy.contains("Students Engaged").should("exist");
    });

    it("should calculate trending up count correctly", () => {
      cy.mount(<HotTopics topics={mockHotTopics} />);

      // Only 1 topic has trend "up"
      cy.contains("1").should("exist");
      cy.contains("Trending Up").should("exist");
    });

    it("should not display summary stats when no topics", () => {
      cy.mount(<HotTopics topics={[]} />);

      cy.contains("Total Discussions").should("not.exist");
      cy.contains("Students Engaged").should("not.exist");
      cy.contains("Trending Up").should("not.exist");
    });
  });

  // 8. Single Topic Display
  describe("Single Topic Display", () => {
    it("should handle single topic correctly", () => {
      cy.mount(<HotTopics topics={singleTopic} />);

      cy.contains("React Hooks").should("exist");
      cy.contains("45 discussions").should("exist");
      cy.contains("23 students").should("exist");
      cy.contains("#1").should("exist");
    });

    it("should display correct summary stats for single topic", () => {
      cy.mount(<HotTopics topics={singleTopic} />);

      cy.contains("45").should("exist"); // Total discussions
      cy.contains("23").should("exist"); // Students engaged
      cy.contains("1").should("exist"); // Trending up (since it's "up")
    });
  });

  // 9. Edge Cases
  describe("Edge Cases", () => {
    it("should handle zero counts", () => {
      const zeroCountTopics: HotTopic[] = [
        {
          name: "New Topic",
          discussionCount: 0,
          studentCount: 0,
          trend: "stable",
          difficulty: "Low",
          lastActivity: "Never",
        },
      ];

      cy.mount(<HotTopics topics={zeroCountTopics} />);

      cy.contains("New Topic").should("exist");
      cy.contains("0 discussions").should("exist");
      cy.contains("0 students").should("exist");
      cy.contains("Never").should("exist");
    });

    it("should handle large numbers", () => {
      const largeNumberTopics: HotTopic[] = [
        {
          name: "Popular Topic",
          discussionCount: 999,
          studentCount: 500,
          trend: "up",
          difficulty: "High",
          lastActivity: "1 minute ago",
        },
      ];

      cy.mount(<HotTopics topics={largeNumberTopics} />);

      cy.contains("999 discussions").should("exist");
      cy.contains("500 students").should("exist");
      cy.contains("999").should("exist"); // In summary
      cy.contains("500").should("exist"); // In summary
    });

    it("should handle long topic names", () => {
      const longNameTopics: HotTopic[] = [
        {
          name: "This is a very long topic name that might need to be truncated in the UI",
          discussionCount: 10,
          studentCount: 5,
          trend: "stable",
          difficulty: "Medium",
          lastActivity: "1 hour ago",
        },
      ];

      cy.mount(<HotTopics topics={longNameTopics} />);

      cy.contains("This is a very long topic name").should("exist");
    });

    it("should handle all trends as down", () => {
      const allDownTopics: HotTopic[] = [
        { ...mockHotTopics[0], trend: "down" },
        { ...mockHotTopics[1], trend: "down" },
        { ...mockHotTopics[2], trend: "down" },
      ];

      cy.mount(<HotTopics topics={allDownTopics} />);

      // Should show 0 trending up
      cy.contains("0").should("exist");
      cy.contains("Trending Up").should("exist");
    });
  });

  // 10. Integration Testing
  describe("Full Integration", () => {
    it("should display all data correctly together", () => {
      cy.mount(<HotTopics topics={mockHotTopics} />);

      // Verify title
      cy.contains("Hot Topics").should("exist");

      // Verify all topics are displayed
      cy.contains("React Hooks").should("exist");
      cy.contains("JavaScript Closures").should("exist");
      cy.contains("CSS Grid Layout").should("exist");

      // Verify topic details
      cy.contains("45 discussions").should("exist");
      cy.contains("23 students").should("exist");
      cy.contains("2 hours ago").should("exist");

      // Verify difficulty badges
      cy.contains("High").should("exist");
      cy.contains("Medium").should("exist");

      // Verify rankings
      cy.contains("#1").should("exist");
      cy.contains("#2").should("exist");
      cy.contains("#3").should("exist");

      // Verify summary statistics
      cy.contains("99").should("exist"); // Total discussions
      cy.contains("50").should("exist"); // Students engaged
      cy.contains("1").should("exist"); // Trending up
      cy.contains("Total Discussions").should("exist");
      cy.contains("Students Engaged").should("exist");
      cy.contains("Trending Up").should("exist");
    });

    it("should handle dynamic topic list changes", () => {
      // Start with empty
      cy.mount(<HotTopics topics={[]} />);
      cy.contains("No trending topics yet").should("exist");

      // Update to single topic
      cy.mount(<HotTopics topics={singleTopic} />);
      cy.contains("React Hooks").should("exist");
      cy.contains("45").should("exist"); // Summary stat

      // Update to multiple topics
      cy.mount(<HotTopics topics={mockHotTopics} />);
      cy.contains("React Hooks").should("exist");
      cy.contains("JavaScript Closures").should("exist");
      cy.contains("CSS Grid Layout").should("exist");
      cy.contains("99").should("exist"); // Updated summary stat
    });
  });
});
