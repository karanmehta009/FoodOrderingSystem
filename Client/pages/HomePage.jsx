import { useEffect, useState } from "react";
import { getFoods } from "../services/foodService";
import { addToCart } from "../services/cartService";

function HomePage() {
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    fetchFoods();
  }, []);
  const fetchFoods = async () => {
    try {
      const res = await getFoods();

      setFoods(res.data.foods);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddTOCart = async (foodId) => {
    try {
      const res = await addToCart(
            {
                foodId: foodId,
                quantity: 1,
            });
      alert("Added to Cart");
    } catch (error) {
      console.log("error");
      alert("Error adding to cart");
    }
  };
  return (
    <div>
      <button onClick={() => (window.location.href = "/cart")}>
        GO TO CART
      </button>
      <h2>Food List</h2>
      {foods.map((food) => {
        return (
          <div key={food._id}>
            <h3>{food.name}</h3>
            <p>₹{food.price}</p>
            <p>{food.category?.name}</p>

            <button onClick={() => handleAddTOCart(food._id)}>
              Add To Cart
            </button>
            
          </div>
        );
      })}
    </div>
  );
}
export default HomePage;