🏛️ University Portal

Welcome to the University Portal, a dynamic and interactive web application designed to manage student and course information for a university. This portal provides a user-friendly interface for viewing university details, managing student records, adding specific courses, and monitoring overall statistics, all running directly in your browser.
✨ Features

This portal is built with a focus on functionality and user experience, incorporating several key features:

    Responsive Design: The portal is designed to look great and function seamlessly across various devices, from desktops to mobile phones.
    Intuitive Navigation: A sticky header with clear navigation links ensures easy access to all sections of the portal. Active links are highlighted for better user orientation.
    Dynamic Home Page: A welcoming landing page with subtle entrance animations for sections as you scroll, providing a modern and engaging user experience.
    About Section: Learn about the key features and vision behind the University Portal.
    Student Management:
        Add New Students: Easily add student records through a modal form.
        Restricted Majors: Students can only be assigned a major from a predefined list (e.g., Computer Science, Business Administration, etc.). Free text input for majors is prevented.
        Student ID, Name, and GPA Input: Users can manually enter the student's name, ID, and GPA.
        View Students: All added students are displayed in a clean, card-based layout, including their Name, ID, Major, and GPA.
        GPA Progress Bar: Each student card features a visual progress bar indicating their GPA, displaying the value only once within the bar.
        Data Persistence: Student data is saved locally using localStorage, meaning your records will persist even if you close and reopen the browser.
    Course Management:
        Add New Courses: Add new course offerings via a dedicated modal.
        Restricted Courses with Auto-Population:
            Users can only select a "Course Title" from a predefined list of 5 university courses.
            Upon selecting a Course Title, its corresponding "Course Code" and "Instructor" are automatically populated into read-only fields, preventing manual entry and ensuring data consistency.
        Credits Input: Users can manually enter the number of credits for the selected course.
        View Courses: All added courses are displayed with their Title, Code, Instructor, and Credits.
        Data Persistence: Course data is saved locally using localStorage for continuity across sessions.
    Dashboard: A dedicated section that provides a quick overview of the total number of students and courses currently registered in the system.
    Contact Form: A simple form for users to send inquiries or feedback.
    Scroll-to-Top Button: A convenient button appears as you scroll down, allowing quick navigation back to the top of the page.
    University Branding: A dedicated university logo is integrated into the header for a professional look.
    Image Restriction: The portal does not include any functionality for users to upload or link images, ensuring that no unauthorized images are added to the system.

🛠️ Technologies Used

    HTML5: For the structure and content of the web pages.
    CSS3: For styling, layout, responsiveness, and animations.
    JavaScript (ES6+): For dynamic content, interactive elements, form handling, data persistence (localStorage), and implementing the IntersectionObserver for scroll animations.


The portal will load directly, and all functionalities will be available.
💡 Usage

    Navigation: Use the links in the header (Home, About, Students, Courses, Dashboard, Contact) to navigate between sections.
    Adding Students: Go to the Students page and click "Add New Student". Fill in the details, selecting a major from the dropdown.
    Adding Courses: Go to the Courses page and click "Add New Course". Select a course title from the dropdown, observe the auto-populated code and instructor, and enter the credits.
    Viewing Data: The Students and Courses pages will display your added entries. The Dashboard will update with the total counts.
    Persistence: Student and course data is saved locally in your browser's localStorage. This means data will remain even if you close the browser tab/window and reopen it later.

🔮 Future Enhancements

While functional, this portal can be expanded significantly. Here are some potential future improvements:

    User Authentication: Implement secure login/registration for different user roles (students, faculty, administrators).
    Backend Database: Move data storage from localStorage to a robust backend database (e.g., PostgreSQL, MongoDB) for scalability, multi-user access, and enhanced security.
    Personalized Dashboards: Tailor the dashboard content based on the logged-in user's role (e.g., a student sees their own courses and grades; faculty sees their assigned classes).
    CRUD Operations: Add functionality to Edit and Delete existing student and course records.
    Search and Filter: Implement search bars and filters on the Students and Courses pages to easily find specific entries.
    Grades and Transcripts: Allow faculty to input grades for students in their courses, and enable students to view their full academic transcripts.
    Communication Features: Add an announcement system or internal messaging.
    Academic Calendar: Integrate a calendar for important university dates, deadlines, and class schedules.

Thank you for exploring the MICLASE University !
