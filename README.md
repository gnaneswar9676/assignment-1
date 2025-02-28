# Spreadsheet App

A web-based application mimicking Google Sheets, built with the MERN stack. This project replicates the core UI and functionality of Google Sheets, including a spreadsheet grid, toolbar, formula bar, mathematical/data quality functions, and drag-to-fill capabilities.

## Objective
Develop a web application that closely mirrors Google Sheets' user interface and functionalities, focusing on:
- Spreadsheet grid with drag functions and cell dependencies.
- Mathematical functions (SUM, AVERAGE, MAX, MIN, COUNT).
- Data quality functions (TRIM, UPPER, LOWER, REMOVE_DUPLICATES, FIND_AND_REPLACE).
- Intuitive UI with formatting and data entry/validation.

## Tech Stack
The application is built using the **MERN stack**, which includes:

1. **MongoDB**  
   - **Purpose**: Persistent storage for spreadsheet data (e.g., grid state, metadata).
   - **Why**: MongoDB’s flexibility with JSON-like documents makes it ideal for storing the 2D grid as a single object, which aligns with the app’s data structure. It supports scalability for future features like saving multiple sheets or user accounts.

2. **Express.js**  
   - **Purpose**: Backend server framework for handling API requests (e.g., CRUD operations on spreadsheets).
   - **Why**: Express provides a lightweight, robust framework for building RESTful APIs, integrating seamlessly with MongoDB and Node.js. It simplifies routing and middleware setup for the app’s needs.

3. **React**  
   - **Purpose**: Frontend library for building the dynamic, interactive UI (grid, toolbar, formula bar).
   - **Why**: React’s component-based architecture and state management (via hooks) enable efficient updates to the grid and UI, mimicking Google Sheets’ real-time responsiveness. Its ecosystem supports rapid development of complex UIs.

4. **Node.js**  
   - **Purpose**: Backend runtime environment for running the Express server.
   - **Why**: Node.js ensures a JavaScript-based full-stack development experience, allowing code consistency between frontend and backend. Its event-driven nature supports potential real-time features (e.g., collaboration).

### Why MERN?
- **Unified Language**: JavaScript across all layers reduces context-switching and improves development efficiency.
- **Scalability**: The stack supports future enhancements like user authentication, real-time collaboration, or cloud storage.
- **Community & Tools**: Extensive libraries (e.g., Axios for API calls) and community support accelerate development.

## Data Structures
The application relies on the following data structures:

1. **2D Array (Grid Data)**  
   - **Description**: The spreadsheet grid is represented as a 2D array of objects in memory, where each object has `value` (string) and `style` (object) properties. Example:
     ```javascript
     [
       [{ value: "10", style: { fontWeight: "bold" } }, { value: "20", style: {} }],
       [{ value: "=SUM(A1:A2)", style: {} }, { value: "", style: {} }]
     ]
