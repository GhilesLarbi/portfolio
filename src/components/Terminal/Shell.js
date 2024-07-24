import FileSystem from './FileSystem';

class Shell {
    constructor(fileSystemData) {
        this.fileSystem = new FileSystem(fileSystemData);
        this.currentDirectory = "/";
        this.commandHistory = [];
        // this.commands = [
        //     'help', 'about', 'skills', 'projects', 'clear', 'ls', 'cd', 'cat', 'date', 'echo',
        //     'whoami', 'pwd', 'mkdir', 'rm', 'touch', 'grep', 'man', 'git', 'npm', 'weather',
        //     'fortune', 'cowsay', 'tree', 'history',
        // ];

        const binPath = this.fileSystem.getNodeAtPath(['bin']);
        this.commands = Object.keys(binPath.children)

        const shell_commands = [
                'help', 'about', 'skills', 'projects', 'clear', 'weather',
                'fortune',
        ];
        this.commands.push(...shell_commands);

    }

    handleCommand(command) {
        const [cmd, ...args] = command.split(' ');
        let output;

        switch (cmd.toLowerCase()) {
            case 'help':
                return "Available commands: " + this.commands.join(', ');
            case 'about':
                return "I'm Ghiles Larbi, a passionate web developer and designer with a knack for creating intuitive and visually appealing digital experiences.";
            case 'skills':
                return "My skills include:\n- Frontend: HTML, CSS, JavaScript, React, Vue.js\n- Backend: Node.js, Express, Python, Django\n- Database: MongoDB, PostgreSQL\n- DevOps: Docker, AWS, CI/CD\n- Design: Figma, Adobe XD";
            case 'projects':
                return "1. Portfolio Website: A dynamic React-based portfolio (you're looking at it!)\n2. E-commerce Platform: Full-stack application with React and Node.js\n3. Weather App: Real-time weather data visualization\n4. Task Manager: A productivity app with user authentication\n5. Blog CMS: Content management system with a custom admin panel";
            case 'clear':
                this.commandHistory = [];
                return null;
            case 'fortune':
                const fortunes = [
                    "You will soon embark on a great coding adventure.",
                    "Your next commit will fix that pesky bug.",
                    "A rubber duck will provide the answer you seek.",
                    "The code you write today will be remembered tomorrow.",
                    "You will find the semicolon you missed... eventually."
                ];
                return fortunes[Math.floor(Math.random() * fortunes.length)];
            case 'weather':
                return "Weather forecast for your location:\nSunny with a chance of code rain. Temperature: 72°F (22°C)";
            default:
                // Use the new executeCommand method for filesystem commands
                output = this.fileSystem.executeCommand(cmd, args);
                if (cmd === 'cd') {
                    this.currentDirectory = this.fileSystem.sys_getcwd();
                }
                return output;
        }
    }

    getCommandHistory() {
        return this.commandHistory;
    }

    addCommandToHistory(input, output) {
        const isValid = this.commands.includes(input.split(' ')[0].toLowerCase());
        this.commandHistory.push({ input, output, isValid, pwd: this.currentDirectory });
    }
}

export default Shell;