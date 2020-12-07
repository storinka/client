import CoreError from "./CoreError";

interface StorinkaClientOptions {
    clientSecret: string,
    clientId: number,
    coreVersion?: number,
    coreUrl?: string,
    accessToken?: string,
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
                } : {})
            },
        }).then(response => {
            if (!response.ok) {
                return response.json().then(body => {
                    throw new CoreError({
                        code: response.status,
                        type: body.error,
                        message: body.message,
                    });
                });
            }

            return response.json();
        }).then(body => body.result);
    }
}

export default StorinkaClient;
