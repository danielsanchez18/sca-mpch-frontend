import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaUniversityService } from '../../../../../core/services/area-university.service';
import { UniversityService } from '../../../../../core/services/university.service';
import { AreaService } from '../../../../../core/services/area.service';
import { University } from '../../../../../core/interfaces/university.interface';
import Swal from 'sweetalert2';
import { AreaUniversity } from '../../../../../core/interfaces/area-university.interface';

@Component({
  selector: 'work-areas-add',
  templateUrl: './work-areas-add.component.html',
})
export class WorkAreasAddComponent {

  selectedArea: any = null; // Área seleccionada
  universities: University[] = []; // Lista de universidades
  selectedUniversityId: number | null = null; // ID de la universidad seleccionada
  certifiedHours: number = 0; // Horas para certificación
  areaId!: number;

  constructor(
    private areaService: AreaService,
    private universityService: UniversityService,
    private areaUniversityService: AreaUniversityService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadSelectedArea();
    this.loadUniversities();

    // Obtener el ID del área desde la ruta
    this.route.params.subscribe(params => {
      this.areaId = +params['id']; // 'idArea' debe coincidir con el parámetro de la ruta
    });

    // console.log('ID del área', this.areaId);

  }

  // Cargar el área seleccionada a partir del ID recibido en el estado o en la URL
  loadSelectedArea(): void {
    const areaId = this.route.snapshot.paramMap.get('id'); // ID del área
    if (areaId) {
      this.areaService.getAreaById(+areaId).subscribe(
        (response) => {
          this.selectedArea = response.data;
        },
        (error) => {
          console.error('Error al cargar el área', error);
        }
      );
    }
  }

  // Cargar todas las universidades
  loadUniversities(): void {
    this.universityService.getAllUniversities(0, 1000).subscribe(
      (response) => {
        this.universities = response.data.content;
      },
      (error) => {
        console.error('Error al cargar universidades', error);
      }
    );
  }

  addAreaUniversity(): void {
    if (!this.selectedUniversityId || this.certifiedHours <= 0) {
      Swal.fire('Error', 'Por favor, selecciona una universidad y define un número válido de horas para certificación.', 'error');
      return;
    }

    // Crear el payload del tipo AreaUniversity
    const payload: AreaUniversity = {
      idAreaUniversity: '', // Se generará automáticamente en el backend si es necesario
      area: { idArea: this.areaId, name: '', nroVacancies: 0, status: true }, // Solo idArea es necesario
      university: { idUniversity: this.selectedUniversityId, name: '', acronym: '', photo: '', status: true }, // Solo idUniversity es necesario
      hoursCertified: this.certifiedHours
    };

    console.log('Payload', payload);

    this.areaUniversityService.addAreaUniversity(payload).subscribe(
      (response) => {
        Swal.fire('Éxito', 'La universidad fue asociada al área correctamente.', 'success');
        this.router.navigate(['/admin/areas-laborales']); // Redirigir a la lista de áreas
      },
      (error) => {
        console.log('Error al asociar la universidad al área', error);
        const errorMessage = error?.error?.message || 'No se pudo asociar la universidad al área.';
        Swal.fire('Error', errorMessage, 'error');
      }
    );
  }


}
