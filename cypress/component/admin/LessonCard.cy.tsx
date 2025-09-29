import React from "react";
import { LessonCard } from "../../../components/admin/LessonCard";
import { Lesson } from "../../../types/data";

describe("LessonCard Component", () => {
  // Mock lesson data for testing
  const mockLesson: Lesson = {
    id: 1,
    title: "Introduction to React",
    description: "Learn the basics of React and component-based architecture",
    category: "Frontend",
    difficulty: "Beginner",
    duration: "2 hours",
    students: 245,
    completionRate: 87,
    status: "Published",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-15",
  };

  const draftLesson: Lesson = {
    id: 2,
    title: "Advanced TypeScript",
    description: "Master advanced TypeScript concepts and patterns",
    category: "Programming",
    difficulty: "Advanced",
    duration: "4 hours",
    students: 89,
    completionRate: 45,
    status: "Draft",
    createdAt: "2024-01-12",
    updatedAt: "2024-01-20",
  };

  // 1. Fundamental Structure
  describe("Component Structure", () => {
    it("should render as a card", () => {
      cy.mount(<LessonCard lesson={mockLesson} />);

      cy.get("div").should("exist").should("be.visible");
    });

    it("should display lesson title as heading", () => {
      cy.mount(<LessonCard lesson={mockLesson} />);

      cy.get("h3")
        .should("exist")
        .should("contain.text", "Introduction to React");
    });

    it("should display lesson description", () => {
      cy.mount(<LessonCard lesson={mockLesson} />);

      cy.get("p")
        .should("exist")
        .should("contain.text", "Learn the basics of React");
    });
  });

  // 2. Data Display
  describe("Lesson Data", () => {
    it("should display lesson title", () => {
      cy.mount(<LessonCard lesson={mockLesson} />);

      cy.contains("Introduction to React").should("exist");
    });

    it("should display lesson description", () => {
      cy.mount(<LessonCard lesson={mockLesson} />);

      cy.contains(
        "Learn the basics of React and component-based architecture"
      ).should("exist");
    });

    it("should display category", () => {
      cy.mount(<LessonCard lesson={mockLesson} />);

      cy.contains("Frontend").should("exist");
    });

    it("should display difficulty", () => {
      cy.mount(<LessonCard lesson={mockLesson} />);

      cy.contains("Beginner").should("exist");
    });

    it("should display duration", () => {
      cy.mount(<LessonCard lesson={mockLesson} />);

      cy.contains("2 hours").should("exist");
    });

    it("should display student count", () => {
      cy.mount(<LessonCard lesson={mockLesson} />);

      cy.contains("245").should("exist");
    });

    it("should display completion rate percentage", () => {
      cy.mount(<LessonCard lesson={mockLesson} />);

      cy.contains("87%").should("exist");
    });

    it("should display updated date", () => {
      cy.mount(<LessonCard lesson={mockLesson} />);

      cy.contains("Updated 2024-01-15").should("exist");
    });
  });

  // 3. Status Display
  describe("Status Display", () => {
    it("should display published status", () => {
      cy.mount(<LessonCard lesson={mockLesson} />);

      cy.contains("Published").should("exist");
    });

    it("should display draft status", () => {
      cy.mount(<LessonCard lesson={draftLesson} />);

      cy.contains("Draft").should("exist");
    });
  });

  // 4. Difficulty Variations
  describe("Difficulty Variations", () => {
    it("should display beginner difficulty", () => {
      cy.mount(<LessonCard lesson={mockLesson} />);

      cy.contains("Beginner").should("exist");
    });

    it("should display advanced difficulty", () => {
      cy.mount(<LessonCard lesson={draftLesson} />);

      cy.contains("Advanced").should("exist");
    });

    it("should handle intermediate difficulty", () => {
      const intermediateLesson: Lesson = {
        ...mockLesson,
        difficulty: "Intermediate",
      };

      cy.mount(<LessonCard lesson={intermediateLesson} />);

      cy.contains("Intermediate").should("exist");
    });
  });

  // 5. Progress Bar
  describe("Completion Rate Progress", () => {
    it("should display progress bar", () => {
      cy.mount(<LessonCard lesson={mockLesson} />);

      cy.get("div").should("contain.class", "bg-gray-200");
    });

    it("should show different completion rates", () => {
      cy.mount(<LessonCard lesson={draftLesson} />);

      cy.contains("45%").should("exist");
    });

    it("should handle zero completion rate", () => {
      const zeroCompletionLesson: Lesson = {
        ...mockLesson,
        completionRate: 0,
      };

      cy.mount(<LessonCard lesson={zeroCompletionLesson} />);

      cy.contains("0%").should("exist");
    });

    it("should handle full completion rate", () => {
      const fullCompletionLesson: Lesson = {
        ...mockLesson,
        completionRate: 100,
      };

      cy.mount(<LessonCard lesson={fullCompletionLesson} />);

      cy.contains("100%").should("exist");
    });
  });

  // 6. Interactive Elements
  describe("Action Buttons", () => {
    it("should render all three action buttons", () => {
      cy.mount(<LessonCard lesson={mockLesson} />);

      cy.get("button").should("have.length", 3);
    });

    it("should call onView when view button is clicked", () => {
      const onViewSpy = cy.stub().as("onViewSpy");

      cy.mount(<LessonCard lesson={mockLesson} onView={onViewSpy} />);

      cy.get("button").first().click();
      cy.get("@onViewSpy").should("have.been.calledWith", mockLesson);
    });

    it("should call onEdit when edit button is clicked", () => {
      const onEditSpy = cy.stub().as("onEditSpy");

      cy.mount(<LessonCard lesson={mockLesson} onEdit={onEditSpy} />);

      cy.get("button").eq(1).click();
      cy.get("@onEditSpy").should("have.been.calledWith", mockLesson);
    });

    it("should call onDelete when delete button is clicked", () => {
      const onDeleteSpy = cy.stub().as("onDeleteSpy");

      cy.mount(<LessonCard lesson={mockLesson} onDelete={onDeleteSpy} />);

      cy.get("button").last().click();
      cy.get("@onDeleteSpy").should("have.been.calledWith", mockLesson);
    });

    it("should work without event handlers", () => {
      cy.mount(<LessonCard lesson={mockLesson} />);

      cy.get("button").first().click();
      cy.get("button").eq(1).click();
      cy.get("button").last().click();
      cy.get("button").should("have.length", 3);
    });
  });

  // 7. Different Lesson States
  describe("Lesson Variations", () => {
    it("should handle published beginner lesson", () => {
      cy.mount(<LessonCard lesson={mockLesson} />);

      cy.contains("Introduction to React").should("exist");
      cy.contains("Published").should("exist");
      cy.contains("Beginner").should("exist");
      cy.contains("Frontend").should("exist");
      cy.contains("87%").should("exist");
    });

    it("should handle draft advanced lesson", () => {
      cy.mount(<LessonCard lesson={draftLesson} />);

      cy.contains("Advanced TypeScript").should("exist");
      cy.contains("Draft").should("exist");
      cy.contains("Advanced").should("exist");
      cy.contains("Programming").should("exist");
      cy.contains("45%").should("exist");
    });

    it("should handle zero students", () => {
      const zeroStudentsLesson: Lesson = {
        ...mockLesson,
        students: 0,
      };

      cy.mount(<LessonCard lesson={zeroStudentsLesson} />);

      cy.contains("0").should("exist");
    });
  });

  // 8. Integration Testing
  describe("Full Integration", () => {
    it("should display all data correctly together", () => {
      const onViewSpy = cy.stub().as("onViewSpy");
      const onEditSpy = cy.stub().as("onEditSpy");
      const onDeleteSpy = cy.stub().as("onDeleteSpy");

      cy.mount(
        <LessonCard
          lesson={mockLesson}
          onView={onViewSpy}
          onEdit={onEditSpy}
          onDelete={onDeleteSpy}
        />
      );

      // Verify all data is displayed
      cy.contains("Introduction to React").should("exist");
      cy.contains("Learn the basics of React").should("exist");
      cy.contains("Published").should("exist");
      cy.contains("Frontend").should("exist");
      cy.contains("Beginner").should("exist");
      cy.contains("2 hours").should("exist");
      cy.contains("245").should("exist");
      cy.contains("87%").should("exist");
      cy.contains("Updated 2024-01-15").should("exist");

      // Verify interactions work
      cy.get("button").first().click();
      cy.get("@onViewSpy").should("have.been.calledWith", mockLesson);

      cy.get("button").eq(1).click();
      cy.get("@onEditSpy").should("have.been.calledWith", mockLesson);

      cy.get("button").last().click();
      cy.get("@onDeleteSpy").should("have.been.calledWith", mockLesson);
    });

    it("should handle long titles and descriptions gracefully", () => {
      const longContentLesson: Lesson = {
        ...mockLesson,
        title:
          "This is a very long lesson title that might wrap to multiple lines in the UI",
        description:
          "This is a very long description that contains detailed information about the lesson content and might need to be handled gracefully in the UI to maintain proper layout and readability.",
      };

      cy.mount(<LessonCard lesson={longContentLesson} />);

      cy.contains("This is a very long lesson title").should("exist");
      cy.contains("This is a very long description").should("exist");
    });
  });
});
