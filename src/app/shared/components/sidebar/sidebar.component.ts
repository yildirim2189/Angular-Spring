import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService) { }

  // todo bunu userservisten alsın. yazılacak!
  user = this.tokenStorageService.getUser();

  ngOnInit() {}
}
