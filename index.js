const express = require("express");
const database = require("./config/database");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const router = express.Router();

const app = express();

dotenv.config();
const PORT = process.env.PORT || 4000;

// database connect
database.connect();

// middlewares
app.use(express.json());
app.use(cookieParser());

// route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running...",
  });
});

const { signup, login, logout } = require("./controllers/Auth");

const { table } = require("./controllers/Table");

const { createItem, getAllItems } = require("./controllers/Item");

const { addToCart, showCart, removeItem } = require("./controllers/Cart");

const { auth, isLoggedIn } = require("./middlewares/auth");

router.post("/signup", signup);
router.post("/login", login);
router.post("/book-table", table);
router.get("/isloggedin", isLoggedIn);
router.get("/logout", auth, logout);
router.post("/create-item", createItem);
router.get("/get-all-items", getAllItems);
router.post("/add-to-cart", addToCart);
router.post("/show-cart", showCart);
router.post("/remove-from-cart", removeItem); 

app.use("/api", router);

// activate server
app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});
