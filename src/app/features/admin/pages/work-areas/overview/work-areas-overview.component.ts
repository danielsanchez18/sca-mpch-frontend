import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AreaService } from '../../../../../core/services/area.service';
import { AreaUniversityService } from '../../../../../core/services/area-university.service';
import { UniversityService } from '../../../../../core/services/university.service';
import { Router } from '@angular/router';
import { InternService } from '../../../../../core/services/intern.service';

@Component({
  selector: 'work-areas-overview',
  templateUrl: './work-areas-overview.component.html',
})
export class WorkAreasOverviewComponent {

  areas: any[] = [];

  constructor(
    private areaService: AreaService,
    private internService: InternService,
    private areaUniversityService: AreaUniversityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadAreas();
  }

  loadAreas(): void {
    this.areaService.getAllAreas(0, 1000).subscribe(
      (response) => {
        this.areas = response.data.content;

        // Para cada área, cargar universidades asociadas
        this.areas.forEach(area => {
          this.loadUniversitiesForArea(area.idArea);
        });
      },
      (error) => {
        console.error('Error al cargar las áreas', error);
      }
    );
  }

  loadUniversitiesForArea(areaId: number): void {
    this.areaUniversityService.getUniversitiesByArea(areaId).subscribe(
      (response) => {
        const area = this.areas.find(a => a.idArea === areaId);
        if (area) {
          area.universities = response.data.content || []; // Asegurarse de inicializar como un array vacío

          // Cargar practicantes para cada universidad del área
          area.universities.forEach((university: any) => {
            this.loadInternsForAreaUniversity(university.idAreaUniversity);
          });
        }
      },
      (error) => {
        console.error('Error al cargar universidades para área', error);
      }
    );
  }

  loadInternsForAreaUniversity(idAreaUniversity: string): void {
    this.internService.findInternsByAreaUniversity(idAreaUniversity).subscribe(
      (response) => {
        const areaUniversity = this.areas
          .flatMap(area => area.universities || []) // Manejar caso donde `universities` no exista
          .find(au => au.idAreaUniversity === idAreaUniversity);

        if (areaUniversity) {
          areaUniversity.practicantesCount = response.data.totalElements || 0;
        }
      },
      (error) => {
        console.error(`Error al cargar practicantes para AreaUniversity ${idAreaUniversity}`, error);
      }
    );
  }

  getUniversitiesCount(area: any): number {
    return area.universities ? area.universities.length : 0;
  }

  navigateToAddUniversity(area: any): void {
    this.router.navigate(['/admin/areas-laborales/agregar', area.idArea], {
      state: { area: area } // Opcional: pasar el objeto área completo si lo necesitas
    });
  }

}
