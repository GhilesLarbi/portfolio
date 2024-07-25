import Kernel from './Kernel';

class Shell {
    constructor(fileSystem) {
        this.kernel = new Kernel(fileSystem);
        this.commandHistory = [];
        this.currentPath = ['/']
        this.env = {
            'PWD' : "/",
            'PATH' : '/bin'
        }

        const binPath = this.kernel.getNodeAtPath(['bin'])
        this.commands = Object.keys(binPath.children)

        const shell_commands = ['help', 'pwd', 'clear', 'echo', 'cd']
        this.commands.push(...shell_commands);

    }

    handleCommand(command) {
        const old_pwd = this.getWrokingDirectory()

        const [cmd, ...args] = this.splitCommand(command);
        let output;

        switch (cmd) {
            case undefined:
                output = ""
                break
            case 'help':
                output = this.help(cmd, args)
                break
            case 'pwd':
                output = this.getWrokingDirectory(cmd, args)
                break
            case 'cd':
                output = this.changeDirectory(cmd, args)
                break
            case 'echo':
                output = this.echo(cmd, args)
                break
            case 'clear':
                output = this.clear(cmd, args)
                break
            default:
                output = this.execute(cmd, args)
        }

        if (output !== null) this.addCommandToHistory(command, output, old_pwd)
        return output
    }

    getCommandHistory() {
        return this.commandHistory;
    }

    addCommandToHistory(input, output, pwd) {
        const isValid = this.commands.includes(input.split(' ')[0].toLowerCase());
        this.commandHistory.push({ input, output, isValid, pwd: pwd });
    }


    splitCommand(command){
        let command_nodes = []
        let node = ""
        for (let i = 0; i < command.length; i++){
            if (command[i] !== ' ') {
                node = node + command[i]
            } 
            else if (node.trim() === '') continue
            else {
                command_nodes.push(node)
                node = ""
            }
        }
        if (node.trim() !== '') command_nodes.push(node)

        return command_nodes
    }



    // builtin commands 
    getWrokingDirectory(cmd, args) {
        this.env.PWD = '/' + this.currentPath.slice(1).join('/');
        return this.env.PWD
    }


    changeDirectory(cmd, args) {
        let path = args[0] || '~'

        const resolvedPath = this.resolvePath(path)
        const node = this.kernel.getNodeAtPath(resolvedPath)

        if (!this.kernel.hasPermission(node, 1))
            return `cd: ${path}: Permission denied`

        if (node && node.type === 'directory') {
            this.currentPath = resolvedPath
            return this.getWrokingDirectory()
        }
        return `cd: ${path}: No such file or directory`
    }

    pwd(cmd, args) {
        return this.env.PWD
    }

    clear(cmd, args) {
        this.commandHistory = [];
        return null
    }

    help(cmd, args) {
        return "Available commands: " + this.commands.join(', ');
    }

    echo(cmd, args) {
        return args.join(" ")
    }




    // herper methods 
    resolvePath(path) {
        let segments;

        if (Array.isArray(path)) {

            segments = path;

        } else if (typeof path === 'string') {

            if (path === '/') return ['/'];

            if (path.startsWith('/')) {

                segments = ['/', ...path.split('/').filter(Boolean)];

            } else if (path === '~') {

                let currentUserHome = this.kernel.currentUser !== 'root' ? ['/', 'home'] : ['/']
                segments = [...currentUserHome, this.kernel.currentUser];

            } else if (path.startsWith('~/')) {

                let currentUserHome = this.kernel.currentUser !== 'root' ? ['/', 'home'] : ['/']
                segments = [...currentUserHome, this.kernel.currentUser, ...path.slice(2).split('/').filter(Boolean)];

            } else {

                segments = [...this.currentPath, ...path.split('/').filter(Boolean)];

            }
        } else {

            throw new Error('Invalid path type');
        }

        const resolvedPath = [];
        for (const segment of segments) {
            if (segment === '.' || segment === '') continue;
            if (segment === '..') {
                if (resolvedPath.length > 1) resolvedPath.pop();
            } else {
                resolvedPath.push(segment);
            }
        }

        // Ensure the path always starts with a single '/'
        if (resolvedPath[0] !== '/') {
            resolvedPath.unshift('/');
        }

        return resolvedPath;
    }


    execute(commandName, args) {
        // check the PATH env variable for commands
        const command = this.kernel.getNodeAtPath(['bin', commandName]);
        if (command && command.type === 'file' && typeof command.content === 'function') {
            let output = this.kernel.process(command.content, args, this.env)
            return output
        }
        return `${commandName}: command not found`;
    }
}

export default Shell;