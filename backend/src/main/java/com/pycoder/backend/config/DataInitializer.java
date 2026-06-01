package com.pycoder.backend.config;

import com.pycoder.backend.model.User;
import com.pycoder.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Seed a default user on startup if the database is empty (e.g. H2 in-memory db restarts)
        if (userRepository.count() == 0) {
            User defaultUser = new User();
            defaultUser.setUsername("user");
            defaultUser.setEmail("user@codeverse.com");
            defaultUser.setPassword(passwordEncoder.encode("password123"));
            userRepository.save(defaultUser);
            
            System.out.println("=================================================");
            System.out.println("   [CodeVerse] Default User Seeded Successfully!  ");
            System.out.println("   Username: user                                ");
            System.out.println("   Password: password123                         ");
            System.out.println("=================================================");
        }
    }
}
