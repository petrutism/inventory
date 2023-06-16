package lt.code.academy.inventoryapi.user.service;

import lt.code.academy.inventoryapi.user.dto.User;
import lt.code.academy.inventoryapi.user.entity.UserEntity;
import lt.code.academy.inventoryapi.user.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAll() {
        return userRepository.findAll()
                .stream()
                .map(User::convert)
                .toList();
    }

    public User saveAccount(User user) {

        return User.convert(userRepository.save(UserEntity.convert(user)));
    }

    public User findOneByUsername(String username) {

        return User.convert(userRepository.findOneByUsername(username));
    }

    public User findAccountById(UUID id) {

        return userRepository.findById(id)
                .map(User::convert)
                .orElse(null);
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity accountEntity =  userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(String.format("User %s not found...", username)));

        return User.convert(accountEntity);
    }
}
