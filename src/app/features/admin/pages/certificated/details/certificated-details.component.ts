import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Certificated } from '../../../../../core/interfaces/certificated.interface';
import { CertificatedService } from '../../../../../core/services/certificated.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'certificated-details',
  templateUrl: './certificated-details.component.html',
})
export class CertificatedDetailsComponent {

  certificated?: Certificated;  // Variable para almacenar el certificado
  isLoading = true;

  constructor(
    private certificatedService: CertificatedService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Obtener el idCertificated de la URL
    const idCertificated = this.route.snapshot.paramMap.get('id');
    if (idCertificated) {
      this.loadCertificatedDetails(idCertificated);
    }
  }

  // Método para cargar los detalles del certificado
  loadCertificatedDetails(idCertificated: string): void {
    this.certificatedService.getCertificatedById(idCertificated).subscribe({
      next: (response) => {
        this.certificated = response.data;  // Almacenar los detalles del certificado
      },
      error: () => {
        // Manejar el error si no se puede cargar la certificación
        Swal.fire('Error', 'No se pudo cargar el certificado.', 'error');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

}
