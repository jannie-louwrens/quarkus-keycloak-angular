package me.louwrens.shop.resources;

import me.louwrens.shop.repository.OrderEntity;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Optional;

@Path("api")
@ApplicationScoped
@Produces("application/json")
@Consumes("application/json")
@RolesAllowed("user")
public class OrderResource {

    @GET
    @Path("orders")
    public List<OrderEntity> searchForOrders(@QueryParam("customerId") Optional<String> customerId) {
        if (customerId.isPresent()) {
            return OrderEntity.findByCustomer(customerId.get());
        }
        return OrderEntity.listAll();
    }

    @GET
    @Path("orders/{id}")
    public OrderEntity getOrder(@PathParam("id") Long id) {
        OrderEntity entity = OrderEntity.findById(id);
        if (entity == null) {
            throw new WebApplicationException("Order with id of " + id + " does not exist.", 404);
        }
        return entity;
    }

    @POST
    @Path("orders")
    @Transactional
    public Response createOrder(@QueryParam("customerId") String customerId, @Valid OrderEntity order) {
        if (order.id != null) {
            throw new WebApplicationException("Id was invalidly set on request.", 422);
        }
        if (customerId == null) {
            throw new WebApplicationException("customerId is required.", 400);
        }

        order.customerId = customerId;
        order.persist();
        return Response.ok(order).status(201).build();
    }

    @PUT
    @Path("orders/{id}")
    @Transactional
    public OrderEntity updateOrder(@PathParam("id") Long id, OrderEntity order) {
        if (order.product == null) {
            throw new WebApplicationException("Order Product was not set on request.", 422);
        }

        OrderEntity entity = OrderEntity.findById(id);

        if (entity == null) {
            throw new WebApplicationException("Order with id of " + id + " does not exist.", 404);
        }

        entity.product = order.product;
        entity.orderDate = order.orderDate;
        entity.quantity = order.quantity;

        return entity;
    }

}
