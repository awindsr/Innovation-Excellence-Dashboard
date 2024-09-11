# Innovation Excellence Dashboard

![Innovation Excellence Dashboard](https://github.com/awindsr/SmartIndia/blob/main/public/Home.png?raw=true)

## Overview

The Innovation Excellence Dashboard is a comprehensive web application designed to empower students and faculty in managing and showcasing academic innovations. This platform streamlines the process of submitting, reviewing, and tracking various academic achievements, while also facilitating mentor-student connections.

## Features

- **User Roles**: Supports Students, Faculty, and Admins, each with specific permissions.
- **Submission Categories**: Projects, Publications, Patents, Grants, and Competitions.
- **Faculty Review System**: Allows faculty to review and vote on student submissions.
- **Student Statistics**: Comprehensive view of student achievements and performance metrics.
- **Mentor Connect**: Platform for students to find and connect with mentors.
- **Admin Dashboard**: Tools for user management, analytics, and system configuration.

## Technology Stack

- **Frontend**: React.js (v18.2.0)
- **State Management**: Redux Toolkit (v1.9.5)
- **Backend & Database**: Supabase
- **Styling**: Tailwind CSS (v3.3.2)
- **Routing**: React Router DOM (v6.11.2)
- **Icons**: Font Awesome (v6.4.0)
- **HTTP Client**: Axios (v1.4.0)

## Project Structure

```
src/
├── components/
│   ├── FilterModal.jsx
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx
│   └── TableWithFilters.jsx
├── features/
│   └── user/
│       └── userSlice.js
├── pages/
│   ├── AddProject.jsx
│   ├── AdminDashboard.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── MentorConnect.jsx
│   ├── Profile.jsx
│   ├── ReviewSubmissions.jsx
│   ├── StudentStatistics.jsx
│   └── Unauthorized.jsx
├── utils/
│   └── supabaseclient.js
├── App.jsx
└── index.js
```

## Setup and Installation

1. **Clone the repository:**
   ```
   git clone https://github.com/awindsr/innovation-excellence-dashboard.git
   cd innovation-excellence-dashboard
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Set up Supabase:**
   - Create a new project on [Supabase](https://supabase.io/)
   - Copy your project's URL and anon key
   - Create a `.env` file in the root directory with the following content:
     ```
     VITE_SUPABASE_URL=your-project-url
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```

4. **Start the development server:**
   ```
   npm start
   ```

5. **Open your browser and navigate to `http://localhost:3000`**

## Database Schema

Ensure your Supabase database has the following tables:

- `users`: id, name, email, role
- `projects`: id, title, description, done_by, votes
- `publications`: id, title, description, done_by, votes
- `patents`: id, title, description, done_by, votes
- `grants`: id, title, description, done_by, votes
- `competitions`: id, title, description, done_by, votes

Each table should have a `votes` column of type JSON to store voting data.

## Usage

### Student Features
- Submit new projects, publications, patents, grants, or competition entries
- View and edit profile
- Connect with mentors

### Faculty Features
- Review and vote on student submissions
- Access student statistics
- Participate as mentors

### Admin Features
- Manage user accounts and roles
- View platform analytics
- Configure system settings

## Key Components

- `Navbar.jsx`: Navigation component with role-based menu items
- `ProtectedRoute.jsx`: Route wrapper for role-based access control
- `TableWithFilters.jsx`: Reusable table component with search and filter functionality
- `ReviewSubmissions.jsx`: Faculty interface for reviewing student submissions
- `StudentStatistics.jsx`: Dashboard for viewing student performance metrics
- `MentorConnect.jsx`: Platform for student-mentor connections

## Contributing

We welcome contributions to the Innovation Excellence Dashboard! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-branch-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contact

For any queries or support, please contact [awindsr@gmail.com](mailto:awindsr@gmail.com).
