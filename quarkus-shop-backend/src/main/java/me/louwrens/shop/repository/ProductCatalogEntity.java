package me.louwrens.shop.repository;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "product_catalog")
public class ProductCatalogEntity extends PanacheEntityBase implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(
			name = "prod_cat_seq",
			sequenceName = "prod_cat_id_seq",
			allocationSize = 1,
			initialValue = 6)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "prod_cat_seq")
	public Long id;

	@Column(unique = true)
	public String name;

	@Column(length = 4000, nullable = true)
	public String description;

	public ProductCatalogEntity() {
	}

}
