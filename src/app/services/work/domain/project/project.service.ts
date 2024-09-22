import { Injectable } from '@angular/core';
import { QueryData } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { SupabaseService } from '../../../supabase/supabase.service';
import { ID, PROJECT_TABLE, SELECT_ALL } from '../../../../constants/superbase/superbase.tables.constant';
import { Tables } from '../../../../types/database.types';
import { PROJECT_PATH } from '../../../../constants/superbase/superbase.storage.constant';
import { NetworkService } from '../../../common/network.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends NetworkService {

  constructor(private supabaseService: SupabaseService) { 
    super();
  }

  /**
   * Method to find project data from supabase
   * 
   * @param value value that needs to be found
   * @returns Result of data {@link QueryData} of {@link Tables}
   */
  override find(value: any) {
    return this.supabaseService.find<QueryData<Tables<'domain'>>>(PROJECT_TABLE, SELECT_ALL, ID, value);
  }

  /**
   * Method to get project table data changes from supabase
   * 
   * @returns Observable data {@link Observable}
   */
  override getChanges(): Observable<any> {
    return this.supabaseService.getChanges(PROJECT_TABLE, SELECT_ALL);
  }

  /**
   * Method to get project image from supabase storage
   * 
   * @returns Public image url
   */
  override getImage(imageName: string): any {
    return this.supabaseService.getImage(`${PROJECT_PATH}/${imageName}`);
  }

  /**
   * Method to get project image from supabase storage
   * 
   * @returns Public image url
   */
  override update(newData: any, column: any, value: any): any {
    return this.supabaseService.update(PROJECT_TABLE, newData, column, value);
  }

  /**
   * Method to get project table data from supabase
   * 
   * @param value value that needs to be found
   * @returns Result of data {@link QueryData} of {@link Tables}
   */
  override get(): any {
    return this.supabaseService.get(PROJECT_TABLE, SELECT_ALL);
  }

  override insert() {
    throw new Error('Method not implemented.');
  }
}
