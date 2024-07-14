# ToDo List Application

A simple ToDo List application built with Vue 3 using the Composition API, Pinia for state management, and JSON Server for a mock API. The application supports CRUD (Create, Read, Update, Delete) operations and features a clean UI styled with Tailwind CSS.

## Live Demo
You can view a live demo of the application [here](https://qstrike-todo-list-exam.netlify.app/).

[![Netlify Status](https://api.netlify.com/api/v1/badges/199e78b6-82ab-424e-bc23-66be021d0e88/deploy-status)](https://app.netlify.com/sites/qstrike-todo-list-exam/deploys)

## Features

* **Create:** Add new tasks to your ToDo list.
* **Read:** View all tasks with their status (completed or not).
* **Update:** Edit existing tasks.
* **Delete:** Remove tasks from your list.

## Installation

1. Open command prompt or git bash on your desktop
   
    ![345240861-a696febf-c54b-4d26-9c4b-61882e580676](https://github.com/user-attachments/assets/3854bb4f-53c7-4991-91b0-aea30437db0d)
    ![345240948-c6990958-00e1-44d4-bb43-badbe33f5c91](https://github.com/user-attachments/assets/f96ad096-3350-41cd-b6d1-dc7eb0ae8fdd)

3. Clone the repository

    ```
    git clone git@github.com:daniemae/QStrike_ToDo-List_Exam.git
    ```

3. Change directory to repository

    ```
    cd QStrike_ToDo-List_Exam
    ```

4. Install dependencies/modules

    ```
    npm install
    ```

## Usage

1. Start the development server:

    ```
    npm run dev
    ```

2. Open your browser and navigate based on generated link
   
    ![345242757-80c94c71-e536-4df5-88dc-775fd72988c2](https://github.com/user-attachments/assets/0fb619e1-5abc-47f7-a939-6367bdb3f14a)

  > [!NOTE]
  > The data was based on fetch API online in **store folder** you can uncomment the localhost part to proceed to **next step** *see example below*

   ![image](https://github.com/user-attachments/assets/50452dd5-3032-4b17-a911-02306d3da561)

3. Open a new command prompt and serve the json-server

   ```
   json-server -w ./data/db.json
   ```
  
