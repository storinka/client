import StorinkaClient from "./StorinkaClient";
import CoreError from "./CoreError";

const storinka = new StorinkaClient({
    clientId: 123,
    clientSecret: "supersecret",
});

storinka.invoke("opendata.getCafe", {
    id: "demo",
}).then(cafe => {
    console.log(cafe);
})

export {
    CoreError
};

export default StorinkaClient;
