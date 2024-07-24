import FileSystem from "./FileSystem";

let data = {
    name: '/',
    type: 'directory',
    permissions: { owner: 'root', group: 'root', mode: 0o755 },
    children: {
        'bin': {
            name: 'bin',
            type: 'directory',
            permissions: { owner: 'root', group: 'root', mode: 0o755 },
            children: {
                'ls': {
                    name: 'ls',
                    type: 'file',
                    permissions: { owner: 'root', group: 'root', mode: 0o755 },
                    content: function(fs, args) {
                        const path = args[0] || fs.sys_getcwd();
                        const entries = fs.sys_readdir(path);
                        if (entries === null) return `ls: cannot access '${path}': No such file or directory`;
                        return entries.map(([name, node]) => {
                            const { owner, group, mode } = node.permissions;
                            const modeString = FileSystem.getModeString(mode);
                            return `${modeString} ${owner} ${group} ${name}`;
                        }).join('\n');
                    }
                },
                'cd': {
                    name: 'cd',
                    type: 'file',
                    permissions: { owner: 'root', group: 'root', mode: 0o755 },
                    content: function(fs, args) {
                        const path = args[0] || '/';
                        return fs.sys_chdir(path) ? '' : `cd: ${path}: No such file or directory`;
                    }
                },
                'pwd': {
                    name: 'pwd',
                    type: 'file',
                    permissions: { owner: 'root', group: 'root', mode: 0o755 },
                    content: function(fs, args) {
                        return fs.sys_getcwd();
                    }
                },
                'mkdir': {
                    name: 'mkdir',
                    type: 'file',
                    permissions: { owner: 'root', group: 'root', mode: 0o755 },
                    content: function(fs, args) {
                        if (!args[0]) return 'mkdir: missing operand';
                        return fs.sys_mkdir(args[0]) ? '' : `mkdir: cannot create directory '${args[0]}': File exists or permission denied`;
                    }
                },
                'rm': {
                    name: 'rm',
                    type: 'file',
                    permissions: { owner: 'root', group: 'root', mode: 0o755 },
                    content: function(fs, args) {
                        if (!args[0]) return 'rm: missing operand';
                        return fs.sys_unlink(args[0]) ? '' : `rm: cannot remove '${args[0]}': No such file or directory or permission denied`;
                    }
                },
                'cat': {
                    name: 'cat',
                    type: 'file',
                    permissions: { owner: 'root', group: 'root', mode: 0o755 },
                    content: function(fs, args) {
                        if (!args[0]) return 'cat: missing operand';
                        const content = fs.sys_read(args[0]);
                        return content !== null ? content : `cat: ${args[0]}: No such file or permission denied`;
                    }
                },
                'date': {
                    name: 'date',
                    type: 'file',
                    permissions: { owner: 'root', group: 'root', mode: 0o755 },
                    content: function(fs, args) {
                        return new Date().toString();
                    }
                },
                'echo': {
                    name: 'echo',
                    type: 'file',
                    permissions: { owner: 'root', group: 'root', mode: 0o755 },
                    content: function(fs, args) {
                        return args.join(' ');
                    }
                },
                'tree': {
                    name: 'tree',
                    type: 'file',
                    permissions: { owner: 'root', group: 'root', mode: 0o755 },
                    content: function(fs, args) {
                        const path = args[0] || '/';
                        const resolvedPath = fs.resolvePath(path);
                
                        function traverseDirectory(currentPath, prefix = '') {
                            let output = '';
                            const node = fs.getNodeAtPath(currentPath);
                            
                            if (!node || node.type !== 'directory') {
                                return output;
                            }
                
                            const entries = Object.entries(node.children);
                            entries.forEach(([name, childNode], index) => {
                                const isLast = index === entries.length - 1;
                                const newPrefix = prefix + (isLast ? '└── ' : '├── ');
                                output += newPrefix + name + '\n';
                                
                                if (childNode.type === 'directory') {
                                    output += traverseDirectory(
                                        [...currentPath, name], 
                                        prefix + (isLast ? '    ' : '│   ')
                                    );
                                }
                            });
                
                            return output;
                        }
                
                        return path + '\n' + traverseDirectory(resolvedPath);
                    }
                },
                'cowsay': {
                    name: 'cowsay',
                    type: 'file',
                    permissions: { owner: 'root', group: 'root', mode: 0o755 },
                    content: function(fs, args) {
                        const message = args.join(' ')
                        return  " "+
                                "_".repeat(message.length+2)+"\n"+
                                `< ${message} >\n `+
                                "¯".repeat(message.length+2)+"\n"+
                                "   \\   ^__^\n"+
                                "   \\  (oo)\\_______\n"+
                                "       (__)\\       )\\/\\\n"+
                                "           ||----w |\n"+
                                "           ||     ||\n"
                    }
                },

            },
        },        
        'boot': {
            name: 'boot',
            type: 'directory',
            permissions: { owner: 'root', group: 'root', mode: 0o755 },
            children: {
                'vmlinuz': { name: 'vmlinuz', type: 'file', permissions: { owner: 'root', group: 'root', mode: 0o644 } },
                'initrd.img': { name: 'initrd.img', type: 'file', permissions: { owner: 'root', group: 'root', mode: 0o644 } },
                'grub': {
                    name: 'grub',
                    type: 'directory',
                    permissions: { owner: 'root', group: 'root', mode: 0o755 },
                    children: {
                        'grub.cfg': { name: 'grub.cfg', type: 'file', permissions: { owner: 'root', group: 'root', mode: 0o644 } }
                    }
                }
            }
        },
        'dev': {
            name: 'dev',
            type: 'directory',
            permissions: { owner: 'root', group: 'root', mode: 0o755 },
            children: {
                'sda1': { name: 'sda1', type: 'file', permissions: { owner: 'root', group: 'root', mode: 0o755 } },
                'tty0': { name: 'tty0', type: 'file', permissions: { owner: 'root', group: 'root', mode: 0o755 } },
                'null': { name: 'null', type: 'file', permissions: { owner: 'root', group: 'root', mode: 0o755 } },
                'zero': { name: 'zero', type: 'file', permissions: { owner: 'root', group: 'root', mode: 0o755 } },
                'random': { name: 'random', type: 'file', permissions: { owner: 'root', group: 'root', mode: 0o755 } },
                'urandom': { name: 'urandom', type: 'file', permissions: { owner: 'root', group: 'root', mode: 0o755 } }
            }
        },
        'etc': {
            name: 'etc',
            type: 'directory',
            permissions: { owner: 'root', group: 'root', mode: 0o755 },
            children: {
                'passwd': { name: 'passwd', type: 'file', content: 'root:x:0:0:root:/root:/bin/bash\n', permissions: { owner: 'root', group: 'root', mode: 0o644 } },
                'shadow': { name: 'shadow', type: 'file', content: 'root:$6$rounds=656000$somelonghash:...', permissions: { owner: 'root', group: 'root', mode: 0o600 } },
                'hosts': { name: 'hosts', type: 'file', content: '127.0.0.1 localhost\n', permissions: { owner: 'root', group: 'root', mode: 0o644 } },
                'hostname': { name: 'hostname', type: 'file', content: 'localhost', permissions: { owner: 'root', group: 'root', mode: 0o644 } },
                'network': {
                    name: 'network',
                    type: 'directory',
                    permissions: { owner: 'root', group: 'root', mode: 0o755 },
                    children: {
                        'interfaces': { name: 'interfaces', type: 'file', content: 'auto lo\niface lo inet loopback\n', permissions: { owner: 'root', group: 'root', mode: 0o644 } }
                    }
                },
                'ssh': {
                    name: 'ssh',
                    type: 'directory',
                    permissions: { owner: 'root', group: 'root', mode: 0o700 },
                    children: {
                        'sshd_config': { name: 'sshd_config', type: 'file', permissions: { owner: 'root', group: 'root', mode: 0o644 } }
                    }
                }
            }
        },        
        'home': {
            name: 'home',
            type: 'directory',
            permissions: { owner: 'root', group: 'root', mode: 0o755 },
            children: {
                'ghiles': {
                    name: 'ghiles',
                    type: 'directory',
                    permissions: { owner: 'ghiles', group: 'ghiles', mode: 0o755 },
                    children: {
                        'Documents': {
                            name: 'Documents',
                            type: 'directory',
                            permissions: { owner: 'ghiles', group: 'ghiles', mode: 0o755 },
                            children: {
                                'resume.pdf': { name: 'resume.pdf', type: 'file', permissions: { owner: 'ghiles', group: 'ghiles', mode: 0o644 } },
                                'notes.txt': { name: 'notes.txt', type: 'file', content: 'Some notes...', permissions: { owner: 'ghiles', group: 'ghiles', mode: 0o644 } }
                            }
                        },
                        'Projects': {
                            name: 'Projects',
                            type: 'directory',
                            permissions: { owner: 'ghiles', group: 'ghiles', mode: 0o755 },
                            children: {
                                'website': { name: 'website', type: 'directory', permissions: { owner: 'ghiles', group: 'ghiles', mode: 0o755 }, children: {} },
                                'app': { name: 'app', type: 'directory', permissions: { owner: 'ghiles', group: 'ghiles', mode: 0o755 }, children: {} },
                                'game': { name: 'game', type: 'directory', permissions: { owner: 'ghiles', group: 'ghiles', mode: 0o755 }, children: {} }
                            }
                        },
                        'Images': {
                            name: 'Images',
                            type: 'directory',
                            permissions: { owner: 'ghiles', group: 'ghiles', mode: 0o755 },
                            children: {
                                'profile.jpg': { name: 'profile.jpg', type: 'file', permissions: { owner: 'ghiles', group: 'ghiles', mode: 0o644 } },
                                'banner.png': { name: 'banner.png', type: 'file', permissions: { owner: 'ghiles', group: 'ghiles', mode: 0o644 } }
                            }
                        },
                        '.bashrc': { name: '.bashrc', type: 'file', content: "export PATH=/usr/local/bin:$PATH", permissions: { owner: 'ghiles', group: 'ghiles', mode: 0o644 } },
                        '.profile': { name: '.profile', type: 'file', content: 'if [ -n "$BASH_VERSION" ]; then\n  [ -f ~/.bashrc ] && . ~/.bashrc\nfi\n', permissions: { owner: 'ghiles', group: 'ghiles', mode: 0o644 } },
                        '.ssh': {
                            name: '.ssh',
                            type: 'directory',
                            permissions: { owner: 'ghiles', group: 'ghiles', mode: 0o700 },
                            children: {
                                'id_rsa': { name: 'id_rsa', type: 'file', permissions: { owner: 'ghiles', group: 'ghiles', mode: 0o600 } },
                                'id_rsa.pub': { name: 'id_rsa.pub', type: 'file', permissions: { owner: 'ghiles', group: 'ghiles', mode: 0o644 } },
                                'known_hosts': { name: 'known_hosts', type: 'file', permissions: { owner: 'ghiles', group: 'ghiles', mode: 0o644 } }
                            }
                        }
                    }
                }
            }
        },
        'lib': {
            name: 'lib',
            type: 'directory',
            permissions: { owner: 'root', group: 'root', mode: 0o755 },
            children: {
                'libc.so.6': { name: 'libc.so.6', type: 'file', permissions: { owner: 'root', group: 'root', mode: 0o755 } },
                'ld-linux.so.2': { name: 'ld-linux.so.2', type: 'file', permissions: { owner: 'root', group: 'root', mode: 0o755 } }
            }
        },
        'lib64': {
            name: 'lib64',
            type: 'directory',
            permissions: { owner: 'root', group: 'root', mode: 0o755 },
            children: {
                'ld-linux-x86-64.so.2': { name: 'ld-linux-x86-64.so.2', type: 'file', permissions: { owner: 'root', group: 'root', mode: 0o755 } }
            }
        },
        'media': {
            name: 'media',
            type: 'directory',
            permissions: { owner: 'root', group: 'root', mode: 0o755 },
            children: {}
        },
        'mnt': {
            name: 'mnt',
            type: 'directory',
            permissions: { owner: 'root', group: 'root', mode: 0o755 },
            children: {
                'usb': { name: 'usb', type: 'directory', permissions: { owner: 'root', group: 'root', mode: 0o755 }, children: {} }
            }
        },
        'opt': {
            name: 'opt',
            type: 'directory',
            permissions: { owner: 'root', group: 'root', mode: 0o755 },
            children: {}
        },
        'proc': {
            name: 'proc',
            type: 'directory',
            permissions: { owner: 'root', group: 'root', mode: 0o755 },
            children: {
                'cpuinfo': { name: 'cpuinfo', type: 'file', content: 'processor\t: 0\nvendor_id\t: GenuineIntel\ncpu family\t: 6\n', permissions: { owner: 'root', group: 'root', mode: 0o444 } },
                'meminfo': { name: 'meminfo', type: 'file', content: 'MemTotal: 16348472 kB\nMemFree: 12345678 kB\n', permissions: { owner: 'root', group: 'root', mode: 0o444 } }
            }
        },
        'root': {
            name: 'root',
            type: 'directory',
            permissions: { owner: 'root', group: 'root', mode: 0o700 },
            children: {
                '.bashrc': { name: '.bashrc', type: 'file', content: "export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin", permissions: { owner: 'root', group: 'root', mode: 0o644 } }
            }
        },
        'run': {
            name: 'run',
            type: 'directory',
            permissions: { owner: 'root', group: 'root', mode: 0o755 },
            children: {}
        },
        'sbin': {
            name: 'sbin',
            type: 'directory',
            permissions: { owner: 'root', group: 'root', mode: 0o755 },
            children: {
                'reboot': { name: 'reboot', type: 'file', permissions: { owner: 'root', group: 'root', mode: 0o755 } },
                'shutdown': { name: 'shutdown', type: 'file', permissions: { owner: 'root', group: 'root', mode: 0o755 } },
                'ifconfig': { name: 'ifconfig', type: 'file', permissions: { owner: 'root', group: 'root', mode: 0o755 } }
            }
        },
        'srv': {
            name: 'srv',
            type: 'directory',
            permissions: { owner: 'root', group: 'root', mode: 0o755 },
            children: {}
        },
        'sys': {
            name: 'sys',
            type: 'directory',
            permissions: { owner: 'root', group: 'root', mode: 0o755 },
            children: {}
        },
        'tmp': {
            name: 'tmp',
            type: 'directory',
            permissions: { owner: 'root', group: 'root', mode: 0o1777 },
            children: {
                'tempfile': { name: 'tempfile', type: 'file', content: 'Temporary file content', permissions: { owner: 'root', group: 'root', mode: 0o666 } }
            }
        }        
    }
};

export default data