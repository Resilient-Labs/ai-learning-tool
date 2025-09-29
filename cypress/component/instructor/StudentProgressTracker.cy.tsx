import React from "react";
import { StudentProgressTracker } from "../../../components/instructor/StudentProgressTracker";
import { StudentProgress } from "../../../types/data";

describe("StudentProgressTracker Component", () => {
  // Mock student progress data for testing
  const mockStudentProgress: StudentProgress[] = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@example.com",
      progress: 85,
      previousProgress: 78,
      lessonsCompleted: 12,
      totalLessons: 15,
      lastActive: "2 hours ago",
      streak: 7,
      status: "On Track",
      topics: {
        mastered: ["Variables", "Functions", "Basic React"],
        struggling: [],
        inProgress: ["Async/Await", "API Calls"],
      },
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria@example.com",
      progress: 92,
      previousProgress: 89,
      lessonsCompleted: 18,
      totalLessons: 20,
      lastActive: "1 hour ago",
      streak: 12,
      status: "Ahead",
      topics: {
        mastered: [
          "Variables",
          "Functions",
          "React Components",
          "State Management",
        ],
        struggling: [],
        inProgress: ["Advanced TypeScript"],
      },
    },
    {
      id: 3,
      name: "David Chen",
      email: "david@example.com",
      progress: 25,
      previousProgress: 30,
      lessonsCompleted: 3,
      totalLessons: 15,
      lastActive: "3 days ago",
      streak: 0,
      status: "Struggling",
      topics: {
        mastered: ["Variables"],
        struggling: ["Async/Await", "Promises", "Closures"],
        inProgress: ["Functions"],
      },
    },
  ];

  const singleStudent: StudentProgress[] = [mockStudentProgress[0]];

  // 1. Empty State
  describe("Empty State", () => {
    it("should display empty state when no students", () => {
      cy.mount(<StudentProgressTracker students={[]} />);

      cy.contains("📊").should("exist");
      cy.contains("No student data available").should("exist");
    });

    it("should not display summary stats when empty", () => {
      cy.mount(<StudentProgressTracker students={[]} />);

      cy.contains("On Track").should("not.exist");
      cy.contains("Behind").should("not.exist");
      cy.contains("Ahead").should("not.exist");
      cy.contains("Struggling").should("not.exist");
    });
  });

  // 2. Component Structure
  describe("Component Structure", () => {
    it("should render as a card", () => {
      cy.mount(<StudentProgressTracker students={mockStudentProgress} />);

      cy.get("div").should("exist").should("be.visible");
    });

    it("should display title", () => {
      cy.mount(<StudentProgressTracker students={mockStudentProgress} />);

      cy.get("h3")
        .should("exist")
        .should("contain.text", "Student Progress Tracker");
    });

    it("should accept custom className", () => {
      cy.mount(
        <StudentProgressTracker
          students={mockStudentProgress}
          className="custom-class"
        />
      );

      cy.get("div").should("exist");
    });
  });

  // 3. Student Data Display
  describe("Student Data Display", () => {
    it("should display all student names", () => {
      cy.mount(<StudentProgressTracker students={mockStudentProgress} />);

      cy.contains("Alex Johnson").should("exist");
      cy.contains("Maria Garcia").should("exist");
      cy.contains("David Chen").should("exist");
    });

    it("should display student emails", () => {
      cy.mount(<StudentProgressTracker students={mockStudentProgress} />);

      cy.contains("alex@example.com").should("exist");
      cy.contains("maria@example.com").should("exist");
      cy.contains("david@example.com").should("exist");
    });

    it("should display progress percentages", () => {
      cy.mount(<StudentProgressTracker students={mockStudentProgress} />);

      cy.contains("Progress: 85%").should("exist");
      cy.contains("Progress: 92%").should("exist");
      cy.contains("Progress: 25%").should("exist");
    });

    it("should display lesson completion ratios", () => {
      cy.mount(<StudentProgressTracker students={mockStudentProgress} />);

      cy.contains("12/15").should("exist");
      cy.contains("18/20").should("exist");
      cy.contains("3/15").should("exist");
    });

    it("should display streaks", () => {
      cy.mount(<StudentProgressTracker students={mockStudentProgress} />);

      cy.contains("7").should("exist");
      cy.contains("12").should("exist");
      cy.contains("0").should("exist");
    });

    it("should display last active times", () => {
      cy.mount(<StudentProgressTracker students={mockStudentProgress} />);

      cy.contains("2 hours ago").should("exist");
      cy.contains("1 hour ago").should("exist");
      cy.contains("3 days ago").should("exist");
    });
  });

  // 4. Status Display
  describe("Status Display", () => {
    it("should display status badges", () => {
      cy.mount(<StudentProgressTracker students={mockStudentProgress} />);

      cy.contains("On Track").should("exist");
      cy.contains("Ahead").should("exist");
      cy.contains("Struggling").should("exist");
    });

    it("should handle different status types", () => {
      const mixedStatusStudents: StudentProgress[] = [
        { ...mockStudentProgress[0], status: "Behind" },
        { ...mockStudentProgress[1], status: "On Track" },
        { ...mockStudentProgress[2], status: "Ahead" },
      ];

      cy.mount(<StudentProgressTracker students={mixedStatusStudents} />);

      cy.contains("Behind").should("exist");
      cy.contains("On Track").should("exist");
      cy.contains("Ahead").should("exist");
    });
  });

  // 5. Progress Change Display
  describe("Progress Change", () => {
    it("should display positive progress change", () => {
      cy.mount(<StudentProgressTracker students={mockStudentProgress} />);

      // Alex: 85 - 78 = +7%
      cy.contains("+7%").should("exist");
      // Maria: 92 - 89 = +3%
      cy.contains("+3%").should("exist");
    });

    it("should display negative progress change", () => {
      cy.mount(<StudentProgressTracker students={mockStudentProgress} />);

      // David: 25 - 30 = -5%
      cy.contains("-5%").should("exist");
    });

    it("should display no change", () => {
      const noChangeStudent: StudentProgress[] = [
        { ...mockStudentProgress[0], progress: 80, previousProgress: 80 },
      ];

      cy.mount(<StudentProgressTracker students={noChangeStudent} />);

      cy.contains("No change").should("exist");
    });

    it("should handle zero progress change", () => {
      const zeroChangeStudent: StudentProgress[] = [
        { ...mockStudentProgress[0], progress: 50, previousProgress: 50 },
      ];

      cy.mount(<StudentProgressTracker students={zeroChangeStudent} />);

      cy.contains("No change").should("exist");
    });
  });

  // 6. Avatar Display
  describe("Avatar Display", () => {
    it("should display avatars with student initials", () => {
      cy.mount(<StudentProgressTracker students={mockStudentProgress} />);

      cy.contains("AJ").should("exist"); // Alex Johnson
      cy.contains("MG").should("exist"); // Maria Garcia
      cy.contains("DC").should("exist"); // David Chen
    });
  });

  // 7. Progress Bar Display
  describe("Progress Bar", () => {
    it("should display progress bars", () => {
      cy.mount(<StudentProgressTracker students={mockStudentProgress} />);

      cy.get("div").should("contain.class", "bg-gray-200");
    });

    it("should show different progress values", () => {
      cy.mount(<StudentProgressTracker students={mockStudentProgress} />);

      cy.contains("85%").should("exist");
      cy.contains("92%").should("exist");
      cy.contains("25%").should("exist");
    });
  });

  // 8. Topics Display
  describe("Topics Display", () => {
    it("should display mastered topics", () => {
      cy.mount(<StudentProgressTracker students={mockStudentProgress} />);

      cy.contains("Mastered:").should("exist");
      cy.contains("Variables, Functions").should("exist");
    });

    it("should display struggling topics", () => {
      cy.mount(<StudentProgressTracker students={mockStudentProgress} />);

      cy.contains("Struggling:").should("exist");
      cy.contains("Async/Await, Promises").should("exist");
    });

    it("should display in-progress topics", () => {
      cy.mount(<StudentProgressTracker students={mockStudentProgress} />);

      cy.contains("In Progress:").should("exist");
      cy.contains("Async/Await, API Calls").should("exist");
    });

    it("should limit topics to first 2 with overflow indicator", () => {
      cy.mount(<StudentProgressTracker students={mockStudentProgress} />);

      // Maria has 4 mastered topics, should show first 2 + "more" indicator
      cy.contains("Variables, Functions").should("exist");
      cy.contains("+2 more").should("exist");
    });

    it("should not display sections when no topics", () => {
      const noTopicsStudent: StudentProgress[] = [
        {
          ...mockStudentProgress[0],
          topics: {
            mastered: [],
            struggling: [],
            inProgress: [],
          },
        },
      ];

      cy.mount(<StudentProgressTracker students={noTopicsStudent} />);

      cy.contains("Mastered:").should("not.exist");
      cy.contains("Struggling:").should("not.exist");
      cy.contains("In Progress:").should("not.exist");
    });
  });

  // 9. Interactive Elements
  describe("Action Buttons", () => {
    it("should render view details button for each student", () => {
      cy.mount(<StudentProgressTracker students={mockStudentProgress} />);

      cy.get("button").should("have.length", 3);
      cy.contains("View Details").should("exist");
    });

    it("should call onViewStudent when button is clicked", () => {
      const onViewStudentSpy = cy.stub().as("onViewStudentSpy");

      cy.mount(
        <StudentProgressTracker
          students={singleStudent}
          onViewStudent={onViewStudentSpy}
        />
      );

      cy.contains("View Details").click();
      cy.get("@onViewStudentSpy").should(
        "have.been.calledWith",
        singleStudent[0]
      );
    });

    it("should work without event handler", () => {
      cy.mount(<StudentProgressTracker students={singleStudent} />);

      cy.contains("View Details").click();
      cy.get("button").should("have.length", 1);
    });
  });

  // 10. Summary Statistics
  describe("Summary Statistics", () => {
    it("should display summary stats when students exist", () => {
      cy.mount(<StudentProgressTracker students={mockStudentProgress} />);

      cy.contains("On Track").should("exist");
      cy.contains("Behind").should("exist");
      cy.contains("Ahead").should("exist");
      cy.contains("Struggling").should("exist");
    });

    it("should calculate status counts correctly", () => {
      cy.mount(<StudentProgressTracker students={mockStudentProgress} />);

      // Based on mock data: 1 On Track, 0 Behind, 1 Ahead, 1 Struggling
      cy.get("div").contains("1").should("exist"); // On Track count
      cy.get("div").contains("0").should("exist"); // Behind count
      cy.get("div").contains("1").should("exist"); // Ahead count
      cy.get("div").contains("1").should("exist"); // Struggling count
    });

    it("should update counts with different data", () => {
      const customStatusStudents: StudentProgress[] = [
        { ...mockStudentProgress[0], status: "Behind" },
        { ...mockStudentProgress[1], status: "Behind" },
        { ...mockStudentProgress[2], status: "On Track" },
      ];

      cy.mount(<StudentProgressTracker students={customStatusStudents} />);

      // Should show: 1 On Track, 2 Behind, 0 Ahead, 0 Struggling
      cy.get("div").contains("1").should("exist"); // On Track
      cy.get("div").contains("2").should("exist"); // Behind
      cy.get("div").contains("0").should("exist"); // Ahead and Struggling
    });

    it("should not display summary when no students", () => {
      cy.mount(<StudentProgressTracker students={[]} />);

      cy.contains("On Track").should("not.exist");
      cy.contains("Behind").should("not.exist");
      cy.contains("Ahead").should("not.exist");
      cy.contains("Struggling").should("not.exist");
    });
  });

  // 11. Edge Cases
  describe("Edge Cases", () => {
    it("should handle single student", () => {
      cy.mount(<StudentProgressTracker students={singleStudent} />);

      cy.contains("Alex Johnson").should("exist");
      cy.contains("Progress: 85%").should("exist");
      cy.contains("On Track").should("exist");
    });

    it("should handle zero progress", () => {
      const zeroProgressStudent: StudentProgress[] = [
        { ...mockStudentProgress[0], progress: 0, previousProgress: 0 },
      ];

      cy.mount(<StudentProgressTracker students={zeroProgressStudent} />);

      cy.contains("Progress: 0%").should("exist");
      cy.contains("No change").should("exist");
    });

    it("should handle 100% progress", () => {
      const fullProgressStudent: StudentProgress[] = [
        { ...mockStudentProgress[0], progress: 100, previousProgress: 95 },
      ];

      cy.mount(<StudentProgressTracker students={fullProgressStudent} />);

      cy.contains("Progress: 100%").should("exist");
      cy.contains("+5%").should("exist");
    });

    it("should handle zero streak", () => {
      cy.mount(<StudentProgressTracker students={mockStudentProgress} />);

      cy.contains("0").should("exist"); // David's streak
    });

    it("should handle long names and emails", () => {
      const longNameStudent: StudentProgress[] = [
        {
          ...mockStudentProgress[0],
          name: "Alexander Christopher Johnson-Smith",
          email: "alexander.christopher.johnson-smith@verylongdomainname.com",
        },
      ];

      cy.mount(<StudentProgressTracker students={longNameStudent} />);

      cy.contains("Alexander Christopher Johnson-Smith").should("exist");
      cy.contains(
        "alexander.christopher.johnson-smith@verylongdomainname.com"
      ).should("exist");
    });

    it("should handle many topics in each category", () => {
      const manyTopicsStudent: StudentProgress[] = [
        {
          ...mockStudentProgress[0],
          topics: {
            mastered: ["Topic1", "Topic2", "Topic3", "Topic4", "Topic5"],
            struggling: ["Struggle1", "Struggle2", "Struggle3"],
            inProgress: ["Progress1", "Progress2", "Progress3", "Progress4"],
          },
        },
      ];

      cy.mount(<StudentProgressTracker students={manyTopicsStudent} />);

      cy.contains("Topic1, Topic2").should("exist");
      cy.contains("+3 more").should("exist");
      cy.contains("Struggle1, Struggle2").should("exist");
      cy.contains("+1 more").should("exist");
      cy.contains("Progress1, Progress2").should("exist");
      cy.contains("+2 more").should("exist");
    });
  });

  // 12. Integration Testing
  describe("Full Integration", () => {
    it("should display all data correctly together", () => {
      const onViewStudentSpy = cy.stub().as("onViewStudentSpy");

      cy.mount(
        <StudentProgressTracker
          students={mockStudentProgress}
          onViewStudent={onViewStudentSpy}
        />
      );

      // Verify title
      cy.contains("Student Progress Tracker").should("exist");

      // Verify all student data
      cy.contains("Alex Johnson").should("exist");
      cy.contains("Maria Garcia").should("exist");
      cy.contains("David Chen").should("exist");

      // Verify progress changes
      cy.contains("+7%").should("exist");
      cy.contains("+3%").should("exist");
      cy.contains("-5%").should("exist");

      // Verify status badges
      cy.contains("On Track").should("exist");
      cy.contains("Ahead").should("exist");
      cy.contains("Struggling").should("exist");

      // Verify topics
      cy.contains("Mastered:").should("exist");
      cy.contains("Struggling:").should("exist");
      cy.contains("In Progress:").should("exist");

      // Verify avatars
      cy.contains("AJ").should("exist");
      cy.contains("MG").should("exist");
      cy.contains("DC").should("exist");

      // Verify summary stats
      cy.get("div").contains("1").should("exist"); // Various counts
      cy.get("div").contains("0").should("exist");

      // Verify interactions work
      cy.contains("View Details").first().click();
      cy.get("@onViewStudentSpy").should(
        "have.been.calledWith",
        mockStudentProgress[0]
      );
    });

    it("should handle state transitions correctly", () => {
      // Start with empty state
      cy.mount(<StudentProgressTracker students={[]} />);
      cy.contains("No student data available").should("exist");

      // Update to single student
      cy.mount(<StudentProgressTracker students={singleStudent} />);
      cy.contains("Alex Johnson").should("exist");
      cy.contains("Progress: 85%").should("exist");

      // Update to multiple students
      cy.mount(<StudentProgressTracker students={mockStudentProgress} />);
      cy.contains("Alex Johnson").should("exist");
      cy.contains("Maria Garcia").should("exist");
      cy.contains("David Chen").should("exist");
    });
  });
});
