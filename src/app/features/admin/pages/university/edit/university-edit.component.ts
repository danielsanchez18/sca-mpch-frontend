import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { University } from '../../../../../core/interfaces/university.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { UniversityService } from '../../../../../core/services/university.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'university-edit',
  templateUrl: './university-edit.component.html',
})
export class UniversityEditComponent implements OnInit {

  university: any = {
    name: '',
    acronym: '',
    photo: '',
    status: true,
  }

  idUniversity!: number;

  constructor(
    private universityService: UniversityService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    // Obtener el idUniversity de la URL
    const id = this.route.snapshot.paramMap.get('id')!;

    if (id) {
      this.idUniversity = Number(id); // O usar parseInt(id, 10);
    }

    // Obtener los datos de la universidad por su ID
    this.universityService.getUniversityById(this.idUniversity).subscribe(
      response => {
        this.university = response.data; // Cargar los datos de la universidad en el formulario
      },
      error => {
        console.error('Error al cargar los datos de la universidad', error);
      }
    )
  }

  updateUniversity(): void {
    // Convertir el estado de booleano a 1 o 0 si es necesario
    const updatedUniversity = {
      ...this.university,
      status: this.university.status ? 1 : 0 // Convertir a 1 o 0
    }

    this.universityService.updateUniversity(this.idUniversity, updatedUniversity).subscribe(
      response => {
        Swal.fire('Éxito', 'La universidad ha sido actualizada correctamente.', 'success');
        this.router.navigate(['/admin/universidades']);
      },
      (error: HttpErrorResponse) => {
        const errorMessage = error?.error?.error || 'No se actulaizar la universidad.';
      }
    )
  }


}
