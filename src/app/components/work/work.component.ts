import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Tables } from '../../types/database.types';
import { WorkService } from '../../services/work.service';
import { DELETE, INSERT, UPDATE } from '../../constants/superbase/superbase.tables.constant';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrl: './work.component.css'
})
export class WorkComponent implements OnInit {

  workList: Tables<'work'>[] | null | undefined;
  error: any | null | undefined;
  isLoading: boolean = true;
  bgColorList: String[] = [
    '#D09CFA',
    '#B9F3FC',
    '#B9F3FC',
    '#FFD495'
  ];

  styleClassList: String[] = [
    'project-item-l1',
    'project-item-r1',
    'project-item-l2',
    'project-item-r2'
  ];

  constructor(private titleService: Title, private service : WorkService) {
    this.titleService.setTitle('Abhijit Unavane • SDE');
  }
  
  ngOnInit() {
    this.setupObservers();
  }

  async setupObservers(): Promise<void> {
    const {data, error} = await this.service.work();

    if (error != null) {
      this.error = error;
    } else if (data != null) {
      this.workList = data;
      this.workList?.map(async work => {
        if (work.image !== null) {
          const { data } = await this.service.workImage(work.image);
          
          if (data !== null && data.publicUrl !== null) {
            work.image = data.publicUrl;
          }
        }
      });
    }
  
    this.isLoading = false;
    
    this.service.workChanges().subscribe(async update => {
      if (update !== null) {
        if (this.workList === undefined || this.workList === null) {
          return;
        }
        
        const newData = update.new;
        const oldData = update.old;
        switch (update.eventType) {
          case INSERT: {
            const work: Tables<'work'> = newData as Tables<'work'>;
            if (work.image !== null) {
              const { data } = await this.service.workImage(work.image);
              if (data !== null && data.publicUrl !== null) {
                work.image = data.publicUrl;
              }
            }
            this.workList.push(work);
            break;
          }
          case UPDATE: {
            if (this.workList.length > 0) {
              this.workList.map(async (work, index) => {
                if (work.id == newData.id) {
                  const work: Tables<'work'> = newData as Tables<'work'>;
                  if (work.image !== null) {
                    const { data } = await this.service.workImage(work.image);
                    if (data !== null && data.publicUrl !== null) {
                      work.image = data.publicUrl;
                    }
                  }
                  this.workList![index] = work;
                  return;
                }
              });
            }
            break;
          }
          case DELETE: {
            this.workList = this.workList.filter(work => work.id !== oldData.id);
            break;
          }
        }
      }
    });
  }

  /**
   * Method to get background color from {@link bgColorList}
   * 
   * @param index Index of work list
   * @returns background color {@link String} 
   */
  getBgColor(index: number): String {
    return this.bgColorList[index % 4];
  };

  /**
   * Method to get style class from {@link styleClassList}
   * 
   * @param index Index of work list
   * @returns style class {@link String} 
   */
  getStyleClass(index: number): String {
    return this.styleClassList[index % 4];
  };
}
