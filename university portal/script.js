document.addEventListener('DOMContentLoaded', () => {
    // Auto-update year in footer (present on all pages with footer)
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Sticky header and scroll-to-top button visibility (present on all pages with header/footer)
    const header = document.querySelector('.header');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        // Sticky header
        if (header) { // Ensure header exists
            if (window.scrollY > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        }

        // Scroll-to-top button visibility
        if (scrollTopBtn) { // Ensure scroll-to-top button exists
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        }
    });

    // Active navigation link highlighting based on current page
    const currentPath = window.location.pathname.split('/').pop(); // Get the current HTML file name
    document.querySelectorAll('.navbar a').forEach(link => {
        // Remove 'active' from all first
        link.classList.remove('active');
        // Add 'active' if href matches current page or is index.html and currentPath is empty (root)
        // Adjust for default file behavior (e.g., if you access example.com/ instead of example.com/index.html)
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPath || (linkHref === 'index.html' && (currentPath === '' || currentPath === 'index.html'))) {
            link.classList.add('active');
        }
    });


    // --- Dynamic Content Management (Student & Course Lists) ---
    // Only initialize if elements are present on the current page
    const studentList = document.getElementById('studentList');
    const courseList = document.getElementById('courseList');
    const totalStudentsDisplay = document.getElementById('totalStudents'); // On Dashboard
    const totalCoursesDisplay = document.getElementById('totalCourses');   // On Dashboard

    // Use localStorage for persistence
    let students = JSON.parse(localStorage.getItem('students')) || [];
    let courses = JSON.parse(localStorage.getItem('courses')) || [];

    // Function to render students (used on students.html)
    function renderStudents() {
        if (studentList) { // Check if studentList element exists on this page
            studentList.innerHTML = ''; // Clear existing list
            if (students.length === 0) {
                studentList.innerHTML = '<p style="text-align: center; font-size: 1.6rem; color: rgba(255,255,255,0.7);">No students added yet. Click "Add New Student" to get started!</p>';
            } else {
                students.forEach(student => {
                    const studentCard = document.createElement('div');
                    studentCard.classList.add('student-card');
                    const gpaPercentage = ((student.gpa / 4) * 100).toFixed(0); // Calculate GPA percentage for progress bar
                    studentCard.innerHTML = `
                        <h4>${student.name}</h4>
                        <p><strong>ID:</strong> ${student.id}</p>
                        <p><strong>Major:</strong> ${student.major}</p>
                        <p><strong>GPA:</strong> ${student.gpa}</p>
                        <div class="progress-bar-container">
                            <div class="progress-bar" style="width: ${gpaPercentage}%;">GPA: ${student.gpa}</div>
                        </div>
                    `;
                    studentList.appendChild(studentCard);
                });
            }
        }
        // Update dashboard count if element exists
        if (totalStudentsDisplay) {
            totalStudentsDisplay.textContent = students.length;
        }
        localStorage.setItem('students', JSON.stringify(students)); // Save to localStorage
    }

    // Function to render courses (used on courses.html)
    function renderCourses() {
        if (courseList) { // Check if courseList element exists on this page
            courseList.innerHTML = ''; // Clear existing list
            if (courses.length === 0) {
                courseList.innerHTML = '<p style="text-align: center; font-size: 1.6rem; color: rgba(255,255,255,0.7);">No courses added yet. Click "Add New Course" to get started!</p>';
            } else {
                courses.forEach(course => {
                    const courseCard = document.createElement('div');
                    courseCard.classList.add('course-card');
                    courseCard.innerHTML = `
                        <h4>${course.title}</h4>
                        <p><strong>Code:</strong> ${course.code}</p>
                        <p><strong>Instructor:</strong> ${course.instructor}</p>
                        <p><strong>Credits:</strong> ${course.credits}</p>
                    `;
                    courseList.appendChild(courseCard);
                });
            }
        }
        // Update dashboard count if element exists
        if (totalCoursesDisplay) {
            totalCoursesDisplay.textContent = courses.length;
        }
        localStorage.setItem('courses', JSON.stringify(courses)); // Save to localStorage
    }

    // Function to show a temporary message box
    function showMessageBox(message, type = 'error') {
        const messageBox = document.createElement('div');
        messageBox.style.cssText = `
            position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
            background-color: ${type === 'error' ? '#ff4d4d' : '#4CAF50'};
            color: white; padding: 15px 25px; border-radius: 8px;
            font-size: 1.6rem; z-index: 1001; box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            opacity: 0; transition: opacity 0.3s ease-in-out;
        `;
        messageBox.textContent = message;
        document.body.appendChild(messageBox);

        setTimeout(() => {
            messageBox.style.opacity = 1;
        }, 10); // Small delay to trigger transition

        setTimeout(() => {
            messageBox.style.opacity = 0;
            messageBox.addEventListener('transitionend', () => messageBox.remove());
        }, 3000); // Message disappears after 3 seconds
    }

    // --- Modal Functionality (only relevant on students.html and courses.html) ---
    const addStudentBtn = document.getElementById('addStudentBtn');
    const addCourseBtn = document.getElementById('addCourseBtn');
    const addStudentModal = document.getElementById('addStudentModal');
    const addCourseModal = document.getElementById('addCourseModal');
    const closeButtons = document.querySelectorAll('.modal .close-button'); // Select all close buttons within modals

    // Open Modals - check if button exists
    if (addStudentBtn) {
        addStudentBtn.addEventListener('click', () => {
            addStudentModal.style.display = 'flex';
        });
    }
    if (addCourseBtn) {
        addCourseBtn.addEventListener('click', () => {
            addCourseModal.style.display = 'flex';
        });
    }

    // Close Modals using the close button - applies to any modal on any page
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').style.display = 'none';
        });
    });

    // Close Modals when clicking outside - applies to any modal on any page
    window.addEventListener('click', (event) => {
        if (addStudentModal && event.target == addStudentModal) {
            addStudentModal.style.display = 'none';
        }
        if (addCourseModal && event.target == addCourseModal) {
            addCourseModal.style.display = 'none';
        }
    });

    // Add Student functionality (only on students.html)
    const saveStudentBtn = document.getElementById('saveStudentBtn');
    if (saveStudentBtn) {
        saveStudentBtn.addEventListener('click', () => {
            const name = document.getElementById('studentName').value.trim();
            const id = document.getElementById('studentId').value.trim();
            const major = document.getElementById('studentMajor').value.trim();
            const gpaInput = document.getElementById('studentGPA').value;
            const gpa = parseFloat(gpaInput);

            if (name && id && major && !isNaN(gpa) && gpa >= 0 && gpa <= 4 && gpaInput !== '') {
                students.push({ name, id, major, gpa });
                renderStudents();
                addStudentModal.style.display = 'none';
                // Clear form fields
                document.getElementById('studentName').value = '';
                document.getElementById('studentId').value = '';
                document.getElementById('studentMajor').value = '';
                document.getElementById('studentGPA').value = '';
                showMessageBox('Student added successfully!', 'success');
            } else {
                showMessageBox('Please fill in all student details correctly (GPA must be between 0 and 4)!');
            }
        });
    }

    // Add Course functionality (only on courses.html)
    const saveCourseBtn = document.getElementById('saveCourseBtn');
    if (saveCourseBtn) {
        saveCourseBtn.addEventListener('click', () => {
            const title = document.getElementById('courseTitle').value.trim();
            const code = document.getElementById('courseCode').value.trim();
            const instructor = document.getElementById('courseInstructor').value.trim();
            const creditsInput = document.getElementById('courseCredits').value;
            const credits = parseInt(creditsInput);

            if (title && code && instructor && !isNaN(credits) && credits >= 1 && credits <= 6 && creditsInput !== '') {
                courses.push({ title, code, instructor, credits });
                renderCourses();
                addCourseModal.style.display = 'none';
                // Clear form fields
                document.getElementById('courseTitle').value = '';
                document.getElementById('courseCode').value = '';
                document.getElementById('courseInstructor').value = '';
                document.getElementById('courseCredits').value = '';
                showMessageBox('Course added successfully!', 'success');
            } else {
                showMessageBox('Please fill in all course details correctly (Credits must be between 1 and 6)!');
            }
        });
    }

    // Initial render of lists on page load, only if applicable to the current page
    renderStudents(); // This will update student counts on dashboard.html and render cards on students.html
    renderCourses();  // This will update course counts on dashboard.html and render cards on courses.html
});
document.addEventListener('DOMContentLoaded', () => {
    // Auto-update year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Sticky header and scroll-to-top button visibility
    const header = document.querySelector('.header');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        }
        if (scrollTopBtn) {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        }
    });

    // Active navigation link highlighting based on current page
    const currentPath = window.location.pathname.split('/').pop();
    document.querySelectorAll('.navbar a').forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPath || (linkHref === 'index.html' && (currentPath === '' || currentPath === 'index.html'))) {
            link.classList.add('active');
        }
    });

    // --- Dynamic Content Management (Student & Course Lists) ---
    const studentList = document.getElementById('studentList');
    const courseList = document.getElementById('courseList');
    const totalStudentsDisplay = document.getElementById('totalStudents');
    const totalCoursesDisplay = document.getElementById('totalCourses');

    // Use localStorage for persistence
    let students = JSON.parse(localStorage.getItem('students')) || [];
    let courses = JSON.parse(localStorage.getItem('courses')) || [];

    // --- Predefined Lists for Restrictions ---
    const allowedMajors = [
        "Computer Science",
        "Electrical Engineering",
        "Business Administration",
        "Biology",
        "Liberal Arts",
        "Mathematics",
        "Physics",
        "Chemistry",
        "History",
        "Psychology"
    ];

    // Defining specific courses with their associated codes and instructors
    const predefinedCourses = [
        { title: "Introduction to Programming", code: "CS101", instructor: "Prof. Ada Lovelace" },
        { title: "Calculus I", code: "MA101", instructor: "Dr. Leonhard Euler" },
        { title: "University Writing", code: "EN101", instructor: "Prof. Jane Austen" },
        { title: "Microeconomics", code: "EC201", instructor: "Dr. Adam Smith" },
        { title: "General Chemistry", code: "CH101", instructor: "Prof. Marie Curie" }
    ];

    // Function to populate select dropdowns
    function populateSelect(selectElementId, optionsArray) {
        const selectElement = document.getElementById(selectElementId);
        if (selectElement) {
            // Clear existing options, but keep the default "Select..." option
            let defaultOptionText = `-- Select a ${selectElementId.includes('Major') ? 'Major' : 'Course'} --`;
            selectElement.innerHTML = `<option value="">${defaultOptionText}</option>`;
            optionsArray.forEach(optionText => {
                const option = document.createElement('option');
                option.value = optionText;
                option.textContent = optionText;
                selectElement.appendChild(option);
            });
        }
    }

    // Function to render students (used on students.html)
    function renderStudents() {
        if (studentList) {
            studentList.innerHTML = '';
            if (students.length === 0) {
                studentList.innerHTML = '<p style="text-align: center; font-size: 1.6rem; color: rgba(255,255,255,0.7);">No students added yet. Click "Add New Student" to get started!</p>';
            } else {
                students.forEach(student => {
                    const studentCard = document.createElement('div');
                    studentCard.classList.add('student-card');
                    const gpaPercentage = ((student.gpa / 4) * 100).toFixed(0);
                    studentCard.innerHTML = `
                        <h4>${student.name}</h4>
                        <p><strong>ID:</strong> ${student.id}</p>
                        <p><strong>Major:</strong> ${student.major}</p>
                        <p><strong>GPA:</strong> ${student.gpa}</p>
                        <div class="progress-bar-container">
                            <div class="progress-bar" style="width: ${gpaPercentage}%;">GPA: ${student.gpa}</div>
                        </div>
                    `;
                    studentList.appendChild(studentCard);
                });
            }
        }
        if (totalStudentsDisplay) {
            totalStudentsDisplay.textContent = students.length;
        }
        localStorage.setItem('students', JSON.stringify(students));
    }

    // Function to render courses (used on courses.html)
    function renderCourses() {
        if (courseList) {
            courseList.innerHTML = '';
            if (courses.length === 0) {
                courseList.innerHTML = '<p style="text-align: center; font-size: 1.6rem; color: rgba(255,255,255,0.7);">No courses added yet. Click "Add New Course" to get started!</p>';
            } else {
                courses.forEach(course => {
                    const courseCard = document.createElement('div');
                    courseCard.classList.add('course-card');
                    courseCard.innerHTML = `
                        <h4>${course.title}</h4>
                        <p><strong>Code:</strong> ${course.code}</p>
                        <p><strong>Instructor:</strong> ${course.instructor}</p>
                        <p><strong>Credits:</strong> ${course.credits}</p>
                    `;
                    courseList.appendChild(courseCard);
                });
            }
        }
        if (totalCoursesDisplay) {
            totalCoursesDisplay.textContent = courses.length;
        }
        localStorage.setItem('courses', JSON.stringify(courses));
    }

    // Function to show a temporary message box
    function showMessageBox(message, type = 'error') {
        const messageBox = document.createElement('div');
        messageBox.style.cssText = `
            position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
            background-color: ${type === 'error' ? '#ff4d4d' : '#4CAF50'};
            color: white; padding: 15px 25px; border-radius: 8px;
            font-size: 1.6rem; z-index: 1001; box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            opacity: 0; transition: opacity 0.3s ease-in-out;
        `;
        messageBox.textContent = message;
        document.body.appendChild(messageBox);

        setTimeout(() => {
            messageBox.style.opacity = 1;
        }, 10);

        setTimeout(() => {
            messageBox.style.opacity = 0;
            messageBox.addEventListener('transitionend', () => messageBox.remove());
        }, 3000);
    }

    // --- Modal Functionality ---
    const addStudentBtn = document.getElementById('addStudentBtn');
    const addCourseBtn = document.getElementById('addCourseBtn');
    const addStudentModal = document.getElementById('addStudentModal');
    const addCourseModal = document.getElementById('addCourseModal');
    const closeButtons = document.querySelectorAll('.modal .close-button');

    // Open Modals
    if (addStudentBtn) {
        addStudentBtn.addEventListener('click', () => {
            addStudentModal.style.display = 'flex';
            populateSelect('studentMajor', allowedMajors); // Populate majors when modal opens
        });
    }
    if (addCourseBtn) {
        addCourseBtn.addEventListener('click', () => {
            addCourseModal.style.display = 'flex';
            // Populate course titles from predefinedCourses
            populateSelect('courseTitle', predefinedCourses.map(course => course.title));

            // Clear auto-populated fields and credits when opening the modal
            document.getElementById('courseCode').value = '';
            document.getElementById('courseInstructor').value = '';
            document.getElementById('courseCredits').value = '';
        });
    }

    // Close Modals using the close button
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').style.display = 'none';
        });
    });

    // Close Modals when clicking outside
    window.addEventListener('click', (event) => {
        if (addStudentModal && event.target == addStudentModal) {
            addStudentModal.style.display = 'none';
        }
        if (addCourseModal && event.target == addCourseModal) {
            addCourseModal.style.display = 'none';
        }
    });

    // --- Auto-populate Course Code and Instructor based on Course Title selection ---
    const courseTitleSelect = document.getElementById('courseTitle');
    if (courseTitleSelect) { // Ensure this only runs on courses.html where the element exists
        courseTitleSelect.addEventListener('change', function() {
            const selectedTitle = this.value;
            const courseCodeInput = document.getElementById('courseCode');
            const courseInstructorInput = document.getElementById('courseInstructor');

            const selectedCourse = predefinedCourses.find(course => course.title === selectedTitle);

            if (selectedCourse) {
                courseCodeInput.value = selectedCourse.code;
                courseInstructorInput.value = selectedCourse.instructor;
            } else {
                // Clear fields if no valid course is selected (e.g., default option)
                courseCodeInput.value = '';
                courseInstructorInput.value = '';
            }
        });
    }


    // Add Student functionality (only on students.html)
    const saveStudentBtn = document.getElementById('saveStudentBtn');
    if (saveStudentBtn) {
        saveStudentBtn.addEventListener('click', () => {
            const name = document.getElementById('studentName').value.trim();
            const id = document.getElementById('studentId').value.trim();
            const major = document.getElementById('studentMajor').value; // Get value from select
            const gpaInput = document.getElementById('studentGPA').value;
            const gpa = parseFloat(gpaInput);

            // Validate that major is selected from the allowed list (value is not empty)
            if (name && id && major && major !== '' && !isNaN(gpa) && gpa >= 0 && gpa <= 4 && gpaInput !== '') {
                students.push({ name, id, major, gpa });
                renderStudents();
                addStudentModal.style.display = 'none';
                // Clear form fields, reset select to default option
                document.getElementById('studentName').value = '';
                document.getElementById('studentId').value = '';
                document.getElementById('studentMajor').value = ''; // Reset select
                document.getElementById('studentGPA').value = '';
                showMessageBox('Student added successfully!', 'success');
            } else {
                showMessageBox('Please fill in all student details correctly (GPA must be between 0 and 4, and select a Major)!');
            }
        });
    }

    // Add Course functionality (only on courses.html)
    const saveCourseBtn = document.getElementById('saveCourseBtn');
    if (saveCourseBtn) {
        saveCourseBtn.addEventListener('click', () => {
            const title = document.getElementById('courseTitle').value; // Get value from select
            const code = document.getElementById('courseCode').value; // Get value from readonly input
            const instructor = document.getElementById('courseInstructor').value; // Get value from readonly input
            const creditsInput = document.getElementById('courseCredits').value;
            const credits = parseInt(creditsInput);

            // Validate that title is selected from the allowed list (value is not empty)
            // And that code and instructor fields are not empty (meaning a course was selected)
            if (title && title !== '' && code && instructor && !isNaN(credits) && credits >= 1 && credits <= 6 && creditsInput !== '') {
                courses.push({ title, code, instructor, credits });
                renderCourses();
                addCourseModal.style.display = 'none';
                // Clear form fields, reset select to default option
                document.getElementById('courseTitle').value = ''; // Reset select
                document.getElementById('courseCode').value = ''; // Clear readonly field
                document.getElementById('courseInstructor').value = ''; // Clear readonly field
                document.getElementById('courseCredits').value = '';
                showMessageBox('Course added successfully!', 'success');
            } else {
                showMessageBox('Please select a Course, and fill in Credits correctly (Credits must be between 1 and 6)!');
            }
        });
    }

    // --- Section Entrance Animations ---
    const fadeInSections = document.querySelectorAll('.fade-in-section:not(.home)');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    fadeInSections.forEach(section => {
        observer.observe(section);
    });

    // Initial render of lists on page load, only if applicable to the current page
    renderStudents();
    renderCourses();
});
const predefinedCourses = [
    { title: "Introduction to Programming", code: "CS101", instructor: "Prof. Ada Lovelace" },
    { title: "Calculus I", code: "MA101", instructor: "Dr. Leonhard Euler" },
    { title: "University Writing", code: "EN101", instructor: "Prof. Jane Austen" },
    { title: "Microeconomics", code: "EC201", instructor: "Dr. Adam Smith" },
    { title: "General Chemistry", code: "CH101", instructor: "Prof. Marie Curie" }
];