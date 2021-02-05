# Storinka JavaScript Client

Documentation: [api.storinka.menu/docs](https://api.storinka.menu/docs)

## Installation

NPM:

```shell script
npm install @storinka/client
```

Yarn:

```
yarn add @storinka/client
```

## Example

```javascript
import StorinkaClient, { ApiError } from "@storinka/client";

const storinka = new StorinkaClient({
    clientId: "your-client-id-here",
});

storinka.invoke("getFullCafe", {
    id: "kava-gallery",
}).then(cafe => {
    console.log(cafe);
}).catch(error => {
    if (error instanceof ApiError) {
        console.log("request failed", error);
    } else {
        console.log("network error");
    }
});
```
