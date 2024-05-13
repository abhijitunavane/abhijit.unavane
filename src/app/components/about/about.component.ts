import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AboutService } from '../../services/about/about.service';
import { Tables } from '../../types/database.types';
import { INSERT, UPDATE } from '../../constants/superbase/superbase.tables.constant';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements OnInit {

  aboutList: Tables<'about'>[] | null | undefined;
  isLoading: boolean = true;
  error: any | null | undefined;

  constructor(private titleService: Title, private service: AboutService) {
    this.titleService.setTitle('Abhijit Unavane • About');
  }
  
  ngOnInit() {
    this.setupObservers();
  }

  async setupObservers(): Promise<void> {
    const {data, error} = await this.service.get();
    this.isLoading = false;

    if (error != null) {
      this.error = error;
    } else if (data != null) {
      this.aboutList = data;
      this.aboutList?.map(async about => {
        if (about.image !== null) {
          const { data } = this.service.getImage(about.image);
          
          if (data !== null && data.publicUrl !== null) {
            about.image = data.publicUrl;
          }
        }
      });
    }
    
    this.service.getChanges().subscribe(update => {
      if (update !== null) {
        if (this.aboutList === undefined || this.aboutList === null) {
          return;
        }
        
        const newData = update.new;
        switch (update.eventType) {
          case INSERT: {
            const about: Tables<'about'> = newData as Tables<'about'>;
            if (about.image !== null) {
              const { data } = this.service.getImage(about.image);
              if (data !== null && data.publicUrl !== null) {
                about.image = data.publicUrl;
              }
            }
            this.aboutList.push(about);
            break;
          }
          case UPDATE: {
            if (this.aboutList.length > 0) {
              this.aboutList.map((about, index) => {
                if (about.id === newData.id) {
                  const about: Tables<'about'> = newData as Tables<'about'>;
                  if (about.image !== null) {
                    const { data } = this.service.getImage(about.image);
                    if (data !== null && data.publicUrl !== null) {
                      about.image = data.publicUrl;
                    }
                  }
                  this.aboutList![index] = about;
                  return;
                }
              });
            }
            break;
          }
        }
      }
    });
  }
}
