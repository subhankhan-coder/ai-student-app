export const uid = (p = "id") => `${p}_${Math.random().toString(36).slice(2, 9)}`;

export const mkLessons = (titles, doneCount) =>
  titles.map((t, i) => ({
    id: uid("l"),
    title: t,
    duration: `${6 + (i % 4) * 3}:${(10 + i * 7) % 60 < 10 ? "0" : ""}${(10 + i * 7) % 60}`,
    completed: i < doneCount,
  }));

export const courseProgress = (course) =>
  Math.round((course.lessons.filter((l) => l.completed).length / course.lessons.length) * 100);

export const nextLesson = (course) => course.lessons.find((l) => !l.completed) || course.lessons[course.lessons.length - 1];

export const blankResume = (name, email) => ({
  name,
  title: "",
  email,
  phone: "",
  summary: "",
  skills: "",
  education: "",
  experience: "",
  projects: "",
});

export const fmtINR = (n) => `₹${(n / 100000).toFixed(1)}L`;
