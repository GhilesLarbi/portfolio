const cat = function(kernel, args, env) {
    if (!args[0]) return 'cat: missing operand';
    const resolvedPath = kernel.resolvePath(args[0], env.PWD);
    const content = kernel.fileSystem.readFile(resolvedPath, kernel.userManager);
    return content !== null ? content : `cat: ${args[0]}: No such file or permission denied`;
}

export default cat