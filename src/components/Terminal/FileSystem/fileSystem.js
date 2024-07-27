import ls from "./Executables/ls";
import mkdir from "./Executables/mkdir";
import rm from './Executables/rm'
import cat from "./Executables/cat"; 
import tree from "./Executables/tree";
import cowsay from "./Executables/cowsay";
import date from "./Executables/date";
import whoami from "./Executables/whoami";
import su from "./Executables/su";

let fileSystem = {
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
                    content: ls
                },

                'mkdir': {
                    name: 'mkdir',
                    type: 'file',
                    permissions: { owner: 'root', group: 'root', mode: 0o755 },
                    content: mkdir
                },
                
                'rm': {
                    name: 'rm',
                    type: 'file',
                    permissions: { owner: 'root', group: 'root', mode: 0o755 },
                    content: rm
                },
                'cat': {
                    name: 'cat',
                    type: 'file',
                    permissions: { owner: 'root', group: 'root', mode: 0o755 },
                    content: cat
                },
                'su': {
                    name: 'su',
                    type: 'file',
                    permissions: { owner: 'root', group: 'root', mode: 0o755 },
                    content: su
                },
                'date': {
                    name: 'date',
                    type: 'file',
                    permissions: { owner: 'root', group: 'root', mode: 0o755 },
                    content: date
                },
                'whoami': {
                    name: 'whoami',
                    type: 'file',
                    permissions: { owner: 'root', group: 'root', mode: 0o755 },
                    content: whoami
                },

                'tree': {
                    name: 'tree',
                    type: 'file',
                    permissions: { owner: 'root', group: 'root', mode: 0o755 },
                    content: tree
                },
                'cowsay': {
                    name: 'cowsay',
                    type: 'file',
                    permissions: { owner: 'root', group: 'root', mode: 0o755 },
                    content: cowsay
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
        'etc': {
            name: 'etc',
            type: 'directory',
            permissions: { owner: 'root', group: 'root', mode: 0o755 },
            children: {
                'passwd': {
                    name: 'passwd',
                    type: 'file',
                    permissions: { owner: 'root', group: 'root', mode: 0o644 },
                    content: 'root:x:0:0:root:/root:/bin/bash\nghiles:x:1000:1000:Ghiles:/home/ghiles:/bin/bash\nguest:x:1001:1001:Guest:/home/guest:/bin/bash'
                },
                'group': {
                    name: 'group',
                    type: 'file',
                    permissions: { owner: 'root', group: 'root', mode: 0o644 },
                    content: 'root:x:0:\nusers:x:100:\nguests:x:101:'
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
                    permissions: { owner: 'ghiles', group: 'users', mode: 0o755 },
                    children: {}
                },
                'guest': {
                    name: 'guest',
                    type: 'directory',
                    permissions: { owner: 'guest', group: 'guests', mode: 0o755 },
                    children: {}
                }
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
    }
};

export default fileSystem