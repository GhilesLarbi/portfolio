class Kernel {
    constructor(fileSystem) {
        this.root = fileSystem;
        this.currentPath = ['/'];
        this.currentUser = 'ghiles';
        this.users = {
            root: { id: 0, groups: ['root'] },
            ghiles: { id: 1000, groups: ['ghiles', 'users'] },
            guest: { id: 1001, groups: ['guests'] }
        };
    }

    // System call to read directory contents
    sys_readdir(path) {
        const node = this.getNodeAtPath(this.resolvePath(path));
        if (node && node.type === 'directory' && this.hasPermission(node, 4)) {
            return Object.entries(node.children);
        }
        return null;
    }

    // System call to create a new directory
    sys_mkdir(path) {
        const parentPath = this.resolvePath(path.split('/').slice(0, -1).join('/'));
        const dirName = path.split('/').pop();
        const parentNode = this.getNodeAtPath(parentPath);
        if (parentNode && parentNode.type === 'directory' && this.hasPermission(parentNode, 2)) {
            parentNode.children[dirName] = {
                name: dirName,
                type: 'directory',
                permissions: { owner: this.currentUser, group: this.users[this.currentUser].groups[0], mode: 0o755 },
                children: {}
            };
            return true;
        }
        return false;
    }

    // System call to remove a file or empty directory
    sys_unlink(path) {
        const parentPath = this.resolvePath(path.split('/').slice(0, -1).join('/'));
        const name = path.split('/').pop();
        const parentNode = this.getNodeAtPath(parentPath);
        if (parentNode && parentNode.type === 'directory' && this.hasPermission(parentNode, 2)) {
            if (parentNode.children[name]) {
                delete parentNode.children[name];
                return true;
            }
        }
        return false;
    }

    // System call to create or update a file
    sys_write(path, content) {
        const parentPath = this.resolvePath(path.split('/').slice(0, -1).join('/'));
        const fileName = path.split('/').pop();
        const parentNode = this.getNodeAtPath(parentPath);
        if (parentNode && parentNode.type === 'directory' && this.hasPermission(parentNode, 2)) {
            if (!parentNode.children[fileName]) {
                parentNode.children[fileName] = {
                    name: fileName,
                    type: 'file',
                    permissions: { owner: this.currentUser, group: this.users[this.currentUser].groups[0], mode: 0o644 },
                    content: ''
                };
            }
            if (this.hasPermission(parentNode.children[fileName], 2)) {
                parentNode.children[fileName].content = content;
                return true;
            }
        }
        return false;
    }

    // System call to read file content
    sys_read(path) {
        const node = this.getNodeAtPath(this.resolvePath(path));
        if (node && node.type === 'file' && this.hasPermission(node, 4)) {
            return node.content;
        }
        return null;
    }

    // Helper method to resolve path
    resolvePath(path) {
        let segments;

        if (Array.isArray(path)) {
            segments = path;
        } else if (typeof path === 'string') {
            if (path === '/') return ['/'];
            if (path.startsWith('/')) {
                segments = ['/', ...path.split('/').filter(Boolean)];
            } else if (path === '~') {
                segments = ['/', 'home', this.currentUser];
            } else if (path.startsWith('~/')) {
                segments = ['/', 'home', this.currentUser, ...path.slice(2).split('/').filter(Boolean)];
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

    // Helper method to get node at path
    getNodeAtPath(path) {
        let node = this.root;
        for (let segment of path) {
            if (segment === '/') continue;
            if (!node.children || !node.children[segment]) return null;
            node = node.children[segment];
        }
        return node;
    }

    // Helper method to check permissions
    hasPermission(node, permission) {
        if (this.currentUser === 'root') return true;
        const { owner, group, mode } = node.permissions;
        if (this.currentUser === owner) {
            return !!(mode & (permission << 6));
        } else if (this.users[this.currentUser].groups.includes(group)) {
            return !!(mode & (permission << 3));
        } else {
            return !!(mode & permission);
        }
    }

    // Method to execute executable files
    // add a way to manage process
    process(executable, args, env) {
        return executable(this, args, env);
    }
}

// Static method to get mode string
Kernel.getModeString = function(mode) {
    const modeChars = ['---', '--x', '-w-', '-wx', 'r--', 'r-x', 'rw-', 'rwx'];
    const type = mode & 0o170000;
    const typeChar = type === 0o040000 ? 'd' : '-';
    const ownerMode = modeChars[(mode >> 6) & 7];
    const groupMode = modeChars[(mode >> 3) & 7];
    const otherMode = modeChars[mode & 7];
    return `${typeChar}${ownerMode}${groupMode}${otherMode}`;
};

export default Kernel;