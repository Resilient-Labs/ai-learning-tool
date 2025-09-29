import React from "react";
import { StudentTable } from "../../../components/admin/StudentTable";
import { Student } from "../../../types/data";

describe("StudentTable Component", () => {
  // Mock student data for testing
  const mockStudents: Student[] = [
    {
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
    },
    {
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
    },
    {
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
    },
  ];

  const singleStudent: Student[] = [mockStudents[0]];

  // 1. Fundamental Structure
  describe("Component Structure", () => {
    it("should render as a table", () => {
      cy.mount(<StudentTable students={mockStudents} />);

      cy.get("table").should("exist").should("be.visible");
    });

    it("should have proper table headers", () => {
      cy.mount(<StudentTable students={mockStudents} />);

      cy.get("thead").should("exist");
      cy.get("th").should("have.length", 6);
      cy.contains("th", "Student").should("exist");
      cy.contains("th", "Status").should("exist");
      cy.contains("th", "Progress").should("exist");
      cy.contains("th", "Lessons").should("exist");
      cy.contains("th", "Last Active").should("exist");
      cy.contains("th", "Actions").should("exist");
    });

    it("should have table body with rows", () => {
      cy.mount(<StudentTable students={mockStudents} />);

      cy.get("tbody").should("exist");
      cy.get("tbody tr").should("have.length", 3);
    });
  });

  // 2. Data Display
  describe("Student Data Display", () => {
    it("should display all student names", () => {
      cy.mount(<StudentTable students={mockStudents} />);

      cy.contains("Alex Johnson").should("exist");
      cy.contains("Maria Garcia").should("exist");
      cy.contains("David Chen").should("exist");
    });

    it("should display all student emails", () => {
      cy.mount(<StudentTable students={mockStudents} />);

      cy.contains("alex@example.com").should("exist");
      cy.contains("maria@example.com").should("exist");
      cy.contains("david@example.com").should("exist");
    });

    it("should display student statuses", () => {
      cy.mount(<StudentTable students={mockStudents} />);

      cy.contains("Active").should("exist");
      cy.contains("Inactive").should("exist");
      cy.contains("Pending").should("exist");
    });

    it("should display progress percentages", () => {
      cy.mount(<StudentTable students={mockStudents} />);

      cy.contains("85%").should("exist");
      cy.contains("45%").should("exist");
      cy.contains("0%").should("exist");
    });

    it("should display lesson completion ratios", () => {
      cy.mount(<StudentTable students={mockStudents} />);

      cy.contains("12/15").should("exist");
      cy.contains("6/20").should("exist");
      cy.contains("0/15").should("exist");
    });

    it("should display last active times", () => {
      cy.mount(<StudentTable students={mockStudents} />);

      cy.contains("2 hours ago").should("exist");
      cy.contains("1 week ago").should("exist");
      cy.contains("Never").should("exist");
    });
  });

  // 3. Avatar Display
  describe("Avatar Display", () => {
    it("should display avatars with student initials", () => {
      cy.mount(<StudentTable students={mockStudents} />);

      cy.contains("AJ").should("exist"); // Alex Johnson
      cy.contains("MG").should("exist"); // Maria Garcia
      cy.contains("DC").should("exist"); // David Chen
    });
  });

  // 4. Progress Bars
  describe("Progress Bars", () => {
    it("should display progress bars for each student", () => {
      cy.mount(<StudentTable students={mockStudents} />);

      cy.get("div").should("contain.class", "bg-gray-200");
      cy.get("tbody tr").should("have.length", 3);
    });

    it("should show different progress values", () => {
      cy.mount(<StudentTable students={mockStudents} />);

      cy.contains("85%").should("exist");
      cy.contains("45%").should("exist");
      cy.contains("0%").should("exist");
    });
  });

  // 5. Interactive Elements
  describe("Action Buttons", () => {
    it("should render three action buttons per student", () => {
      cy.mount(<StudentTable students={mockStudents} />);

      // 3 students × 3 buttons each = 9 total buttons
      cy.get("button").should("have.length", 9);
    });

    it("should call onView when view button is clicked", () => {
      const onViewSpy = cy.stub().as("onViewSpy");

      cy.mount(<StudentTable students={singleStudent} onView={onViewSpy} />);

      // Click the first button (view) in the first row
      cy.get("tbody tr").first().find("button").first().click();
      cy.get("@onViewSpy").should("have.been.calledWith", singleStudent[0]);
    });

    it("should call onEdit when edit button is clicked", () => {
      const onEditSpy = cy.stub().as("onEditSpy");

      cy.mount(<StudentTable students={singleStudent} onEdit={onEditSpy} />);

      // Click the second button (edit) in the first row
      cy.get("tbody tr").first().find("button").eq(1).click();
      cy.get("@onEditSpy").should("have.been.calledWith", singleStudent[0]);
    });

    it("should call onDelete when delete button is clicked", () => {
      const onDeleteSpy = cy.stub().as("onDeleteSpy");

      cy.mount(
        <StudentTable students={singleStudent} onDelete={onDeleteSpy} />
      );

      // Click the third button (delete) in the first row
      cy.get("tbody tr").first().find("button").last().click();
      cy.get("@onDeleteSpy").should("have.been.calledWith", singleStudent[0]);
    });

    it("should work without event handlers", () => {
      cy.mount(<StudentTable students={singleStudent} />);

      cy.get("tbody tr").first().find("button").first().click();
      cy.get("tbody tr").first().find("button").eq(1).click();
      cy.get("tbody tr").first().find("button").last().click();
      cy.get("button").should("have.length", 3);
    });
  });

  // 6. Multiple Students
  describe("Multiple Students Display", () => {
    it("should handle multiple students correctly", () => {
      cy.mount(<StudentTable students={mockStudents} />);

      // Verify all students are displayed
      cy.get("tbody tr").should("have.length", 3);
      cy.contains("Alex Johnson").should("exist");
      cy.contains("Maria Garcia").should("exist");
      cy.contains("David Chen").should("exist");

      // Verify each row has action buttons
      cy.get("tbody tr").each(($row) => {
        cy.wrap($row).find("button").should("have.length", 3);
      });
    });

    it("should handle different student statuses", () => {
      cy.mount(<StudentTable students={mockStudents} />);

      cy.contains("Active").should("exist");
      cy.contains("Inactive").should("exist");
      cy.contains("Pending").should("exist");
    });

    it("should handle different progress levels", () => {
      cy.mount(<StudentTable students={mockStudents} />);

      cy.contains("85%").should("exist");
      cy.contains("45%").should("exist");
      cy.contains("0%").should("exist");
    });
  });

  // 7. Edge Cases
  describe("Edge Cases", () => {
    it("should handle empty student list", () => {
      cy.mount(<StudentTable students={[]} />);

      cy.get("table").should("exist");
      cy.get("thead").should("exist");
      cy.get("tbody").should("exist");
      cy.get("tbody tr").should("have.length", 0);
    });

    it("should handle single student", () => {
      cy.mount(<StudentTable students={singleStudent} />);

      cy.get("tbody tr").should("have.length", 1);
      cy.contains("Alex Johnson").should("exist");
      cy.get("button").should("have.length", 3);
    });

    it("should handle student with full progress", () => {
      const fullProgressStudent: Student[] = [
        {
          ...mockStudents[0],
          progress: 100,
          lessonsCompleted: 15,
          totalLessons: 15,
        },
      ];

      cy.mount(<StudentTable students={fullProgressStudent} />);

      cy.contains("100%").should("exist");
      cy.contains("15/15").should("exist");
    });

    it("should handle long names and emails", () => {
      const longNameStudent: Student[] = [
        {
          ...mockStudents[0],
          name: "Alexander Christopher Johnson-Smith",
          email: "alexander.christopher.johnson-smith@verylongdomainname.com",
        },
      ];

      cy.mount(<StudentTable students={longNameStudent} />);

      cy.contains("Alexander Christopher Johnson-Smith").should("exist");
      cy.contains(
        "alexander.christopher.johnson-smith@verylongdomainname.com"
      ).should("exist");
    });
  });

  // 8. Row-Specific Actions
  describe("Row-Specific Actions", () => {
    it("should call handlers with correct student data for different rows", () => {
      const onViewSpy = cy.stub().as("onViewSpy");
      const onEditSpy = cy.stub().as("onEditSpy");
      const onDeleteSpy = cy.stub().as("onDeleteSpy");

      cy.mount(
        <StudentTable
          students={mockStudents}
          onView={onViewSpy}
          onEdit={onEditSpy}
          onDelete={onDeleteSpy}
        />
      );

      // Test first row (Alex Johnson)
      cy.get("tbody tr").first().find("button").first().click();
      cy.get("@onViewSpy").should("have.been.calledWith", mockStudents[0]);

      // Test second row (Maria Garcia)
      cy.get("tbody tr").eq(1).find("button").eq(1).click();
      cy.get("@onEditSpy").should("have.been.calledWith", mockStudents[1]);

      // Test third row (David Chen)
      cy.get("tbody tr").last().find("button").last().click();
      cy.get("@onDeleteSpy").should("have.been.calledWith", mockStudents[2]);
    });
  });

  // 9. Integration Testing
  describe("Full Integration", () => {
    it("should display complete table with all data and interactions", () => {
      const onViewSpy = cy.stub().as("onViewSpy");
      const onEditSpy = cy.stub().as("onEditSpy");
      const onDeleteSpy = cy.stub().as("onDeleteSpy");

      cy.mount(
        <StudentTable
          students={mockStudents}
          onView={onViewSpy}
          onEdit={onEditSpy}
          onDelete={onDeleteSpy}
        />
      );

      // Verify table structure
      cy.get("table").should("exist");
      cy.get("thead th").should("have.length", 6);
      cy.get("tbody tr").should("have.length", 3);

      // Verify all student data is displayed
      cy.contains("Alex Johnson").should("exist");
      cy.contains("alex@example.com").should("exist");
      cy.contains("Active").should("exist");
      cy.contains("85%").should("exist");
      cy.contains("12/15").should("exist");
      cy.contains("2 hours ago").should("exist");

      cy.contains("Maria Garcia").should("exist");
      cy.contains("Inactive").should("exist");
      cy.contains("45%").should("exist");

      cy.contains("David Chen").should("exist");
      cy.contains("Pending").should("exist");
      cy.contains("0%").should("exist");

      // Verify avatars
      cy.contains("AJ").should("exist");
      cy.contains("MG").should("exist");
      cy.contains("DC").should("exist");

      // Verify interactions work
      cy.get("tbody tr").first().find("button").first().click();
      cy.get("@onViewSpy").should("have.been.calledWith", mockStudents[0]);

      // Verify total button count
      cy.get("button").should("have.length", 9); // 3 students × 3 buttons
    });

    it("should handle dynamic student list updates", () => {
      // Start with empty list
      cy.mount(<StudentTable students={[]} />);
      cy.get("tbody tr").should("have.length", 0);

      // Update to single student
      cy.mount(<StudentTable students={singleStudent} />);
      cy.get("tbody tr").should("have.length", 1);
      cy.contains("Alex Johnson").should("exist");

      // Update to multiple students
      cy.mount(<StudentTable students={mockStudents} />);
      cy.get("tbody tr").should("have.length", 3);
      cy.contains("Alex Johnson").should("exist");
      cy.contains("Maria Garcia").should("exist");
      cy.contains("David Chen").should("exist");
    });
  });
});
