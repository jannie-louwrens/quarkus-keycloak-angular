package me.louwrens.shop.service;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import org.keycloak.representations.idm.UserRepresentation;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.*;

@RegisterRestClient(configKey="keycloak-admin-uri")
@RolesAllowed("admin")
public interface KeycloakAdminService {

    @GET
    @Path("/users")
    @Produces("application/json")
    UserRepresentation[] getUsers(@HeaderParam("authorization") String authorization);

    @GET
    @Path("/users")
    @Produces("application/json")
    UserRepresentation[] getUserByPrincipal(@HeaderParam("authorization") String authorization, @QueryParam("username") String username);

}
