import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AreaService } from '../../../../../core/services/area.service';
import { AreaUniversityService } from '../../../../../core/services/area-university.service';
import { UniversityService } from '../../../../../core/services/university.service';

@Component({
  selector: 'work-areas-overview',
  templateUrl: './work-areas-overview.component.html',
})
export class WorkAreasOverviewComponent {

  areas: any[] = [];
  showAddAreaUniversityModal: boolean = false;
  // selectedAreaId: number = 0;

  constructor(
    private areaService: AreaService,
    private areaUniversityService: AreaUniversityService,
    // private universityService: UniversityService
  ) { }

  ngOnInit(): void {
    this.loadAreas();
  }

  loadAreas(): void {
    this.areaService.getAllAreas(0, 1000).subscribe(
      (response) => {
        this.areas = response.data.content;
        // Para cada área, podemos cargar las universidades asociadas
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
          area.universities = response.data.content; // Asociamos universidades al área
        }
      },
      (error) => {
        console.error('Error al cargar universidades para área', error);
      }
    );
  }

  // openAddAreaUniversityModal(areaId: number): void {
  //   this.selectedAreaId = areaId;
  //   this.showAddAreaUniversityModal = true;
  // }

  closeAddAreaUniversityModal(): void {
    this.showAddAreaUniversityModal = false;
    this.loadAreas(); // Recargamos las áreas y universidades para reflejar cualquier cambio
  }

}
