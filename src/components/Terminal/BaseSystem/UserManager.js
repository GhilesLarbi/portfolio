class UserManager {
    constructor() {
        this.users = {
            root: { id: 0, gid: 0, groups: ['root'], home: '/root' }
        };
        this.groups = { root: { id: 0, members: ['root'] } };
        this.currentUser = 'root';
        this.userStack = [];
    }

    loadUsersAndGroups(passwdContent, groupContent) {
        this.parsePasswdFile(passwdContent);
        this.parseGroupFile(groupContent);
        this.assignUsersToGroups();
    }

    parsePasswdFile(content) {
        if (!content) return;
        content.split('\n').forEach(line => {
            const [username, , uid, gid, , home] = line.split(':');
            this.users[username] = { 
                id: parseInt(uid), 
                gid: parseInt(gid), 
                groups: [], 
                home 
            };
        });
    }

    parseGroupFile(content) {
        if (!content) return;
        content.split('\n').forEach(line => {
            const [groupname, , gid, members] = line.split(':');
            this.groups[groupname] = { 
                id: parseInt(gid), 
                members: members ? members.split(',') : [] 
            };
        });
    }

    assignUsersToGroups() {
        Object.entries(this.groups).forEach(([groupName, group]) => {
            group.members.forEach(username => {
                if (this.users[username]) {
                    this.users[username].groups.push(groupName);
                }
            });
        });

        Object.values(this.users).forEach(user => {
            const primaryGroupName = Object.keys(this.groups).find(
                groupName => this.groups[groupName].id === user.gid
            );
            if (primaryGroupName && !user.groups.includes(primaryGroupName)) {
                user.groups.unshift(primaryGroupName);
            }
        });
    }

    setDefaultUser() {
        const defaultUser = 'guest';
        if (this.users[defaultUser]) {
            this.setCurrentUser(defaultUser);
        } else {
            console.warn(`Default user '${defaultUser}' not found. No user set.`);
        }
    }

    setCurrentUser(username) {
        if (!this.users[username]) {
            throw new Error(`User ${username} does not exist`);
        }
        this.userStack.push(this.currentUser);
        this.currentUser = username;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    exitCurrentUser() {
        if (this.userStack.length > 0) {
            this.currentUser = this.userStack.pop();
            return true;
        }
        return false;
    }

    getHomeDir(user) {
        const userInfo = this.users[user];
        return userInfo ? userInfo.home.split('/').filter(Boolean) : ['home', user];
    }
}


export default UserManager