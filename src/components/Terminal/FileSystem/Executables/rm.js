const rm = function(kernel, args, env) {
    if (!args[0]) return 'rm: missing operand';
    const resolvedPath = kernel.resolvePath(args[0], env.PWD);
    return kernel.fileSystem.removeNode(resolvedPath, kernel.userManager) ? '' : `rm: cannot remove '${args[0]}': No such file or directory or permission denied`;
}


export default rm