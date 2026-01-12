# Full Stack Test Case Management System

## Project Overview

This project implements a comprehensive Test Case Management system designed to assist software development teams in creating, managing, and tracking test cases, test suites, and test execution results. It provides a robust platform for improving software quality assurance processes.

## Features

### Core Functionality
*   **User Authentication:** User registration, login, JWT-based authentication, protected routes.
*   **Role-Based Access Control (RBAC):** Admin, Test-Lead, Tester, Read-Only roles with specific permissions.
*   **Project Management:** Create, manage, and assign team members to multiple test projects.
*   **Test Case Management:**
    *   Create, edit, delete test cases with detailed attributes (Title, Description, Priority, Type, Pre/Post-conditions, Steps, Tags).
    *   Organize test cases into test suites.
    *   Search and filter test cases.
    *   Bulk operations (delete, update priority, assign to suite).
*   **Test Suite Management:** Create, manage, add/remove test cases, execute entire suites.
*   **Test Execution:**
    *   Execute test cases and record results (Pass, Fail, Blocked, Skipped).
    *   Add comments and attachments to test runs.
    *   Create defects directly from failed tests.
    *   Track execution history and audit trail.
    *   Assign test cases to testers.
    *   Monitor execution progress.
*   **Dashboard with Analytics:**
    *   Test execution summary, coverage metrics, pass/fail rate trends.
    *   Priority-wise test distribution, execution progress by tester.
    *   Defect density metrics.
    *   Interactive charts and graphs.

### Performance & Scalability
*   **Lazy Loading:** For pages and components to optimize initial load times.
*   **Pagination & Virtual Scrolling:** For large lists (e.g., test cases).
*   **Caching (Redis):** Frequently accessed data like analytics, test suite lists, and project metadata.
*   **Rate Limiting:** Protects API endpoints from abuse and ensures stability.

### Security
*   **JWT-based authentication** for secure API access.
*   **Input Validation & Sanitization** to prevent XSS and SQL Injection attacks.
*   **Role-Based Access Control** enforced via backend middleware.
*   **Secure file upload** for attachments.

## Tech Stack

*   **Frontend:** React 18+
    *   React Router DOM
    *   Chart.js / Recharts
*   **Backend:** Node.js (Express.js)
    *   PostgreSQL (via an ORM like Sequelize/TypeORM or `pg` client)
    *   Redis (for caching)
    *   `jsonwebtoken` (for JWT)
    *   `bcrypt` (for password hashing)
    *   `express-rate-limit` (for rate limiting)
    *   `multer` (for file uploads)
*   **Database:** PostgreSQL
*   **Caching:** Redis

## Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:

*   Node.js (LTS version recommended)
*   npm or Yarn
*   PostgreSQL
*   Redis server

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd full-stack-test-case-management
