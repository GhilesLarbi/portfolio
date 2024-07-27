import React, { useState, useEffect, useRef } from "react";
import styles from './Home.module.css'
import { Arrow as ArrowIcon } from "../../Icons";
import Shell from '../../Terminal/Shell';
import fileSystem from '../../Terminal/FileSystem/fileSystem';

function Home() {
    const [currentInput, setCurrentInput] = useState("");
    const [shell] = useState(() => new Shell(fileSystem));
    const [commandHistory, setCommandHistory] = useState(shell.getCommandHistory());
    const [commandHistoryLength, setCommandHistoryLength] = useState(0)
    const inputRef = useRef(null);
    const terminalContentRef = useRef(null);

    const handleCommand = (command) => {
        shell.handleCommand(command);
        setCommandHistory(shell.getCommandHistory());
        setCommandHistoryLength(commandHistory.length)
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
        }
        if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            handleCommand('clear');
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
                                <span className={styles.prompt}>{item.user}@Unknown:{item.pwd}$</span>
                                <span className={item.isValid ? styles.validCommand : styles.invalidCommand}>{item.input}</span>
                            </div>
                            <div className={styles.commandOutput}>{item.output}</div>
                        </div>
                    ))}
                    <div className={styles.inputLine}>
                        <span className={styles.prompt}>{shell.kernel.userManager.getCurrentUser()}@Unknown:{shell.getWorkingDirectory()}$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={currentInput}
                            onChange={(e) => setCurrentInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className={`${styles.terminalInput} ${shell.commands.has(shell.splitCommand(currentInput)[0]) ? styles.validCommand : ''}`}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home;