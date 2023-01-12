const url = "https://dummyjson.com/products?limit=100"

const fetchProductList = () => fetch(url).then(res=>res.json());

export default fetchProductList;