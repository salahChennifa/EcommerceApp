package ma.emsi.ecommerceapp.dto;

import lombok.Data;
import ma.emsi.ecommerceapp.entity.Address;
import ma.emsi.ecommerceapp.entity.Customer;
import ma.emsi.ecommerceapp.entity.Order;
import ma.emsi.ecommerceapp.entity.OrderItem;

import java.util.Set;

@Data
public class Purchase {
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
