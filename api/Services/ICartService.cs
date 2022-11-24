﻿using data.Dtos;

namespace api.Services
{
    public interface ICartService
    {
        CartRes Get();
        CartRes AddToCart(CartItemReqAddToCart dto);
        //CartRes UpdateItem(int cartItemId, CartItemReqEdit dto);
        CartRes DeleteItem(int productId);
    }
}
