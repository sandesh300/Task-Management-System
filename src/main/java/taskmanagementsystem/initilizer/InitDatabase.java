package taskmanagementsystem.initilizer;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import taskmanagementsystem.model.User;
import taskmanagementsystem.repository.UserRepository;

import java.util.Arrays;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Component
public class InitDatabase implements CommandLineRunner {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    @Override
    public void run(String... args) {
        List<User> USERS = Arrays.asList(
                new User(1L, "admin", "admin@gmail.com", passwordEncoder.encode("admin"), "ADMIN", null),
                new User(2L, "user", "user@gmail.com", passwordEncoder.encode("user"), "USER", null)
        );
        if (!repository.findAll().isEmpty()) {
            return;
        }
        repository.saveAll(USERS);
        log.info("Database initialized");
    }

}