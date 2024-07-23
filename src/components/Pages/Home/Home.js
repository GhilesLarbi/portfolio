import React, { useState, useEffect, useRef } from "react";
import styles from './Home.module.css'
import { Arrow as ArrowIcon } from "../../Icons";
import { Home as HomeIcon } from "../../Icons";

import FileSystem from '../../Terminal/FileSystem'

function Home() {
    const [commandHistory, setCommandHistory] = useState([]);
    const [currentInput, setCurrentInput] = useState("");
    const [fileSystem] = useState(() => new FileSystem());
    const [currentDirectory, setCurrentDirectory] = useState("/");
    const inputRef = useRef(null);
    const terminalContentRef = useRef(null);

    const validCommands = [
        'help', 'about', 'skills', 'projects', 'clear', 'ls', 'cd', 'cat', 'date', 'echo',
        'whoami', 'pwd', 'mkdir', 'rm', 'touch', 'grep', 'man', 'git', 'npm', 'weather',
        'fortune', 'cowsay', 'tree', 'history'
    ];

    const handleCommand = (command) => {
        const [cmd, ...args] = command.split(' ');
        let output;
        let newDirectory = currentDirectory;

        switch (cmd.toLowerCase()) {
            case 'help':
                return "Available commands: " + validCommands.join(', ');
            case 'about':
                return "I'm Ghiles Larbi, a passionate web developer and designer with a knack for creating intuitive and visually appealing digital experiences.";
            case 'skills':
                return "My skills include:\n- Frontend: HTML, CSS, JavaScript, React, Vue.js\n- Backend: Node.js, Express, Python, Django\n- Database: MongoDB, PostgreSQL\n- DevOps: Docker, AWS, CI/CD\n- Design: Figma, Adobe XD";
            case 'projects':
                return "1. Portfolio Website: A dynamic React-based portfolio (you're looking at it!)\n2. E-commerce Platform: Full-stack application with React and Node.js\n3. Weather App: Real-time weather data visualization\n4. Task Manager: A productivity app with user authentication\n5. Blog CMS: Content management system with a custom admin panel";
            case 'clear':
                setCommandHistory([]);
                return null;
            case 'ls':
                return fileSystem.ls(args[0] || '');
            case 'cd':
                output = fileSystem.cd(args[0] || '');
                setCurrentDirectory(fileSystem.pwd());
                return output;            
            case 'cat':
                return fileSystem.readFile(args[0])
            case 'date':
                return new Date().toString();
            case 'echo':
                return args.join(' ');
            case 'whoami':
                return "ghiles-larbi";
            case 'pwd':
                return fileSystem.pwd();
            case 'mkdir':
                return fileSystem.mkdir(args[0]);
            case 'rm':
                return fileSystem.rm(args[0]);
            case 'touch':
                return fileSystem.touch(args[0]);
            case 'grep':
                return "grep: No matches found";
            case 'man':
                return `RTFM: Read The Friendly Manual\n\nUSAGE\n    ${args[0]} [OPTION]... PATTERN [FILE]...\n\nDESCRIPTION\n    This is a simulated man page. In a real system, it would provide detailed information about the ${args[0]} command.`;
            case 'git':
                return "git: 'status' - On branch master\nYour branch is up to date with 'origin/master'.\nnothing to commit, working tree clean";
            case 'npm':
                return "npm: No package.json found. Please run 'npm init' to create one.";
            case 'weather':
                return "Weather forecast for your location:\nSunny with a chance of code rain. Temperature: 72°F (22°C)";
            case 'fortune':
                const fortunes = [
                    "You will soon embark on a great coding adventure.",
                    "Your next commit will fix that pesky bug.",
                    "A rubber duck will provide the answer you seek.",
                    "The code you write today will be remembered tomorrow.",
                    "You will find the semicolon you missed... eventually."
                ];
                return fortunes[Math.floor(Math.random() * fortunes.length)];
            case 'cowsay':
                return `
 ___________
< ${args.join(' ')} >
 -----------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
                `;
            case 'tree':
                return fileSystem.tree();
            case 'history':
                return commandHistory.map((cmd, index) => `${index + 1}  ${cmd.input}`).join('\n');
            default:
                return `Command not found: ${command}. Type 'help' for available commands.`;
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            const output = handleCommand(currentInput);
            if (output !== null) {
                setCommandHistory(prev => [...prev, { input: currentInput, output, isValid: validCommands.includes(currentInput.split(' ')[0].toLowerCase()), pwd: currentDirectory }]);
            }
            setCurrentInput("");
        }
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
        if (terminalContentRef.current) {
            terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
        }
    }, [commandHistory]);

    const handleTerminalClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleKeyDown = (e) => {
        if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            setCommandHistory([]);
        }
    };

    return (
        <section className={styles.section}>
            <p className={styles.title}>
                <span>Home</span>
            </p>
            <h1 className={styles.header}>
                Hi I'm <span className={styles.name}>"Ghiles Larbi"</span> <br />
                let me <span className={styles.design}>design</span> your website
            </h1>
            <p className={styles.body}>
                Passionate web developer and designer, dedicated to crafting exceptional digital experiences.
                From concept to code, I bring creativity and expertise to every project. Let's collaborate to bring your vision to life.
            </p>
            <button className={styles.button}>
                <span>See Projects</span>
                <ArrowIcon className={styles.buttonIcon} />
            </button>

            <div className={styles.terminal} onClick={handleTerminalClick}>
                <div className={styles.terminalHeader}>
                    <div className={styles.terminalHeaderCircle}></div>
                    <div className={styles.terminalHeaderCircle}></div>
                    <div className={styles.terminalHeaderCircle}></div>
                </div>
                <div className={styles.terminalContent} ref={terminalContentRef}>
                    <div>Welcome to Ghiles Larbi's portfolio! Type 'help' for available commands.</div>
                    {commandHistory.map((item, index) => (
                        <div key={index}>
                            <div className={styles.inputLine}>
                                <span className={styles.prompt}>guest@Unknown:{item.pwd}$</span>
                                <span className={item.isValid ? styles.validCommand : styles.invalidCommand}>{item.input}</span>
                            </div>
                            <div className={styles.commandOutput}>{item.output}</div>
                        </div>
                    ))}
                    <div className={styles.inputLine}>
                        <span className={styles.prompt}>guest@Unknown:{currentDirectory}$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={currentInput}
                            onChange={(e) => setCurrentInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            onKeyDown={handleKeyDown}
                            className={`${styles.terminalInput} ${validCommands.includes(currentInput.split(' ')[0].toLowerCase()) ? styles.validCommand : ''}`}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home;