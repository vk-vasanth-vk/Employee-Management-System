package com.example.documentmanager;

@Controller
public class AppController {

    @GetMapping("/")
    public String viewHomePage() {
        return "home";
    }
}
