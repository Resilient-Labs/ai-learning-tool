import React from "react";
import { StrugglingStudentsAlert } from "../../../components/instructor/StrugglingStudentsAlert";
import { StrugglingStudent } from "../../../types/data";

describe("StrugglingStudentsAlert Component", () => {
  // Mock struggling students data for testing
  const mockStrugglingStudents: StrugglingStudent[] = [
    {
      id: 1,
      name: "David Chen",
      email: "david@example.com",
      lastActive: "3 days ago",
      progress: 25,
      strugglingTopics: ["Async/Await", "Promises", "Closures"],
      riskLevel: "High",
      daysSinceLastSession: 5,
    },
    {
      id: 2,
      name: "Emily Davis",
      email: "emily@example.com",
      lastActive: "2 days ago",
      progress: 45,
      strugglingTopics: ["React State", "Props"],
      riskLevel: "Medium",
      daysSinceLastSession: 3,
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael@example.com",
      lastActive: "1 week ago",
      progress: 15,
      strugglingTopics: [
        "JavaScript Fundamentals",
        "Functions",
        "Variables",
        "Loops",
        "Arrays",
      ],
      riskLevel: "High",
      daysSinceLastSession: 7,
    },
  ];

  const singleStudent: StrugglingStudent[] = [mockStrugglingStudents[0]];

  // 1. Empty State
  describe("Empty State", () => {
    it("should display success state when no struggling students", () => {
      cy.mount(<StrugglingStudentsAlert students={[]} />);

      cy.contains("All Students On Track").should("exist");
      cy.contains("🎉").should("exist");
      cy.contains("No students currently need attention!").should("exist");
    });

    it("should not display struggling students content when empty", () => {
      cy.mount(<StrugglingStudentsAlert students={[]} />);

      cy.contains("Students Needing Attention").should("not.exist");
      cy.contains("high risk").should("not.exist");
      cy.contains("medium risk").should("not.exist");
    });
  });

  // 2. Component Structure
  describe("Component Structure", () => {
    it("should render as a card when students exist", () => {
      cy.mount(<StrugglingStudentsAlert students={mockStrugglingStudents} />);

      cy.get("div").should("exist").should("be.visible");
    });

    it("should display title with student count", () => {
      cy.mount(<StrugglingStudentsAlert students={mockStrugglingStudents} />);

      cy.contains("Students Needing Attention (3)").should("exist");
    });

    it("should accept custom className", () => {
      cy.mount(
        <StrugglingStudentsAlert
          students={mockStrugglingStudents}
          className="custom-class"
        />
      );

      cy.get("div").should("exist");
    });
  });

  // 3. Student Data Display
  describe("Student Data Display", () => {
    it("should display all student names", () => {
      cy.mount(<StrugglingStudentsAlert students={mockStrugglingStudents} />);

      cy.contains("David Chen").should("exist");
      cy.contains("Emily Davis").should("exist");
      cy.contains("Michael Brown").should("exist");
    });

    it("should display student emails", () => {
      cy.mount(<StrugglingStudentsAlert students={mockStrugglingStudents} />);

      cy.contains("david@example.com").should("exist");
      cy.contains("emily@example.com").should("exist");
      cy.contains("michael@example.com").should("exist");
    });

    it("should display progress percentages", () => {
      cy.mount(<StrugglingStudentsAlert students={mockStrugglingStudents} />);

      cy.contains("Progress: 25%").should("exist");
      cy.contains("Progress: 45%").should("exist");
      cy.contains("Progress: 15%").should("exist");
    });

    it("should display last active times", () => {
      cy.mount(<StrugglingStudentsAlert students={mockStrugglingStudents} />);

      cy.contains("Last active: 3 days ago").should("exist");
      cy.contains("Last active: 2 days ago").should("exist");
      cy.contains("Last active: 1 week ago").should("exist");
    });
  });

  // 4. Risk Level Display
  describe("Risk Level Display", () => {
    it("should display risk level badges", () => {
      cy.mount(<StrugglingStudentsAlert students={mockStrugglingStudents} />);

      cy.contains("High Risk").should("exist");
      cy.contains("Medium Risk").should("exist");
    });

    it("should handle different risk levels", () => {
      const mixedRiskStudents: StrugglingStudent[] = [
        { ...mockStrugglingStudents[0], riskLevel: "Low" },
        { ...mockStrugglingStudents[1], riskLevel: "Medium" },
        { ...mockStrugglingStudents[2], riskLevel: "High" },
      ];

      cy.mount(<StrugglingStudentsAlert students={mixedRiskStudents} />);

      cy.contains("Low Risk").should("exist");
      cy.contains("Medium Risk").should("exist");
      cy.contains("High Risk").should("exist");
    });
  });

  // 5. Avatar Display
  describe("Avatar Display", () => {
    it("should display avatars with student initials", () => {
      cy.mount(<StrugglingStudentsAlert students={mockStrugglingStudents} />);

      cy.contains("DC").should("exist"); // David Chen
      cy.contains("ED").should("exist"); // Emily Davis
      cy.contains("MB").should("exist"); // Michael Brown
    });
  });

  // 6. Days Since Last Session
  describe("Days Since Last Session", () => {
    it("should display warning for students with > 3 days since session", () => {
      cy.mount(<StrugglingStudentsAlert students={mockStrugglingStudents} />);

      cy.contains("5 days since session").should("exist");
      cy.contains("7 days since session").should("exist");
    });

    it("should not display warning for students with <= 3 days", () => {
      cy.mount(<StrugglingStudentsAlert students={mockStrugglingStudents} />);

      cy.contains("3 days since session").should("not.exist");
      cy.contains("2 days since session").should("not.exist");
      cy.contains("1 days since session").should("not.exist");
    });

    it("should handle exactly 3 days (boundary case)", () => {
      const boundaryStudent: StrugglingStudent[] = [
        { ...mockStrugglingStudents[0], daysSinceLastSession: 3 },
      ];

      cy.mount(<StrugglingStudentsAlert students={boundaryStudent} />);

      cy.contains("3 days since session").should("not.exist");
    });

    it("should handle exactly 4 days (boundary case)", () => {
      const boundaryStudent: StrugglingStudent[] = [
        { ...mockStrugglingStudents[0], daysSinceLastSession: 4 },
      ];

      cy.mount(<StrugglingStudentsAlert students={boundaryStudent} />);

      cy.contains("4 days since session").should("exist");
    });
  });

  // 7. Struggling Topics Display
  describe("Struggling Topics", () => {
    it("should display struggling topics", () => {
      cy.mount(<StrugglingStudentsAlert students={mockStrugglingStudents} />);

      cy.contains("Struggling with:").should("exist");
      cy.contains("Async/Await").should("exist");
      cy.contains("Promises").should("exist");
      cy.contains("Closures").should("exist");
    });

    it("should limit topics to first 3", () => {
      cy.mount(<StrugglingStudentsAlert students={mockStrugglingStudents} />);

      // Michael Brown has 5 topics, should show first 3 + "more" indicator
      cy.contains("JavaScript Fundamentals").should("exist");
      cy.contains("Functions").should("exist");
      cy.contains("Variables").should("exist");
      cy.contains("+2 more").should("exist");
    });

    it("should not display more indicator when <= 3 topics", () => {
      cy.mount(<StrugglingStudentsAlert students={singleStudent} />);

      // David Chen has exactly 3 topics
      cy.contains("Async/Await").should("exist");
      cy.contains("Promises").should("exist");
      cy.contains("Closures").should("exist");
      cy.contains("more").should("not.exist");
    });

    it("should handle students with no struggling topics", () => {
      const noTopicsStudent: StrugglingStudent[] = [
        { ...mockStrugglingStudents[0], strugglingTopics: [] },
      ];

      cy.mount(<StrugglingStudentsAlert students={noTopicsStudent} />);

      cy.contains("Struggling with:").should("not.exist");
    });
  });

  // 8. Interactive Elements
  describe("Action Buttons", () => {
    it("should render action buttons for each student", () => {
      cy.mount(<StrugglingStudentsAlert students={mockStrugglingStudents} />);

      // 3 students × 2 buttons each = 6 buttons + 1 "View All Students" = 7 total
      cy.get("button").should("have.length", 7);
      cy.contains("View Details").should("exist");
      cy.contains("Reach Out").should("exist");
    });

    it("should call onViewDetails when view details button is clicked", () => {
      const onViewDetailsSpy = cy.stub().as("onViewDetailsSpy");

      cy.mount(
        <StrugglingStudentsAlert
          students={singleStudent}
          onViewDetails={onViewDetailsSpy}
        />
      );

      cy.contains("View Details").click();
      cy.get("@onViewDetailsSpy").should(
        "have.been.calledWith",
        singleStudent[0]
      );
    });

    it("should call onReachOut when reach out button is clicked", () => {
      const onReachOutSpy = cy.stub().as("onReachOutSpy");

      cy.mount(
        <StrugglingStudentsAlert
          students={singleStudent}
          onReachOut={onReachOutSpy}
        />
      );

      cy.contains("Reach Out").click();
      cy.get("@onReachOutSpy").should("have.been.calledWith", singleStudent[0]);
    });

    it("should work without event handlers", () => {
      cy.mount(<StrugglingStudentsAlert students={singleStudent} />);

      cy.contains("View Details").click();
      cy.contains("Reach Out").click();
      cy.get("button").should("have.length", 3); // 2 action buttons + 1 "View All Students"
    });
  });

  // 9. Summary Statistics
  describe("Summary Statistics", () => {
    it("should display risk level summary", () => {
      cy.mount(<StrugglingStudentsAlert students={mockStrugglingStudents} />);

      cy.contains("2 high risk, 1 medium risk").should("exist");
    });

    it("should calculate risk levels correctly", () => {
      const customRiskStudents: StrugglingStudent[] = [
        { ...mockStrugglingStudents[0], riskLevel: "High" },
        { ...mockStrugglingStudents[1], riskLevel: "High" },
        { ...mockStrugglingStudents[2], riskLevel: "Medium" },
      ];

      cy.mount(<StrugglingStudentsAlert students={customRiskStudents} />);

      cy.contains("2 high risk, 1 medium risk").should("exist");
    });

    it("should handle zero high risk students", () => {
      const noHighRiskStudents: StrugglingStudent[] = [
        { ...mockStrugglingStudents[0], riskLevel: "Medium" },
        { ...mockStrugglingStudents[1], riskLevel: "Low" },
      ];

      cy.mount(<StrugglingStudentsAlert students={noHighRiskStudents} />);

      cy.contains("0 high risk, 1 medium risk").should("exist");
    });

    it("should display view all students button", () => {
      cy.mount(<StrugglingStudentsAlert students={mockStrugglingStudents} />);

      cy.contains("View All Students").should("exist");
    });
  });

  // 10. Edge Cases
  describe("Edge Cases", () => {
    it("should handle single student", () => {
      cy.mount(<StrugglingStudentsAlert students={singleStudent} />);

      cy.contains("Students Needing Attention (1)").should("exist");
      cy.contains("David Chen").should("exist");
      cy.contains("1 high risk, 0 medium risk").should("exist");
    });

    it("should handle zero progress", () => {
      const zeroProgressStudent: StrugglingStudent[] = [
        { ...mockStrugglingStudents[0], progress: 0 },
      ];

      cy.mount(<StrugglingStudentsAlert students={zeroProgressStudent} />);

      cy.contains("Progress: 0%").should("exist");
    });

    it("should handle long names and emails", () => {
      const longNameStudent: StrugglingStudent[] = [
        {
          ...mockStrugglingStudents[0],
          name: "Alexander Christopher Johnson-Smith",
          email: "alexander.christopher.johnson-smith@verylongdomainname.com",
        },
      ];

      cy.mount(<StrugglingStudentsAlert students={longNameStudent} />);

      cy.contains("Alexander Christopher Johnson-Smith").should("exist");
      cy.contains(
        "alexander.christopher.johnson-smith@verylongdomainname.com"
      ).should("exist");
    });

    it("should handle many struggling topics", () => {
      const manyTopicsStudent: StrugglingStudent[] = [
        {
          ...mockStrugglingStudents[0],
          strugglingTopics: [
            "Topic1",
            "Topic2",
            "Topic3",
            "Topic4",
            "Topic5",
            "Topic6",
            "Topic7",
          ],
        },
      ];

      cy.mount(<StrugglingStudentsAlert students={manyTopicsStudent} />);

      cy.contains("Topic1").should("exist");
      cy.contains("Topic2").should("exist");
      cy.contains("Topic3").should("exist");
      cy.contains("+4 more").should("exist");
    });
  });

  // 11. Integration Testing
  describe("Full Integration", () => {
    it("should display all data correctly together", () => {
      const onViewDetailsSpy = cy.stub().as("onViewDetailsSpy");
      const onReachOutSpy = cy.stub().as("onReachOutSpy");

      cy.mount(
        <StrugglingStudentsAlert
          students={mockStrugglingStudents}
          onViewDetails={onViewDetailsSpy}
          onReachOut={onReachOutSpy}
        />
      );

      // Verify title with count
      cy.contains("Students Needing Attention (3)").should("exist");

      // Verify all student data
      cy.contains("David Chen").should("exist");
      cy.contains("Emily Davis").should("exist");
      cy.contains("Michael Brown").should("exist");

      // Verify risk levels
      cy.contains("High Risk").should("exist");
      cy.contains("Medium Risk").should("exist");

      // Verify struggling topics
      cy.contains("Async/Await").should("exist");
      cy.contains("React State").should("exist");
      cy.contains("+2 more").should("exist");

      // Verify session warnings
      cy.contains("5 days since session").should("exist");
      cy.contains("7 days since session").should("exist");

      // Verify avatars
      cy.contains("DC").should("exist");
      cy.contains("ED").should("exist");
      cy.contains("MB").should("exist");

      // Verify summary
      cy.contains("2 high risk, 1 medium risk").should("exist");

      // Verify interactions work
      cy.contains("View Details").first().click();
      cy.get("@onViewDetailsSpy").should(
        "have.been.calledWith",
        mockStrugglingStudents[0]
      );

      cy.contains("Reach Out").first().click();
      cy.get("@onReachOutSpy").should(
        "have.been.calledWith",
        mockStrugglingStudents[0]
      );
    });

    it("should handle state transitions correctly", () => {
      // Start with empty state
      cy.mount(<StrugglingStudentsAlert students={[]} />);
      cy.contains("All Students On Track").should("exist");

      // Update to single student
      cy.mount(<StrugglingStudentsAlert students={singleStudent} />);
      cy.contains("Students Needing Attention (1)").should("exist");
      cy.contains("David Chen").should("exist");

      // Update to multiple students
      cy.mount(<StrugglingStudentsAlert students={mockStrugglingStudents} />);
      cy.contains("Students Needing Attention (3)").should("exist");
      cy.contains("2 high risk, 1 medium risk").should("exist");
    });
  });
});
