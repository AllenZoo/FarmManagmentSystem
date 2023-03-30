package com.server;

import com.server.controller.MainController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


// Server for requesting API calls
@SpringBootApplication
public class FarmingManagementSystemApplication {
    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(FarmingManagementSystemApplication.class);
        app.addInitializers((applicationContext) ->
                            applicationContext
                                .getBeanFactory()
                                .registerSingleton("mainController", new MainController()));
        app.run(args);
    }
}
