import { Component } from '@angular/core';
import { Area } from '../../../../../core/interfaces/area.interface';
import { Intern } from '../../../../../core/interfaces/intern.interface';
import { ActivatedRoute } from '@angular/router';
import { AreaService } from '../../../../../core/services/area.service';
import { InternService } from '../../../../../core/services/intern.service';

@Component({
  selector: 'admin-areas-details',
  templateUrl: './areas-details.component.html',
})
export class AdminAreasDetailsComponent {
  area: Area | null = null;
  interns: Intern[] = [];

  constructor(
    private route: ActivatedRoute,
    private areaService: AreaService,
    private internService: InternService
  ) {}

  ngOnInit(): void {
    const idArea = this.route.snapshot.paramMap.get('idArea');
    if (idArea) {
      this.areaService.getAreaById(idArea).subscribe((areaData) => {
        this.area = areaData;
        if (areaData.name) {
          this.internService.getInternsByArea(areaData.name).subscribe((internsData) => {
            this.interns = internsData;
          });
        }
      });
    }
  }
}
