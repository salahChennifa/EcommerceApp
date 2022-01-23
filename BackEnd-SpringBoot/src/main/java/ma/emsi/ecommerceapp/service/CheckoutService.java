package ma.emsi.ecommerceapp.service;

import ma.emsi.ecommerceapp.dto.Purchase;
import ma.emsi.ecommerceapp.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
