import { ticketService } from "../../services/ticketService.js";
import { cartService } from "../../services/cartService.js";
export const ticketController ={
    purchaseCart: async (req, res) => {
        try {
          const cart = await ticketService.getCartByIdproduct(req.params.cid);
          if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
          }
          const { unavailableProducts, total } =
            await ticketService.checkProductsStock(cart);
    
          if (unavailableProducts.length > 0) {
            cart.products = cart.products.filter(
              (item) => !unavailableProducts.includes(item._id)
            );
            await cartService.updateCart(req.params.cid, cart);
            return res.status(400).json({
              message: "Some products are unavailable",
              unavailableProducts,
            });
          }
          const ticket = await ticketService.createTicket(req.user.email, total);
          await cartService.deleteAllProductsFromCart(req.params.cid);
    
          return res.status(200).json({ message: "Purchase completed", ticket });
        } catch (err) {
          console.log(err);
          res.status(500).json({ message: "Server error", error: err.message });
        }
      },
}
