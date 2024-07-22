let data = {
    name: '/',
    type: 'directory',
    children: {
        'bin': {
            name: 'bin',
            type: 'directory',
            children: {
                'bash': { name: 'bash', type: 'file' },
                'ls': { name: 'ls', type: 'file' },
                'grep': { name: 'grep', type: 'file' },
                'cp': { name: 'cp', type: 'file' },
                'mv': { name: 'mv', type: 'file' },
                'rm': { name: 'rm', type: 'file' },
                'cat': { name: 'cat', type: 'file' },
                'echo': { name: 'echo', type: 'file' },
                'mkdir': { name: 'mkdir', type: 'file' },
                'rmdir': { name: 'rmdir', type: 'file' },
                'touch': { name: 'touch', type: 'file' }
            }
        },
        'boot': {
            name: 'boot',
            type: 'directory',
            children: {
                'vmlinuz': { name: 'vmlinuz', type: 'file' },
                'initrd.img': { name: 'initrd.img', type: 'file' },
                'grub': {
                    name: 'grub',
                    type: 'directory',
                    children: {
                        'grub.cfg': { name: 'grub.cfg', type: 'file' }
                    }
                }
            }
        },
        'dev': {
            name: 'dev',
            type: 'directory',
            children: {
                'sda1': { name: 'sda1', type: 'file' },
                'tty0': { name: 'tty0', type: 'file' },
                'null': { name: 'null', type: 'file' },
                'zero': { name: 'zero', type: 'file' },
                'random': { name: 'random', type: 'file' },
                'urandom': { name: 'urandom', type: 'file' }
            }
        },
        'etc': {
            name: 'etc',
            type: 'directory',
            children: {
                'passwd': { name: 'passwd', type: 'file', content: 'root:x:0:0:root:/root:/bin/bash\n' },
                'shadow': { name: 'shadow', type: 'file', content: 'root:$6$rounds=656000$somelonghash:...' },
                'hosts': { name: 'hosts', type: 'file', content: '127.0.0.1 localhost\n' },
                'hostname': { name: 'hostname', type: 'file', content: 'localhost' },
                'network': {
                    name: 'network',
                    type: 'directory',
                    children: {
                        'interfaces': { name: 'interfaces', type: 'file', content: 'auto lo\niface lo inet loopback\n' }
                    }
                },
                'ssh': {
                    name: 'ssh',
                    type: 'directory',
                    children: {
                        'sshd_config': { name: 'sshd_config', type: 'file' }
                    }
                }
            }
        },
        'home': {
            name: 'home',
            type: 'directory',
            children: {
                'ghiles': {
                    name: 'ghiles',
                    type: 'directory',
                    children: {
                        'Documents': {
                            name: 'Documents',
                            type: 'directory',
                            children: {
                                'resume.pdf': { name: 'resume.pdf', type: 'file' },
                                'notes.txt': { name: 'notes.txt', type: 'file', content: 'Some notes...' }
                            }
                        },
                        'Projects': {
                            name: 'Projects',
                            type: 'directory',
                            children: {
                                'website': { name: 'website', type: 'directory', children: {} },
                                'app': { name: 'app', type: 'directory', children: {} },
                                'game': { name: 'game', type: 'directory', children: {} }
                            }
                        },
                        'Images': {
                            name: 'Images',
                            type: 'directory',
                            children: {
                                'profile.jpg': { name: 'profile.jpg', type: 'file' },
                                'banner.png': { name: 'banner.png', type: 'file' }
                            }
                        },
                        '.bashrc': { name: '.bashrc', type: 'file', content: "export PATH=/usr/local/bin:$PATH" },
                        '.profile': { name: '.profile', type: 'file', content: 'if [ -n "$BASH_VERSION" ]; then\n  [ -f ~/.bashrc ] && . ~/.bashrc\nfi\n' },
                        '.ssh': {
                            name: '.ssh',
                            type: 'directory',
                            children: {
                                'id_rsa': { name: 'id_rsa', type: 'file' },
                                'id_rsa.pub': { name: 'id_rsa.pub', type: 'file' },
                                'known_hosts': { name: 'known_hosts', type: 'file' }
                            }
                        }
                    }
                }
            }
        },
        'lib': {
            name: 'lib',
            type: 'directory',
            children: {
                'libc.so.6': { name: 'libc.so.6', type: 'file' },
                'ld-linux.so.2': { name: 'ld-linux.so.2', type: 'file' }
            }
        },
        'lib64': {
            name: 'lib64',
            type: 'directory',
            children: {
                'ld-linux-x86-64.so.2': { name: 'ld-linux-x86-64.so.2', type: 'file' }
            }
        },
        'media': {
            name: 'media',
            type: 'directory',
            children: {}
        },
        'mnt': {
            name: 'mnt',
            type: 'directory',
            children: {
                'usb': { name: 'usb', type: 'directory', children: {} }
            }
        },
        'opt': {
            name: 'opt',
            type: 'directory',
            children: {}
        },
        'proc': {
            name: 'proc',
            type: 'directory',
            children: {
                'cpuinfo': { name: 'cpuinfo', type: 'file', content: 'processor\t: 0\nvendor_id\t: GenuineIntel\ncpu family\t: 6\n' },
                'meminfo': { name: 'meminfo', type: 'file', content: 'MemTotal:       16348472 kB\nMemFree:        12345678 kB\n' }
            }
        },
        'root': {
            name: 'root',
            type: 'directory',
            children: {
                '.bashrc': { name: '.bashrc', type: 'file', content: "export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin" }
            }
        },
        'run': {
            name: 'run',
            type: 'directory',
            children: {}
        },
        'sbin': {
            name: 'sbin',
            type: 'directory',
            children: {
                'reboot': { name: 'reboot', type: 'file' },
                'shutdown': { name: 'shutdown', type: 'file' },
                'ifconfig': { name: 'ifconfig', type: 'file' }
            }
        },
        'srv': {
            name: 'srv',
            type: 'directory',
            children: {}
        },
        'sys': {
            name: 'sys',
            type: 'directory',
            children: {}
        },
        'tmp': {
            name: 'tmp',
            type: 'directory',
            children: {
                'tempfile': { name: 'tempfile', type: 'file', content: 'Temporary file content' }
            }
        },
    }
}

export default data