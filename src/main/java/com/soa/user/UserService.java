package com.soa.user;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.soa.ExceptionHandler.ResourceNotFoundMultimedia;
import com.soa.assets.Assets;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    
    private final UserRepository userRepository;
    private final NamedParameterJdbcTemplate jdbc;
    private final PasswordEncoder passwordEncoder;
    
    @Transactional
    public UserResponse updateUser(UserRequest userRequest) {
        User user = User.builder()
                      .id(userRequest.id)
                      .firstname(userRequest.getFirstname())
                      .lastname(userRequest.getLastname())
                      .country(userRequest.getCountry())
                      .role(Role.USER)
                      .build();
        
        userRepository.updateUser(user.id, user.firstname, user.lastname, user.country);
        
        return new UserResponse("El usuario se registro satisfactoriamente");
    }
    
    public UserDTO getUser(Integer id) {
        User user = userRepository.findById(id).orElse(null);
        
        if(user != null) {
            UserDTO userDTO = UserDTO.builder()
                             .id(user.id)
                             .username(user.username)
                             .firstname(user.firstname)
                             .lastname(user.lastname)
                             .country(user.country)
                             .build();
            
            return userDTO;
        }
        return null;
    }

    public UserCustom byUsername(String username) {
        String sql = "SELECT id, country, firstname, lastname, password, role, username FROM user WHERE username = :username";
        
        MapSqlParameterSource parameters = new MapSqlParameterSource();
        parameters.addValue("username", username);
        
        RowMapper<User> rowMapper = new BeanPropertyRowMapper<>(User.class);
        
        try {
            User user = jdbc.queryForObject(sql, parameters, rowMapper);
            
            UserCustom resp = UserCustom.builder()
                    .id(user.getId())
                    .username(user.getUsername())
                    .firstname(user.getFirstname())
                    .lastname(user.getLastname())
                    .country(user.getCountry())
                    .password(user.getPassword())
                    .role(user.getRole())
                    .build();
            
            return resp;
            
        } catch (EmptyResultDataAccessException e) {
            
            return null;
        }
    }

    public UserResponse updateSettings(UserCustom datos) {
        
        User user = userRepository.findById(datos.getId())
                .orElseThrow(() -> new ResourceNotFoundMultimedia("No se encontro multimedia con el ID: "+datos.id));
        
        user.setPassword(passwordEncoder.encode(datos.getPassword()));
        
        userRepository.save(user);
        
        return new UserResponse("Account Settings Actualizados");
    }

    
    public int guardarAvatar(Assets assets) {
        
        String sql = "UPDATE assets SET avatar = :avatar WHERE username = :username";
        MapSqlParameterSource parameters = new MapSqlParameterSource();
        parameters.addValue("username", assets.getUsername());
        parameters.addValue("avatar", assets.getAvatar());
        
        return jdbc.update(sql, parameters); 
    }

    public Assets obtenerAssets(String username) {
        String sql = "SELECT id, avatar, username FROM assets WHERE username = :username";
        
        MapSqlParameterSource parameters = new MapSqlParameterSource();
        parameters.addValue("username", username);
        RowMapper<Assets> rowMapper = new BeanPropertyRowMapper<>(Assets.class);
        
        Assets resp = jdbc.queryForObject(sql, parameters, rowMapper);
        
        return resp;
    }
}
