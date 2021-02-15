interface StorinkaClientOptions {
    clientId: string,
    coreVersion?: number,
    apiUrl?: string,
    accessToken?: string,
    reinvoke?: boolean,
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
        return new Promise((resolve, reject) => {
            global.fetch(`${this.apiUrl}/invoke/${name}`, {
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
                    response.json()
                        .then(body => {
                            if (body.error === "REINVOKE" && this.options.reinvoke) {
                                setTimeout(() => {
                                    this.invoke(name, params)
                                        .then(resolve)
                                        .catch(reject);
                                }, (body.data?.timeout ?? 5) * 1000)
                            } else {
                                reject(
                                    new ApiError({
                                        error: body.error,
                                        data: body.data,
                                    })
                                );
                            }
                        });
                } else {
                    response.json()
                        .then(body => {
                            resolve(body.result)
                        });
                }
            });
        });
    }
}

export default StorinkaClient;
