package me.louwrens.shop.service;

import me.louwrens.shop.model.CustomerInfo;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.representations.idm.UserRepresentation;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class CustomerServiceImpl {

    @RestClient
    KeycloakAdminService keycloakAdminService;

    @Inject
    JsonWebToken token;

    public List<CustomerInfo> getCustomers() {
        UserRepresentation[] users = keycloakAdminService.getUsers("bearer " + token.getRawToken());
        return Arrays.stream(users)
                .map(user -> new CustomerInfo(user.getFirstName(), user.getLastName(), user.getUsername(), user.getEmail()))
                .collect(Collectors.toList());
    }

    public CustomerInfo getCustomerByPrinicpal(String username) {
        UserRepresentation[] users = keycloakAdminService.getUserByPrincipal("bearer " + token.getRawToken(), username);
        return new CustomerInfo(users[0].getFirstName(), users[0].getLastName(), users[0].getUsername(), users[0].getEmail());
    }

}
