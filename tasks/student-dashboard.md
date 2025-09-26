# Student Dashboard

## Relevant Files

- `components/student-dashboard.tsx` - Main dashboard component / shell (existing). Use as the entrypoint for the student dashboard UI.
- `components/student-dashboard/ProgressPanel.tsx` - Progress indicators (new): sessions count, time spent, topics summary, badges.
- `app/page.tsx` - Page route for the student dashboard (new). Mounts the dashboard into the Next.js app router.
- `app/layout.tsx` - Dashboard-specific layout (new, optional) to house header/profile and responsive grid.
<!--
- `components/student-dashboard/ChatPanel.tsx` - Chat UI (new): message list, input box, send button, and message rendering.
- `components/student-dashboard/ConversationHistory.tsx` - Conversation history viewer & search (new).
- `hooks/use-student-data.ts` - Data hook (new) to fetch student sessions, time-on-task, and conversations from the API.
- `lib/utils/progress.ts` - Utility functions (new) for computing session/time aggregates and percent-complete.
- `components/ui/*` - Reuse existing UI primitives (e.g., `card.tsx`, `progress.tsx`, `input.tsx`, `button.tsx`) from `components/ui`.
- `components/student-dashboard.test.tsx` - Unit tests for the main dashboard component (new).
- `components/student-dashboard/ChatPanel.test.tsx` - Unit tests for chat interactions (new).
-->

### Notes
<!-- 
- Place unit tests next to their components (e.g., `ChatPanel.test.tsx` beside `ChatPanel.tsx`).
-->

- Use existing `components/ui` primitives to keep styling and accessibility consistent.
<!--
- Keep data-fetching separated in `hooks/use-student-data.ts` so UI remains presentational.
- Run tests with the project's test runner (e.g., `npm test` or `npx jest`).
-->

## Tasks

- [x] 1.0 Dashboard shell & layout
  - (Deliverable) Create the dashboard shell, header area (logo + profile), and a responsive two-column layout: chat + progress/side-panel.
  - [x] 1.1 Header (logo, profile, nav)
    - Add top header with platform logo, user avatar/profile menu, and lightweight navigation.
  - [x] 1.2 Chat container shell
    - Provide the main chat area container that will host the `ChatPanel` and message list.
  - [x] 1.3 Message list viewport
    - Implement the scrollable message list area with sensible focus and keyboard support.
  - [x] 1.4 Message composer (input + send)
    - Create a message composer with accessible input, send button, and support for Enter to send.
  - [x] 1.5 Recent conversations sidebar
    - Add a collapsible sidebar listing recent conversations with timestamps and brief snippets.
  - [x] 1.6 Progress side panel
    - Create the `ProgressPanel` area (sessions, total time, topics) as the right column on wider screens.
  - [x] 1.7 Stats widgets
    - Small widgets inside ProgressPanel: sessions count, time spent, topics chips, quick links to assessments.
  - [x] 1.8 Achievements / badges area
    - Display achievement badges and milestones; make it compact and accessible.
  - [x] 1.9 Responsive layout adjustments
    - Ensure layout collapses to a single-column mobile view where chat is primary and side panels are accessible by toggles.
<!--
- [ ] 2.0 Chat panel (message UI)
  - (Deliverable) Build the ChatPanel component with message list, input box, send button, and basic local state for sending/receiving messages.
- [ ] 3.0 Conversation history viewer & search
  - (Deliverable) Implement ConversationHistory with a searchable list of past conversations and a detail view.
- [ ] 4.0 Progress indicators & stats
  - (Deliverable) Create ProgressPanel to display sessions count, total time spent, topic tags, and achievement badges.
-->
- [ ] 5.0 Accessibility & responsive polish
  - (Deliverable) Ensure the dashboard meets accessibility basics (keyboard nav, ARIA labels, color contrast) and is mobile-first responsive.
