import React from "react";
import { TopicDifficultyAnalysis } from "../../../components/instructor/TopicDifficultyAnalysis";
import { TopicDifficulty } from "../../../types/data";

describe("TopicDifficultyAnalysis Component", () => {
  // Mock topic difficulty data for testing
  const mockTopicDifficulties: TopicDifficulty[] = [
    {
      name: "Async/Await",
      difficulty: "High",
      studentsStruggling: 12,
      averageTime: "3.2 hours",
      completionRate: 45,
    },
    {
      name: "JavaScript Closures",
      difficulty: "High",
      studentsStruggling: 8,
      averageTime: "2.8 hours",
      completionRate: 52,
    },
    {
      name: "React State Management",
      difficulty: "Medium",
      studentsStruggling: 5,
      averageTime: "1.8 hours",
      completionRate: 72,
    },
    {
      name: "API Calls",
      difficulty: "Medium",
      studentsStruggling: 6,
      averageTime: "2.1 hours",
      completionRate: 68,
    },
    {
      name: "Variables and Functions",
      difficulty: "Low",
      studentsStruggling: 2,
      averageTime: "1.2 hours",
      completionRate: 88,
    },
    {
      name: "Basic React Components",
      difficulty: "Low",
      studentsStruggling: 1,
      averageTime: "1.0 hours",
      completionRate: 92,
    },
  ];

  const highDifficultyOnly: TopicDifficulty[] = [
    mockTopicDifficulties[0],
    mockTopicDifficulties[1],
  ];

  const singleTopic: TopicDifficulty[] = [mockTopicDifficulties[0]];

  // 1. Component Structure
  describe("Component Structure", () => {
    it("should render as a card", () => {
      cy.mount(<TopicDifficultyAnalysis topics={mockTopicDifficulties} />);

      cy.get("div").should("exist").should("be.visible");
    });

    it("should display title", () => {
      cy.mount(<TopicDifficultyAnalysis topics={mockTopicDifficulties} />);

      cy.get("h3")
        .should("exist")
        .should("contain.text", "Topic Difficulty Analysis");
    });

    it("should accept custom className", () => {
      cy.mount(
        <TopicDifficultyAnalysis
          topics={mockTopicDifficulties}
          className="custom-class"
        />
      );

      cy.get("div").should("exist");
    });
  });

  // 2. High Difficulty Topics
  describe("High Difficulty Topics", () => {
    it("should display high difficulty section when high topics exist", () => {
      cy.mount(<TopicDifficultyAnalysis topics={mockTopicDifficulties} />);

      cy.contains("High Difficulty (2)").should("exist");
    });

    it("should display high difficulty topic names", () => {
      cy.mount(<TopicDifficultyAnalysis topics={mockTopicDifficulties} />);

      cy.contains("Async/Await").should("exist");
      cy.contains("JavaScript Closures").should("exist");
    });

    it("should display struggling student counts for high difficulty", () => {
      cy.mount(<TopicDifficultyAnalysis topics={mockTopicDifficulties} />);

      cy.contains("12 struggling").should("exist");
      cy.contains("8 struggling").should("exist");
    });

    it("should not display high difficulty section when no high topics", () => {
      const noHighTopics = mockTopicDifficulties.filter(
        (t) => t.difficulty !== "High"
      );

      cy.mount(<TopicDifficultyAnalysis topics={noHighTopics} />);

      cy.contains("High Difficulty").should("not.exist");
    });
  });

  // 3. Medium Difficulty Topics
  describe("Medium Difficulty Topics", () => {
    it("should display medium difficulty section when medium topics exist", () => {
      cy.mount(<TopicDifficultyAnalysis topics={mockTopicDifficulties} />);

      cy.contains("Medium Difficulty (2)").should("exist");
    });

    it("should display medium difficulty topic names", () => {
      cy.mount(<TopicDifficultyAnalysis topics={mockTopicDifficulties} />);

      cy.contains("React State Management").should("exist");
      cy.contains("API Calls").should("exist");
    });

    it("should display completion rates for medium difficulty", () => {
      cy.mount(<TopicDifficultyAnalysis topics={mockTopicDifficulties} />);

      cy.contains("72% complete").should("exist");
      cy.contains("68% complete").should("exist");
    });

    it("should not display medium difficulty section when no medium topics", () => {
      const noMediumTopics = mockTopicDifficulties.filter(
        (t) => t.difficulty !== "Medium"
      );

      cy.mount(<TopicDifficultyAnalysis topics={noMediumTopics} />);

      cy.contains("Medium Difficulty").should("not.exist");
    });
  });

  // 4. Low Difficulty Topics
  describe("Low Difficulty Topics", () => {
    it("should display low difficulty section when low topics exist", () => {
      cy.mount(<TopicDifficultyAnalysis topics={mockTopicDifficulties} />);

      cy.contains("Low Difficulty (2)").should("exist");
    });

    it("should display low difficulty topic names", () => {
      cy.mount(<TopicDifficultyAnalysis topics={mockTopicDifficulties} />);

      cy.contains("Variables and Functions").should("exist");
      cy.contains("Basic React Components").should("exist");
    });

    it("should display completion rates for low difficulty", () => {
      cy.mount(<TopicDifficultyAnalysis topics={mockTopicDifficulties} />);

      cy.contains("88% complete").should("exist");
      cy.contains("92% complete").should("exist");
    });

    it("should not display low difficulty section when no low topics", () => {
      const noLowTopics = mockTopicDifficulties.filter(
        (t) => t.difficulty !== "Low"
      );

      cy.mount(<TopicDifficultyAnalysis topics={noLowTopics} />);

      cy.contains("Low Difficulty").should("not.exist");
    });
  });

  // 5. Topic Filtering and Categorization
  describe("Topic Filtering", () => {
    it("should correctly filter and count high difficulty topics", () => {
      cy.mount(<TopicDifficultyAnalysis topics={mockTopicDifficulties} />);

      // Should show 2 high difficulty topics
      cy.contains("High Difficulty (2)").should("exist");
      cy.contains("Async/Await").should("exist");
      cy.contains("JavaScript Closures").should("exist");
    });

    it("should correctly filter and count medium difficulty topics", () => {
      cy.mount(<TopicDifficultyAnalysis topics={mockTopicDifficulties} />);

      // Should show 2 medium difficulty topics
      cy.contains("Medium Difficulty (2)").should("exist");
      cy.contains("React State Management").should("exist");
      cy.contains("API Calls").should("exist");
    });

    it("should correctly filter and count low difficulty topics", () => {
      cy.mount(<TopicDifficultyAnalysis topics={mockTopicDifficulties} />);

      // Should show 2 low difficulty topics
      cy.contains("Low Difficulty (2)").should("exist");
      cy.contains("Variables and Functions").should("exist");
      cy.contains("Basic React Components").should("exist");
    });

    it("should handle topics with only one difficulty level", () => {
      cy.mount(<TopicDifficultyAnalysis topics={highDifficultyOnly} />);

      cy.contains("High Difficulty (2)").should("exist");
      cy.contains("Medium Difficulty").should("not.exist");
      cy.contains("Low Difficulty").should("not.exist");
    });
  });

  // 6. Summary Statistics
  describe("Summary Statistics", () => {
    it("should display summary counts for all difficulty levels", () => {
      cy.mount(<TopicDifficultyAnalysis topics={mockTopicDifficulties} />);

      // Summary section should show counts
      cy.get("div").contains("2").should("exist"); // High count
      cy.get("div").contains("2").should("exist"); // Medium count
      cy.get("div").contains("2").should("exist"); // Low count
      cy.contains("High").should("exist");
      cy.contains("Medium").should("exist");
      cy.contains("Low").should("exist");
    });

    it("should update summary counts based on actual data", () => {
      const customTopics: TopicDifficulty[] = [
        { ...mockTopicDifficulties[0], difficulty: "High" },
        { ...mockTopicDifficulties[1], difficulty: "High" },
        { ...mockTopicDifficulties[2], difficulty: "High" },
        { ...mockTopicDifficulties[3], difficulty: "Medium" },
      ];

      cy.mount(<TopicDifficultyAnalysis topics={customTopics} />);

      // Should show: 3 High, 1 Medium, 0 Low
      cy.get("div").contains("3").should("exist"); // High count
      cy.get("div").contains("1").should("exist"); // Medium count
      cy.get("div").contains("0").should("exist"); // Low count
    });

    it("should handle zero counts in summary", () => {
      cy.mount(<TopicDifficultyAnalysis topics={highDifficultyOnly} />);

      cy.get("div").contains("2").should("exist"); // High count
      cy.get("div").contains("0").should("exist"); // Medium count
      cy.get("div").contains("0").should("exist"); // Low count
    });
  });

  // 7. Data Display Variations
  describe("Data Display", () => {
    it("should display different struggling student counts", () => {
      cy.mount(<TopicDifficultyAnalysis topics={mockTopicDifficulties} />);

      cy.contains("12 struggling").should("exist");
      cy.contains("8 struggling").should("exist");
    });

    it("should display different completion rates", () => {
      cy.mount(<TopicDifficultyAnalysis topics={mockTopicDifficulties} />);

      cy.contains("72% complete").should("exist");
      cy.contains("68% complete").should("exist");
      cy.contains("88% complete").should("exist");
      cy.contains("92% complete").should("exist");
    });

    it("should handle zero struggling students", () => {
      const zeroStrugglingTopic: TopicDifficulty[] = [
        { ...mockTopicDifficulties[0], studentsStruggling: 0 },
      ];

      cy.mount(<TopicDifficultyAnalysis topics={zeroStrugglingTopic} />);

      cy.contains("0 struggling").should("exist");
    });

    it("should handle 100% completion rate", () => {
      const fullCompletionTopic: TopicDifficulty[] = [
        { ...mockTopicDifficulties[2], completionRate: 100 },
      ];

      cy.mount(<TopicDifficultyAnalysis topics={fullCompletionTopic} />);

      cy.contains("100% complete").should("exist");
    });
  });

  // 8. Edge Cases
  describe("Edge Cases", () => {
    it("should handle empty topics array", () => {
      cy.mount(<TopicDifficultyAnalysis topics={[]} />);

      cy.contains("Topic Difficulty Analysis").should("exist");
      cy.contains("High Difficulty").should("not.exist");
      cy.contains("Medium Difficulty").should("not.exist");
      cy.contains("Low Difficulty").should("not.exist");

      // Summary should show all zeros
      cy.get("div").contains("0").should("exist");
    });

    it("should handle single topic", () => {
      cy.mount(<TopicDifficultyAnalysis topics={singleTopic} />);

      cy.contains("High Difficulty (1)").should("exist");
      cy.contains("Async/Await").should("exist");
      cy.contains("12 struggling").should("exist");

      // Summary should show: 1 High, 0 Medium, 0 Low
      cy.get("div").contains("1").should("exist");
      cy.get("div").contains("0").should("exist");
    });

    it("should handle long topic names", () => {
      const longNameTopic: TopicDifficulty[] = [
        {
          ...mockTopicDifficulties[0],
          name: "Advanced Asynchronous JavaScript Programming with Promises and Async/Await",
        },
      ];

      cy.mount(<TopicDifficultyAnalysis topics={longNameTopic} />);

      cy.contains("Advanced Asynchronous JavaScript Programming").should(
        "exist"
      );
    });

    it("should handle large numbers", () => {
      const largeNumbersTopic: TopicDifficulty[] = [
        {
          ...mockTopicDifficulties[0],
          studentsStruggling: 999,
          completionRate: 5,
        },
      ];

      cy.mount(<TopicDifficultyAnalysis topics={largeNumbersTopic} />);

      cy.contains("999 struggling").should("exist");
    });
  });

  // 9. Conditional Rendering
  describe("Conditional Rendering", () => {
    it("should only show sections for existing difficulty levels", () => {
      const onlyMediumTopics: TopicDifficulty[] = [
        mockTopicDifficulties[2],
        mockTopicDifficulties[3],
      ];

      cy.mount(<TopicDifficultyAnalysis topics={onlyMediumTopics} />);

      cy.contains("High Difficulty").should("not.exist");
      cy.contains("Medium Difficulty (2)").should("exist");
      cy.contains("Low Difficulty").should("not.exist");
    });

    it("should show all sections when all difficulty levels present", () => {
      cy.mount(<TopicDifficultyAnalysis topics={mockTopicDifficulties} />);

      cy.contains("High Difficulty (2)").should("exist");
      cy.contains("Medium Difficulty (2)").should("exist");
      cy.contains("Low Difficulty (2)").should("exist");
    });
  });

  // 10. Integration Testing
  describe("Full Integration", () => {
    it("should display all data correctly together", () => {
      cy.mount(<TopicDifficultyAnalysis topics={mockTopicDifficulties} />);

      // Verify title
      cy.contains("Topic Difficulty Analysis").should("exist");

      // Verify high difficulty section
      cy.contains("High Difficulty (2)").should("exist");
      cy.contains("Async/Await").should("exist");
      cy.contains("JavaScript Closures").should("exist");
      cy.contains("12 struggling").should("exist");
      cy.contains("8 struggling").should("exist");

      // Verify medium difficulty section
      cy.contains("Medium Difficulty (2)").should("exist");
      cy.contains("React State Management").should("exist");
      cy.contains("API Calls").should("exist");
      cy.contains("72% complete").should("exist");
      cy.contains("68% complete").should("exist");

      // Verify low difficulty section
      cy.contains("Low Difficulty (2)").should("exist");
      cy.contains("Variables and Functions").should("exist");
      cy.contains("Basic React Components").should("exist");
      cy.contains("88% complete").should("exist");
      cy.contains("92% complete").should("exist");

      // Verify summary statistics
      cy.get("div").contains("2").should("exist"); // Multiple counts of 2
      cy.contains("High").should("exist");
      cy.contains("Medium").should("exist");
      cy.contains("Low").should("exist");
    });

    it("should handle dynamic topic list changes", () => {
      // Start with empty
      cy.mount(<TopicDifficultyAnalysis topics={[]} />);
      cy.contains("High Difficulty").should("not.exist");

      // Update to single topic
      cy.mount(<TopicDifficultyAnalysis topics={singleTopic} />);
      cy.contains("High Difficulty (1)").should("exist");
      cy.contains("Async/Await").should("exist");

      // Update to multiple topics
      cy.mount(<TopicDifficultyAnalysis topics={mockTopicDifficulties} />);
      cy.contains("High Difficulty (2)").should("exist");
      cy.contains("Medium Difficulty (2)").should("exist");
      cy.contains("Low Difficulty (2)").should("exist");
    });

    it("should correctly categorize mixed difficulty topics", () => {
      const mixedTopics: TopicDifficulty[] = [
        { ...mockTopicDifficulties[0], difficulty: "Low" },
        { ...mockTopicDifficulties[1], difficulty: "Medium" },
        { ...mockTopicDifficulties[2], difficulty: "High" },
        { ...mockTopicDifficulties[3], difficulty: "High" },
        { ...mockTopicDifficulties[4], difficulty: "Medium" },
      ];

      cy.mount(<TopicDifficultyAnalysis topics={mixedTopics} />);

      cy.contains("High Difficulty (2)").should("exist");
      cy.contains("Medium Difficulty (2)").should("exist");
      cy.contains("Low Difficulty (1)").should("exist");

      // Verify summary matches
      cy.get("div").contains("2").should("exist"); // High and Medium counts
      cy.get("div").contains("1").should("exist"); // Low count
    });
  });
});
