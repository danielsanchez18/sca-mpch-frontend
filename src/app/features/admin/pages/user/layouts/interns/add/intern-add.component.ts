import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AreaService } from '../../../../../../../core/services/area.service';
import { AreaUniversityService } from '../../../../../../../core/services/area-university.service';
import { InternService } from '../../../../../../../core/services/intern.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Intern } from '../../../../../../../core/interfaces/intern.interface';

@Component({
  selector: 'intern-add',
  templateUrl: './intern-add.component.html',
})
export class InternAddComponent {

  areas: any[] = [];
  universities: any[] = [];
  selectedArea: number | null = null;
  selectedUniversity: number | null = null;
  hoursCertified: number = 0; // Para almacenar las horas de certificación
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

  constructor(
    private areaService: AreaService,
    private areaUniversityService: AreaUniversityService,
    private internService: InternService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadAreas();
    this.intern.areaUniversity = {
      idAreaUniversity: '',
      area: { idArea: 0, name: '', nroVacancies: 0, status: true },
      university: { idUniversity: 0, name: '', acronym: '', status: true },
      hoursCertified: 0,
    };
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
        // console.log('Datos de universidades cargados:', response.data.content);

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

      // Actualiza el ID del área en el modelo
      this.intern.areaUniversity.area.idArea = this.selectedArea;

      // console.log('Área seleccionada:', this.intern.areaUniversity.area.idArea);
    } else {
      this.universities = [];
      this.hoursCertified = 0;
      this.intern.areaUniversity.area.idArea = 0; // Restablecer valor
      console.warn('Área no seleccionada.');
    }
  }

  onUniversityChange(): void {
    const selected = this.universities.find(
      (u) => +u.university.idUniversity === +this.selectedUniversity!
    );

    if (selected) {
      this.hoursCertified = selected.hoursCertified;

      // Actualiza los valores necesarios en el modelo
      this.intern.areaUniversity.university.idUniversity = selected.university.idUniversity;
      this.intern.areaUniversity.area.idArea = this.selectedArea || 0; // Asegúrate de que el área esté configurada
      this.intern.areaUniversity.idAreaUniversity = selected.idAreaUniversity; // Asigna el idAreaUniversity
      this.intern.areaUniversity.hoursCertified = selected.hoursCertified;

      // console.log('Datos del área-universidad seleccionada:', this.intern.areaUniversity);
    } else {
      console.warn('No se encontró la universidad seleccionada.');
      this.hoursCertified = 0;
      this.intern.areaUniversity.idAreaUniversity = ''; // Restablece el valor
    }
  }


  registerIntern(): void {
    // Valida el modelo antes de enviar
    if (!this.intern.areaUniversity.area.idArea || !this.intern.areaUniversity.university.idUniversity) {
      Swal.fire('Error', 'Debes seleccionar un área y una universidad antes de registrar.', 'error');
      return;
    }

    console.log('Datos enviados:', this.intern); // Verifica los datos antes de enviarlos

    // Asegúrate de que totalHours esté en el formato correcto
    console.log('Horas enviadas:', this.intern.totalHours);

    this.internService.addIntern(this.intern).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        Swal.fire('Éxito', 'El practicante ha sido registrado.', 'success');
        this.router.navigate(['/admin/usuarios/practicantes']); // Redirigir a la lista de practicantes
      },
      (error) => {
        const errorMessage = error?.error?.error || 'No se pudo registrar el practicante.';
        Swal.fire('Error', errorMessage, 'error');
      }
    );
  }



}
