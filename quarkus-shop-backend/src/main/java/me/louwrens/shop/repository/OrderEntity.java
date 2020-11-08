package me.louwrens.shop.repository;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "Order_Item")
public class OrderEntity extends PanacheEntityBase implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(
			name = "order_sequence",
			sequenceName = "order_id_seq",
			allocationSize = 1,
			initialValue = 7)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_sequence")
	public Long id;

	@Column(name = "customer_id")
	public String customerId;

	public String product;

	@Column(name = "product_catalog")
	public String productCatalog;

	@Column(name = "order_date")
	public LocalDate orderDate;

	public int quantity;

	@Column(name = "unit_price")
	public BigDecimal unitPrice;

	public OrderEntity() {
	}

	public static List<OrderEntity> findByCustomer(String customerId){
		return list("customerId", customerId);
	}

}
