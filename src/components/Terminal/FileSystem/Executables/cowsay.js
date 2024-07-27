const cowsay = function(kernel, args, env) {
    const message = args.join(' ')
    return  " "+
            "_".repeat(message.length+2)+"\n"+
            `< ${message} >\n `+
            "¯".repeat(message.length+2)+"\n"+
            "   \\   ^__^\n"+
            "   \\  (oo)\\_______\n"+
            "      (__)\\       )\\/\\\n"+
            "          ||----w |\n"+
            "          ||     ||\n"
}

export default cowsay