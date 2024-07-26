import productService from "../services/productService.js";
import cartService from "../services/cartService.js";

const welcome = async (req, res) => {
    try {
      res.render("welcome", { title: "Welcome | Valsaa", style: "home.css" });
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Error.');
    }
    
}

const register = async (req, res) => {
    try {
      res.render("register", {
        title: "Register | Valsaa",
        style: "login.css",
        failRegister: req.session.failRegister ?? false,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Error.');
    }
    
}

const products = async (req, res) => {
    try {
      const user = req.user;
      console.log('Este es el usuario: ', user);
      const { page = 1, limit = 10, category, query, sort } = req.query;
      
      let products = await productService.getProducts(page, limit, category, query, sort);
      console.log("Aca los productos: ", products);

      res.render("products", { 
        title: "Products | Valsaa", 
        style: "product.css", 
        user: user, 
        products: products,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.nextPage,
        prevLink: products.hasPrevPage ? `http://localhost:8080/api/products?limit=${products.limit}&page=${products.prevPage}${products.category ? `&category=${products.category}` : ""}${products.stock ? `&stock=${products.stock}` : ""}` : "",
        nextLink: products.hasNextPage ? `http://localhost:8080/api/products?limit=${products.limit}&page=${products.nextPage}${products.category ? `&category=${products.category}` : ""}${products.stock ? `&stock=${products.stock}` : ""}` : ""
       });
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Error.');
    }
    
}

const cart = async (req, res) =>{//FIJARME SI FUNCIONA
    try {
      const cid = req.params.cid;
      //const cart = await cartModel.findById(cid).populate("products.productId").lean();
      const cart = await cartService.getCartById(cid);
      console.log(cart);
      res.render("cart", { title: "Cart view", cart, style: "cart.css" });
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Error.');
    }
}

const realtimeproducts = async (req, res) => {
    try {
      let products = await productModel.find();
      products = products.map((p) => p.toJSON());
      res.render("home", { title: "RealTime-Products ", style: "RTP.css", products });
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Error.');
    }
    
}

const login = async (req, res) => {
    try {
      if(req.cookies.accessToken){
        res.redirect("/products");
      }else{
        res.render("login", {
          title: "Valsaa | Login",
          style: "login.css",
          failLogin: req.session.failLogin ?? false,
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Error.');
    }
    
}

const user = async(req, res) => {
  try {
    res.render('user', {
      title: "Valsaa | User",
      style: "product.css",
      user: req.user.user
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Error.');
  }
  
}

export default {
    welcome,
    register,
    products,
    cart,
    realtimeproducts,
    login,
    user
};