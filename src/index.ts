interface StorinkaClientOptions {
    clientId: string,
    coreVersion?: number,
    apiUrl?: string,
    accessToken?: string,
}

export class ApiError {
    public error: string;
    public data?: any;

    constructor({error, data}: { error: string, data?: any }) {
        this.error = error;
        this.data = data;
    }
}

class StorinkaClient {
    constructor(
        private options: StorinkaClientOptions,
    ) {
    }

    private get apiUrl(): string {
        if (this.options.apiUrl) {
            return this.options.apiUrl;
        }

        return "https://api.storinka.menu";
    }

    public invoke(name: string, params: any): Promise<any> {
        return global.fetch(`${this.apiUrl}/invoke/${name}`, {
            method: "POST",
            body: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",

                ...(this.options.coreVersion ? {
                    "X-Storinka-Version": String(this.options.coreVersion)
                } : {}),

                "X-Storinka-Client-Id": this.options.clientId,
            },
        }).then(response => {
            if (!response.ok) {
                return response.json().then(body => {
                    throw new ApiError({
                        error: body.error,
                        data: body.data,
                    });
                });
            }

            return response.json();
        }).then(body => body.result);
    }
}

export default StorinkaClient;
