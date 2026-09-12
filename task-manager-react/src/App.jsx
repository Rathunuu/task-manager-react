import { useEffect, useState } from "react";
import ProjectSwitcher from "./ProjectSwitcher";
import TaskList from "./TaskList";
import {
    loadTasks,
    loadProjects,
    saveTasks,
    saveProjects
} from "./storage";

function App() {
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [activeProjectId, setActiveProjectId] = useState("");

    useEffect(() => {
        const loadedTasks = loadTasks();
        const loadedProjects = loadProjects();

        // If no projects exist, create default projects
        if (loadedProjects.length === 0) {
            const defaultProjects = [
                {
                    id: "project-1",
                    name: "My Project"
                },
                {
                    id: "project-2",
                    name: "Portfolio Project"
                }
            ];

            const defaultTasks = [
                {
                    id: "task-1",
                    text: "Send project update",
                    category: "Urgent",
                    status: "In Review",
                    projectId: "project-1"
                },
                {
                    id: "task-2",
                    text: "Complete pending assignment",
                    category: "Urgent",
                    status: "In Progress",
                    projectId: "project-1"
                },
                {
                    id: "task-3",
                    text: "Update personal portfolio",
                    category: "Personal",
                    status: "Done",
                    projectId: "project-1"
                },
                {
                    id: "task-4",
                    text: "Plan weekend schedule",
                    category: "Personal",
                    status: "To Do",
                    projectId: "project-1"
                },
                {
                    id: "task-5",
                    text: "Test website responsiveness",
                    category: "Work",
                    status: "To Do",
                    projectId: "project-1"
                },
                {
                    id: "task-6",
                    text: "Review weekly report",
                    category: "Work",
                    status: "Done",
                    projectId: "project-1"
                },
                {
                    id: "task-7",
                    text: "Complete project documentation",
                    category: "Work",
                    status: "To Do",
                    projectId: "project-1"
                }
            ];

            saveProjects(defaultProjects);
            saveTasks(defaultTasks);

            setProjects(defaultProjects);
            setTasks(defaultTasks);
            setActiveProjectId(defaultProjects[0].id);

            return;
        }

        setProjects(loadedProjects);
        setTasks(loadedTasks);
        setActiveProjectId(loadedProjects[0]?.id || "");
    }, []);

    const handleProjectChange = (projectId) => {
        setActiveProjectId(projectId);
    };

    const activeProjectTasks = tasks.filter(
        (task) => task.projectId === activeProjectId
    );

    return (
        <div className="app">
            <h1>Task Manager React</h1>

            <h2>Projects</h2>

            <ProjectSwitcher
                projects={projects}
                activeProjectId={activeProjectId}
                onProjectChange={handleProjectChange}
            />

            <h2>Tasks</h2>

            <TaskList tasks={activeProjectTasks} />
        </div>
    );
}

export default App;
