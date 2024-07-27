import UserManager from "./UserManager";
import FileSystem from "./FileSystem";

class Kernel {
    constructor(fileSystemRoot) {
        this.fileSystem = new FileSystem(fileSystemRoot);
        this.userManager = new UserManager();
        this.initializeSystem();
    }

    initializeSystem() {
        const passwdContent = this.fileSystem.readFile(['/', 'etc', 'passwd'], this.userManager);
        const groupContent = this.fileSystem.readFile(['/', 'etc', 'group'], this.userManager);
        this.userManager.loadUsersAndGroups(passwdContent, groupContent);
        this.userManager.setDefaultUser();
    }

    resolvePath(path, pwd = '/') {
        if (typeof path === 'string') {
            path = this.parsePathString(path, pwd);
        } else if (!Array.isArray(path)) {
            throw new Error('Invalid path type');
        }

        return this.normalizePathArray(path);
    }

    parsePathString(path, pwd) {
        if (path === '/') return ['/'];
        if (path === '~') return ['/', ...this.userManager.getHomeDir(this.userManager.getCurrentUser())];

        if (path.startsWith('~/')) {
            return [...this.userManager.getHomeDir(this.userManager.getCurrentUser()), ...path.slice(2).split('/')];
        } else if (path.startsWith('~')) {
            const [_, user, ...rest] = path.split('/');
            return [...this.userManager.getHomeDir(user.slice(1)), ...rest];
        } else if (path.startsWith('/')) {
            return path.split('/');
        } else {
            return [...pwd.split('/').filter(Boolean), ...path.split('/')];
        }
    }

    normalizePathArray(pathArray) {
        const result = [];
        for (const segment of pathArray) {
            if (segment === '' || segment === '.') continue;
            if (segment === '..') {
                if (result.length > 0 && result[result.length - 1] !== '..') {
                    result.pop();
                } else if (result[0] !== '/') {
                    result.push('..');
                }
            } else {
                result.push(segment);
            }
        }
        return result.length === 0 || result[0] !== '/' ? ['/', ...result] : result;
    }

    process(path, args = [], env = {}) {
        const node = this.fileSystem.getNodeAtPath(path);
        if (!node) {
            throw new Error(`File not found: ${path.join('/')}`);
        }

        if (!this.fileSystem.isExecutable(node, this.userManager)) {
            throw new Error(`Permission denied: ${path.join('/')}`);
        }

        if (typeof node.content === 'function') {
            return node.content(this, args, env);
        } else {
            throw new Error(`File is not executable: ${path.join('/')}`);
        }
    }
}

export default Kernel