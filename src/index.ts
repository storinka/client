interface StorinkaClientOptions {
    clientId: string,
    coreVersion?: number,
    coreUrl?: string,
    accessToken?: string,
}

export class CoreError {
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

    private get coreUrl(): string {
        if (this.options.coreUrl) {
            return this.options.coreUrl;
        }

        return "https://core.storinka.menu";
    }

    public invoke(name: string, params: any): Promise<any> {
        let invokeUrl = this.coreUrl;

        if (this.options.coreVersion) {
            invokeUrl = `${invokeUrl}/${this.options.coreVersion}`;
        }

        return global.fetch(`${invokeUrl}/invoke/${name}`, {
            method: "POST",
            body: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",

                ...(this.options.accessToken ? {
                    "Authorization": `Bearer: ${this.options.accessToken}`
                } : {}),

                "X-Storinka-ClientId": this.options.clientId,
            },
        }).then(response => {
            if (!response.ok) {
                return response.json().then(body => {
                    throw new CoreError({
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
