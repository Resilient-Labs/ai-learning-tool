import React from "react";
import { ClassOverview } from "../../../components/instructor/ClassOverview";

describe("ClassOverview Component", () => {
  // Mock class overview data for testing
  const mockClassData = {
    totalStudents: 25,
    activeStudents: 20,
    averageTimeSpent: "45 min",
    totalSessions: 120,
    completionRate: 78,
    strugglingStudents: 3,
    hotTopics: ["React Hooks", "JavaScript Closures", "API Integration"],
  };

  const noStrugglingStudentsData = {
    ...mockClassData,
    strugglingStudents: 0,
  };

  const noHotTopicsData = {
    ...mockClassData,
    hotTopics: [],
  };

  // 1. Fundamental Structure
  describe("Component Structure", () => {
    it("should render as a card", () => {
      cy.mount(<ClassOverview {...mockClassData} />);

      cy.get("div").should("exist").should("be.visible");
    });

    it("should display class overview title", () => {
      cy.mount(<ClassOverview {...mockClassData} />);

      cy.get("h3").should("exist").should("contain.text", "Class Overview");
    });

    it("should accept custom className", () => {
      cy.mount(<ClassOverview {...mockClassData} className="custom-class" />);

      cy.get("div").should("exist");
    });
  });

  // 2. Student Metrics Display
  describe("Student Metrics", () => {
    it("should display total students", () => {
      cy.mount(<ClassOverview {...mockClassData} />);

      cy.contains("25").should("exist");
      cy.contains("Students").should("exist");
    });

    it("should display active students count and percentage", () => {
      cy.mount(<ClassOverview {...mockClassData} />);

      cy.contains("20 active (80%)").should("exist");
    });

    it("should calculate active percentage correctly", () => {
      const customData = {
        ...mockClassData,
        totalStudents: 100,
        activeStudents: 75,
      };

      cy.mount(<ClassOverview {...customData} />);

      cy.contains("75 active (75%)").should("exist");
    });

    it("should handle zero active students", () => {
      const zeroActiveData = {
        ...mockClassData,
        activeStudents: 0,
      };

      cy.mount(<ClassOverview {...zeroActiveData} />);

      cy.contains("0 active (0%)").should("exist");
    });
  });

  // 3. Time and Session Metrics
  describe("Time and Session Metrics", () => {
    it("should display average time spent", () => {
      cy.mount(<ClassOverview {...mockClassData} />);

      cy.contains("45 min").should("exist");
      cy.contains("Avg Time").should("exist");
      cy.contains("per session").should("exist");
    });

    it("should display total sessions", () => {
      cy.mount(<ClassOverview {...mockClassData} />);

      cy.contains("120").should("exist");
      cy.contains("Sessions").should("exist");
      cy.contains("this week").should("exist");
    });

    it("should display completion rate", () => {
      cy.mount(<ClassOverview {...mockClassData} />);

      cy.contains("78%").should("exist");
      cy.contains("Completion").should("exist");
      cy.contains("overall progress").should("exist");
    });
  });

  // 4. Struggling Students Alert
  describe("Struggling Students Alert", () => {
    it("should display struggling students alert when count > 0", () => {
      cy.mount(<ClassOverview {...mockClassData} />);

      cy.contains("3 students need attention").should("exist");
    });

    it("should not display alert when no struggling students", () => {
      cy.mount(<ClassOverview {...noStrugglingStudentsData} />);

      cy.contains("students need attention").should("not.exist");
    });

    it("should handle different struggling student counts", () => {
      const highStrugglingData = {
        ...mockClassData,
        strugglingStudents: 10,
      };

      cy.mount(<ClassOverview {...highStrugglingData} />);

      cy.contains("10 students need attention").should("exist");
    });

    it("should handle single struggling student", () => {
      const singleStrugglingData = {
        ...mockClassData,
        strugglingStudents: 1,
      };

      cy.mount(<ClassOverview {...singleStrugglingData} />);

      cy.contains("1 students need attention").should("exist");
    });
  });

  // 5. Hot Topics Display
  describe("Hot Topics", () => {
    it("should display hot topics when available", () => {
      cy.mount(<ClassOverview {...mockClassData} />);

      cy.contains("🔥 Hot Topics").should("exist");
      cy.contains("React Hooks").should("exist");
      cy.contains("JavaScript Closures").should("exist");
      cy.contains("API Integration").should("exist");
    });

    it("should not display hot topics section when empty", () => {
      cy.mount(<ClassOverview {...noHotTopicsData} />);

      cy.contains("🔥 Hot Topics").should("not.exist");
    });

    it("should limit hot topics to first 3", () => {
      const manyTopicsData = {
        ...mockClassData,
        hotTopics: [
          "React Hooks",
          "JavaScript Closures",
          "API Integration",
          "CSS Grid",
          "TypeScript",
          "Node.js",
        ],
      };

      cy.mount(<ClassOverview {...manyTopicsData} />);

      cy.contains("React Hooks").should("exist");
      cy.contains("JavaScript Closures").should("exist");
      cy.contains("API Integration").should("exist");
      cy.contains("CSS Grid").should("not.exist");
      cy.contains("TypeScript").should("not.exist");
    });

    it("should handle single hot topic", () => {
      const singleTopicData = {
        ...mockClassData,
        hotTopics: ["React Hooks"],
      };

      cy.mount(<ClassOverview {...singleTopicData} />);

      cy.contains("🔥 Hot Topics").should("exist");
      cy.contains("React Hooks").should("exist");
    });
  });

  // 6. Edge Cases
  describe("Edge Cases", () => {
    it("should handle zero values", () => {
      const zeroData = {
        totalStudents: 0,
        activeStudents: 0,
        averageTimeSpent: "0 min",
        totalSessions: 0,
        completionRate: 0,
        strugglingStudents: 0,
        hotTopics: [],
      };

      cy.mount(<ClassOverview {...zeroData} />);

      cy.contains("0").should("exist");
      cy.contains("0 active (0%)").should("exist");
      cy.contains("0 min").should("exist");
      cy.contains("students need attention").should("not.exist");
      cy.contains("🔥 Hot Topics").should("not.exist");
    });

    it("should handle 100% completion rate", () => {
      const perfectData = {
        ...mockClassData,
        completionRate: 100,
      };

      cy.mount(<ClassOverview {...perfectData} />);

      cy.contains("100%").should("exist");
    });

    it("should handle all students active", () => {
      const allActiveData = {
        ...mockClassData,
        totalStudents: 20,
        activeStudents: 20,
      };

      cy.mount(<ClassOverview {...allActiveData} />);

      cy.contains("20 active (100%)").should("exist");
    });

    it("should handle large numbers", () => {
      const largeData = {
        totalStudents: 1000,
        activeStudents: 850,
        averageTimeSpent: "120 min",
        totalSessions: 5000,
        completionRate: 95,
        strugglingStudents: 50,
        hotTopics: ["Advanced React", "System Design"],
      };

      cy.mount(<ClassOverview {...largeData} />);

      cy.contains("1000").should("exist");
      cy.contains("850 active (85%)").should("exist");
      cy.contains("120 min").should("exist");
      cy.contains("5000").should("exist");
      cy.contains("95%").should("exist");
      cy.contains("50 students need attention").should("exist");
    });
  });

  // 7. Integration Testing
  describe("Full Integration", () => {
    it("should display all data correctly together", () => {
      cy.mount(<ClassOverview {...mockClassData} />);

      // Verify title
      cy.contains("Class Overview").should("exist");

      // Verify student metrics
      cy.contains("25").should("exist");
      cy.contains("20 active (80%)").should("exist");

      // Verify time and session metrics
      cy.contains("45 min").should("exist");
      cy.contains("120").should("exist");
      cy.contains("78%").should("exist");

      // Verify struggling students alert
      cy.contains("3 students need attention").should("exist");

      // Verify hot topics
      cy.contains("🔥 Hot Topics").should("exist");
      cy.contains("React Hooks").should("exist");
      cy.contains("JavaScript Closures").should("exist");
      cy.contains("API Integration").should("exist");
    });

    it("should handle minimal data display", () => {
      cy.mount(
        <ClassOverview {...noStrugglingStudentsData} {...noHotTopicsData} />
      );

      // Should still show core metrics
      cy.contains("Class Overview").should("exist");
      cy.contains("25").should("exist");
      cy.contains("20 active (80%)").should("exist");
      cy.contains("45 min").should("exist");
      cy.contains("120").should("exist");
      cy.contains("78%").should("exist");

      // Should not show optional sections
      cy.contains("students need attention").should("not.exist");
      cy.contains("🔥 Hot Topics").should("not.exist");
    });

    it("should handle different time formats", () => {
      const differentTimeData = {
        ...mockClassData,
        averageTimeSpent: "1h 30m",
      };

      cy.mount(<ClassOverview {...differentTimeData} />);

      cy.contains("1h 30m").should("exist");
      cy.contains("per session").should("exist");
    });
  });
});
