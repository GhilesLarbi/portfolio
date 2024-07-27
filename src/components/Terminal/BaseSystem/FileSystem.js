class FileSystem {
    constructor(root) {
        this.root = root;
    }

    readFile(path, userManager) {
        const node = this.getNodeAtPath(path);
        if (node && node.type === 'file') {
            if (this.hasPermission(node, 4, userManager))
                return String(node.content);
            else return null
        }
        return null
    }

    readDirectory(path, userManager) {
        const node = this.getNodeAtPath(path);
        return (node && node.type === 'directory' && this.hasPermission(node, 4, userManager)) 
            ? Object.entries(node.children) 
            : null;
    }

    createDirectory(path, userManager) {
        const parentPath = path.slice(0, -1);
        const dirName = path[path.length - 1];
        const parentNode = this.getNodeAtPath(parentPath);

        if (!parentNode || parentNode.type !== 'directory' || !this.hasPermission(parentNode, 2, userManager)) {
            return false;
        }

        parentNode.children[dirName] = {
            name: dirName,
            type: 'directory',
            permissions: { 
                owner: userManager.getCurrentUser(), 
                group: userManager.users[userManager.getCurrentUser()].groups[0], 
                mode: 0o755 
            },
            children: {}
        };
        return true;
    }

    removeNode(path, userManager) {
        const parentPath = path.slice(0, -1);
        const nodeName = path[path.length - 1];
        const parentNode = this.getNodeAtPath(parentPath);

        if (!parentNode || parentNode.type !== 'directory' || !this.hasPermission(parentNode, 2, userManager)) {
            return false;
        }

        if (parentNode.children[nodeName]) {
            delete parentNode.children[nodeName];
            return true;
        }
        return false;
    }

    writeFile(path, content, userManager) {
        const parentPath = path.slice(0, -1);
        const fileName = path[path.length - 1];
        const parentNode = this.getNodeAtPath(parentPath);

        if (!parentNode || parentNode.type !== 'directory' || !this.hasPermission(parentNode, 2, userManager)) {
            return false;
        }

        if (!parentNode.children[fileName]) {
            parentNode.children[fileName] = {
                name: fileName,
                type: 'file',
                permissions: { 
                    owner: userManager.getCurrentUser(), 
                    group: userManager.users[userManager.getCurrentUser()].groups[0], 
                    mode: 0o644 
                },
                content: ''
            };
        }

        if (this.hasPermission(parentNode.children[fileName], 2, userManager)) {
            parentNode.children[fileName].content = content;
            return true;
        }
        return false;
    }

    getNodeAtPath(path) {
        let node = this.root;
        for (let segment of path) {
            if (segment === '/') continue;
            if (!node.children || !node.children[segment]) return null;
            node = node.children[segment];
        }
        return node;
    }

    hasPermission(node, permission, userManager) {
        const currentUser = userManager.getCurrentUser();
        if (!currentUser) {
            console.error('No current user set');
            return false;
        }

        if (currentUser === 'root') return true;
        
        const { owner, group, mode } = node.permissions;
        const currentUserInfo = userManager.users[currentUser];
        
        if (!currentUserInfo) {
            console.error(`Current user ${currentUser} not found in users list`);
            return false;
        }
        
        if (currentUser === owner) {
            return !!(mode & (permission << 6));
        } else if (currentUserInfo.groups.includes(group)) {
            return !!(mode & (permission << 3));
        } else {
            return !!(mode & permission);
        }
    }

    isExecutable(node, userManager) {
        if (node.type !== 'file') return false;
        
        const { mode } = node.permissions;
        const currentUser = userManager.getCurrentUser();
        const currentUserInfo = userManager.users[currentUser];

        if (currentUser === 'root') return true;
        
        if (currentUser === node.permissions.owner) {
            return !!(mode & 0o100);
        } else if (currentUserInfo.groups.includes(node.permissions.group)) {
            return !!(mode & 0o010);
        } else {
            return !!(mode & 0o001);
        }
    }
}

export default FileSystem