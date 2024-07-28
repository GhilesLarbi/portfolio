import React, { useState, useEffect, useRef } from "react";
import styles from './Terminal.module.css'
import Shell from './Shell';
import fileSystem from './FileSystem/fileSystem';

function Terminal(props) {
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

    const terminalClasses = `${styles.terminal} ${props.className}`

    return (
        <div className={terminalClasses} onClick={handleTerminalClick}>
            <div className={styles.terminalHeader}>
                <div className={styles.terminalHeaderCircle}></div>
                <div className={styles.terminalHeaderCircle}></div>
                <div className={styles.terminalHeaderCircle}></div>
            </div>
            <div className={styles.terminalContent} ref={terminalContentRef}>
                <div>Bienvenue dans le portfolio de Ghiles Larbi ! Tapez 'help' pour connaître les commandes disponibles.</div>
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
    );
}

export default Terminal;