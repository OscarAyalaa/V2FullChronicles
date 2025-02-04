package com.soa.user;

import java.util.Base64;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.soa.assets.Assets;
import com.soa.assets.RequestAssets;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:4200"})
public class UserController {
    
    private final UserService userService;
    
    @GetMapping(value = "{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Integer id){
        
        UserDTO userDTO = userService.getUser(id);
        if(userDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userDTO);
    }
    
    @PutMapping()
    public ResponseEntity<UserResponse> updateUser(@RequestBody UserRequest userRequest){
        return ResponseEntity.ok(userService.updateUser(userRequest));
    }
    
    @GetMapping("/byUser/{username}")
    public ResponseEntity<UserCustom> obtenerUser(@PathVariable String username){
        return ResponseEntity.ok(userService.byUsername(username));
    }
    
    @PutMapping("/settings")
    public ResponseEntity<UserResponse> updateSettings(@RequestBody UserCustom datos){
        return ResponseEntity.ok(userService.updateSettings(datos));
    }
    
    @PostMapping("/settings/avatar")
    public ResponseEntity<?> guardarAvatar(@RequestBody RequestAssets requestAssets){
        
        System.out.println("Received Base64 string: " + requestAssets.getAvatar());
        
        try {
            String cleanBase64 = requestAssets.getAvatar().replaceAll("\\s", ""); // Clean input
            byte[] avatarBytes = Base64.getDecoder().decode(cleanBase64);
            System.out.println("Decoded successfully.");
            Assets assets = Assets.builder()
                    .username(requestAssets.getUsername())
                    .avatar(avatarBytes)
                    .build();
            
            int rowsUpdated = userService.guardarAvatar(assets);
            assets.setAvatar(null);
            
            if (rowsUpdated > 0) {
                System.out.println("Avatar updated successfully.");
                return new ResponseEntity<Assets>(assets, HttpStatus.OK); 
            } else {
                System.out.println("No record found with the given Username.");
                return new ResponseEntity<Assets>(assets, HttpStatus.CONFLICT);
            }
            
            
        }catch (IllegalArgumentException e) {
            System.err.println("Invalid Base64 input: " + e.getMessage());
            throw e;
        }
    }
    
    @GetMapping("/settings/{username}")
    public ResponseEntity<Assets> obtenerAssets(@PathVariable String username){
        return ResponseEntity.ok(userService.obtenerAssets(username));
    }

}
