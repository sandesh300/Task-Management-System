package taskmanagementsystem.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Login {
    @NotEmpty(message = "Invalid: username cannot be empty.")
    private String username;
    @NotEmpty(message = "Invalid: password cannot be empty")
    private String password;
}