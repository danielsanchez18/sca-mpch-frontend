import { ChangeDetectionStrategy, Component } from '@angular/core';
import { University } from '../../../../../core/interfaces/university.interface';
import { Area } from '../../../../../core/interfaces/area.interface';
import { AreaUniversityService } from '../../../../../core/services/area-university.service';
import { AreaService } from '../../../../../core/services/area.service';
import { UniversityService } from '../../../../../core/services/university.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'work-areas-edit',
  templateUrl: './work-areas-edit.component.html',
})
export class WorkAreasEditComponent {

  areaUniversity = {
    area: {
      idArea: 0,
      name: '',
      status: true,
      nroVacancies: 0
    },
    university: {
      idUniversity: 0,
      name: '',
      acronym: '',
      status: true
    },
    hoursCertified: 0,
  }

  idAreaUniversity!: string;

  constructor(
    private areaUniversityService: AreaUniversityService,
    private areaService: AreaService,
    private universityService: UniversityService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Obtener el idAreaUniversity de la URL
    const id = this.route.snapshot.paramMap.get('id')!;

    if (id) {
      this.idAreaUniversity = id;
    }

    // Obtener los datos del área-universidad por su ID
    this.areaUniversityService.getAreaUniversityById(this.idAreaUniversity).subscribe(
      response => {
        this.areaUniversity = response.data; // Cargar los datos del área-universidad en el formulario
      },
      error => {
        console.error('Error al cargar los datos del área-universidad', error);
      }
    )
  }

}
