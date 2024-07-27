const mkdir = function(kernel, args, env) {
    if (!args[0]) return 'mkdir: missing operand';
    const resolvedPath = kernel.resolvePath(args[0], env.PWD);
    return kernel.fileSystem.createDirectory(resolvedPath, kernel.userManager) ? '' : `mkdir: cannot create directory '${args[0]}': File exists or permission denied`;
}

export default mkdir