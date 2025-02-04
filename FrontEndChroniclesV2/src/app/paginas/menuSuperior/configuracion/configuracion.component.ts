import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Rassets } from 'src/app/modelos/rassets';
import { User } from 'src/app/modelos/user';
import { UserCustom } from 'src/app/modelos/user-custom';
import { LoginService } from 'src/app/services/auth/login.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  errorMessage: String = "";
  usuario: String;
  userOn: String;
  id: number;
  datosUsuario: UserCustom;
  datosUser: User;
  nombreFile = '';

  registerForm=this.formBuilder.group({
    id:[''],
    lastname:['',Validators.required],
    firstname:['',Validators.required],
    country:['',Validators.required]
  })

  settingsForm=this.formBuilder.group({
    id:[''],
    password:['', Validators.required]
  })

  avatarForm=this.formBuilder.group({
    id:[''],
    avatar:['', Validators.required],
    username:['']
  })

  constructor(private loginService: LoginService, private userService: UserService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    if (!localStorage.getItem('reloaded')) {
      localStorage.setItem('reloaded', 'true');
      location.reload();
    } else {
      localStorage.removeItem('reloaded');
    }

    this.loginService.userOn.subscribe({
      next: (userOn) => {
        this.usuario = userOn;
        const n = userOn.match(/^([^@]+)/);
        this.userOn = n[1];
      }
    })

    this.userService.getUserr(this.usuario).subscribe({
      next: (userData) => {
        this.datosUsuario = userData;
        this.registerForm.controls.id.setValue(userData.id.toString());
        this.registerForm.controls.firstname.setValue( userData.firstname);
        this.registerForm.controls.lastname.setValue( userData.lastname);
        this.registerForm.controls.country.setValue( userData.country);
        this.settingsForm.controls.id.setValue(userData.id.toString());
        this.settingsForm.controls.password.setValue( userData.password);
      },
      error: (errorData) => {
        this.errorMessage = errorData
      },
      complete: () => {
        console.info("User Data ok");
      }
    })
  }

  get firstname() {
    return this.registerForm.controls.firstname;
  }

  get lastname() {
    return this.registerForm.controls.lastname;
  }

  get country() {
    return this.registerForm.controls.country;
  }

  get password(){
    return this.settingsForm.controls.password;
  }

  get avatar(){
    return this.avatarForm.controls.avatar;
  }

  get username(){
    return this.avatarForm.controls.username;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.nombreFile = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1]; // Remove the prefix
      this.avatarForm.controls.avatar.setValue(base64String.trim()); // Set the clean Base64 string
    };
    reader.readAsDataURL(file);
  }

  guardarAvtar(){
    this.avatarForm.controls.username.setValue(this.usuario.toString());
    console.log("Base64 String for portada:", this.avatarForm.value.avatar);
    console.log("Form data being sent:", this.avatarForm.value);

    if(this.avatarForm.valid){
          this.userService.guardarAvatar(this.avatarForm.value as unknown as Rassets).subscribe({
            next: (userData) =>{
              console.log("Response from backend:", userData);
              alert("Cambios realizados");
              this.ngOnInit();
            },
            error: (errorData) =>{
              console.error(errorData);
              alert("Error: Existe un error");
            },
            complete: () => {
              console.info("Login completo");
              localStorage.removeItem('avatarPic');
            }
          })
    
        }else{
          this.registerForm.markAllAsTouched();
          alert("Error al ingresar los datos")
        }

  }


  saveDatosPersonales() {
    if(this.registerForm.valid){
      this.userService.updateUser(this.registerForm.value as unknown as User).subscribe({
        next:() => {
          alert("Cambios realizados");
          this.ngOnInit();
        },
        error:(errorData) => console.error(errorData)
      })
    }
  }

  changePassword(){
    if(this.registerForm.valid){
      this.userService.updateSettings(this.settingsForm.value as unknown as UserCustom).subscribe({
        next:() => {
          alert("Cambios realizados");
          this.ngOnInit();
        },
        error:(errorData) => console.error(errorData)
      })
    }
  }

}
