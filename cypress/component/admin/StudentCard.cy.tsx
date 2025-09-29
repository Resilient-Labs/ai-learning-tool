import React from "react";
import { StudentCard } from "../../../components/admin/StudentCard";
import { Student } from "../../../types/data";

describe("StudentCard Component", () => {
  // Mock student data for testing
  const mockStudent: Student = {
    id: 1,
    name: "Alex Johnson",
    email: "alex@example.com",
    joinDate: "2024-01-15",
    status: "Active",
    progress: 85,
    lessonsCompleted: 12,
    totalLessons: 15,
    lastActive: "2 hours ago",
    streak: 7,
  };

  const inactiveStudent: Student = {
    id: 2,
    name: "Maria Garcia",
    email: "maria@example.com",
    joinDate: "2024-01-20",
    status: "Inactive",
    progress: 45,
    lessonsCompleted: 6,
    totalLessons: 20,
    lastActive: "1 week ago",
    streak: 0,
  };

  const pendingStudent: Student = {
    id: 3,
    name: "David Chen",
    email: "david@example.com",
    joinDate: "2024-01-25",
    status: "Pending",
    progress: 0,
    lessonsCompleted: 0,
    totalLessons: 15,
    lastActive: "Never",
    streak: 0,
  };

  // 1. Fundamental Structure
  describe("Component Structure", () => {
    it("should render as a card", () => {
      cy.mount(<StudentCard student={mockStudent} />);

      cy.get("div").should("exist").should("be.visible");
    });

    it("should display student name as heading", () => {
      cy.mount(<StudentCard student={mockStudent} />);

      cy.get("h3").should("exist").should("contain.text", "Alex Johnson");
    });

    it("should display student email as description", () => {
      cy.mount(<StudentCard student={mockStudent} />);

      cy.get("p").should("exist").should("contain.text", "alex@example.com");
    });
  });

  // 2. Data Display
  describe("Student Data", () => {
    it("should display student name", () => {
      cy.mount(<StudentCard student={mockStudent} />);

      cy.contains("Alex Johnson").should("exist");
    });

    it("should display student email", () => {
      cy.mount(<StudentCard student={mockStudent} />);

      cy.contains("alex@example.com").should("exist");
    });

    it("should display progress percentage", () => {
      cy.mount(<StudentCard student={mockStudent} />);

      cy.contains("85%").should("exist");
    });

    it("should display lessons completed and total", () => {
      cy.mount(<StudentCard student={mockStudent} />);

      cy.contains("12/15").should("exist");
    });

    it("should display streak", () => {
      cy.mount(<StudentCard student={mockStudent} />);

      cy.contains("7 days").should("exist");
    });

    it("should display last active time", () => {
      cy.mount(<StudentCard student={mockStudent} />);

      cy.contains("Last active: 2 hours ago").should("exist");
    });
  });

  // 3. Status Display
  describe("Status Display", () => {
    it("should display active status", () => {
      cy.mount(<StudentCard student={mockStudent} />);

      cy.contains("Active").should("exist");
    });

    it("should display inactive status", () => {
      cy.mount(<StudentCard student={inactiveStudent} />);

      cy.contains("Inactive").should("exist");
    });

    it("should display pending status", () => {
      cy.mount(<StudentCard student={pendingStudent} />);

      cy.contains("Pending").should("exist");
    });
  });

  // 4. Avatar Display
  describe("Avatar", () => {
    it("should display avatar with student initials", () => {
      cy.mount(<StudentCard student={mockStudent} />);

      cy.contains("AJ").should("exist"); // Alex Johnson initials
    });

    it("should display different student initials", () => {
      cy.mount(<StudentCard student={inactiveStudent} />);

      cy.contains("MG").should("exist"); // Maria Garcia initials
    });
  });

  // 5. Progress Bar
  describe("Progress Display", () => {
    it("should display progress bar", () => {
      cy.mount(<StudentCard student={mockStudent} />);

      cy.get("div").should("contain.class", "bg-gray-200");
    });

    it("should show different progress values", () => {
      cy.mount(<StudentCard student={inactiveStudent} />);

      cy.contains("45%").should("exist");
    });

    it("should handle zero progress", () => {
      cy.mount(<StudentCard student={pendingStudent} />);

      cy.contains("0%").should("exist");
    });

    it("should handle full progress", () => {
      const fullProgressStudent: Student = {
        ...mockStudent,
        progress: 100,
      };

      cy.mount(<StudentCard student={fullProgressStudent} />);

      cy.contains("100%").should("exist");
    });
  });

  // 6. Interactive Elements
  describe("Action Buttons", () => {
    it("should render all three action buttons", () => {
      cy.mount(<StudentCard student={mockStudent} />);

      cy.get("button").should("have.length", 3);
    });

    it("should call onView when view button is clicked", () => {
      const onViewSpy = cy.stub().as("onViewSpy");

      cy.mount(<StudentCard student={mockStudent} onView={onViewSpy} />);

      cy.get("button").first().click();
      cy.get("@onViewSpy").should("have.been.calledWith", mockStudent);
    });

    it("should call onEdit when edit button is clicked", () => {
      const onEditSpy = cy.stub().as("onEditSpy");

      cy.mount(<StudentCard student={mockStudent} onEdit={onEditSpy} />);

      cy.get("button").eq(1).click();
      cy.get("@onEditSpy").should("have.been.calledWith", mockStudent);
    });

    it("should call onMore when more button is clicked", () => {
      const onMoreSpy = cy.stub().as("onMoreSpy");

      cy.mount(<StudentCard student={mockStudent} onMore={onMoreSpy} />);

      cy.get("button").last().click();
      cy.get("@onMoreSpy").should("have.been.calledWith", mockStudent);
    });

    it("should work without event handlers", () => {
      cy.mount(<StudentCard student={mockStudent} />);

      cy.get("button").first().click();
      cy.get("button").eq(1).click();
      cy.get("button").last().click();
      cy.get("button").should("have.length", 3);
    });
  });

  // 7. Different Student States
  describe("Student Variations", () => {
    it("should handle active student with high progress", () => {
      cy.mount(<StudentCard student={mockStudent} />);

      cy.contains("Alex Johnson").should("exist");
      cy.contains("Active").should("exist");
      cy.contains("85%").should("exist");
      cy.contains("12/15").should("exist");
      cy.contains("7 days").should("exist");
    });

    it("should handle inactive student with low progress", () => {
      cy.mount(<StudentCard student={inactiveStudent} />);

      cy.contains("Maria Garcia").should("exist");
      cy.contains("Inactive").should("exist");
      cy.contains("45%").should("exist");
      cy.contains("6/20").should("exist");
      cy.contains("0 days").should("exist");
    });

    it("should handle pending student with no progress", () => {
      cy.mount(<StudentCard student={pendingStudent} />);

      cy.contains("David Chen").should("exist");
      cy.contains("Pending").should("exist");
      cy.contains("0%").should("exist");
      cy.contains("0/15").should("exist");
      cy.contains("0 days").should("exist");
    });

    it("should handle zero streak", () => {
      cy.mount(<StudentCard student={inactiveStudent} />);

      cy.contains("0 days").should("exist");
    });

    it("should handle high streak", () => {
      const highStreakStudent: Student = {
        ...mockStudent,
        streak: 30,
      };

      cy.mount(<StudentCard student={highStreakStudent} />);

      cy.contains("30 days").should("exist");
    });
  });

  // 8. Edge Cases
  describe("Edge Cases", () => {
    it("should handle student with no completed lessons", () => {
      const noLessonsStudent: Student = {
        ...mockStudent,
        lessonsCompleted: 0,
        totalLessons: 10,
        progress: 0,
      };

      cy.mount(<StudentCard student={noLessonsStudent} />);

      cy.contains("0/10").should("exist");
      cy.contains("0%").should("exist");
    });

    it("should handle student with all lessons completed", () => {
      const allLessonsStudent: Student = {
        ...mockStudent,
        lessonsCompleted: 15,
        totalLessons: 15,
        progress: 100,
      };

      cy.mount(<StudentCard student={allLessonsStudent} />);

      cy.contains("15/15").should("exist");
      cy.contains("100%").should("exist");
    });

    it("should handle long names gracefully", () => {
      const longNameStudent: Student = {
        ...mockStudent,
        name: "Alexander Christopher Johnson-Smith",
        email: "alexander.christopher.johnson-smith@verylongdomainname.com",
      };

      cy.mount(<StudentCard student={longNameStudent} />);

      cy.contains("Alexander Christopher Johnson-Smith").should("exist");
      cy.contains(
        "alexander.christopher.johnson-smith@verylongdomainname.com"
      ).should("exist");
    });
  });

  // 9. Integration Testing
  describe("Full Integration", () => {
    it("should display all data correctly together", () => {
      const onViewSpy = cy.stub().as("onViewSpy");
      const onEditSpy = cy.stub().as("onEditSpy");
      const onMoreSpy = cy.stub().as("onMoreSpy");

      cy.mount(
        <StudentCard
          student={mockStudent}
          onView={onViewSpy}
          onEdit={onEditSpy}
          onMore={onMoreSpy}
        />
      );

      // Verify all data is displayed
      cy.contains("Alex Johnson").should("exist");
      cy.contains("alex@example.com").should("exist");
      cy.contains("Active").should("exist");
      cy.contains("85%").should("exist");
      cy.contains("12/15").should("exist");
      cy.contains("7 days").should("exist");
      cy.contains("Last active: 2 hours ago").should("exist");
      cy.contains("AJ").should("exist"); // Avatar initials

      // Verify interactions work
      cy.get("button").first().click();
      cy.get("@onViewSpy").should("have.been.calledWith", mockStudent);

      cy.get("button").eq(1).click();
      cy.get("@onEditSpy").should("have.been.calledWith", mockStudent);

      cy.get("button").last().click();
      cy.get("@onMoreSpy").should("have.been.calledWith", mockStudent);
    });

    it("should handle complete student lifecycle states", () => {
      // Test progression from pending -> active -> inactive
      cy.mount(<StudentCard student={pendingStudent} />);
      cy.contains("Pending").should("exist");
      cy.contains("0%").should("exist");

      cy.mount(<StudentCard student={mockStudent} />);
      cy.contains("Active").should("exist");
      cy.contains("85%").should("exist");

      cy.mount(<StudentCard student={inactiveStudent} />);
      cy.contains("Inactive").should("exist");
      cy.contains("45%").should("exist");
    });
  });
});
