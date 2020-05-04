import {TranslateService} from "@ngx-translate/core";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {Injectable} from "@angular/core";

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl{

  constructor(private translateService: TranslateService) {
    super();
    this.setTranslations();
    translateService.onLangChange.subscribe(() => {
      this.setTranslations();
    })
  }

  paginatorVariables: string[] = [
    'paginator.itemPerPage', 'paginator.firstPage', 'paginator.lastPage', 'paginator.nextPage',
    'paginator.previousPage', 'paginator.of'
  ];

  setTranslations(){
    this.translateService.get(this.paginatorVariables).subscribe((translations) => {
      this.itemsPerPageLabel = translations['paginator.itemPerPage'];
      this.previousPageLabel = translations['paginator.previousPage'];
      this.nextPageLabel = translations['paginator.nextPage'];
      this.lastPageLabel = translations['paginator.lastPage'];
      this.firstPageLabel = translations['paginator.firstPage'];
      let ofText = translations['paginator.of'];
      this.getRangeLabel = function (page, pageSize, length) {
        if (length === 0 || pageSize === 0) {
          return '0 '+ ofText + ' ' + length;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ?
          Math.min(startIndex + pageSize, length) :
          startIndex + pageSize;
        return startIndex + 1 + ' - ' + endIndex + ' ' + ofText + ' ' + length;
      }
      this.changes.next();
    });
  }
}