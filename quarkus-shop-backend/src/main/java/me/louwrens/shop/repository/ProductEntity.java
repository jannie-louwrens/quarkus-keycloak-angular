package me.louwrens.shop.repository;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "product")
public class ProductEntity extends PanacheEntityBase implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(
			name = "product_sequence",
			sequenceName = "product_id_seq",
			allocationSize = 1,
			initialValue = 9)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_sequence")
	public Long id;

	public String name;

	@Column(length = 4000, nullable = true)
	public String description;

	@Column(name = "effective_date")
	public LocalDate effectiveDate;

	@Column(name = "expiration_date", nullable = true)
	public LocalDate expirationDate;

	@Column(name = "unit_price")
	public BigDecimal unitPrice;

	@Column(name = "product_catalog_id")
	public Long productCatalogId;

	public ProductEntity() {
	}

	public static List<ProductEntity> findByProductCatalogAndDate(Long productCatalogId, LocalDate date){
		return list("productCatalogId = ?1 and effectiveDate <= ?2 and (expirationDate is null or expirationDate > ?3)", productCatalogId, date, date);
	}

	public static List<ProductEntity> findByProductCatalog(Long productCatalogId){
		return list("productCatalogId = ?1 and expirationDate is null", productCatalogId);
	}

	public static List<ProductEntity> findByDate(LocalDate date){
		return list("effectiveDate <= ?1 and (expirationDate is null or expirationDate > ?2)", date, date);
	}

}
