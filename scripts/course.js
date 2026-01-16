const courses = [
  { code: "WDD 130", name: "Web Fundamentals", credits: 3, completed: true },
  { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 3, completed: true },
  { code: "WDD 231", name: "Frontend Development I", credits: 3, completed: false },
  { code: "CSE 110", name: "Programming Fundamentals", credits: 2, completed: true },
  { code: "CSE 111", name: "Programming with Functions", credits: 2, completed: false }
];

const courseContainer = document.getElementById("courses");
const creditSpan = document.getElementById("totalCredits");

function displayCourses(courseList) {
  courseContainer.innerHTML = "";

  const totalCredits = courseList.reduce((sum, c) => sum + c.credits, 0);
  creditSpan.textContent = totalCredits;

  courseList.forEach(course => {
    const div = document.createElement("div");
    div.className = `course ${course.completed ? "completed" : ""}`;
    div.textContent = `${course.code} - ${course.name} (${course.credits} credits)`;
    courseContainer.appendChild(div);
  });
}

displayCourses(courses);

document.querySelectorAll(".filter-buttons button").forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    if (filter === "all") {
      displayCourses(courses);
    } else {
      displayCourses(courses.filter(c => c.code.startsWith(filter)));
    }
  });
});
