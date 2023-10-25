package me.louwrens.shop.resources;

import me.louwrens.shop.repository.ProductEntity;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Path("api")
@ApplicationScoped
@Produces("application/json")
@Consumes("application/json")
public class ProductResource {

    @GET
    @Path("products")
    @RolesAllowed("user")
    public List<ProductEntity> searchForProducts(@QueryParam("productCatalogId") Optional<Long> productCatalogId,
                                                 @QueryParam("date") Optional<LocalDate> date) {
        if (productCatalogId.isPresent() && date.isPresent()) {
            return ProductEntity.findByProductCatalogAndDate(productCatalogId.get(), date.get());
        }

        if (productCatalogId.isPresent()) {
            return ProductEntity.findByProductCatalog(productCatalogId.get());
        }

        if (date.isPresent()) {
            return ProductEntity.findByDate(date.get());
        }

        return ProductEntity.listAll();
    }

    @GET
    @Path("products/{id}")
    @RolesAllowed("user")
    public ProductEntity getProduct(@PathParam("id") Long id) {
        ProductEntity entity = ProductEntity.findById(id);
        if (entity == null) {
            throw new WebApplicationException("Product with id of " + id + " does not exist.", 404);
        }

        return entity;
    }

    @POST
    @Path("products")
    @RolesAllowed("admin")
    @Transactional
    public Response createProduct(@QueryParam("productCatalogId") Long productCatalogId,
                                  @Valid ProductEntity product) {
        if (product.id != null) {
            throw new WebApplicationException("Id was invalidly set on request.", 422);
        }

        product.persist();

        return Response.ok(product).status(201).build();
    }

    @PUT
    @Path("products/{id}")
    @RolesAllowed("admin")
    @Transactional
    public ProductEntity updateProduct(@PathParam("id") Long id, @Valid ProductEntity product) {
        if (product.name == null) {
            throw new WebApplicationException("Product Name was not set on request.", 422);
        }

        ProductEntity entity = product.findById(id);
        if (entity == null) {
            throw new WebApplicationException("Product with id of " + id + " does not exist.", 404);
        }

        entity.name = product.name;
        entity.description = product.description;
        entity.effectiveDate = product.effectiveDate;
        entity.expirationDate = product.expirationDate;
        entity.unitPrice = product.unitPrice;

        return entity;
    }

}
