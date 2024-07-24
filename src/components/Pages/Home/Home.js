import React, { useState, useEffect, useRef } from "react";
import styles from './Home.module.css'
import { Arrow as ArrowIcon } from "../../Icons";
import Shell from '../../Terminal/Shell';
import fileSystemData from '../../Terminal/fileSystemData';

function Home() {
    const [currentInput, setCurrentInput] = useState("");
    const [shell] = useState(() => new Shell(fileSystemData));
    const [commandHistory, setCommandHistory] = useState(shell.getCommandHistory());
    const inputRef = useRef(null);
    const terminalContentRef = useRef(null);

    const handleCommand = (command) => {
        const output = shell.handleCommand(command);
        if (output !== null) {
            shell.addCommandToHistory(currentInput, output);
        }
        setCommandHistory(shell.getCommandHistory());
        setCurrentInput("");
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (terminalContentRef.current) {
                terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
            }
        }, 0);

        return () => clearTimeout(timer);
    }, [commandHistory, currentInput]);

    const handleTerminalClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleCommand(currentInput);
            setCurrentInput("")
        }
        if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            shell.handleCommand('clear');
            setCommandHistory([]);
            setCurrentInput("")
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
                                <span className={styles.prompt}>{shell.fileSystem.currentUser}@Unknown:{item.pwd}$</span>
                                <span className={item.isValid ? styles.validCommand : styles.invalidCommand}>{item.input}</span>
                            </div>
                            <div className={styles.commandOutput}>{item.output}</div>
                        </div>
                    ))}
                    <div className={styles.inputLine}>
                        <span className={styles.prompt}>{shell.fileSystem.currentUser}@Unknown:{shell.currentDirectory}$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={currentInput}
                            onChange={(e) => setCurrentInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className={`${styles.terminalInput} ${shell.commands.includes(currentInput.split(' ')[0].toLowerCase()) ? styles.validCommand : ''}`}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home;