const logSeverities = {
    INFO :      "INFO",
    WARNING :   "WARNING",
    DEBUG :     "DEBUG",
    ERROR :     "ERROR",
    FATAL :     "FATAL ERROR"
}

const logEvent = (message, severity = logSeverities.INFO) => {
    const fullLogMessage = `[${severity}] : ${message}`
};