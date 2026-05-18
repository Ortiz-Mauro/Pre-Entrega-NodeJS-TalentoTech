const args = process.argv.slice(2);
const [metodo, endpoint, titulo, precio, categoria] = args;

// funcion para consultar todos los productos
async function consultarProductos(){
    try{
        const response = await fetch('https://fakestoreapi.com/products');
        if (response.ok === false) throw new Error("No se pudo consultar los productos");

        const data = await response.json();
        console.log("===PRODUCTOS===");
        console.log(data);
    }
    catch(error){
        console.log("Error:", error);
    }
}

// funcion para consultar todos los productos respecto a su id
async function consultarProductoEspecifico(id){
    try{
        const URI = `https://fakestoreapi.com/products/${id}`;
        const response = await fetch(URI);
        if (response.ok === false) throw new Error("No se pudo consultar el producto");
        
        const data = await response.json();
        console.log(`===Producto numero ${id}===`);
        console.log(data);
    }
    catch(error){
        console.log("Error:", error);
    }
}

// funcion para crear un producto nuevo
async function crearProducto(){
    try{
        const nuevoProducto ={
            title: titulo,
            price : precio,
            category: categoria
        };

        const config ={
            method: "POST",
            headers:{
                'Content-Type': "application/json"
            },
            // esto es para transformar mi objeto nuevoProducto a formato JSON
            body: JSON.stringify(nuevoProducto)
        };

        const response = await fetch('https://fakestoreapi.com/products', config);

        if (response.ok === false) throw new Error("No se pudo crear el producto.");

        const data = await response.json();
        console.log("Producto creado: ", data);
    }
    catch(error){
        console.log("Error", error);
    }
}

// funcion para eliminar un producto
async function eliminarProducto(id){
    try{
        const config = {
            method: 'DELETE'
        }
        const URIaEliminar = `https://fakestoreapi.com/products/${id}`
        const response = await fetch(URIaEliminar, config);
        
        if (response.ok === false) throw new Error("No se pudo eliminar el producto.")
        
        const data = await response.json();
        console.log("Producto eliminado: ", data);
    }
    catch(error){
        console.log("Error:", error);
    }
}

// segun lo que metamos por consola ejecuta una funcion
async function metodos(){

    // con el split separo el contenido de 'endpoint', en 2 partes separadas por una '/'
    // con el ? veo si el valor endpoint es null o undefined no me rompa el programa y le asigne []
    const [recurso, id] = endpoint?.split("/") || [];

    try{
        if(metodo=="GET" && endpoint == "products")
        {
            await consultarProductos() 
        }
        else if(metodo=="GET" && recurso == "products")
        {
            await consultarProductoEspecifico(id);
        }
        else if(metodo=="POST" && endpoint == "products")
        {
            await crearProducto();
        }
        else if(metodo=="DELETE" && recurso == "products")
        {
            await eliminarProducto(id);
        }
        else
        {
            throw new Error("Metodo o recurso NO reconocido.");
        }
    }
    catch(error){
        console.log(error);
    }
}

metodos();