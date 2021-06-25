const queryHelpers = {
    timeout: (ms) => new Promise((resolve) => setTimeout(resolve, ms))
};

export default queryHelpers;
