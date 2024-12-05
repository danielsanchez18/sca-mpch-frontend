import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CertificatedService } from '../../../../../core/services/certificated.service';
import Swal from 'sweetalert2';
import { Certificated, PaginatedCertificateds } from '../../../../../core/interfaces/certificated.interface';

@Component({
  selector: 'certificated-overview',
  templateUrl: './certificated-overview.component.html',
})
export class CertificatedOverviewComponent {

  certifications: any[] = [];
  totalCertifications: number = 0;
  page: number = 0;
  size: number = 10;
  pages: number[] = [];
  currentPage: number = 1;
  searchInterns: string = '';
  isLoading: boolean = true;

  constructor(private certificatedService: CertificatedService) { }

  ngOnInit(): void {
    this.getCertifications();
  }

  // Obtener certificaciones
  getCertifications(): void {
    this.certificatedService.getEligibleInterns(this.page, this.size).subscribe(
      (response) => {
        this.certifications = response.data.content;
        console.log(this.certifications);
        this.totalCertifications = response.data.totalElements;
        this.setPagination();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener las certificaciones', error);
        this.isLoading = false;
      }
    );
  }

  // Buscar practicantes por nombre
  searchInternsByName(): void {
    if (this.searchInterns.trim() === '') {
      this.getCertifications();
    } else {
      this.certificatedService.getCertificateByDni(this.searchInterns).subscribe(
        (response) => {
          this.certifications = response.data.content;
          this.totalCertifications = response.data.totalElements;
          this.setPagination();
        },
        (error) => {
          console.error('Error al buscar practicantes', error);
        }
      );
    }
  }

  // Generar un certificado
  generateCertificate(certificationId: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se generará un nuevo certificado',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, generar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.certificatedService.generateCertificate(certificationId).subscribe(
          () => {
            Swal.fire('¡Generado!', 'El certificado ha sido generado', 'success');
            this.getCertifications();
          },
          (error) => {
            console.error('Error al generar el certificado', error);
            Swal.fire('Error', 'No se pudo generar el certificado', 'error');
          }
        );
      }
    });
  }

  // Configurar paginación
  setPagination(): void {
    this.pages = Array.from({ length: Math.ceil(this.totalCertifications / this.size) }, (_, i) => i + 1);
  }

  // Cambiar de página
  goToPage(page: number): void {
    this.page = page - 1;
    this.currentPage = page;
    this.getCertifications();
  }

}
