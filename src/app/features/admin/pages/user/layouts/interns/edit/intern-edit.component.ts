import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InternService } from '../../../../../../../core/services/intern.service';
import { AreaService } from '../../../../../../../core/services/area.service';
import { AreaUniversityService } from '../../../../../../../core/services/area-university.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'intern-edit',
  templateUrl: './intern-edit.component.html',
})
export class InternEditComponent implements OnInit {

  internId: string | null = null;
  intern: any = {
    user: {
      name: '',
      lastname: '',
      dni: '',
      birthdate: '',
      photo: '',
      status: true
    },
    areaUniversity: {
      idAreaUniversity: '',
      area: {
        idArea: 0,
        name: '',
        nroVacancies: 0,
        status: true
      },
      university: {
        idUniversity: 0,
        name: '',
        acronym: '',
        status: true
      },
      hoursCertified: 0
    },
    totalHours: 0
  };
  areas: any[] = [];
  universities: any[] = [];
  selectedArea: number | null = null;
  selectedUniversity: number | null = null;
  hoursCertified: number = 0;

  constructor(
    private route: ActivatedRoute,
    private internService: InternService,
    private areaService: AreaService,
    private areaUniversityService: AreaUniversityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.internId = this.route.snapshot.paramMap.get('id');
    if (this.internId) {
      this.loadInternData(this.internId);
    }
    this.loadAreas();
  }

  loadInternData(internId: string): void {
    this.internService.getInternById(internId).subscribe(
      (response) => {
        this.intern = response.data;
        this.selectedArea = this.intern.areaUniversity.area.idArea;
        this.selectedUniversity = this.intern.areaUniversity.university.idUniversity;
        this.hoursCertified = this.intern.areaUniversity.hoursCertified;
        this.loadUniversitiesForArea(this.selectedArea!); // Cargar universidades para el área seleccionada

        // Si el backend devuelve la fecha en un formato completo, la convertimos al formato requerido
        if (this.intern.user.birthdate) {
          // Convertir la fecha a formato "yyyy-MM-dd"
          this.intern.user.birthdate = this.intern.user.birthdate.split('T')[0];
        }
      },
      (error) => {
        console.error('Error al cargar los datos del practicante', error);
        Swal.fire('Error', 'No se pudo cargar la información del practicante', 'error');
      }
    );
  }

  loadAreas(): void {
    this.areaService.getAllAreas(0, 1000).subscribe(
      (response) => {
        this.areas = response.data.content || [];
      },
      (error) => {
        console.error('Error al cargar las áreas', error);
      }
    );
  }

  loadUniversitiesForArea(areaId: number): void {
    this.areaUniversityService.getUniversitiesByArea(areaId).subscribe(
      (response) => {
        this.universities = response.data.content || [];
        if (this.universities.length === 0) {
          console.warn(`No hay universidades relacionadas con el área ${areaId}`);
        }
      },
      (error) => {
        console.error('Error al cargar universidades para área', error);
      }
    );
  }

  onAreaChange(): void {
    if (this.selectedArea) {
      this.loadUniversitiesForArea(this.selectedArea);

      this.intern.areaUniversity.area.idArea = this.selectedArea;
    } else {
      this.universities = [];
      this.hoursCertified = 0;
      this.intern.areaUniversity.area.idArea = 0;
      console.warn('Área no seleccionada.');
    }
  }

  onUniversityChange(): void {
    const selected = this.universities.find(
      (u) => +u.university.idUniversity === +this.selectedUniversity!
    );

    if (selected) {
      this.hoursCertified = selected.hoursCertified;
      this.intern.areaUniversity.university.idUniversity = selected.university.idUniversity;
      this.intern.areaUniversity.area.idArea = this.selectedArea || 0;
      this.intern.areaUniversity.idAreaUniversity = selected.idAreaUniversity;
      this.intern.areaUniversity.hoursCertified = selected.hoursCertified;
    } else {
      console.warn('No se encontró la universidad seleccionada.');
      this.hoursCertified = 0;
      this.intern.areaUniversity.idAreaUniversity = '';
    }
  }

  updateIntern(): void {
    if (!this.intern.areaUniversity.area.idArea || !this.intern.areaUniversity.university.idUniversity) {
      Swal.fire('Error', 'Debes seleccionar un área y una universidad antes de actualizar.', 'error');
      return;
    }

    console.log('Datos enviados:', this.intern);

    this.internService.updateIntern(this.internId!, this.intern).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        Swal.fire('Éxito', 'El practicante ha sido actualizado.', 'success');
        this.router.navigate(['/admin/practicantes']);
      },
      (error) => {
        const errorMessage = error?.error?.error || 'No se pudo actualizar el practicante.';
        Swal.fire('Error', errorMessage, 'error');
      }
    );
  }

}
