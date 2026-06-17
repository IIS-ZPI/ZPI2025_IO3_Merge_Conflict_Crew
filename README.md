# Sovereign Insight Analysis

An advanced statistical currency analysis client application integrated with the **NBP REST API** (`api.nbp.pl`). The system facilitates comprehensive currency session classification, mathematical measurements calculations, and historical change frequency distributions.

This project is developed under the **SCRUM** framework as part of university coursework, utilizing modern Continuous Integration (CI) and version control practices.

---

## I. Technology Stack

*   **Core Framework:** React 19 (JavaScript SPA)
*   **Build & Bundler Tool:** Vite
*   **Styling Engine:** TailwindCSS & PostCSS
*   **Data Visualization:** Recharts (responsive bar and distribution pyramid charts)
*   **State & Query Cache:** `@tanstack/react-query` (version 5)
*   **Code Quality / Linting:** ESLint & Globals configuration

---

## II. Running the Application & Deployment

### Prerequisites
*   [Node.js](https://nodejs.org/) (Version 18.x or higher recommended)
*   `npm` (installed automatically with Node.js)

### Local Development Setup
1.  **Clone the repository:**
    git clone https://github.com/IIS-ZPI/ZPI2025_IO3_Merge_Conflict_Crew.git
    cd ZPI2025_IO3_Merge_Conflict_Crew

2.  **Install dependencies:**
    npm install
    
3.  **Launch the development server:**
    npm run dev

    The app will start locally, typically at (http://localhost:5173/).

### Production Build & Preview
To compile a highly optimized production bundle and inspect it locally:
npm run build
npm run preview

### Production Deployment
The application is automatically deployed to **Vercel** via our CI/CD pipeline whenever commits are pushed or merged into the `release` branch.
*   **Production Deployment URL:** [https://zpi-2025-io-3-merge-conflict-crew.vercel.app/]


## III. Project Documentation Location

All required software engineering specifications, diagrams, and design documents are version-controlled in the [docs/] folder:

*   **[docs/Documentation.pdf]:** Comprehensive project documentation including system architecture, component descriptions, UML diagrams, and requirements specification.


## IV. Project Backlog and Sprint Planning

Product Backlog, User Stories, and Sprint Planning are managed directly on the team's project board.
*   **Backlog Board Link:** *(https://github.com/orgs/IIS-ZPI/projects/36)*
*   **Sprint Reviews:** Artifacts, reports from completed sprints, and BurnDown charts can be found in the documentation folder or directly referenced in our repository's Releases.


## V. Continuous Integration (CI) and Test Automation

The CI/CD pipeline is orchestrated via **GitHub Actions** using two separate workflow files.

*   **CI Pipeline:** [.github/workflows/ci.yml]
*   **CD Pipeline:** [.github/workflows/deploy.yml]

*   **CI Behavior** (`ci.yml`) — triggers on every `push` or `pull_request` to `main`, `release`, or `develop`:
    1.  Installs dependencies (`npm ci`).
    2.  Runs the linter (`npm run lint`).
    3.  Runs unit tests (`npm run test:run`).
    4.  Builds the project (`npm run build`).
    If any step fails, the pipeline fails and blocks the PR from merging.

*   **CD Behavior** (`deploy.yml`) — triggers on every `push` to `release`:
    1.  Installs Node.js 20 and project dependencies.
    2.  Installs the **Vercel CLI** and pulls the production configuration.
    3.  Builds the project via Vercel (`vercel build --prod`).
    4.  Deploys the prebuilt output to **Vercel** production (`vercel deploy --prebuilt --prod`).

---

## VI. Test Reports and Bugfix Logs

Testing procedures and bug tracking are documented to ensure high-quality software delivery:

*   **UAT Scenarios:** [docs/UserAcceptanceTestingScenarios.pdf] — defines the acceptance test cases and criteria.
*   **UAT Report:** [docs/UserAcceptanceTestingRaport.pdf] — contains execution results and compliance summary.
*   **Bugfix Log:** Tracked via **GitHub Issues**. Resolved bugfix: *(https://github.com/IIS-ZPI/ZPI2025_IO3_Merge_Conflict_Crew/issues/54)*