package com.soa.multimedia.res;


import java.util.Base64;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.soa.multimedia.dao.MultimediaService;
import com.soa.multimedia.dto.Multimedia;
import com.soa.multimedia.dto.RequestMultimedia;
import com.soa.multimedia.dto.ResponseMultimedia;


import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200/")
public class MultimediaRes {
    
    private final MultimediaService multimediaService;
    
    
    @GetMapping("/multimedias")
    public ResponseEntity<ResponseMultimedia> getMultimedia(@RequestParam Optional<String> titulo,
                                                            @RequestParam Optional<String> usuario,  // agregge parametro y en el metodo tambien
                                                            @RequestParam Optional<Integer> page,
                                                            @RequestParam Optional<Integer> size) throws InterruptedException{
        return ResponseEntity.ok().body(
                ResponseMultimedia.builder()
                .message("Multimedias....")
                .data(Map.of("page", multimediaService.getMultimedia(titulo.orElse(""), usuario.orElse(""), page.orElse(0), size.orElse(10))))
                .build());
    }
    
    @PostMapping("/multimedias")
    public ResponseEntity<?> guardarMultimedia(@RequestBody RequestMultimedia multimedia){
        
        System.out.println("Received Base64 string: " + multimedia.getPortada());
        try {
            String cleanBase64 = multimedia.getPortada().replaceAll("\\s", ""); // Clean input
            byte[] portadaBytes = Base64.getDecoder().decode(cleanBase64);
            
            System.out.println("Decoded successfully.");
            Multimedia multimediD = Multimedia.builder()
                    .titulo(multimedia.getTitulo())
                    .genero(multimedia.getGenero())
                    .anio(multimedia.getAnio())
                    .direccion(multimedia.getDireccion())
                    .tipo(multimedia.getTipo())
                    .usuario(multimedia.getUsuario())
                    .portada(portadaBytes)
                    .sinopsis(multimedia.getSinopsis())
                    .temporadas(multimedia.getTemporadas())
                    .episodios(multimedia.getEpisodios())
                    .build();

            multimediaService.guardarMultimedia(multimediD);
            multimediD.setPortada(null);

            return new ResponseEntity<Multimedia>(multimediD, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            System.err.println("Invalid Base64 input: " + e.getMessage());
            throw e;
        }
        
    }
    
    @GetMapping("/multimedias/{id}")
    public ResponseEntity<Multimedia> obtenerMultimediaID(@PathVariable Long id){
        return new ResponseEntity<Multimedia>(multimediaService.obtenerMultimediaID(id), HttpStatus.OK);
    }
    
    @PutMapping("/multimedias/{id}")
    public ResponseEntity<Multimedia> actualizarMultimedia(@PathVariable Long id, @RequestBody Multimedia multimediaD){
        return new ResponseEntity<Multimedia>(multimediaService.actualizarMultimedia(id, multimediaD), HttpStatus.OK);
    }
    
    @DeleteMapping("/multimedias/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarMultimedia(@PathVariable Long id){
        return new ResponseEntity<Map<String,Boolean>>(multimediaService.eliminarMultimedia(id), HttpStatus.OK);
    }
    
    @GetMapping("/multimedias/random")
    public ResponseEntity<Multimedia> multimediaRandom(){
        return new ResponseEntity<Multimedia>(multimediaService.randomMult(), HttpStatus.OK);
    }

}
