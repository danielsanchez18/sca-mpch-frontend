import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Supervisor } from '../../../../../../../core/interfaces/supervisor.interface';
import { SupervisorService } from '../../../../../../../core/services/supervisor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaService } from '../../../../../../../core/services/area.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'supervisor-add',
  templateUrl: './supervisor-add.component.html',
})
export class SupervisorAddComponent implements OnInit {

  supervisor: Supervisor = {
    idSupervisor: '',
    password: '',
    user: {
      idUser: '',
      role: { idRole: 2, name: 'Supervisor' },
      name: '',
      lastname: '',
      dni: '',
      createdAt: '',
      updatedAt: '',
      birthdate: '',
      photo: '',
      status: true,
    },
    area: {  // Asegúrate de que esto sea un objeto completo de tipo Area
      idArea: 0,
      name: '',
      nroVacancies: 0,
      status: true
    }
  }

  areas: any[] = [];

  constructor(
    private supervisorService: SupervisorService,
    private areaService: AreaService,
    private router: Router
  ) { }


  ngOnInit(): void {
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

  addSupervisor(): void {
    this.supervisorService.addSupervisor(this.supervisor).subscribe(
      (response) => {
        Swal.fire('Éxito', 'El supervisor ha sido registrado correctamente.', 'success');
        this.router.navigate(['/admin/usuarios/supervisores']);  // Redirigir a la lista de supervisores
      },
      (error: HttpErrorResponse) => {
        // Revisar si el error tiene un mensaje de error desde el backend
        const errorMessage = error?.error?.error || 'No se pudo agregar el administrador.';
        // console.error('Error al agregar el administrador', error);
        Swal.fire('Error', errorMessage, 'error');
      }
    );
  }

}
