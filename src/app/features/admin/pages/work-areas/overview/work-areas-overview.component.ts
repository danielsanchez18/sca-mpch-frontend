import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AreaService } from '../../../../../core/services/area.service';
import { AreaUniversityService } from '../../../../../core/services/area-university.service';
import { UniversityService } from '../../../../../core/services/university.service';
import { Router } from '@angular/router';
import { InternService } from '../../../../../core/services/intern.service';
import { forkJoin, map } from 'rxjs';

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

        const universityRequests = this.areas.map(area =>
          this.areaUniversityService.getUniversitiesByArea(area.idArea).pipe(
            map(response => {
              area.universities = response.data.content || [];
              return area;
            })
          )
        );

        forkJoin(universityRequests).subscribe(() => {
          this.areas.forEach(area => {
            area.universities.forEach((university: any) => {
              this.loadInternsForAreaUniversity(university.idAreaUniversity);
            });
          });
        });
      },
      (error) => {
        console.error('Error al cargar las áreas', error);
      }
    );
  }

  loadInternsForAreaUniversity(idAreaUniversity: string): void {
    this.internService.findInternsByAreaUniversity(idAreaUniversity).subscribe(
      (response) => {
        const areaUniversity = this.areas
          .flatMap(area => area.universities || [])
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
      state: { area: area }
    });
  }

}
