import { Injectable } from '@angular/core';
import { QueryData } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { SupabaseService } from '../../../supabase/supabase.service';
import { ID, PROJECT_TABLE, SELECT_ALL } from '../../../../constants/superbase/superbase.tables.constant';
import { Tables } from '../../../../types/database.types';
import { PROJECT_PATH } from '../../../../constants/superbase/superbase.storage.constant';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private supbaseService: SupabaseService) { }

  /**
   * Method to get project table data from supabase
   * 
   * @param value value that needs to be found
   * @returns Result of data {@link QueryData} of {@link Tables}
   */
  find(value: any) {
    return this.supbaseService.find<QueryData<Tables<'domain'>>>(PROJECT_TABLE, SELECT_ALL, ID, value);
  }

  /**
   * Method to get project table data changes from supabase
   * 
   * @returns Observable data {@link Observable}
   */
  getChanges(): Observable<any> {
    return this.supbaseService.getChanges(PROJECT_TABLE, SELECT_ALL);
  }

  /**
   * Method to get project image from supabase storage
   * 
   * @returns Public image url
   */
  getImage(imageName: string): any {
    return this.supbaseService.getImage(`${PROJECT_PATH}/${imageName}`);
  }
}
