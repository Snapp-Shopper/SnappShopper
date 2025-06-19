export const loadCartFromLocalStorage = (setCartItems, setCartCount) => {
  const savedCart = JSON.parse(sessionStorage.getItem("guestCart")) || [];
  setCartItems(savedCart);
  setCartCount(savedCart.length);
  //setCartCount(savedCart.reduce((acc, item) => acc + item.quantity, 0));
};
