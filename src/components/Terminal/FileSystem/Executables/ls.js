// Constants
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MODE_CHARS = ['---', '--x', '-w-', '-wx', 'r--', 'r-x', 'rw-', 'rwx'];
const SIZE_UNITS = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];

// Helper functions
const getModeString = (type, mode) => {
    const typeChar = { directory: 'd', file: '-', link: 'l' }[type] || '?';
    const [ownerMode, groupMode, otherMode] = [6, 3, 0].map(shift => MODE_CHARS[(mode >> shift) & 7]);
    return `${typeChar}${ownerMode}${groupMode}${otherMode}`;
};

const formatSize = (size, human = false) => {
    if (!human) return size.toString().padStart(5);
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < SIZE_UNITS.length - 1) {
        size /= 1024;
        unitIndex++;
    }
    return `${size.toFixed(1)}${SIZE_UNITS[unitIndex]}`.padStart(5);
};

const formatDate = (date) => {
    const month = MONTHS[date.getMonth()];
    const day = date.getDate().toString().padStart(2);
    const time = `${date.getHours().toString().padStart(2)}:${date.getMinutes().toString().padStart(2)}`;
    return `${month} ${day} ${time}`;
};

// Main ls function
const ls = (kernel, args, env) => {
    const options = parseOptions(args);
    const paths = args.filter(arg => !arg.startsWith('-'));
    
    // If no paths are provided, use the current working directory
    if (paths.length === 0) {
        paths.push(env.PWD);
    }
    
    return paths.map(path => listDirectory(kernel, path, options, env)).join('\n\n');
};

// Parse command options
const parseOptions = (args) => {
    const options = { all: false, long: false, human: false, recursive: false };
    args.filter(arg => arg.startsWith('-')).forEach(arg => {
        arg.slice(1).split('').forEach(char => {
            const optionMap = { a: 'all', l: 'long', h: 'human', R: 'recursive' };
            if (optionMap[char]) {
                options[optionMap[char]] = true;
            }
        });
    });
    return options;
};

// List directory contents
const listDirectory = (kernel, path, options, env) => {
    const resolvedPath = kernel.resolvePath(path, env.PWD);
    const entries = kernel.fileSystem.readDirectory(resolvedPath, kernel.userManager);
    
    if (entries === null) {
        return `ls: cannot access '${path}': No such file or directory`;
    }
    
    let output = options.recursive ? `${resolvedPath.join('/')}:\n` : '';
    const filteredEntries = entries.filter(([name]) => options.all || !name.startsWith('.'));
    
    output += options.long 
        ? formatLongListing(filteredEntries, options)
        : formatShortListing(filteredEntries);
    
    if (options.recursive) {
        const recursiveOutput = getRecursiveOutput(kernel, resolvedPath, filteredEntries, options, env);
        if (recursiveOutput) {
            output += '\n\n' + recursiveOutput;
        }
    }
    
    return output;
};


// Format long listing output
const formatLongListing = (entries, options) => {
    return entries.map(([name, node]) => {
        const { owner, group, mode } = node.permissions;
        const modeString = getModeString(node.type, mode);
        const size = formatSize(node.type === 'file' ? (node.content?.length || 0) : 4096, options.human);
        const date = formatDate(new Date()); // In a real system, we'd use the file's modification date
        return `${modeString} 1 ${owner.padEnd(8)} ${group.padEnd(8)} ${size} ${date} ${name}`;
    }).join('\n');
};

// Format short listing output
const formatShortListing = (entries) => {
    return entries.map(([name]) => name).join(' ');
};

// Get recursive output
const getRecursiveOutput = (kernel, resolvedPath, entries, options, env) => {
    return entries
        .filter(([name, node]) => node.type === 'directory' && name !== '.' && name !== '..')
        .map(([name]) => listDirectory(kernel, [...resolvedPath, name], options, env))
        .join('\n\n');
};

export default ls;