const tree = function(kernel, args, env) {
    const path = args[0] || env.PWD;
    const resolvedPath = kernel.resolvePath(path, env.PWD);

    function traverseDirectory(currentPath, prefix = '') {
        let output = '';
        const node = kernel.fileSystem.getNodeAtPath(currentPath);
        
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

export default tree