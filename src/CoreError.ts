class CoreError {
    public error: string;
    public data?: any;

    constructor({error, data}: { error: string, data?: any }) {
        this.error = error;
        this.data = data;
    }
}

export default CoreError;
