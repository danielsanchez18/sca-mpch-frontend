import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CertificatedService } from '../../../../../core/services/certificated.service';
import Swal from 'sweetalert2';
import { Certificated, PaginatedCertificateds } from '../../../../../core/interfaces/certificated.interface';
import { Intern } from '../../../../../core/interfaces/intern.interface';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'certificated-overview',
  templateUrl: './certificated-overview.component.html',
})
export class CertificatedOverviewComponent {

  interns: any[] = [];
  isLoading = true;
  searchInterns = '';
  currentPage = 0;
  pageSize = 10;
  totalInterns = 0;
  pages: number[] = [];

  certificationsMap: Map<string, Certificated | null> = new Map(); // Mapa para almacenar el certificado o null si no tiene

  constructor(
    private certificatedService: CertificatedService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadInterns();
  }

  loadInterns(): void {
    this.isLoading = true;
    this.certificatedService.getEligibleInterns(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.interns = response.data.content;
        this.totalInterns = response.data.totalElements;
        this.interns.forEach(intern => this.checkCertificateForIntern(intern));  // Verificamos si tienen certificado
      },
      error: () => {
        Swal.fire('Error', 'No se pudieron cargar los practicantes.', 'error');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  search(): void {
    this.currentPage = 1;
    this.loadInterns();
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadInterns();
  }


  // Método para verificar si el intern tiene certificado
  checkCertificateForIntern(intern: Intern): void {
    this.certificatedService.getCertificateByDni(intern.user.dni).subscribe({
      next: (response) => {
        // Si el response tiene un certificado, lo guardamos en el mapa
        if (response.data && response.data.idCertificated) {
          this.certificationsMap.set(intern.user.dni, response.data); // Guardamos el certificado completo
        } else {
          this.certificationsMap.set(intern.user.dni, null); // No tiene certificado
        }
      },
      error: () => {
        this.certificationsMap.set(intern.user.dni, null); // Error o no tiene certificado
      }
    });
  }

  generateCertificate(dni: string): void {
    this.certificatedService.generateCertificate(dni).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Certificado generado con éxito', 'success');
        this.loadInterns();  // Recargar la lista de practicantes
      },
      error: (error: HttpErrorResponse) => {
        // Revisar si el error tiene un mensaje de error desde el backend
        const errorMessage = error?.error?.error || 'No se pudo generar el certificado.';
        Swal.fire('Error', errorMessage, 'error');
      }
    });
  }


}
