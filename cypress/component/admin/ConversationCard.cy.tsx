import React from "react";
import { ConversationCard } from "../../../components/admin/ConversationCard";
import { Conversation } from "../../../types/data";

describe("ConversationCard Component", () => {
  // Mock conversation data for testing
  const mockConversation: Conversation = {
    id: 1,
    student: {
      name: "John Doe",
    },
    topic: "JavaScript Arrays",
    lastMessage:
      "I'm having trouble understanding how to use the map function with nested arrays.",
    messageCount: 15,
    aiResponses: 8,
    timestamp: "2 hours ago",
    status: "Active",
    sentiment: "Frustrated",
    resolved: false,
  };

  const resolvedConversation: Conversation = {
    id: 2,
    student: {
      name: "Jane Smith",
    },
    topic: "React Hooks",
    lastMessage: "Thank you! That explanation really helped me understand it.",
    messageCount: 12,
    aiResponses: 6,
    timestamp: "1 day ago",
    status: "Resolved",
    sentiment: "Positive",
    resolved: true,
  };

  // 1. Fundamental Structure
  describe("Component Structure", () => {
    it("should render as a card", () => {
      cy.mount(<ConversationCard conversation={mockConversation} />);

      cy.get("div").should("exist").should("be.visible");
    });

    it("should display student name as heading", () => {
      cy.mount(<ConversationCard conversation={mockConversation} />);

      cy.get("h3").should("exist").should("contain.text", "John Doe");
    });
  });

  // 2. Data Display
  describe("Conversation Data", () => {
    it("should display student name", () => {
      cy.mount(<ConversationCard conversation={mockConversation} />);

      cy.contains("John Doe").should("exist");
    });

    it("should display conversation topic", () => {
      cy.mount(<ConversationCard conversation={mockConversation} />);

      cy.contains("JavaScript Arrays").should("exist");
    });

    it("should display last message", () => {
      cy.mount(<ConversationCard conversation={mockConversation} />);

      cy.contains(
        "I'm having trouble understanding how to use the map function"
      ).should("exist");
    });

    it("should display message count", () => {
      cy.mount(<ConversationCard conversation={mockConversation} />);

      cy.contains("15 messages").should("exist");
    });

    it("should display AI responses count", () => {
      cy.mount(<ConversationCard conversation={mockConversation} />);

      cy.contains("8 AI responses").should("exist");
    });

    it("should display timestamp", () => {
      cy.mount(<ConversationCard conversation={mockConversation} />);

      cy.contains("2 hours ago").should("exist");
    });
  });

  // 3. Status and Sentiment
  describe("Status and Sentiment Display", () => {
    it("should display conversation status", () => {
      cy.mount(<ConversationCard conversation={mockConversation} />);

      cy.contains("Active").should("exist");
    });

    it("should display sentiment", () => {
      cy.mount(<ConversationCard conversation={mockConversation} />);

      cy.contains("Frustrated").should("exist");
    });

    it("should display resolved status", () => {
      cy.mount(<ConversationCard conversation={resolvedConversation} />);

      cy.contains("Resolved").should("exist");
    });

    it("should display positive sentiment", () => {
      cy.mount(<ConversationCard conversation={resolvedConversation} />);

      cy.contains("Positive").should("exist");
    });
  });

  // 4. Interactive Elements
  describe("Action Button", () => {
    it("should render view button", () => {
      cy.mount(<ConversationCard conversation={mockConversation} />);

      cy.get("button").should("exist");
    });

    it("should call onView when button is clicked", () => {
      const onViewSpy = cy.stub().as("onViewSpy");

      cy.mount(
        <ConversationCard conversation={mockConversation} onView={onViewSpy} />
      );

      cy.get("button").click();
      cy.get("@onViewSpy").should("have.been.calledWith", mockConversation);
    });

    it("should work without onView handler", () => {
      cy.mount(<ConversationCard conversation={mockConversation} />);

      cy.get("button").click();
      cy.get("button").should("exist");
    });
  });

  // 5. Avatar Display
  describe("Avatar", () => {
    it("should display avatar with student initials", () => {
      cy.mount(<ConversationCard conversation={mockConversation} />);

      cy.contains("JD").should("exist"); // John Doe initials
    });

    it("should display different student initials", () => {
      cy.mount(<ConversationCard conversation={resolvedConversation} />);

      cy.contains("JS").should("exist"); // Jane Smith initials
    });
  });

  // 6. Different Conversation States
  describe("Conversation Variations", () => {
    it("should handle active frustrated conversation", () => {
      cy.mount(<ConversationCard conversation={mockConversation} />);

      cy.contains("John Doe").should("exist");
      cy.contains("Active").should("exist");
      cy.contains("Frustrated").should("exist");
      cy.contains("15 messages").should("exist");
    });

    it("should handle resolved positive conversation", () => {
      cy.mount(<ConversationCard conversation={resolvedConversation} />);

      cy.contains("Jane Smith").should("exist");
      cy.contains("Resolved").should("exist");
      cy.contains("Positive").should("exist");
      cy.contains("Thank you! That explanation really helped").should("exist");
    });

    it("should handle zero message counts", () => {
      const zeroConversation: Conversation = {
        ...mockConversation,
        messageCount: 0,
        aiResponses: 0,
      };

      cy.mount(<ConversationCard conversation={zeroConversation} />);

      cy.contains("0 messages").should("exist");
      cy.contains("0 AI responses").should("exist");
    });
  });

  // 7. Integration Testing
  describe("Full Integration", () => {
    it("should display all data correctly together", () => {
      const onViewSpy = cy.stub().as("onViewSpy");

      cy.mount(
        <ConversationCard conversation={mockConversation} onView={onViewSpy} />
      );

      // Verify all data is displayed
      cy.contains("John Doe").should("exist");
      cy.contains("JavaScript Arrays").should("exist");
      cy.contains("Active").should("exist");
      cy.contains("Frustrated").should("exist");
      cy.contains("15 messages").should("exist");
      cy.contains("8 AI responses").should("exist");
      cy.contains("2 hours ago").should("exist");

      // Verify interaction works
      cy.get("button").click();
      cy.get("@onViewSpy").should("have.been.calledWith", mockConversation);
    });

    it("should handle long messages gracefully", () => {
      const longMessageConversation: Conversation = {
        ...mockConversation,
        lastMessage:
          "This is a very long message that contains a lot of text and might need to be handled gracefully in the UI to prevent layout issues and maintain readability for users.",
      };

      cy.mount(<ConversationCard conversation={longMessageConversation} />);

      cy.contains("This is a very long message").should("exist");
    });
  });
});
