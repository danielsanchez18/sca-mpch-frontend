import { Component } from '@angular/core';
import { Intern } from '../../../../../core/interfaces/intern.interface';
import { AreaService } from '../../../../../core/services/area.service';
import { UniversityService } from '../../../../../core/services/university.service';
import { InternService } from '../../../../../core/services/intern.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Area } from '../../../../../core/interfaces/area.interface';
import { University } from '../../../../../core/interfaces/university.interface';

@Component({
  selector: 'admin-interns-edit',
  templateUrl: './interns-edit.component.html',
})
export class AdminInternsEditComponent {

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
    private internService: InternService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const internId = this.route.snapshot.paramMap.get('idIntern');
    if (internId) {
      this.internService.getInternsById(internId).subscribe({
        next: (intern) => this.intern = intern,
        error: () => Swal.fire('Error', 'No se pudo cargar el practicante', 'error')
      });
    }

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

  updateIntern(): void {
    this.intern.user.name = this.intern.user.name;
    this.intern.user.lastname = this.intern.user.lastname;
    this.intern.user.dni = this.intern.user.dni;
    this.intern.user.age = this.intern.user.age;
    this.intern.area = { idArea: this.selectedArea };
    this.intern.university = { idUniversity: this.selectedUniversity };


    this.internService.updateIntern(this.intern.idIntern!, this.intern).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Practicante actualizado',
          text: 'El practicante se ha actualizado exitosamente.'
        });
        this.router.navigate(['/admin/practicante/overview']);
      },
      error: (error) => {
        if (error.error && error.error.message) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.message
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al actualizar el practicante. Por favor, inténtalo nuevamente.'
          });
        }
      }
    });
  }

}
