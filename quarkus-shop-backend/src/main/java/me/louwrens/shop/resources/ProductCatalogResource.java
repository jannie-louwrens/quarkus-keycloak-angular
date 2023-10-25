package me.louwrens.shop.resources;

import me.louwrens.shop.repository.ProductCatalogEntity;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.util.List;

@Path("api")
@ApplicationScoped
@Produces("application/json")
@Consumes("application/json")
@RolesAllowed("user")
public class ProductCatalogResource {

    @GET
    @Path("productcatalogs")
    public List<ProductCatalogEntity> getCategories() {
        return ProductCatalogEntity.listAll();
    }

}
