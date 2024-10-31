import { Component } from '@angular/core';
import { Area } from '../../../../../core/interfaces/area.interface';
import { University } from '../../../../../core/interfaces/university.interface';
import { AreaService } from '../../../../../core/services/area.service';
import { UniversityService } from '../../../../../core/services/university.service';
import { Intern } from '../../../../../core/interfaces/intern.interface';
import { Role } from '../../../../../core/interfaces/role.interface';
import { InternService } from '../../../../../core/services/intern.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'admin-interns-add',
  templateUrl: './interns-add.component.html',
})
export class AdminInternsAddComponent {

  areas: Area[] = [];
  universities: University[] = [];

  selectedArea: string = ''; // Para almacenar el ID del área seleccionada
  selectedUniversity: string = '';

  intern: Intern = {
    idIntern: '',
    user: {
      idUser: '',
      name: '',
      lastname: '',
      dni: '',
      age: 0,
        role: {
        idRole: '',
        name: '',
       },
      photo: 'photo.png',
      status: true,
    },
    area: {
      idArea: '',
      name: '',
    },
    university: {
      idUniversity: '',
      name: '',
    },
    totalHours: 0,
  }

  constructor(
    private areaService: AreaService,
    private universityService: UniversityService,
    private internService: InternService
  ) {}

  ngOnInit(): void {
    this.getAreas();
    this.getUniversities();
  }

  getAreas(): void {
    this.areaService.getAllAreas(0, 10).subscribe((areas: Area[]) => {
      this.areas = areas;
    });
  }

  getUniversities(): void {
    this.universityService.getAllUniversities(0, 10).subscribe((universities: University[]) => {
      this.universities = universities;
    });
  }

  onAreaChange(event: any): void {
    this.selectedArea = event.target.value;
  }

  onUniversityChange(event: any): void {
    this.selectedUniversity = event.target.value;
  }


  onSubmit(): void {

    // console.log(this.intern);

    this.intern.user.name = this.intern.user.name;
    this.intern.user.lastname = this.intern.user.lastname;
    this.intern.user.dni = this.intern.user.dni;
    this.intern.user.age = this.intern.user.age;
    this.intern.area = { idArea: this.selectedArea };
    this.intern.university = { idUniversity: this.selectedUniversity };

    this.internService.saveIntern(this.intern).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Practicante registrado',
          text: 'El practicante se ha registrado exitosamente.'
        })
      },
      error: (error) => {
        if (error.error && error.error.message) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.message
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al registrar El practicante. Por favor, inténtalo nuevamente.'
          })
        }
      }
    });
  }

}
