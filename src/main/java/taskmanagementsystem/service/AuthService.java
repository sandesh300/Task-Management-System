package taskmanagementsystem.service;

import taskmanagementsystem.dto.Login;
import taskmanagementsystem.dto.Register;
import taskmanagementsystem.model.User;
import taskmanagementsystem.security.AuthResponse;

import java.util.Optional;

public interface AuthService {
    AuthResponse register(Register register);
    Optional<User> login(Login login);
}
