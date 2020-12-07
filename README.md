# face-common
```javascript
import StorinkaClient, { CoreError } from "@storinka/client";

const storinka = new StorinkaClient({
    clientId: 123,
    clientSecret: "supersecret",
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
