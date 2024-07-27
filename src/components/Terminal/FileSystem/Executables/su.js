const su = function(kernel, args, env) {
    const targetUser = args[0] || 'root';  // Default to root if no user specified
    if (kernel.userManager.users[targetUser]) {
        kernel.userManager.setCurrentUser(targetUser);
    } else {
        return `User ${targetUser} does not exist`;
    }
}

export default su;