import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { ApiResponse } from 'src/app/modelos/api-response';
import { Page } from 'src/app/modelos/page';
import { MultimediaService } from 'src/app/services/multimedia/multimedia.service';

@Component({
  selector: 'app-lista-multimedias',
  templateUrl: './lista-multimedias.component.html',
  styleUrls: ['./lista-multimedias.component.css']
})
export class ListaMultimediasComponent implements OnInit {

  multiState$: Observable<{ appState: string, appData?: ApiResponse<Page>, error?: HttpErrorResponse }>;
  responseSubject = new BehaviorSubject<ApiResponse<Page>>(null);
  private currentPageSubject = new  BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();

  displayedPages: number[] = []; // Pages to display
  maxPagesToShow = 25; // Maximum pages to display

  constructor(private multiService: MultimediaService, private router: Router) { }

  ngOnInit(): void {

    if (!localStorage.getItem('reloaded')) {
      localStorage.setItem('reloaded', 'true');
      location.reload();
    } else {
      localStorage.removeItem('reloaded');
    }

    this.multiState$ = this.multiService.media$().pipe(
      map((response: ApiResponse<Page>) => {
        this.responseSubject.next(response);
        this.currentPageSubject.next(response.data.page.number);
        this.updateDisplayedPages(); // Update pagination
        console.log(response);
        return ({ appState: 'APP_LOADED', appData: response});
      }
    ),
    startWith({ appState: 'APP_LOADING' }),
    catchError((error: HttpErrorResponse) => of({ appState: 'APP_ERROR', error}))
    )
  }

  goToPage(titulo?: string, pageNumber: number = 0): void{
    this.multiState$ = this.multiService.media$(titulo, pageNumber).pipe(
      map((response: ApiResponse<Page>) => {
        this.responseSubject.next(response);
        this.currentPageSubject.next(pageNumber);
        this.updateDisplayedPages(); // Update pagination
        console.log(response);
        return ({ appState: 'APP_LOADED', appData: this.responseSubject.value});
      }
    ),
    startWith({ appState: 'APP_LOADED', appData: this.responseSubject.value }),
    catchError((error: HttpErrorResponse) => of({ appState: 'APP_ERROR', error }))
    )
  }

  goToNextOrPreviousPage(direction?: string, titulo?: string): void{
    this.goToPage(titulo, direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1);
  }

  eliminarMultimedia(id: number){
    this.multiService.eliminarMultimedia(id).subscribe(
      datos => {
        this.ngOnInit();
        console.log(datos);
      });
  }

  detallesMultimedia(id: number){
    this.router.navigate(['/detalles-multimedia', id]);
  }

  actualizarMultimedia(id: number){
    this.router.navigate(['/actualizar-multimedia', id]);
  }

  private updateDisplayedPages(): void {
    const totalPages = this.responseSubject.value.data.page.totalPages;
    const currentPage = this.currentPageSubject.value;

    const startPage = Math.floor(currentPage / this.maxPagesToShow) * this.maxPagesToShow;
    const endPage = Math.min(startPage + this.maxPagesToShow, totalPages);

    this.displayedPages = Array.from({ length: endPage - startPage }, (_, i) => startPage + i);
  }

}
