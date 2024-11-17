import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DialogService } from 'src/app/_service/dialog/dialog.service';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [NgFor, MaterialModule],
  templateUrl: './story.component.html',
  styleUrl: './story.component.scss'
})
export class StoryComponent {
  items= Array(30);
  @Input() highlight: any[] = [];

  constructor(private dialog: DialogService){
  }

  ngOnInit(): void {
    // console.log(this.highlight);
  }

  open(){
    this.dialog.openDialogHighlight();

  }
}
