import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SupervisorService } from '../../../../../../../core/services/supervisor.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { AreaService } from '../../../../../../../core/services/area.service';

@Component({
  selector: 'supervisor-edit',
  templateUrl: './supervisor-edit.component.html',
})
export class SupervisorEditComponent implements OnInit {
  supervisor: any = {
    user: {
      name: '',
      lastname: '',
      dni: '',
      birthdate: '',
      status: false
    },
    password: '',
    area: {
      idArea: 0,
      name: '',
    }
  };

  areas: any[] = [];

  idSupervisor!: string;

  constructor(
    private supervisorService: SupervisorService,
    private areaService: AreaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Obtener el idSupervisor de la URL
    this.idSupervisor = this.route.snapshot.paramMap.get('id')!;

    // Obtener los datos del supervisor por su ID
    this.supervisorService.getSupervisorById(this.idSupervisor).subscribe(
      response => {
        this.supervisor = response.data; // Cargar los datos del supervisor en el formulario

        // Si el backend devuelve la fecha en un formato completo, la convertimos al formato requerido
        if (this.supervisor.user.birthdate) {
          // Convertir la fecha a formato "yyyy-MM-dd"
          this.supervisor.user.birthdate = this.supervisor.user.birthdate.split('T')[0];
        }
      },
      error => {
        console.error('Error al cargar los datos del supervisor', error);
      }
    );

    this.loadAreas();
  }

  loadAreas(): void {
    this.areaService.getAllAreas(0, 1000).subscribe(
      (response) => {
        this.areas = response.data.content;  // Suponiendo que el backend devuelve las áreas en `content`
      },
      (error) => {
        console.error('Error al cargar las áreas', error);
      }
    );
  }

  updateSupervisor(): void {
    // Convertir el estado de booleano a 1 o 0 si es necesario
    const updatedSupervisor = {
      ...this.supervisor,
      user: {
        ...this.supervisor.user,
        status: this.supervisor.user.status ? 1 : 0 // Convertir a 1 o 0
      }
    };

    this.supervisorService.updateSupervisor(this.idSupervisor, updatedSupervisor).subscribe(
      response => {
        Swal.fire('Éxito', 'El supervisor ha sido actualizado correctamente.', 'success');
        this.router.navigate(['/admin/usuarios/supervisores']); // Redirigir a la lista de supervisores
      },
      (error: HttpErrorResponse) => {
        // Revisar si el error tiene un mensaje de error desde el backend
        const errorMessage = error?.error?.error || 'No se pudo agregar el supervisor.';
        // console.error('Error al agregar el supervisor', error);
        Swal.fire('Error', errorMessage, 'error');
      }
    );
  }
}
