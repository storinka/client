# Storinka JavaScript Client

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
import StorinkaClient, { CoreError } from "@storinka/client";

const storinka = new StorinkaClient({
    clientId: "secretid",
});

storinka.invoke("opendata.getCafe", {
    id: "demo",
}).then(cafe => {
    console.log(cafe);
}).catch(error => {
    if (error instanceof CoreError) {
        console.log("request failed", error);
    } else {
        console.log("network error");
    }
});
```
