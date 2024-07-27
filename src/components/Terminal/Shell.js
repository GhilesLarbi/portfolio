import Kernel from './BaseSystem/Kernel';

class Shell {
    constructor(fileSystem) {
        this.kernel = new Kernel(fileSystem);
        this.commandHistory = [];
        
        // set current path to the user home directory
        this.currentPath = ["/", ...this.kernel.userManager.getHomeDir()]

        this.env = {
            PWD:  this.getWorkingDirectory(true),
            PATH: '/bin:/usr/bin:/usr/local/bin',
        };
        this.initializeCommands();
    }

    initializeCommands() {
        this.builtinCommands = {
            help: this.help.bind(this),
            pwd: this.getWorkingDirectory.bind(this),
            cd: this.changeDirectory.bind(this),
            echo: this.echo.bind(this),
            clear: this.clear.bind(this),
            exit: this.exit.bind(this),
        };
        this.updateCommands();
    }

    updateCommands() {
        const pathDirs = this.env.PATH.split(':');
        this.commands = new Set(Object.keys(this.builtinCommands));
        
        for (const dir of pathDirs) {
            const dirNode = this.kernel.fileSystem.getNodeAtPath(this.kernel.resolvePath(dir, '/'));
            if (dirNode && dirNode.type === 'directory') {
                Object.keys(dirNode.children).forEach(cmd => this.commands.add(cmd));
            }
        }
    }

    handleCommand(command) {
        const oldPwd = this.getWorkingDirectory();
        const oldUser = this.kernel.userManager.currentUser


        const [cmd, ...args] = this.splitCommand(command);
        let output = this.executeCommand(cmd, args);
        
        if (output !== null) {
            this.addCommandToHistory(command, output, oldPwd, oldUser);
        }
        return output;
    }

    executeCommand(cmd, args) {
        if (cmd in this.builtinCommands) {
            return this.builtinCommands[cmd](args);
        } else if (cmd) {
            return this.execute(cmd, args);
        }
        return "";
    }

    splitCommand(command) {
        return command.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
    }

    getCommandHistory() {
        return this.commandHistory;
    }

    addCommandToHistory(input, output, pwd, user) {
        const isValid = this.commands.has(input.split(' ')[0].toLowerCase());
        this.commandHistory.push({ input, output, isValid, pwd,  user});
    }

    getWorkingDirectory(env) {
        if (env !== undefined){
            return '/' + this.currentPath.slice(1).join('/');
        }

        this.env.PWD = '/' + this.currentPath.slice(1).join('/');
        return this.env.PWD;
    }

    changeDirectory(args) {
        const path = args[0] || '~';
        const resolvedPath = this.kernel.resolvePath(path, this.env.PWD);
        const node = this.kernel.fileSystem.getNodeAtPath(resolvedPath);
        
        if (!node || node.type !== 'directory') {
            return `cd: ${path}: No such file or directory`;
        }
        if (!this.kernel.fileSystem.hasPermission(node, 1, this.kernel.userManager)) {
            return `cd: ${path}: Permission denied`;
        }
        
        this.currentPath = resolvedPath;
        this.env.PWD = '/' + resolvedPath.slice(1).join('/');
        return "";
    }

    exit() {
        if (this.kernel.userManager.exitCurrentUser()) {
            return `exit`;
        } else {
            return "";
        }
    }
    
    clear() {
        this.commandHistory = [];
        return null;
    }

    help() {
        return "Available commands: " + Array.from(this.commands).join(', ');
    }

    echo(args) {
        return args.map(arg => {
            if (arg.startsWith('$')) {
                const envVar = arg.slice(1);
                return this.env[envVar] || '';
            }
            return arg;
        }).join(' ');
    }

    execute(commandName, args) {
        const pathDirs = this.env.PATH.split(':');
        for (const dir of pathDirs) {
            const commandPath = this.kernel.resolvePath(`${dir}/${commandName}`, '/');
            const command = this.kernel.fileSystem.getNodeAtPath(commandPath);
            if (command && command.type === 'file' && typeof command.content === 'function') {
                return this.kernel.process(commandPath, args, this.env);
            }
        }
        return `${commandName}: command not found`;
    }
}

export default Shell;