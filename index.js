import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
const API_URL = "https://cataas.com/cat";
const dimension = "?width=500&height=500";

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

// app.get("/", (req, res) => {
//     try {
//         const result = await axios.get(API_URL, {
//             params: {width: 500, height:500}
//         })
//         res.render("index.ejs", {url: result});
//         console.log(result.urlencoded)
//     } catch (error) {
//         res.status(500);
//         console.log(error)
//     }
// });
app.get("/", (req, res) => {
    const urlFinal = API_URL + dimension;
    res.render("index.ejs", { url: urlFinal });
    console.log(API_URL + dimension)

});

app.post("/generate", async (req, res) => {
    try {
        let urlFinal;
        urlFinal = API_URL + "/" + req.body.tag + "/says/" + req.body.saying + dimension;
        const result = await axios.get(urlFinal);
        if (req.body.tag && req.body.saying) {
            urlFinal = API_URL + "/" + req.body.tag + "/says/" + req.body.saying + dimension;
        } else if (req.body.tag && !req.body.saying) {
            urlFinal = API_URL + "/" + req.body.tag + dimension;
        } else if (!req.body.tag && req.body.saying) {
            urlFinal = API_URL + "/says/" + req.body.saying + dimension;
        } else {
            urlFinal = API_URL + dimension;
        }
        res.render("index.ejs", { url: urlFinal });
        console.log(urlFinal);
    } catch (error) {
        res.render("index.ejs", { errorMessage: error });
        console.log(error);
    }

});

// app.post("/generate", (req, res) => {
//     let urlFinal;
//     if (req.body.tag && req.body.saying) {
//         urlFinal = API_URL + "/" + req.body.tag + "/says/" + req.body.saying + dimension;
//     } else if (req.body.tag && !req.body.saying) {
//         urlFinal = API_URL + "/" + req.body.tag + dimension;
//     } else if (!req.body.tag && req.body.saying) {
//         urlFinal = API_URL + "/says/" + req.body.saying + dimension;
//     } else {
//         urlFinal = API_URL + dimension;
//     }
//     res.render("index.ejs", { url: urlFinal });
//     console.log(urlFinal);
// });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
