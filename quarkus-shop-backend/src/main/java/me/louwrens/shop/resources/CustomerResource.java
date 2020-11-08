package me.louwrens.shop.resources;

import me.louwrens.shop.model.CustomerInfo;
import me.louwrens.shop.repository.ProductCatalogEntity;
import me.louwrens.shop.service.CustomerServiceImpl;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import java.util.List;

@Path("api")
@Produces("application/json")
@Consumes("application/json")
@RolesAllowed("admin")
public class CustomerResource {

    @Inject
    CustomerServiceImpl customerService;

    @GET
    @Path("customers/{username}")
    public CustomerInfo getCustomer(@PathParam("username") String username) {
        return customerService.getCustomerByPrinicpal(username);
    }

    @GET
    @Path("customers")
    public List<CustomerInfo> getCustomers() {
        return customerService.getCustomers();
    }

}
