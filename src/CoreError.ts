class CoreError {
    public code: number;
    public type: string;
    public message: string;

    constructor({code, type, message}: { code: number, type: string, message: string }) {
        this.code = code;
        this.type = type;
        this.message = message;
    }
}

export default CoreError;
