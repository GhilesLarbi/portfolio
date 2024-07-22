import data from "./fileSystemData";


class FileSystem {
    constructor() {
        this.root = data
        this.currentPath = ['/'];
    }

    resolvePath(path) {
        let segments = [];

        if (path === '/') return ['/'];
        if (path.startsWith('/')) {
            segments = path.split('/').filter(Boolean);
        } else if (path === '~') {
            segments = ['/home', 'ghiles'];
        } else if (path.startsWith('~/')) {
            segments = ['/home', 'ghiles', ...path.slice(2).split('/')];
        } else {
            segments = [...this.currentPath, ...path.split('/')];
        }

        const resolvedPath = [];
        for (const segment of segments) {
            if (segment === '' || segment === '.') continue;
            if (segment === '..') {
                if (resolvedPath.length > 0) resolvedPath.pop();
            } else {
                resolvedPath.push(segment);
            }
        }
        return resolvedPath.length > 0 ? resolvedPath : ['/'];
    }

    getNodeAtPath(path) {
        let node = this.root;
        for (const segment of path) {
            if (segment === '/') continue;
            if (!node.children || !node.children[segment]) return null;
            node = node.children[segment];
        }
        return node;
    }

    cd(path) {
        const resolvedPath = this.resolvePath(path);
        const node = this.getNodeAtPath(resolvedPath);
        if (node && node.type === 'directory') {
            this.currentPath = resolvedPath;
            return '';
        }
        return `cd: ${path}: No such directory`;
    }

    ls(path = '') {
        const resolvedPath = this.resolvePath(path);
        const node = this.getNodeAtPath(resolvedPath);
        if (node && node.type === 'directory') {
            return Object.keys(node.children).join('  ');
        }
        return `ls: ${path}: No such directory`;
    }

    pwd() {
        return this.currentPath.join('/').replace('//', '/');
    }

    mkdir(name) {
        const parent = this.getNodeAtPath(this.currentPath);
        if (parent && parent.type === 'directory') {
            if (parent.children[name]) {
                return `mkdir: ${name}: File exists`;
            }
            parent.children[name] = { name, type: 'directory', children: {} };
            return ``;
        }
        return `mkdir: cannot create directory '${name}'`;
    }

    touch(name) {
        const parent = this.getNodeAtPath(this.currentPath);
        if (parent && parent.type === 'directory') {
            if (parent.children[name]) {
                return `touch: ${name}: File exists`;
            }
            parent.children[name] = { name, type: 'file' };
            return ``;
        }
        return `touch: cannot create file '${name}'`;
    }

    rm(name) {
        const parent = this.getNodeAtPath(this.currentPath);
        if (parent && parent.type === 'directory') {
            if (!parent.children[name]) {
                return `rm: ${name}: No such file or directory`;
            }
            delete parent.children[name];
            return ``;
        }
        return `rm: cannot remove '${name}'`;
    }

    tree(path = '', prefix = '') {
        const resolvedPath = this.resolvePath(path);
        const node = this.getNodeAtPath(resolvedPath);
        console.log("path : ", path)
        console.log("resolve path : ", resolvedPath)
        if (!node || node.type !== 'directory') {
            return `tree: ${path}: No such directory`;
        }
        
        let output = prefix + node.name + '\n';
        const entries = Object.entries(node.children);
        for (let i = 0; i < entries.length; i++) {
            const [name, child] = entries[i];
            const isLast = i === entries.length - 1;
            const newPrefix = prefix + (isLast ? '└── ' : '├── ');
            if (child.type === 'directory') {
                output += this.tree(["/", ...resolvedPath, name].join('/'), newPrefix);
            } else {
                output += newPrefix + name + '\n';
            }
        }
        return output;
    }

    readFile(path) {
        console.log(path)
        if (!path) {
            return `No file specified`;
        }
        const resolvedPath = this.resolvePath(path);
        const node = this.getNodeAtPath(resolvedPath);
        if (node && node.type === 'file' && node.content) {
            return node.content || '';
        }
        return `readFile: ${path}: Not a text file or file does not exist`;
    }
}

export default FileSystem;