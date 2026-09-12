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
        let loadedTasks = loadTasks();
        let loadedProjects = loadProjects();

        // Create default project if no project exists
        if (loadedProjects.length === 0) {
            loadedProjects = [
                {
                    id: "project-1",
                    name: "My Project"
                },
                {
                    id: "project-2",
                    name: "Portfolio Project"
                }
            ];

            saveProjects(loadedProjects);
        }

        // Create default tasks if no tasks exist
        if (loadedTasks.length === 0) {
            const firstProjectId = loadedProjects[0].id;

            loadedTasks = [
                {
                    id: "task-1",
                    text: "Send project update",
                    category: "Urgent",
                    status: "In Review",
                    projectId: firstProjectId
                },
                {
                    id: "task-2",
                    text: "Complete pending assignment",
                    category: "Urgent",
                    status: "In Progress",
                    projectId: firstProjectId
                },
                {
                    id: "task-3",
                    text: "Update personal portfolio",
                    category: "Personal",
                    status: "Done",
                    projectId: firstProjectId
                },
                {
                    id: "task-4",
                    text: "Plan weekend schedule",
                    category: "Personal",
                    status: "To Do",
                    projectId: firstProjectId
                },
                {
                    id: "task-5",
                    text: "Test website responsiveness",
                    category: "Work",
                    status: "To Do",
                    projectId: firstProjectId
                },
                {
                    id: "task-6",
                    text: "Review weekly report",
                    category: "Work",
                    status: "Done",
                    projectId: firstProjectId
                },
                {
                    id: "task-7",
                    text: "Complete project documentation",
                    category: "Work",
                    status: "To Do",
                    projectId: firstProjectId
                }
            ];

            saveTasks(loadedTasks);
        }

        setProjects(loadedProjects);
        setTasks(loadedTasks);
        setActiveProjectId(loadedProjects[0].id);
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
