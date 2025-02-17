# URL Shortener

This project is a simple URL shortener service, similar to bit.ly, where you provide a long URL and receive a shortened URL in return. The backend is built using Node.js and MongoDB for storing the URLs and their visit histories and createdBy attribute. Also added static pages using EJS Server side rendering for homepage,signup and login. For authentication, statefull authenticaation using cookies and session id were also used.

## Features

- Shorten a given long URL.
- Redirect to the original URL using the shortened URL.
- Track visit history with timestamps.

## Endpoints

### Create Short URL

- **POST /url**
- Creates a shortened URL for the provided long URL.

### Redirect to Original URL

- **GET /:shortId**
- Redirects to the original URL using the provided short ID and logs the visit.

### Returns the analytics

- **GET /analytics/:shortId**
- Returns the analytics and totalclicks of URL using the provided short ID .

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- npm

### Installing

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/url-shortener.git
   ```
````

2. Navigate to the project directory
   ```bash
   cd url-shortener
   ```
3. Install dependencies
   ```bash
   npm install
   ```

### Running the Server

1. Start MongoDB on your local machine or connect to a MongoDB instance.
2. Run the server
   ```bash
   npm start
   ```
3. The server will start on `http://localhost:8001`.

### Example Code

```javascript
const express = require("express");
const urlRoute = require("./routes/url");
const { connectMongoDB } = require("./connect");
const URL = require("./models/url.models");
const app = express();

const PORT = 8001;

// MongoDB connect
connectMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("MongoDB connected")
);

app.use(express.json());

// Routes
app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log("Server Started at PORT:", PORT));
```

## Authors

- Faraz

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

Special thanks to Piyush Garg for his YouTube tutorial series on Node.js which was instrumental in learning the concepts applied in this project. Check out his channel: [Piyush Garg YouTube Channel](https://www.youtube.com/watch?v=4WvX9dBjiJo&list=PLinedj3B30sDby4Al-i13hQJGQoRQDfPo&index=21)

```

```
