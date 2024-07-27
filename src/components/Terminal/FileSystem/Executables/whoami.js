const whoami = function(kernel, args, env) {
    return kernel.userManager.currentUser
}

export default whoami