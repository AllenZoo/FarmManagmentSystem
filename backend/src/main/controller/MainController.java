package controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {
    @RequestMapping
    public String helloWorld(){
        return "Hello world! :D";
    }

    @RequestMapping("/goodbye")
    public String goodbye() {
        return "good bye :(";
    }
}
